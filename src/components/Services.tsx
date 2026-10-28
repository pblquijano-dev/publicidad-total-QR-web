import React, { useState, useEffect, useCallback } from 'react';
import {
  Eye,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  Link2,
  Check,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  CATEGORIES,
  Category,
  ServiceItem,
  findServiceBySlug,
} from '../data/servicesData';
import { getAssetUrl } from '../utils/assets';

export { CATEGORIES, findServiceBySlug, type ServiceItem, type Category };

/**
 * Obtiene el slug de servicio presente en el URL actual (?servicio=slug o #slug)
 */
const getSlugFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;

  // 1. Parámetro de búsqueda: ?servicio=slug o ?service=slug
  const searchParams = new URLSearchParams(window.location.search);
  const paramSlug = searchParams.get('servicio') || searchParams.get('service');
  if (paramSlug) return paramSlug.toLowerCase().trim();

  // 2. Hash con query: ej: #servicios?servicio=slug o #?servicio=slug
  const hash = window.location.hash;
  if (hash.includes('?')) {
    const hashQuery = hash.substring(hash.indexOf('?') + 1);
    const hashParams = new URLSearchParams(hashQuery);
    const hSlug = hashParams.get('servicio') || hashParams.get('service');
    if (hSlug) return hSlug.toLowerCase().trim();
  }

  // 3. Hash directo: ej: #edecanes-aa-aaa o #servicio=edecanes-aa-aaa
  if (hash) {
    const cleanHash = hash.replace(/^#/, '').toLowerCase().trim();
    if (cleanHash.startsWith('servicio=')) {
      return cleanHash.replace('servicio=', '');
    }
    if (cleanHash.startsWith('servicio/')) {
      return cleanHash.replace('servicio/', '');
    }
    if (findServiceBySlug(cleanHash)) {
      return cleanHash;
    }
  }

  return null;
};

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sincronizar modal con el slug presente en el URL (al cargar y al navegar)
  useEffect(() => {
    const syncModalWithUrl = () => {
      const slug = getSlugFromUrl();
      if (slug) {
        const result = findServiceBySlug(slug);
        if (result) {
          setActiveTab(result.categoryIndex);
          setSelectedService(result.service);
          setActivePhotoIndex(0);
          setIsFullscreen(false);
          return;
        }
      }

      // Si no hay slug en el URL y el modal estaba abierto por URL, se cierra
      setSelectedService((current) => {
        if (current) {
          setIsFullscreen(false);
          return null;
        }
        return current;
      });
    };

    syncModalWithUrl();

    window.addEventListener('popstate', syncModalWithUrl);
    window.addEventListener('hashchange', syncModalWithUrl);

    return () => {
      window.removeEventListener('popstate', syncModalWithUrl);
      window.removeEventListener('hashchange', syncModalWithUrl);
    };
  }, []);

  const openServiceModal = (service: ServiceItem) => {
    setSelectedService(service);
    setActivePhotoIndex(0);
    setIsFullscreen(false);

    // Actualizar el slug en el URL sin recargar la página
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('servicio', service.slug);
      window.history.pushState({ servicio: service.slug }, '', url.toString());
    }
  };

  const closeServiceModal = useCallback(() => {
    setSelectedService(null);
    setActivePhotoIndex(0);
    setIsFullscreen(false);
    setCopiedLink(false);

    // Limpiar el slug del URL al cerrar el modal
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      let urlChanged = false;

      if (url.searchParams.has('servicio') || url.searchParams.has('service')) {
        url.searchParams.delete('servicio');
        url.searchParams.delete('service');
        urlChanged = true;
      }

      if (window.location.hash) {
        const cleanHash = window.location.hash.replace(/^#/, '');
        if (
          findServiceBySlug(cleanHash) ||
          cleanHash.startsWith('servicio=') ||
          cleanHash.startsWith('servicio/')
        ) {
          url.hash = 'servicios';
          urlChanged = true;
        }
      }

      if (urlChanged) {
        window.history.pushState({}, '', url.toString());
      }
    }
  }, []);

  const handleCopyDirectLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedService || typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    url.searchParams.set('servicio', selectedService.slug);

    navigator.clipboard
      .writeText(url.toString())
      .then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      })
      .catch((err) => {
        console.error('Error al copiar el enlace:', err);
      });
  };

  // Manejo de teclado (ESC y flechas del carrusel) y bloqueo de scroll
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedService) return;

      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          closeServiceModal();
        }
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === 0 ? selectedService.gallery.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev === selectedService.gallery.length - 1 ? 0 : prev + 1
        );
      }
    },
    [selectedService, isFullscreen, closeServiceModal]
  );

  useEffect(() => {
    if (!selectedService) return;

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedService, handleKeyDown]);

  const handlePrevPhoto = () => {
    if (!selectedService) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedService.gallery.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    if (!selectedService) return;
    setActivePhotoIndex((prev) =>
      prev === selectedService.gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="servicios"
      className="bg-surface-low py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center">
            <span className="bg-brand-primary-fixed text-brand-primary font-sora text-xs font-semibold px-3.5 py-1.5 rounded-full inline-block mb-3">
              • CATÁLOGO DE SERVICIOS BTL
            </span>
            <h2 className="font-sora font-bold text-3xl sm:text-4xl text-brand-primary text-center mb-3">
              Soluciones de Publicidad y Activación de Marca
            </h2>
            <p className="font-manrope text-on-surface-variant text-center max-w-2xl mx-auto mb-10">
              Selecciona una categoría para explorar nuestros servicios y
              operativos de campo en la Península.
            </p>
          </div>
        </ScrollReveal>

        {/* Selector de Pestañas (Tabs) con scroll horizontal en móvil */}
        <ScrollReveal animation="fade-up" delay={100} duration={650}>
          <div className="flex overflow-x-auto gap-2.5 pb-2 justify-start md:justify-center mb-12">
            {CATEGORIES.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={
                    isActive
                      ? 'bg-brand-primary text-surface font-sora font-semibold text-xs sm:text-sm rounded-xl px-5 py-2.5 shadow-sm whitespace-nowrap'
                      : 'bg-surface text-on-surface-variant hover:text-brand-primary border border-surface-dim font-manrope font-medium text-xs sm:text-sm rounded-xl px-5 py-2.5 whitespace-nowrap transition-colors'
                  }
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tarjetas de servicio por categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES[activeTab].services.map((service) => (
            <div
              key={service.slug}
              id={`service-card-${service.slug}`}
              className="group bg-surface border border-surface-container rounded-2xl shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Imagen de portada de la card */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-surface-dim">
                  <img
                    src={getAssetUrl(service.coverImage)}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#092652] text-[11px] font-semibold font-sora px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Images className="w-3 h-3 text-[#092652]" />
                    {service.gallery.length}{' '}
                    {service.gallery.length === 1 ? 'foto' : 'fotos'}
                  </span>
                </div>

                {/* Título del servicio (Descripción oculta) */}
                <div className="p-5">
                  <h3 className="font-sora font-bold text-lg text-brand-primary line-clamp-2">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Botones de acción: Ver más y Cotizar por WhatsApp */}
              <div className="p-5 pt-0 mt-auto flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => openServiceModal(service)}
                  className="flex-1 bg-surface-container hover:bg-brand-primary hover:text-surface text-brand-primary border border-surface-dim font-sora font-semibold text-xs py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver más
                </button>
                <a
                  href={`https://wa.me/9981071359?text=${encodeURIComponent(
                    `Hola, me interesa cotizar el servicio de *${service.title}* en la Península.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-surface font-sora font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Cotizar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal interactivo de servicio con galería y descripción */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedService.title}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
          onClick={closeServiceModal}
        >
          <div
            className="bg-surface rounded-3xl max-w-3xl w-full mx-auto overflow-hidden shadow-2xl border border-surface-container flex flex-col max-h-[92vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del modal */}
            <div className="px-6 py-4 border-b border-surface-container flex items-center justify-between gap-4 bg-surface sticky top-0 z-20">
              <div>
                <span className="text-[11px] font-bold text-brand-cyan uppercase tracking-wider font-sora">
                  Detalle del Servicio
                </span>
                <h3 className="font-sora font-bold text-lg sm:text-2xl text-brand-primary">
                  {selectedService.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {/* Botón para compartir/copiar enlace directo con el slug */}
                <button
                  type="button"
                  onClick={handleCopyDirectLink}
                  title="Copiar enlace directo a este servicio"
                  aria-label="Copiar enlace directo"
                  className="h-10 px-3 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-1.5 text-xs font-sora font-semibold"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-brand-lime" />
                      <span className="hidden sm:inline text-brand-lime">
                        ¡Copiado!
                      </span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Compartir</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeServiceModal}
                  aria-label="Cerrar modal"
                  className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface-variant hover:text-brand-primary transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido desplazable del modal */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Visor de Galería Fotográfica (Muestra foto completa) */}
              <div className="space-y-3">
                <div className="relative w-full h-[300px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group/viewer">
                  {/* Fondo difuminado para rellenar los bordes con la misma imagen */}
                  <img
                    src={getAssetUrl(
                      selectedService.gallery[activePhotoIndex]?.url || ''
                    )}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                  />

                  {/* Foto completa (object-contain) sin ningún recorte */}
                  <img
                    src={getAssetUrl(
                      selectedService.gallery[activePhotoIndex]?.url || ''
                    )}
                    alt={`${selectedService.title} - Foto ${activePhotoIndex + 1}`}
                    onClick={() => setIsFullscreen(true)}
                    className="relative z-10 max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-300 group-hover/viewer:scale-[1.01] select-none"
                    title="Haz clic para abrir a imagen completa"
                  />

                  {/* Botón para abrir la foto a imagen completa */}
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    aria-label="Abrir a imagen completa"
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-sora font-semibold flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </button>

                  {/* Contador de fotos */}
                  <span className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-sora font-semibold px-3 py-1.5 rounded-lg">
                    {activePhotoIndex + 1} / {selectedService.gallery.length}
                  </span>

                  {/* Flechas de navegación si hay más de 1 foto */}
                  {selectedService.gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevPhoto}
                        aria-label="Foto anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPhoto}
                        aria-label="Foto siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Tira de miniaturas (thumbnails) */}
                {selectedService.gallery.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1">
                    {selectedService.gallery.map((photo, idx) => (
                      <button
                        key={photo.url}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          activePhotoIndex === idx
                            ? 'border-brand-primary ring-2 ring-brand-primary/30 scale-105'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={getAssetUrl(photo.url)}
                          alt={`Miniatura ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Descripción completa que se ocultó en la card */}
              <div className="bg-surface-low rounded-2xl p-4 sm:p-5 border border-surface-container">
                <h4 className="font-sora font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-2">
                  Descripción del Servicio
                </h4>
                <p className="font-manrope text-on-surface text-sm sm:text-base leading-relaxed">
                  {selectedService.description}
                </p>
              </div>
            </div>

            {/* Pie del modal con llamada a la acción */}
            <div className="p-4 sm:p-6 border-t border-surface-container bg-surface flex flex-col sm:flex-row gap-3 items-center justify-between">
              <span className="text-xs text-on-surface-variant font-manrope text-center sm:text-left">
                ¿Requieres este servicio para tu activación o campaña?
              </span>
              <a
                href={`https://wa.me/9981071359?text=${encodeURIComponent(
                  `Hola, me interesa cotizar el servicio de *${selectedService.title}* en la Península.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-surface font-sora font-semibold text-sm py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Visor a Imagen Completa (Pantalla Completa / Lightbox) */}
      {selectedService && isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista de imagen completa"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Barra superior de imagen completa */}
          <div
            className="w-full flex items-center justify-between z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h4 className="font-sora font-semibold text-sm sm:text-lg text-white">
                {selectedService.title}
              </h4>
              <span className="text-xs text-white/70 font-manrope">
                Foto {activePhotoIndex + 1} de {selectedService.gallery.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Cerrar imagen completa"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Área central con la imagen a tamaño máximo */}
          <div
            className="relative flex-1 w-full flex items-center justify-center min-h-0 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAssetUrl(
                selectedService.gallery[activePhotoIndex]?.url || ''
              )}
              alt={`${selectedService.title} - Foto ${activePhotoIndex + 1}`}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            {/* Flechas de navegación en pantalla completa */}
            {selectedService.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Foto anterior"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Foto siguiente"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Tira inferior de miniaturas en pantalla completa */}
          {selectedService.gallery.length > 1 && (
            <div
              className="w-full flex justify-center overflow-x-auto gap-2 pt-2 pb-1 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedService.gallery.map((photo, idx) => (
                <button
                  key={photo.url}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIndex === idx
                      ? 'border-white ring-2 ring-white/40 scale-105 opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-90'
                  }`}
                >
                  <img
                    src={getAssetUrl(photo.url)}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
