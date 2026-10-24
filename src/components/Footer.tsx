import React, { useState, Suspense, lazy } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Megaphone,
  Facebook,
  Instagram,
} from 'lucide-react';
import type { LegalDocType } from './LegalModal';
import { ScrollReveal } from './ScrollReveal';

const LegalModal = lazy(() => import('./LegalModal'));

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocType | null>(null);

  const medallionLogoUrl = '/images/logo.webp';
  return (
    <footer className="bg-[#092652] text-white border-t border-[#092652]/40 relative overflow-hidden pt-16 pb-8 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
            {/* Brand Column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start">
              {/* Medallion Logo */}
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-2xl bg-white p-2 shadow-2xl border border-white/20 flex items-center justify-center shrink-0 overflow-hidden mb-4">
                {!logoError ? (
                  <img
                    src={medallionLogoUrl}
                    alt="Publicidad Total Q&R - Agencia de Publicidad BTL, Perifoneo y Activaciones"
                    loading="lazy"
                    decoding="async"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain filter brightness-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                    <Megaphone className="w-7 h-7 text-brand-cyan mb-0.5" />
                    <span className="font-sora font-extrabold text-[11px] leading-tight text-gray-900">
                      TOTAL Q&R
                    </span>
                    <span className="font-sora font-bold text-[8px] text-brand-lime tracking-widest">
                      PENÍNSULA
                    </span>
                  </div>
                )}
              </div>

              {/* Description Paragraph */}
              <p className="font-manrope text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-sm mb-4">
                Especialistas en publicidad BTL, perifoneo móvil y activaciones
                de alto impacto en el sureste de México con cobertura
                garantizada.
              </p>
            </div>

            {/* Column 2: Servicios Principales (3 cols) */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider">
                  SERVICIOS PRINCIPALES
                </h4>
                <div className="w-10 h-0.5 bg-brand-cyan mt-1.5 rounded-full" />
              </div>

              <ul className="space-y-2.5 text-xs font-manrope text-blue-100/80">
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-cyan/70 group-hover:text-brand-cyan transition-colors">
                      •
                    </span>
                    <span>Activaciones BTL en Punto de Venta</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-cyan/70 group-hover:text-brand-cyan transition-colors">
                      •
                    </span>
                    <span>Edecanes y Personal de Imagen</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-cyan/70 group-hover:text-brand-cyan transition-colors">
                      •
                    </span>
                    <span>Animadores y Conducción en Vivo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-cyan/70 group-hover:text-brand-cyan transition-colors">
                      •
                    </span>
                    <span>Promotoría y Demostradoras</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-cyan/70 group-hover:text-brand-cyan transition-colors">
                      •
                    </span>
                    <span>Eventos Corporativos y Expos</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Operaciones de Campo (2 cols) */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider">
                  OPERACIONES DE CAMPO
                </h4>
                <div className="w-10 h-0.5 bg-brand-lime mt-1.5 rounded-full" />
              </div>

              <ul className="space-y-2.5 text-xs font-manrope text-blue-100/80">
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-lime/70 group-hover:text-brand-lime transition-colors">
                      •
                    </span>
                    <span>Perifoneo Móvil con Flota Propia</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-lime/70 group-hover:text-brand-lime transition-colors">
                      •
                    </span>
                    <span>Volanteo Estratégico por Supermanzanas</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-lime/70 group-hover:text-brand-lime transition-colors">
                      •
                    </span>
                    <span>Batucadas y Eventos Especiales</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-lime/70 group-hover:text-brand-lime transition-colors">
                      •
                    </span>
                    <span>Producción de Spots de Audio</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#cobertura"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-lime/70 group-hover:text-brand-lime transition-colors">
                      •
                    </span>
                    <span>Reportes Fotográficos Diarios</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Canales Oficiales (3 cols) */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider">
                  CANALES OFICIALES
                </h4>
                <div className="w-10 h-0.5 bg-brand-crimson mt-1.5 rounded-full" />
              </div>

              <div className="space-y-3 text-xs font-manrope">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/529981071359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-brand-whatsapp/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-whatsapp/20 text-brand-whatsapp flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-[10px] font-sora font-bold text-blue-200/80 uppercase tracking-wider">
                      WHATSAPP VENTAS DIRECTAS
                    </div>
                    <div className="font-sora font-bold text-sm text-white group-hover:text-brand-whatsapp transition-colors">
                      998 107 1359
                    </div>
                  </div>
                </a>

                {/* Conmutador Mérida */}
                <a
                  href="tel:9999318581"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-brand-cyan/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 text-brand-cyan flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-sora font-bold text-blue-200/80 uppercase tracking-wider">
                      CONMUTADOR MÉRIDA (VOZ)
                    </div>
                    <div className="font-sora font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">
                      999 931 8581
                    </div>
                  </div>
                </a>

                {/* Correo */}
                <a
                  href="mailto:ventaspublicidad1@hotmail.com"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-brand-crimson/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-crimson/20 text-brand-crimson flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-sora font-bold text-blue-200/80 uppercase tracking-wider">
                      CORREO ÚNICO AUTORIZADO
                    </div>
                    <div className="font-sora font-bold text-xs text-white group-hover:text-brand-crimson transition-colors break-all tracking-tight">
                      ventaspublicidad1@hotmail.com
                    </div>
                  </div>
                </a>

                {/* Redes Sociales Oficiales */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/publicidadtotalqyr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Publicidad Total Q&R"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#1877F2]/50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Facebook className="w-4 h-4 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-sora font-bold text-blue-200/80 uppercase tracking-wider truncate">
                        FACEBOOK
                      </div>
                      <div className="font-sora font-bold text-xs text-white group-hover:text-[#1877F2] transition-colors truncate">
                        Seguir
                      </div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/publicidadtotal_qyr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de Publicidad Total Q&R"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#E4405F]/50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E4405F]/20 text-[#E4405F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-sora font-bold text-blue-200/80 uppercase tracking-wider truncate">
                        INSTAGRAM
                      </div>
                      <div className="font-sora font-bold text-xs text-white group-hover:text-[#E4405F] transition-colors truncate">
                        Seguir
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <ScrollReveal animation="fade" delay={150} duration={600}>
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-manrope text-blue-200/80">
            <p className="text-center sm:text-left">
              © 2026 Publicidad Total Q&R. Todos los derechos reservados.
              Powered by WYNOT.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200/80">
              <button
                type="button"
                onClick={() => setLegalModalDoc('terms')}
                className="text-blue-200 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus:outline-none focus:text-brand-cyan"
              >
                Términos del Servicio
              </button>
              <span className="text-blue-300/40">·</span>
              <button
                type="button"
                onClick={() => setLegalModalDoc('privacy')}
                className="text-blue-200 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus:outline-none focus:text-brand-lime"
              >
                Política de Privacidad de Datos
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Legal Documents Modal diferido (Code Splitting) */}
      {legalModalDoc !== null && (
        <Suspense fallback={null}>
          <LegalModal
            isOpen={true}
            initialDoc={legalModalDoc}
            onClose={() => setLegalModalDoc(null)}
          />
        </Suspense>
      )}
    </footer>
  );
};
