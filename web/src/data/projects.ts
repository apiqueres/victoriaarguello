import type { Lang } from '../i18n';
type T = Record<Lang, string>;

export interface ResType { id: string; name: string; beds: number; den?: boolean; baths: number; interior: [number, number]; total?: [number, number]; levels?: string; plan: string; }
export interface Project {
  slug: string; short: string; name: string; place: string; tagline: T; lead: T; body: T[];
  hero: string; heroPos: string; cover: string; dark: string; theme: 'light' | 'dark';
  facts: { k: T; v: T }[];
  figures: { n: string; l: T }[];
  residencesLead: T; residenceImgs: { id: string; cap: T }[];
  amenitiesLead: T; amenityImgs: { id: string; cap: T }[];
  types: ResType[]; typesNote: T;
  team: { role: T; name: string }[];
  views?: number[]; film?: string;
}

const same = (s: string): T => ({ es: s, en: s });

export const projects: Project[] = [
  {
    slug: 'mandarin-oriental-miami', short: 'MANDARIN', name: 'The Residences at Mandarin Oriental, Miami',
    place: 'North Tower · Brickell Key, Miami',
    tagline: { es: 'Vida de isla, a un puente de Brickell', en: 'Island living, one bridge from Brickell' },
    lead: { es: 'Una torre de 33 plantas sobre la bahía que une residencias privadas y el nuevo hotel Mandarin Oriental, Miami.', en: 'A 33-story tower above the bay that brings together private residences and the new Mandarin Oriental, Miami hotel.' },
    body: [
      { es: 'Desarrollado por Swire Properties en la última parcela disponible de Brickell Key, el proyecto ofrece 70 residencias privadas y 28 residencias de hotel listas para entrar a vivir, con acceso directo al servicio de Mandarin Oriental.', en: 'Developed by Swire Properties on the last available parcel on Brickell Key, the project offers 70 private residences and 28 turnkey hotel residences, with direct access to Mandarin Oriental service.' },
      { es: 'Interiores cálidos y luminosos, terrazas privadas y grandes ventanales abren cada estancia a vistas panorámicas del agua y del skyline.', en: 'Warm, light-filled interiors, private terraces and expansive windows open every room to panoramic views of the water and the skyline.' },
    ],
    heroPos: '27% 50%', hero: 'mo/hero', cover: 'mo/00residenceterracee', dark: 'mo/alldaydining-skylineseating', theme: 'light',
    facts: [
      { k: { es: 'Promotor', en: 'Developer' }, v: same('Swire Properties') },
      { k: { es: 'Ubicación', en: 'Location' }, v: same('Brickell Key, Miami') },
      { k: { es: 'Altura', en: 'Height' }, v: { es: '33 plantas', en: '33 stories' } },
      { k: { es: 'Residencias', en: 'Residences' }, v: { es: '70 privadas + 28 de hotel', en: '70 private + 28 hotel residences' } },
      { k: { es: 'Tipologías', en: 'Residence types' }, v: { es: '2, 3 y 4 dormitorios', en: '2, 3 and 4 bedrooms' } },
      { k: { es: 'Interiores', en: 'Interiors' }, v: same('Laura Gonzalez') },
      { k: { es: 'Servicio', en: 'Hospitality' }, v: same('Mandarin Oriental Hotel Group') },
    ],
    figures: [
      { n: '33', l: { es: 'plantas sobre la bahía', en: 'stories above the bay' } },
      { n: '70', l: { es: 'residencias privadas', en: 'private residences' } },
      { n: '100,000', l: { es: 'sq ft de amenidades en el podio', en: 'sq ft amenity podium' } },
    ],
    residencesLead: { es: 'Materiales naturales, líneas curvas y una paleta de azules y arenas inspirada en Brickell Key.', en: 'Natural materials, soft curves and a palette of blues and sands inspired by Brickell Key.' },
    residenceImgs: [
      { id: 'mo/privateresidence-05', cap: { es: 'Salón · Residencia 05', en: 'Great room · Residence 05' } },
      { id: 'mo/kitchenresidence-warmpalette-02', cap: { es: 'Cocina · paleta cálida', en: 'Kitchen · warm palette' } },
      { id: 'mo/private-residence-02-bedroom', cap: { es: 'Dormitorio · Residencia 02', en: 'Bedroom · Residence 02' } },
      { id: 'mo/primary-bathroom-warm-palette', cap: { es: 'Baño principal', en: 'Primary bathroom' } },
      { id: 'mo/kitchenresidence-coolpalette-02', cap: { es: 'Cocina · paleta fría', en: 'Kitchen · cool palette' } },
      { id: 'mo/00residenceterracee', cap: { es: 'Terraza · Residencia 00', en: 'Terrace · Residence 00' } },
    ],
    amenitiesLead: { es: 'Un podio ajardinado con piscinas, spa, restaurante y salones exclusivos para residentes.', en: 'A landscaped podium with pools, spa, dining and lounges reserved for residents.' },
    amenityImgs: [
      { id: 'mo/resortpool', cap: { es: 'Piscina resort', en: 'Resort pool' } },
      { id: 'mo/coveredoutdoorlappooll', cap: { es: 'Piscina de nado cubierta', en: 'Covered outdoor lap pool' } },
      { id: 'mo/level19residentslounge', cap: { es: 'Salón de residentes · Nivel 19', en: 'Residents lounge · Level 19' } },
      { id: 'mo/tea-lounge', cap: { es: 'Salón de té', en: 'Tea lounge' } },
      { id: 'mo/immersive-spa-relaxation', cap: { es: 'Sala de relajación del spa', en: 'Spa relaxation room' } },
      { id: 'mo/gardencabanas', cap: { es: 'Cabañas del jardín', en: 'Garden cabanas' } },
      { id: 'mo/alldaydining-skylineseating', cap: { es: 'Restaurante · vistas al skyline', en: 'All-day dining · skyline seating' } },
      { id: 'mo/gym', cap: { es: 'Gimnasio', en: 'Fitness' } },
      { id: 'mo/private-residential-lobby', cap: { es: 'Lobby residencial privado', en: 'Private residential lobby' } },
    ],
    types: [
      { id: '04', name: 'Residence 04', beds: 2, baths: 2, interior: [1577, 147], levels: '20–29', plan: 'mo-04' },
      { id: '01', name: 'Residence 01', beds: 2, baths: 2, interior: [1919, 178], levels: '20–29', plan: 'mo-01' },
      { id: '05', name: 'Residence 05', beds: 3, baths: 3, interior: [2459, 228], levels: '20–29', plan: 'mo-05' },
      { id: '03', name: 'Residence 03', beds: 3, baths: 3, interior: [2541, 236], levels: '20–29', plan: 'mo-03' },
      { id: '00', name: 'Residence 00', beds: 4, baths: 4, interior: [2693, 250], levels: '20–29', plan: 'mo-00' },
      { id: '02', name: 'Residence 02', beds: 4, baths: 4, interior: [3247, 302], levels: '20–29', plan: 'mo-02' },
    ],
    typesNote: { es: 'Planos de los niveles 20 a 29. También hay residencias en los niveles 19 y 30.', en: 'Floor plans for levels 20 to 29. Residences are also available on levels 19 and 30.' },
    team: [
      { role: { es: 'Promotor', en: 'Developer' }, name: 'Swire Properties' },
      { role: { es: 'Operador hotelero', en: 'Hospitality operator' }, name: 'Mandarin Oriental Hotel Group' },
      { role: { es: 'Interiores de las residencias', en: 'Private residence interiors' }, name: 'Laura Gonzalez' },
    ],
    film: '/media/video/mandarin.mp4',
  },
  {
    slug: '75-broadway', short: '75 BROADWAY', name: '75 Broadway Residences',
    place: 'Brickell, Miami',
    tagline: { es: 'Una torre boutique frente a Simpson Park', en: 'A boutique tower facing Simpson Park' },
    lead: { es: '52 plantas y solo 106 residencias frente a las diez acres protegidas de Simpson Park, con vistas abiertas a Biscayne Bay.', en: '52 stories and only 106 homes across from the ten protected acres of Simpson Park, with open views to Biscayne Bay.' },
    body: [
      { es: 'Desarrollada por Ytech con arquitectura de Kohn Pedersen Fox, la torre reúne residencias de uno, dos y tres dormitorios —tres por planta— con vestíbulo de ascensor privado y grandes frentes de vidrio.', en: 'Developed by Ytech with architecture by Kohn Pedersen Fox, the tower brings together one-, two- and three-bedroom homes — three per floor — with private elevator foyers and expansive glass frontages.' },
      { es: 'Los interiores son de ACPV Architects Antonio Citterio Patricia Viel, con cocinas Arclinea y electrodomésticos Gaggenau. El servicio residencial se ha desarrollado junto al British Butler Institute.', en: 'Interiors are by ACPV Architects Antonio Citterio Patricia Viel, with Arclinea kitchens and Gaggenau appliances. Residential service has been developed with the British Butler Institute.' },
    ],
    heroPos: '31% 50%', hero: 'b75/hero', cover: 'b75/unitaliving', dark: 'b75/crowndusk', theme: 'dark',
    facts: [
      { k: { es: 'Promotor', en: 'Developer' }, v: same('Ytech') },
      { k: { es: 'Ubicación', en: 'Location' }, v: same('75 Broadway, Brickell, Miami') },
      { k: { es: 'Altura', en: 'Height' }, v: { es: '52 plantas', en: '52 stories' } },
      { k: { es: 'Residencias', en: 'Residences' }, v: { es: '106, incluidos 7 áticos', en: '106, including 7 penthouses' } },
      { k: { es: 'Tipologías', en: 'Residence types' }, v: { es: '1, 2 y 3 dormitorios', en: 'One, two and three bedrooms' } },
      { k: { es: 'Por planta', en: 'Per floor' }, v: { es: 'Tres residencias', en: 'Three residences' } },
      { k: { es: 'Arquitectura', en: 'Architecture' }, v: same('Kohn Pedersen Fox (KPF)') },
      { k: { es: 'Interiores', en: 'Interior design' }, v: same('ACPV Architects Antonio Citterio Patricia Viel') },
      { k: { es: 'Paisajismo', en: 'Landscape' }, v: same('Enzo Enea') },
    ],
    figures: [
      { n: '52', l: { es: 'plantas', en: 'stories' } },
      { n: '106', l: { es: 'residencias', en: 'residences' } },
      { n: '3', l: { es: 'residencias por planta', en: 'residences per floor' } },
    ],
    residencesLead: { es: 'Grandes frentes de vidrio curvo, piedra natural y madera: espacios serenos que miran al parque y a la bahía.', en: 'Broad sweeps of curved glass, natural stone and wood: serene rooms that look out to the park and the bay.' },
    residenceImgs: [
      { id: 'b75/unitaliving', cap: { es: 'Salón · Residencia A', en: 'Living room · Residence A' } },
      { id: 'b75/unitadining', cap: { es: 'Comedor · Residencia A', en: 'Dining · Residence A' } },
      { id: 'b75/unitakitchen', cap: { es: 'Cocina · Residencia A', en: 'Kitchen · Residence A' } },
      { id: 'b75/unitabedroom', cap: { es: 'Dormitorio principal', en: 'Primary bedroom' } },
      { id: 'b75/unitabathroom', cap: { es: 'Baño principal', en: 'Primary bathroom' } },
      { id: 'b75/penthouselivingroom', cap: { es: 'Salón del ático', en: 'Penthouse living room' } },
      { id: 'b75/unitcliving', cap: { es: 'Salón · Residencia C', en: 'Living room · Residence C' } },
    ],
    amenitiesLead: { es: 'Bienestar y vida diaria: piscina en la azotea, Owners Club, jardines y terapias de recuperación.', en: 'Wellness and everyday living: rooftop pool, Owners Club, gardens and restorative therapies.' },
    amenityImgs: [
      { id: 'b75/rooftoppool', cap: { es: 'Piscina en la azotea', en: 'Rooftop pool' } },
      { id: 'b75/ownersclub', cap: same('Owners Club') },
      { id: 'b75/ownersclubbar', cap: { es: 'Bar del Owners Club', en: 'Owners Club bar' } },
      { id: 'b75/wellness', cap: same('Wellness') },
      { id: 'b75/rooftoppoolbar', cap: { es: 'Bar de la piscina', en: 'Rooftop pool bar' } },
      { id: 'b75/lobbylookingin', cap: same('Lobby') },
      { id: 'b75/ownersclubprivatedining', cap: { es: 'Comedor privado', en: 'Private dining' } },
      { id: 'b75/wellnessexterior', cap: { es: 'Jardín de bienestar', en: 'Wellness garden' } },
      { id: 'b75/pedestrian', cap: { es: 'Llegada peatonal', en: 'Pedestrian arrival' } },
    ],
    types: [
      { id: 'B', name: 'Residence B', beds: 1, den: true, baths: 2, interior: [1640, 152], total: [1750, 162], plan: 'b75-b' },
      { id: 'C', name: 'Residence C', beds: 2, baths: 2, interior: [2223, 206], total: [2328, 216], plan: 'b75-c' },
      { id: 'A', name: 'Residence A', beds: 3, baths: 3, interior: [2621, 243], total: [2811, 261], plan: 'b75-a' },
    ],
    typesNote: { es: 'Superficies aproximadas tomadas de los planos comerciales; confirmar con la documentación oficial.', en: 'Approximate areas taken from the sales floor plans; confirm against the official documents.' },
    team: [
      { role: { es: 'Promotor', en: 'Developer' }, name: 'Ytech' },
      { role: { es: 'Arquitectura', en: 'Architecture' }, name: 'Kohn Pedersen Fox (KPF)' },
      { role: { es: 'Interiores', en: 'Interior design' }, name: 'ACPV Architects Antonio Citterio Patricia Viel' },
      { role: { es: 'Paisajismo', en: 'Landscape architecture' }, name: 'Enzo Enea' },
      { role: { es: 'Servicio residencial', en: 'Residential hospitality' }, name: 'British Butler Institute' },
    ],
    views: [8, 10, 15, 20, 25, 30, 35, 40, 45, 50, 52], film: '/media/video/dusk.mp4',
  },
];
