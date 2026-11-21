import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 800px)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

/* ── Smooth scroll ── */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── Preloader ── */
function preload(): Promise<void> {
  const el = $('#preloader');
  if (!el || reduce) { el?.remove(); return Promise.resolve(); }
  let seen = false;
  try { seen = sessionStorage.getItem('va-seen') === '1'; sessionStorage.setItem('va-seen', '1'); } catch { /* storage unavailable */ }
  if (seen) { el.remove(); return Promise.resolve(); }
  const n = $('[data-pre]', el)!;
  lenis?.stop();
  return new Promise((resolve) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: 100, duration: 1.5, ease: 'power2.inOut',
      onUpdate: () => { n.textContent = String(Math.round(o.v)).padStart(3, '0'); },
      onComplete: () => {
        el.classList.add('is-done');
        lenis?.start();
        setTimeout(resolve, 350);
        setTimeout(() => el.remove(), 1400);
      },
    });
  });
}

/* ── Reveal on view ── */
function reveals() {
  const els = $$('[data-reveal], [data-split], .lines');
  if (reduce) { els.forEach((e) => e.classList.add('is-in')); return; }
  // Layout boxes are measured directly: elements hidden by their own clip-path still count,
  // and nothing waits for the window load event.
  let pending = els;
  let queued = false;
  const check = () => {
    queued = false;
    const limit = innerHeight * 0.92;
    pending = pending.filter((e) => {
      const r = e.getBoundingClientRect();
      if (r.top < limit && r.bottom > -innerHeight) { e.classList.add('is-in'); return false; }
      return r.bottom > -innerHeight;
    });
    if (!pending.length) { removeEventListener('scroll', ask); removeEventListener('resize', ask); }
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask);
  addEventListener('load', ask);
  check();
}

/* ── Scroll-driven motion ── */
function motion() {
  if (reduce) return;

  $$('.imove').forEach((box) => {
    const el = box.firstElementChild as HTMLElement | null;
    if (!el) return;
    gsap.fromTo(el, { yPercent: -13.5 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  const hero = $('.hero');
  if (hero) {
    const from = mobile ? 'inset(64% 0% 0% 0%)' : 'inset(0% 0% 0% 68%)';
    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=130%', scrub: true, pin: true, anticipatePin: 1 } });
    tl.fromTo('.hero__panel', { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, 0)
      .fromTo('.hero__panel img', mobile ? { scale: 1.2 } : { xPercent: 50, scale: 1.08 }, { xPercent: 0, scale: 1, ease: 'none', duration: 1 }, 0)
      .to('.hero__content', { opacity: 0, xPercent: mobile ? 0 : -5, ease: 'none', duration: 0.55 }, 0)
      .to('.hero__down', { opacity: 0, duration: 0.2 }, 0)
      .to('.hero__scrim', { opacity: 1, duration: 0.35 }, 0.7)
      .fromTo('.hero__quote', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35 }, 0.8)
      .to({}, { duration: 0.25 });
    ScrollTrigger.create({ trigger: hero, start: 'top top', end: '+=60%', onLeave: () => document.body.classList.add('is-scrolled'), onEnterBack: () => document.body.classList.remove('is-scrolled') });
  }

  $$('.grow').forEach((sec) => {
    const from = mobile ? 'inset(30% 18% 30% 18%)' : 'inset(28% 34% 28% 34%)';
    const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=110%', scrub: true, pin: true, anticipatePin: 1 } });
    tl.fromTo($('.grow__media', sec), { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, 0)
      .fromTo($('.grow__text', sec), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, 0.55)
      .to({}, { duration: 0.2 });
  });

  const ph = $('.phero__img img');
  if (ph) gsap.fromTo(ph, { yPercent: 0 }, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ── Videos: play only when visible ── */
function videos() {
  const vids = $$<HTMLVideoElement>('video[data-auto]');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) { if (!reduce) v.play().catch(() => {}); } else v.pause();
    }
  }, { threshold: 0.1 });
  vids.forEach((v) => io.observe(v));
}

/* ── Modals ── */
function modals() {
  let last: HTMLElement | null = null;
  const close = () => {
    $$('.modal.is-open').forEach((m) => { m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); });
    lenis?.start();
    last?.focus();
  };
  const open = (id: string, from: HTMLElement) => {
    const m = document.getElementById(id);
    if (!m) return;
    $$('.modal.is-open').forEach((x) => x.classList.remove('is-open'));
    last = from;
    if (id === 'contact') {
      const subject = from.dataset.subject ?? '';
      const input = $<HTMLInputElement>('[name="subject"]', m);
      const chip = $('[data-chip]', m);
      if (input) input.value = subject;
      if (chip) chip.textContent = subject;
      m.classList.remove('is-sent');
    }
    m.classList.add('is-open');
    m.setAttribute('aria-hidden', 'false');
    lenis?.stop();
    setTimeout(() => $<HTMLElement>('[data-close]', m)?.focus(), 80);
  };
  document.addEventListener('click', (ev) => {
    const t = ev.target as HTMLElement;
    const o = t.closest<HTMLElement>('[data-open]');
    if (o) { ev.preventDefault(); open(o.dataset.open!, o); return; }
    if (t.closest('[data-close]') || t.closest('.modal a[href]')) close();
  });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') close(); });

  $$<HTMLFormElement>('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if ((form.elements.namedItem('company') as HTMLInputElement)?.value) return; // honeypot
      // TODO: connect to the real endpoint (email service / CRM) before launch.
      form.closest('.modal')?.classList.add('is-sent');
      form.reset();
    });
  });
}

/* ── Drag carousels ── */
function carousels() {
  $$('.car, .menu__list').forEach((car) => {
    let down = false, sx = 0, sl = 0, moved = 0;
    car.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = car.scrollLeft; });
    window.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 4) car.classList.add('is-drag'); car.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', () => { down = false; setTimeout(() => car.classList.remove('is-drag'), 0); });
    car.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    car.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

/* ── Views by level ── */
function views() {
  const root = $('[data-views]');
  if (!root) return;
  const imgs = $$<HTMLImageElement>('.views__stage img', root);
  const range = $<HTMLInputElement>('.range', root)!;
  const out = $('[data-level]', root)!;
  const set = (i: number) => {
    const img = imgs[i];
    if (!img) return;
    if (!img.getAttribute('src')) { img.src = img.dataset.src!; if (img.dataset.srcset) img.srcset = img.dataset.srcset; }
    const show = () => imgs.forEach((x, j) => x.classList.toggle('is-on', j === i));
    if (img.complete && img.naturalWidth) show(); else img.addEventListener('load', show, { once: true });
    out.textContent = img.dataset.level ?? '';
  };
  range.addEventListener('input', () => set(Number(range.value)));
  const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { set(Number(range.value)); io.disconnect(); } }, { rootMargin: '400px' });
  io.observe(root);
}

/* ── Cursor ── */
function cursor() {
  const c = $('.cursor');
  if (!c || reduce || !matchMedia('(pointer: fine)').matches) return;
  const x = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' });
  const y = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { c.classList.add('is-on'); x(e.clientX); y(e.clientY); });
  document.addEventListener('pointerover', (e) => {
    c.classList.toggle('is-big', !!(e.target as HTMLElement).closest('a, button, summary, .car, input[type="range"]'));
  });
  document.documentElement.addEventListener('pointerleave', () => c.classList.remove('is-on'));
}

function details() {
  $$<HTMLDetailsElement>('details.type').forEach((d) => d.addEventListener('toggle', () => { lenis?.resize(); ScrollTrigger.refresh(); }));
}

modals();
carousels();
cursor();
videos();
views();
details();
motion();
preload().then(reveals);
window.addEventListener('load', () => ScrollTrigger.refresh());
