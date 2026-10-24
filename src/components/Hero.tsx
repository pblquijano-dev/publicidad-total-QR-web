import React, { useState, useEffect } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  const heroImages = [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        setPrevImageIndex(prev);
        return (prev + 1) % heroImages.length;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="hero" className="relative flex flex-col w-full">
      {/* Upper Dark Hero Section */}
      <div className="relative min-h-[100vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Carousel with Smooth Cross-Fade */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[brand-primary]">
          {heroImages.map((src, index) => {
            const isActive = index === currentImageIndex;
            const isExiting = index === prevImageIndex;
            const isCurrentOrPrev = isActive || isExiting;

            return (
              <img
                key={src}
                src={src}
                alt={`Activación BTL y publicidad en vía pública ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                style={{
                  opacity: isCurrentOrPrev ? 1 : 0,
                  zIndex: isActive ? 2 : isExiting ? 1 : 0,
                  transform:
                    isMounted && isCurrentOrPrev ? 'scale(1.045)' : 'scale(1)',
                  transition:
                    'opacity 1400ms cubic-bezier(0.4, 0, 0.2, 1), transform 9000ms cubic-bezier(0.2, 1, 0.3, 1)',
                }}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.50] contrast-[1.05] saturate-[0.85]  pointer-events-none will-change-transform"
              />
            );
          })}

          {/* Cinematic Vignette & Balanced Radial Shadows for Readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.6)_50%,_rgba(0,0,0,0.92)_100%)] z-10 pointer-events-none h-full w-full" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl flex flex-col px-4 sm:px-6 lg:px-8">
          {/* Main Display H1 with enhanced text shadow */}
          <ScrollReveal animation="fade-up" delay={200} duration={750}>
            <h1 className="font-bold font-sora text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
              Llevamos tu{' '}
              <span className="text-brand-lime font-normal italic">marca</span>
              <br />a las manos y oídos <br />
              de{' '}
              <span className="bg-gradient-to-r font-extrabold from-brand-cyan via-brand-cyan-light to-brand-cyan bg-clip-text text-transparent [text-shadow:none] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                todos
              </span>
            </h1>
          </ScrollReveal>

          {/* CTA Action Buttons */}
          <ScrollReveal
            animation="fade-up"
            delay={500}
            duration={750}
            width="fit"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-sora font-semibold text-base backdrop-blur-md border border-white/30 transition-all duration-200 hover:border-white/50 shadow-lg"
              >
                Ver Servicios
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-crimson hover:bg-brand-crimson-hover text-white font-sora font-semibold text-base transition-all duration-200 shadow-xl shadow-brand-crimson/40 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Cotizar ahora</span>
                <Send className="w-5 h-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
