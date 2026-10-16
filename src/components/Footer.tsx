import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Megaphone } from 'lucide-react';
import { LegalModal, LegalDocType } from './LegalModal';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocType | null>(null);

  const medallionLogoUrl = '/images/logo.png';
  return (
    <footer className="bg-gray-50 dark:bg-[#140F0E] text-gray-900 dark:text-white border-t border-gray-200 dark:border-white/10 relative overflow-hidden pt-16 pb-8 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-primary/5 dark:from-brand-primary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Medallion Logo */}
            <div className="w-20 h-20 sm:w-40 sm:h-40 rounded-2xl bg-white p-1 shadow-xl shadow-brand-primary/10 dark:shadow-brand-primary/20 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0 overflow-hidden mb-3">
              {!logoError ? (
                <img
                  src={medallionLogoUrl}
                  alt="Medallón Oficial Publicidad Total Q&R"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain filter brightness-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-[#1A1413] rounded-xl flex flex-col items-center justify-center p-2 text-center">
                  <Megaphone className="w-7 h-7 text-brand-cyan mb-0.5" />
                  <span className="font-sora font-extrabold text-[11px] leading-tight text-gray-900 dark:text-white">
                    TOTAL Q&R
                  </span>
                  <span className="font-sora font-bold text-[8px] text-brand-lime tracking-widest">
                    PENÍNSULA
                  </span>
                </div>
              )}
            </div>

            {/* Description Paragraph */}
            <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mb-4">
              Especialistas en publicidad BTL, perifoneo móvil y activaciones de
              alto impacto en el sureste de México con cobertura garantizada.
            </p>
          </div>

          {/* Column 2: Servicios Principales (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <h4 className="font-sora font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                SERVICIOS PRINCIPALES
              </h4>
              <div className="w-10 h-0.5 bg-brand-cyan mt-1.5 rounded-full" />
            </div>

            <ul className="space-y-2.5 text-xs font-manrope text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/70 dark:text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Activaciones BTL en Punto de Venta</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/70 dark:text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Edecanes y Personal de Imagen</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/70 dark:text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Animadores y Conducción en Vivo</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/70 dark:text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Promotoría y Demostradoras</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/70 dark:text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
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
              <h4 className="font-sora font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                OPERACIONES DE CAMPO
              </h4>
              <div className="w-10 h-0.5 bg-brand-lime mt-1.5 rounded-full" />
            </div>

            <ul className="space-y-2.5 text-xs font-manrope text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime dark:hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/70 dark:text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Perifoneo Móvil con Flota Propia</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime dark:hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/70 dark:text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Volanteo Estratégico por Supermanzanas</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime dark:hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/70 dark:text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Batucadas y Eventos Especiales</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime dark:hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/70 dark:text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Producción de Spots de Audio</span>
                </a>
              </li>
              <li>
                <a
                  href="#cobertura"
                  className="hover:text-brand-lime dark:hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/70 dark:text-brand-lime/60 group-hover:text-brand-lime transition-colors">
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
              <h4 className="font-sora font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
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
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-brand-whatsapp/10 dark:hover:bg-brand-whatsapp/15 border border-gray-200/80 dark:border-white/5 hover:border-brand-whatsapp/30 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-whatsapp/15 dark:bg-brand-whatsapp/20 text-brand-whatsapp flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    WHATSAPP VENTAS DIRECTAS
                  </div>
                  <div className="font-sora font-bold text-sm text-gray-900 dark:text-white group-hover:text-brand-whatsapp transition-colors">
                    998 107 1359
                  </div>
                </div>
              </a>

              {/* Conmutador Mérida */}
              <a
                href="tel:9999318581"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/15 border border-gray-200/80 dark:border-white/5 hover:border-brand-cyan/30 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 dark:bg-brand-cyan/20 text-brand-cyan flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    CONMUTADOR MÉRIDA (VOZ)
                  </div>
                  <div className="font-sora font-bold text-sm text-gray-900 dark:text-white group-hover:text-brand-cyan transition-colors">
                    999 931 8581
                  </div>
                </div>
              </a>

              {/* Correo */}
              <a
                href="mailto:ventaspublicidad1@hotmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-brand-crimson/10 dark:hover:bg-brand-crimson/15 border border-gray-200/80 dark:border-white/5 hover:border-brand-crimson/30 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-crimson/15 dark:bg-brand-crimson/20 text-brand-crimson flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    CORREO ÚNICO AUTORIZADO
                  </div>
                  <div className="font-sora font-bold text-xs text-gray-900 dark:text-white group-hover:text-brand-crimson transition-colors break-all">
                    ventaspublicidad1@hotmail.com
                  </div>
                </div>
              </a>

              {/* Cobertura */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200/80 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="w-8 h-8 rounded-lg bg-brand-lime/15 dark:bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    COBERTURA PENINSULAR
                  </div>
                  <div className="font-manrope text-xs text-gray-600 dark:text-gray-300">
                    Yucatán, Quintana Roo y Campeche
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-manrope text-gray-500 dark:text-gray-400">
          <p className="text-center sm:text-left">
            © 2026 Publicidad Total Q&R. Todos los derechos reservados. Powered
            by WYNOT.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <button
              type="button"
              onClick={() => setLegalModalDoc('terms')}
              className="text-gray-600 dark:text-gray-400 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors cursor-pointer underline-offset-4 hover:underline focus:outline-none focus:text-brand-cyan"
            >
              Términos del Servicio
            </button>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <button
              type="button"
              onClick={() => setLegalModalDoc('privacy')}
              className="text-gray-600 dark:text-gray-400 hover:text-brand-lime dark:hover:text-brand-lime transition-colors cursor-pointer underline-offset-4 hover:underline focus:outline-none focus:text-brand-lime"
            >
              Política de Privacidad de Datos
            </button>
          </div>
        </div>
      </div>

      {/* Legal Documents Modal */}
      <LegalModal
        isOpen={legalModalDoc !== null}
        initialDoc={legalModalDoc || 'terms'}
        onClose={() => setLegalModalDoc(null)}
      />
    </footer>
  );
};
