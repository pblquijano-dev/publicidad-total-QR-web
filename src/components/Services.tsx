import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Users,
  Mic,
  TrendingUp,
  Megaphone,
  Radio,
  FileText,
  Music,
  Disc3,
  MessageCircle,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  PartyPopper,
  Flag,
  Footprints,
} from 'lucide-react';
import {
  GalleryPhoto,
  ACTIVACIONES_GALLERY,
  EDECANES_GALLERY,
  ANIMADORES_GALLERY,
  PROMOTORIA_GALLERY,
  PERIFONEO_GALLERY,
  VOLANTEO_GALLERY,
  BATUCADA_GALLERY,
  SPOTS_GALLERY,
  BOTARGUERO_GALLERY,
  PANCARTERO_GALLERY,
  ZANQUERO_GALLERY,
} from '../data/servicesPhotos';
import { ScrollReveal } from './ScrollReveal';

export type { GalleryPhoto };

interface PrimaryService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  kpi: string;
  badge: string;
  highlights: string[];
  whatsappMsg: string;
  gallery: GalleryPhoto[];
}

interface SecondaryService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  whatsappMsg: string;
  gallery: GalleryPhoto[];
}

interface LightboxState {
  isOpen: boolean;
  serviceTitle: string;
  serviceTag?: string;
  whatsappMsg: string;
  photos: GalleryPhoto[];
  currentIndex: number;
}

// Configuración estática de servicios principales
const PRIMARY_SERVICES: PrimaryService[] = [
  {
    id: 'activaciones',
    title: 'Activaciones de Marca',
    description:
      'Montaje de carpa publicitaria, equipo de audio profesional, dinámicas comerciales en punto de venta, perifoneo en vivo y entrega de material promocional para atraer clientes a tu tienda.',
    icon: Sparkles,
    kpi: 'Alto Engagement',
    badge: 'Servicio Estrella',
    highlights: [
      'Montaje de carpa publicitaria y equipo de audio profesional',
      'Dinámicas comerciales y perifoneo en punto de venta',
      'Supervisión presencial y entrega de material promocional',
    ],
    whatsappMsg:
      'Hola, me interesa cotizar el servicio de *Activaciones de Marca* para mi empresa en la Península.',
    gallery: ACTIVACIONES_GALLERY,
  },
  {
    id: 'edecanes',
    title: 'Edecanes y Hostess',
    description:
      'Personal de imagen con excelente presentación y vestuario coordinado para inauguraciones, eventos corporativos, congresos y expos. Briefing previo sobre tu producto y puntualidad rigurosa.',
    icon: Users,
    kpi: 'Imagen y Protocolo',
    badge: 'Personal Capacitado',
    highlights: [
      'Excelente presentación y vestuario coordinado para eventos',
      'Briefing previo sobre tu marca, producto y dinámicas',
      'Puntualidad rigurosa y trato cordial en todo momento',
    ],
    whatsappMsg:
      'Hola, me gustaría cotizar *Edecanes y Hostess* para un evento en la Península.',
    gallery: EDECANES_GALLERY,
  },
  {
    id: 'animadores',
    title: 'Animadores y Locución en Vivo',
    description:
      'Locutores y animadores con micrófono y equipo de audio de alta potencia para conducir dinámicas, interactuar con el público e invitar a los transeúntes a conocer tus promociones.',
    icon: Mic,
    kpi: 'Atracción Inmediata',
    badge: 'Conversión en Vivo',
    highlights: [
      'Locución comercial persuasiva y perifoneo en vivo',
      'Conducción de dinámicas de regalos y concursos',
      'Equipo de audio de alta potencia para eventos comerciales',
    ],
    whatsappMsg:
      'Hola, solicito informes y cotización de *Animadores y Locución en Vivo* para mi negocio.',
    gallery: ANIMADORES_GALLERY,
  },
  {
    id: 'promotoria',
    title: 'Promotoría e Impulsadoras',
    description:
      'Personal capacitado en piso de venta para demostración de producto, degustación, entrega de muestras y desplazamiento de producto en tienda de autoservicio.',
    icon: TrendingUp,
    kpi: 'Impulso de Venta',
    badge: 'Piso de Venta',
    highlights: [
      'Demostración de producto y degustación en piso de venta',
      'Entrega de muestras y desplazamiento en tiendas de autoservicio',
      'Supervisión presencial y reporte de actividades diario',
    ],
    whatsappMsg:
      'Hola, deseo cotizar una cuadrilla de *Promotoría e Impulsadoras* para punto de venta.',
    gallery: PROMOTORIA_GALLERY,
  },
];

// Configuración estática de servicios secundarios
const SECONDARY_SERVICES: SecondaryService[] = [
  {
    id: 'perifoneo',
    title: 'Perifoneo Móvil',
    description:
      'Vehículos adaptados con bocinas de alto alcance (mínimo 5 horas diarias por unidad) recorriendo supermanzanas y avenidas.',
    icon: Radio,
    tag: 'Sonido en Calle',
    whatsappMsg:
      'Hola, me interesa una cotización de rutas de *Perifoneo Móvil* en la Península.',
    gallery: PERIFONEO_GALLERY,
  },
  {
    id: 'volanteo',
    title: 'Volanteo Estratégico',
    description:
      'Distribución mano a mano y en buzones por supermanzanas y colonias clave con supervisión y reporte de entrega.',
    icon: FileText,
    tag: 'Mano a Mano',
    whatsappMsg: 'Hola, quiero cotizar una campaña de *Volanteo Estratégico*.',
    gallery: VOLANTEO_GALLERY,
  },
  {
    id: 'batucada',
    title: 'Batucada',
    description:
      'Animación rítmica y música en vivo con percusionistas para aperturas, desfiles y aniversarios que capturan al público.',
    icon: Music,
    tag: 'Música en Vivo',
    whatsappMsg:
      'Hola, me interesa contratar *Batucada* para una inauguración.',
    gallery: BATUCADA_GALLERY,
  },
  {
    id: 'spots',
    title: 'Grabación de Spots',
    description:
      'Producción de audio publicitario con locución profesional, guion persuasivo y masterización para perifoneo y radio.',
    icon: Disc3,
    tag: 'Locución y Audio',
    whatsappMsg: 'Hola, quiero solicitar la *Grabación de Spots* profesional.',
    gallery: SPOTS_GALLERY,
  },
  {
    id: 'botarguero',
    title: 'Botarguero',
    description:
      'Animación con botargas de marca y botargueros enérgicos que interactúan con niños y familias, atrayendo miradas y generando fotos virales.',
    icon: PartyPopper,
    tag: 'Atracción Visual',
    whatsappMsg:
      'Hola, me interesa cotizar el servicio de *Botarguero* para mi negocio en la Península.',
    gallery: BOTARGUERO_GALLERY,
  },
  {
    id: 'pancartero',
    title: 'Pancartero',
    description:
      'Personal dinámico en camellones y esquinas de alto aforo con pancartas y flechas llamativas para desviar el tráfico de clientes a tu tienda.',
    icon: Flag,
    tag: 'Impacto en Cruceros',
    whatsappMsg:
      'Hola, me gustaría cotizar *Pancarteros y Flecheros* para una campaña de atracción en cruceros.',
    gallery: PANCARTERO_GALLERY,
  },
  {
    id: 'zanquero',
    title: 'Zanquero',
    description:
      'Artistas en zancos con vestuarios vistosos y temáticos que dominan la vista panorámica de la calle en inauguraciones, ferias y desfiles.',
    icon: Footprints,
    tag: 'Presencia de Altura',
    whatsappMsg:
      'Hola, deseo solicitar cotización para *Zanqueros y Performance* en la Península.',
    gallery: ZANQUERO_GALLERY,
  },
];

export const Services: React.FC = () => {
  const primaryServices = PRIMARY_SERVICES;
  const secondaryServices = SECONDARY_SERVICES;

  // In-component active photo index for each service
  const [activePhotoIndices, setActivePhotoIndices] = useState<
    Record<string, number>
  >({});

  const getActiveIndex = (serviceId: string) =>
    activePhotoIndices[serviceId] || 0;

  const handlePrevPhoto = (
    e: React.MouseEvent,
    serviceId: string,
    totalPhotos: number
  ) => {
    e.stopPropagation();
    setActivePhotoIndices((prev) => ({
      ...prev,
      [serviceId]: (getActiveIndex(serviceId) - 1 + totalPhotos) % totalPhotos,
    }));
  };

  const handleNextPhoto = (
    e: React.MouseEvent,
    serviceId: string,
    totalPhotos: number
  ) => {
    e.stopPropagation();
    setActivePhotoIndices((prev) => ({
      ...prev,
      [serviceId]: (getActiveIndex(serviceId) + 1) % totalPhotos,
    }));
  };

  const handleSelectPhoto = (
    e: React.MouseEvent,
    serviceId: string,
    index: number
  ) => {
    e.stopPropagation();
    setActivePhotoIndices((prev) => ({
      ...prev,
      [serviceId]: index,
    }));
  };

  // Fullscreen Lightbox Modal state
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    serviceTitle: '',
    serviceTag: '',
    whatsappMsg: '',
    photos: [],
    currentIndex: 0,
  });

  const openLightbox = (
    serviceTitle: string,
    whatsappMsg: string,
    photos: GalleryPhoto[],
    startIndex: number,
    serviceTag?: string
  ) => {
    setLightbox({
      isOpen: true,
      serviceTitle,
      serviceTag,
      whatsappMsg,
      photos,
      currentIndex: startIndex,
    });
  };

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextLightboxPhoto = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.photos.length,
    }));
  }, []);

  const prevLightboxPhoto = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length,
    }));
  }, []);

  // Keyboard navigation & body scroll locking for lightbox
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightbox.isOpen, closeLightbox, nextLightboxPhoto, prevLightboxPhoto]);

  return (
    <section
      id="servicios"
      className="py-20 sm:py-24 bg-surface-low dark:bg-brand-dark-alt transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-fixed/60 dark:bg-brand-primary/30 border border-brand-primary/20 dark:border-brand-primary/50 text-[11px] font-sora font-bold text-brand-primary-dark dark:text-brand-primary-soft uppercase tracking-widest mb-4">
              <Megaphone className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Portafolio Especializado BTL</span>
            </div>

            <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary-dark dark:text-white tracking-tight leading-[1.15]">
              Soluciones Integrales para{' '}
              <span className="text-brand-crimson">Dominar la Calle</span>
            </h2>

            <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-2xl mx-auto">
              Combinamos presencia humana, sonido profesional y logística de
              precisión para que tu marca no pase desapercibida. Explora
              nuestras galerías fotográficas en cada servicio.
            </p>
          </div>
        </ScrollReveal>

        {/* Priority 4 Star Services (Interactive Gallery Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-stretch">
          {primaryServices.map((service, serviceIdx) => {
            const IconComponent = service.icon;
            const waUrl = `https://wa.me/529981071359?text=${encodeURIComponent(
              service.whatsappMsg
            )}`;
            const currentIdx = getActiveIndex(service.id);
            const currentPhoto =
              service.gallery[currentIdx] || service.gallery[0];
            const totalPhotos = service.gallery.length;

            return (
              <ScrollReveal
                key={service.id}
                animation="fade-up"
                delay={serviceIdx * 140}
                duration={650}
              >
                <div className="group rounded-3xl bg-white dark:bg-brand-dark border border-gray-200/90 dark:border-white/10 overflow-hidden hover:border-brand-cyan/60 dark:hover:border-brand-cyan/50 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between relative h-full">
                  <div>
                    {/* Interactive Gallery Container (Aspect 16:9) */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/80 select-none">
                      {/* Active Image */}
                      <img
                        src={currentPhoto.url}
                        alt={currentPhoto.caption || service.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out cursor-pointer hover:scale-[1.02]"
                        onClick={() =>
                          openLightbox(
                            service.title,
                            service.whatsappMsg,
                            service.gallery,
                            currentIdx,
                            service.badge
                          )
                        }
                        title="Haz clic para ver en pantalla completa"
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                      {/* Top Left Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-brand-primary/90 backdrop-blur-md text-white font-sora font-semibold text-xs border border-white/20 shadow-sm">
                          {service.badge}
                        </span>
                      </div>

                      {/* Top Right Action & KPI Indicators */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2">
                        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-brand-lime text-brand-dark font-sora font-extrabold text-xs shadow-sm">
                          {service.kpi}
                        </span>

                        {/* Fullscreen Expand Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(
                              service.title,
                              service.whatsappMsg,
                              service.gallery,
                              currentIdx,
                              service.badge
                            );
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-brand-cyan text-white text-xs font-sora font-medium backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 shadow-md"
                          title="Ver galería en pantalla completa"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">
                            Pantalla completa
                          </span>
                        </button>
                      </div>

                      {/* Navigation Arrows for in-component interaction */}
                      {totalPhotos > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) =>
                              handlePrevPhoto(e, service.id, totalPhotos)
                            }
                            aria-label="Foto anterior"
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg active:scale-95"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) =>
                              handleNextPhoto(e, service.id, totalPhotos)
                            }
                            aria-label="Foto siguiente"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg active:scale-95"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Bottom Title & Icon Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-3 pointer-events-none">
                        <div className="flex items-center gap-3">
                          <div className="p-2 sm:p-2.5 rounded-xl bg-brand-cyan text-white shadow-lg shrink-0">
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h3 className="font-sora font-bold text-lg sm:text-2xl text-white drop-shadow-sm leading-snug">
                            {service.title}
                          </h3>
                        </div>

                        {/* Photo Counter Pill */}
                        <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-sora font-semibold flex items-center gap-1 border border-white/10 shrink-0">
                          <Camera className="w-3 h-3 text-brand-lime" />
                          <span>
                            {currentIdx + 1}/{totalPhotos}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Photo Navigation Strip */}
                    {totalPhotos > 1 && (
                      <div className="px-5 py-2 bg-gray-50/90 dark:bg-white/[0.04] border-b border-gray-200/80 dark:border-white/5 flex items-center justify-between gap-3">
                        <span className="font-manrope text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Foto {currentIdx + 1} de {totalPhotos}
                        </span>

                        {/* Dots indicator */}
                        <div className="flex items-center gap-1.5 shrink-0 max-w-[50%] overflow-x-auto scrollbar-none py-0.5">
                          {service.gallery.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={(e) =>
                                handleSelectPhoto(e, service.id, dotIdx)
                              }
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                dotIdx === currentIdx
                                  ? 'bg-brand-cyan w-5'
                                  : 'bg-gray-300 dark:bg-white/30 hover:bg-gray-400'
                              }`}
                              aria-label={`Ver foto ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-6 sm:p-7">
                      <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {service.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-brand-lime/20 text-brand-lime-dark dark:text-brand-lime flex items-center justify-center shrink-0 mt-0.5 border border-brand-lime/40">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="font-manrope text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group/btn"
                    >
                      <MessageCircle className="w-4 h-4 fill-current transition-transform group-hover/btn:scale-110" />
                      <span>Cotizar este servicio por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Secondary Services (Support Capsules with Interactive Gallery) */}
        <div className="mb-20">
          <ScrollReveal animation="fade-up" duration={650}>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-[11px] font-sora font-bold uppercase tracking-widest text-brand-primary dark:text-brand-cyan block mb-1">
                Servicios complementarios
              </span>
              <h3 className="font-sora text-2xl sm:text-3xl font-bold text-brand-primary-dark dark:text-white">
                Cápsulas de Soporte Publicitario
              </h3>
              <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                Herramientas tácticas y de animación periférica para reforzar el
                impacto y la recordación de tus campañas en calle. Explora las
                fotos de cada servicio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {secondaryServices.map((capsule, capsuleIdx) => {
              const waUrl = `https://wa.me/529981071359?text=${encodeURIComponent(
                capsule.whatsappMsg
              )}`;
              const currentIdx = getActiveIndex(capsule.id);
              const currentPhoto =
                capsule.gallery[currentIdx] || capsule.gallery[0];
              const totalPhotos = capsule.gallery.length;

              return (
                <ScrollReveal
                  key={capsule.id}
                  animation="fade-up"
                  delay={(capsuleIdx % 4) * 80}
                  duration={600}
                >
                  <div className="rounded-2xl bg-white dark:bg-brand-dark border border-gray-200/90 dark:border-white/10 hover:border-brand-cyan/60 dark:hover:border-brand-cyan/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg group overflow-hidden h-full">
                    <div>
                      {/* Compact Image Gallery Header */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/70 select-none">
                        <img
                          src={currentPhoto.url}
                          alt={currentPhoto.caption || capsule.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out cursor-pointer hover:scale-105"
                          onClick={() =>
                            openLightbox(
                              capsule.title,
                              capsule.whatsappMsg,
                              capsule.gallery,
                              currentIdx,
                              capsule.tag
                            )
                          }
                          title="Haz clic para ver galería en pantalla completa"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Tag pill top left */}
                        <div className="absolute top-2.5 left-2.5 pointer-events-none">
                          <span className="text-[10px] font-sora font-bold text-brand-lime-dark dark:text-brand-lime bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-brand-lime/30 uppercase tracking-wider">
                            {capsule.tag}
                          </span>
                        </div>

                        {/* Expand & Counter top right */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-sora font-semibold text-white/90 border border-white/15">
                            {currentIdx + 1}/{totalPhotos}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(
                                capsule.title,
                                capsule.whatsappMsg,
                                capsule.gallery,
                                currentIdx,
                                capsule.tag
                              );
                            }}
                            className="p-1 rounded-full bg-black/60 hover:bg-brand-cyan text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-md"
                            title="Ampliar foto a pantalla completa"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* In-component gallery navigation arrows */}
                        {totalPhotos > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) =>
                                handlePrevPhoto(e, capsule.id, totalPhotos)
                              }
                              aria-label="Foto anterior"
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 shadow-md"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) =>
                                handleNextPhoto(e, capsule.id, totalPhotos)
                              }
                              aria-label="Foto siguiente"
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 shadow-md"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Capsule Photo Dots Strip */}
                      {totalPhotos > 1 && (
                        <div className="px-3.5 py-1.5 bg-gray-50/90 dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/5 flex items-center justify-between gap-2">
                          <span className="font-manrope text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            Foto {currentIdx + 1} de {totalPhotos}
                          </span>

                          {/* Dots indicator */}
                          <div className="flex items-center gap-1 shrink-0 max-w-[50%] overflow-x-auto scrollbar-none py-0.5">
                            {capsule.gallery.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                type="button"
                                onClick={(e) =>
                                  handleSelectPhoto(e, capsule.id, dotIdx)
                                }
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  dotIdx === currentIdx
                                    ? 'bg-brand-cyan w-3.5'
                                    : 'bg-gray-300 dark:bg-white/30'
                                }`}
                                aria-label={`Ver foto ${dotIdx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4 sm:p-5">
                        <h4 className="font-sora font-bold text-base text-brand-primary-dark dark:text-white mb-2 leading-snug">
                          {capsule.title}
                        </h4>
                        <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {capsule.description}
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp Action Link */}
                    <div className="p-4 sm:p-5 pt-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-sora font-semibold text-brand-whatsapp hover:text-brand-whatsapp-hover dark:hover:text-white transition-colors pt-3 border-t border-gray-100 dark:border-white/5 w-full"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Cotizar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast CTA Banner */}
        <ScrollReveal animation="zoom-in" duration={750}>
          <div className="relative rounded-3xl bg-gradient-to-r from-brand-primary-dark via-brand-primary-deep to-brand-primary-deepest text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-brand-primary overflow-hidden">
            {/* Subtle lighting accents */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-crimson/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-lime border border-brand-lime/30 text-[11px] font-sora font-bold tracking-wider uppercase mb-3 backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
                  <span>Despliegue operativo garantizado</span>
                </div>
                <h3 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
                  ¿Requieres un paquete integral para tu evento o marca?
                </h3>
                <p className="font-manrope text-sm sm:text-base text-gray-300 leading-relaxed">
                  Armamos tu propuesta personalizada con edecanes, perifoneo,
                  botargueros, animadores y dinámicas interactivas adaptadas al
                  presupuesto y metas de tu empresa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="https://wa.me/529981071359?text=Hola,%20deseo%20cotizar%20un%20paquete%20completo%20de%20servicios%20BTL%20para%20mi%20marca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Express</span>
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 bg-brand-crimson hover:bg-brand-crimson-hover text-white font-sora font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Lightbox Modal (Pantalla Completa) */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería a pantalla completa: ${lightbox.serviceTitle}`}
        >
          {/* Modal Top Header Bar */}
          <div className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              {lightbox.serviceTag && (
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-brand-primary text-white font-sora font-bold text-xs uppercase tracking-wider border border-white/20">
                  {lightbox.serviceTag}
                </span>
              )}
              <div>
                <h3 className="font-sora font-bold text-base sm:text-xl text-white">
                  {lightbox.serviceTitle}
                </h3>
                <p className="font-manrope text-xs text-gray-400">
                  Foto {lightbox.currentIndex + 1} de {lightbox.photos.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Direct WhatsApp quote button */}
              <a
                href={`https://wa.me/529981071359?text=${encodeURIComponent(lightbox.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-xs shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Cotizar por WhatsApp</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-crimson text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
                aria-label="Cerrar galería a pantalla completa"
                title="Cerrar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Stage (Image & Floating Navigation) */}
          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-4 overflow-hidden">
            {/* Previous Photo Button */}
            {lightbox.photos.length > 1 && (
              <button
                type="button"
                onClick={prevLightboxPhoto}
                aria-label="Foto anterior"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-2xl active:scale-95"
                title="Foto anterior (←)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Displayed Image */}
            <div className="relative max-w-5xl max-h-[70vh] flex items-center justify-center">
              <img
                src={lightbox.photos[lightbox.currentIndex]?.url}
                alt={
                  lightbox.photos[lightbox.currentIndex]?.caption ||
                  lightbox.serviceTitle
                }
                decoding="async"
                className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 select-none animate-fadeIn"
              />
            </div>

            {/* Next Photo Button */}
            {lightbox.photos.length > 1 && (
              <button
                type="button"
                onClick={nextLightboxPhoto}
                aria-label="Foto siguiente"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-brand-cyan text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-2xl active:scale-95"
                title="Foto siguiente (→)"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}
          </div>

          {/* Modal Bottom Section: Thumbnail bar */}
          <div className="w-full px-4 sm:px-8 py-3 bg-black/60 backdrop-blur-lg border-t border-white/10 z-20 flex flex-col items-center gap-3">
            {/* Thumbnails Row */}
            {lightbox.photos.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto max-w-full py-1 px-2 scrollbar-none">
                {lightbox.photos.map((photo, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    type="button"
                    onClick={() =>
                      setLightbox((prev) => ({
                        ...prev,
                        currentIndex: thumbIdx,
                      }))
                    }
                    className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                      thumbIdx === lightbox.currentIndex
                        ? 'ring-2 ring-brand-cyan ring-offset-2 ring-offset-black scale-105'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                    aria-label={`Ir a foto ${thumbIdx + 1}`}
                  >
                    <img
                      src={photo.url}
                      alt={`${lightbox.serviceTitle} - Foto ${thumbIdx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
