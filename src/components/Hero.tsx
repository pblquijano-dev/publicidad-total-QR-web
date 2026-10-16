import React, { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroImages = [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const kpiList = [
    {
      metric: '+10,000',
      title: 'Volantes Diarios',
      description: 'Volantes diarios distribuidos con control',
      metricColor: 'text-brand-primary dark:text-brand-primary-light',
    },
    {
      metric: '3 Estados',
      title: 'Cobertura Peninsular',
      description: 'Yucatán, Quintana Roo y Campeche',
      metricColor: 'text-brand-primary dark:text-brand-primary-light',
    },
    {
      metric: '100%',
      title: 'Equipo Propio',
      description: 'Flotilla y equipo de sonido propio para perifoneo',
      metricColor: 'text-brand-primary dark:text-brand-primary-light',
    },
    {
      metric: 'Evidencia',
      title: 'Supervisión en Campo',
      description: 'Reporte fotográfico diario entregado al cliente',
      metricColor: 'text-brand-crimson dark:text-brand-crimson-light',
    },
  ];

  return (
    <section id="hero" className="relative flex flex-col w-full">
      {/* Upper Dark Hero Section */}
      <div className="relative min-h-[100vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Image Carousel with Smooth Cross-Fade */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark">
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Activación BTL y publicidad en vía pública ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? 'opacity-100 scale-105 filter brightness-[0.4] contrast-[1.05] saturate-[0.85]'
                  : 'opacity-0 scale-100 filter brightness-[0.50] pointer-events-none'
              }`}
            />
          ))}

          {/* Cinematic Vignette & Balanced Radial Shadows for Readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,20,19,0.85)_0%,_rgba(26,20,19,0.55)_50%,_rgba(26,20,19,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-transparent to-brand-dark" />
          <div className="absolute -top-24 opacity-25 right-0 w-[500px] h-[500px] bg-brand-primary/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 opacity-25 left-0 w-[450px] h-[450px] bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-sora font-semibold text-white uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
            <span>Activaciones BTL, Edecanes y Publicidad en el Sureste</span>
          </div>

          {/* Main Display H1 with enhanced text shadow */}
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight max-w-4xl [text-shadow:_0_2px_12px_rgba(0,0,0,0.9),_0_6px_30px_rgba(0,0,0,0.8)]">
            Llevamos tu marca a las manos y oídos de todos
          </h1>

          {/* Subtitle with enhanced text shadow */}
          <p className="font-manrope text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed font-medium max-w-2xl [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
            Impulsamos tu negocio en punto de venta y en la calle con personal
            capacitado, equipo propio y supervisión presencial en toda la
            Península de Yucatán.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-crimson hover:bg-brand-crimson-hover text-white font-sora font-semibold text-base transition-all duration-200 shadow-xl shadow-brand-crimson/40 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Cotizar mi Evento</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black/50 hover:bg-black/70 text-white font-sora font-semibold text-base backdrop-blur-md border border-white/30 transition-all duration-200 hover:border-white/50 shadow-lg"
            >
              Ver Servicios y Cobertura
            </a>
          </div>

          {/* Trust Checkmarks with pill backdrop */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-manrope font-medium text-gray-200 shadow-md">
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-lime shrink-0 stroke-[2.5]" />
              <span>Respuesta inmediata por WhatsApp</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-lime shrink-0 stroke-[2.5]" />
              <span>Cobertura en Yucatán, Q. Roo y Campeche</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-lime shrink-0 stroke-[2.5]" />
              <span>Reportes diarios en campo</span>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`Ver diapositiva ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none ${
                  idx === currentImageIndex
                    ? 'w-8 bg-brand-cyan'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* KPI / Metric Cards Section */}
      <div className="bg-surface dark:bg-brand-dark py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiList.map((kpi, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-brand-dark-card border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`font-sora font-extrabold text-3xl sm:text-4xl tracking-tight leading-none mb-3 ${kpi.metricColor}`}
                  >
                    {kpi.metric}
                  </div>
                  <h3 className="font-sora font-bold text-base text-on-surface dark:text-white mb-1">
                    {kpi.title}
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {kpi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Presence Strip */}
          <div className="text-center py-4 px-6 rounded-2xl bg-white/60 dark:bg-brand-dark-card/60 border border-gray-200/60 dark:border-white/5 backdrop-blur-sm">
            <p className="font-manrope text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wide">
              Presencia y activaciones en las principales plazas comerciales,
              avenidas y supermercados del Sureste
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
