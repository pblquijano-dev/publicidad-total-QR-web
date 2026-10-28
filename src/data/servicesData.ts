import {
  GalleryPhoto,
  EDECANES_GALLERY,
  ANIMADORES_GALLERY,
  AUDIO_GALLERY,
  BOTARGUERO_GALLERY,
  ZANQUERO_GALLERY,
  BATUCADA_GALLERY,
  PANCARTERO_GALLERY,
  PROMODEGUSTADORAS_GALLERY,
  GIOS_GALLERY,
  FOTOGRAFIA_GALLERY,
  VIDEO_GALLERY,
  PANTALLAS_GALLERY,
  PERIFONEO_GALLERY,
  VALLAS_MOVILES_GALLERY,
  VOLANTEO_CASA_GALLERY,
  PUBLIANDANTES_GALLERY,
  VOLANTEO_MANO_GALLERY,
  VOLANTES_IMPRESOS_GALLERY,
  LONAS_GALLERY,
  VINIL_GALLERY,
} from './servicesPhotos';

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  gallery: GalleryPhoto[];
}

export interface Category {
  id: string;
  name: string;
  services: ServiceItem[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'activacion',
    name: 'Activación de Marca',
    services: [
      {
        slug: 'edecanes-aa-aaa',
        title: 'Edecanes AA y AAA',
        description:
          'Personal de imagen calificado con excelente presentación, facilidad de palabra y vestuario corporativo coordinado para congresos, lanzamientos, expos y eventos VIP en la Península.',
        coverImage:
          '/images/servicios/activaciones de marca/edecanes/8c5b5d08-a098-47d8-b4ae-38439e7d4fb6.jpg',
        gallery: EDECANES_GALLERY,
      },
      {
        slug: 'animadores-comerciales',
        title: 'Animadores Comerciales',
        description:
          'Conducción profesional con micrófono en mano, animación de dinámicas, concursos y ambientación comercial para atraer clientes a tu tienda o sucursal.',
        coverImage:
          '/images/servicios/activaciones de marca/animadores/a307589d-583b-4669-a03a-991cbd175ccf.jpg',
        gallery: ANIMADORES_GALLERY,
      },
      {
        slug: 'audio-profesional',
        title: 'Audio Profesional',
        description:
          'Sistemas de sonido de alta fidelidad y potencia para sonorización en punto de venta, carpas publicitarias y eventos masivos en exteriores.',
        coverImage:
          '/images/servicios/activaciones de marca/audio/6b2d5781-90f1-4181-8880-004eaf8122f4.jpg',
        gallery: AUDIO_GALLERY,
      },
      {
        slug: 'botargueros',
        title: 'Botargueros',
        description:
          'Animadores caracterizados de alta energía para dinamizar el punto de venta, interactuar con el público familiar y generar contenido de alto impacto visual.',
        coverImage:
          '/images/servicios/activaciones de marca/botargueros/59966bc4-85e2-4436-87a6-2aa9a3fee7b0.jpg',
        gallery: BOTARGUERO_GALLERY,
      },
      {
        slug: 'zanqueros',
        title: 'Zanqueros',
        description:
          'Artistas visuales en zancos con vistosos vestuarios temáticos de gran impacto para elevar la visibilidad de tu marca desde largas distancias en avenidas y desfiles.',
        coverImage:
          '/images/servicios/activaciones de marca/zanqueros/458356884_1086215763507006_6909237291927740340_n.jpg',
        gallery: ZANQUERO_GALLERY,
      },
      {
        slug: 'batucada',
        title: 'Batucada',
        description:
          'Espectáculo musical de percusión y ritmo en vivo para capturar la atención masiva en inauguraciones, eventos comerciales y desfiles festivos.',
        coverImage:
          '/images/servicios/activaciones de marca/batucada/384192141_848130143982237_2975859918883456179_n.jpg',
        gallery: BATUCADA_GALLERY,
      },
      {
        slug: 'pancarteros',
        title: 'Pancarteros',
        description:
          'Personal dinámico en camellones y cruceros estratégicos con pancartas y flechas de alta visibilidad para desviar el tráfico hacia tu sucursal.',
        coverImage:
          '/images/servicios/activaciones de marca/pancarteros/6250f005-39e9-4e96-b961-74d648de9ffa.jpg',
        gallery: PANCARTERO_GALLERY,
      },
      {
        slug: 'promodegustadoras',
        title: 'Promodegustadoras',
        description:
          'Personal capacitado en punto de venta para demostración de producto, degustación, entrega de muestras y desplazamiento de inventario en tienda.',
        coverImage:
          '/images/servicios/activaciones de marca/promodegustadoras/ef915f31-d76a-4ba8-b6de-747edee2562d.jpg',
        gallery: PROMODEGUSTADORAS_GALLERY,
      },
      {
        slug: 'gios',
        title: 'Gios',
        description:
          'Personal masculino de imagen comercial y protocolo para bienvenida, eventos deportivos, exposiciones corporativas y activaciones de marca.',
        coverImage:
          '/images/servicios/activaciones de marca/gios/c41435e4-5020-474f-9749-535a54dca792.jpg',
        gallery: GIOS_GALLERY,
      },
    ],
  },
  {
    id: 'audiovisuales',
    name: 'Audiovisuales',
    services: [
      {
        slug: 'fotografia-de-eventos',
        title: 'Fotografía de Eventos',
        description:
          'Cobertura fotográfica profesional en alta resolución para documentar activaciones, aperturas, congresos y campañas corporativas con entrega de material optimizado.',
        coverImage:
          '/images/servicios/audiovisuales/foto/7b4e83da-0fb4-478c-b756-301c3ae28a07.jpg',
        gallery: FOTOGRAFIA_GALLERY,
      },
      {
        slug: 'video-y-cobertura',
        title: 'Video y Cobertura',
        description:
          'Producción audiovisual completa con tomas cinematográficas, reels dinámicos para redes sociales y videos resumen con edición y musicalización profesional.',
        coverImage:
          '/images/servicios/audiovisuales/video/bc585346-8e14-4df5-a753-756403699a77.jpg',
        gallery: VIDEO_GALLERY,
      },
      {
        slug: 'pantallas-digitales',
        title: 'Pantallas Digitales',
        description:
          'Renta e instalación de pantallas LED de gran formato y alta luminosidad para proyección de spots comerciales, branding dinámico y eventos en vivo.',
        coverImage:
          '/images/servicios/audiovisuales/pantalla/5680a7d0-8337-4753-9464-56f59573a475.jpg',
        gallery: PANTALLAS_GALLERY,
      },
    ],
  },
  {
    id: 'perifoneo',
    name: 'Perifoneo',
    services: [
      {
        slug: 'carros-de-sonido',
        title: 'Carros de Sonido (Flotilla propia con bocinas de alto alcance)',
        description:
          'Flotilla propia de unidades equipadas con bocinas de alto alcance y amplificadores profesionales recorriendo colonias, avenidas y supermanzanas estratégicas.',
        coverImage:
          '/images/servicios/perifoneo/carros/2265f8b3-f143-49f4-8351-309cbd2b5f0e.jpg',
        gallery: PERIFONEO_GALLERY,
      },
      {
        slug: 'vallas-moviles',
        title: 'Vallas Móviles',
        description:
          'Unidades equipadas con paneles publicitarios iluminados de gran impacto visual que recorren las principales vialidades urbanas en horarios de máxima afluencia.',
        coverImage:
          '/images/servicios/perifoneo/vallas moviles/20260124_181502.jpg',
        gallery: VALLAS_MOVILES_GALLERY,
      },
    ],
  },
  {
    id: 'volanteo',
    name: 'Volanteo',
    services: [
      {
        slug: 'volanteo-casa-por-casa',
        title: 'Volanteo Casa por Casa',
        description:
          'Distribución selectiva bajo puerta y en buzones por supermanzanas y fraccionamientos objetivo, con supervisión en campo y reportes de entrega.',
        coverImage:
          '/images/servicios/volanteo/casa a casa/b786e258-f02d-4858-92ca-7855aa78712c.jpg',
        gallery: VOLANTEO_CASA_GALLERY,
      },
      {
        slug: 'publiandantes',
        title: 'Publiandantes',
        description:
          'Cuadrillas móviles de promotores equipados con mochilas banner y banderas publicitarias recorriendo andadores peatonales y centros comerciales.',
        coverImage:
          '/images/servicios/volanteo/publiandantes/367475347_810289221099663_2025243568995935940_n.jpg',
        gallery: PUBLIANDANTES_GALLERY,
      },
      {
        slug: 'volanteo-mano-a-mano',
        title: 'Volanteo Mano a Mano',
        description:
          'Entrega personalizada y directa de material impreso a peatones y automovilistas en cruces, paraderos y semáforos de alto flujo con personal identificado.',
        coverImage:
          '/images/servicios/volanteo/mano a mano/345638749_9532667550106807_3393180472345962782_n.jpg',
        gallery: VOLANTEO_MANO_GALLERY,
      },
    ],
  },
  {
    id: 'impresos',
    name: 'Impresos',
    services: [
      {
        slug: 'volantes-publicitarios',
        title: 'Volantes Publicitarios',
        description:
          'Impresión en papel couché de primera calidad a todo color, con acabados brillante o mate para campañas masivas de difusión y promociones.',
        coverImage:
          '/images/servicios/impresos/volantes/329131488_1363140147772815_3246469811862417756_n.jpg',
        gallery: VOLANTES_IMPRESOS_GALLERY,
      },
      {
        slug: 'lonas-gran-formato',
        title: 'Lonas Gran Formato',
        description:
          'Impresión digital de lonas frontlit resistentes a la intemperie, con refuerzo perimetral y ojillos para fachadas, espectaculares y eventos.',
        coverImage:
          '/images/servicios/impresos/lonas/aa0d868d-64a3-406d-93f7-f6ba6b77236e.jpg',
        gallery: LONAS_GALLERY,
      },
      {
        slug: 'vinil-publicitario',
        title: 'Vinil Publicitario',
        description:
          'Vinil adhesivo de alta resistencia, microperforado para cristales y rotulación de flotillas vehiculares para transformar cualquier superficie en medio publicitario.',
        coverImage:
          '/images/servicios/impresos/lonas/aa0d868d-64a3-406d-93f7-f6ba6b77236e.jpg',
        gallery: VINIL_GALLERY,
      },
    ],
  },
];

/**
 * Busca un servicio específico por su slug dentro de todas las categorías
 */
export const findServiceBySlug = (
  slug: string
): { service: ServiceItem; categoryIndex: number } | null => {
  const normalized = slug.toLowerCase().trim();
  for (let catIdx = 0; catIdx < CATEGORIES.length; catIdx++) {
    const service = CATEGORIES[catIdx].services.find(
      (s) => s.slug === normalized
    );
    if (service) {
      return { service, categoryIndex: catIdx };
    }
  }
  return null;
};
