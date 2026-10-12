import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Megaphone } from 'lucide-react';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  const medallionLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1Ww3mxC_4QX7n5RYDK5a-SPE2XEUPVxg32mP-31D7Yrk4kxsqp4kvhZdBAg4Gftuas76-Jt4s031bsv8oguxL-hRNPH9T7ZB2vGnAAzbzroE2f1bHwEjqFkim5ac2aOZEsDwUMBmJK_Av-oMfORvxhkv8OsYOGK2rZNHT7r_5c9lxsDCwMD2fp1JF58A5WHZhkFaaOxtUOt4rg0FKHLFgBTU92XmC8z60_0ZByBsQAcxvQA90SnExpGSxw';

  return (
    <footer className="bg-[#140F0E] text-white border-t border-white/10 relative overflow-hidden pt-16 pb-8">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-brand-primary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Medallion Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1A1413] p-1 shadow-xl shadow-brand-primary/20 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden mb-3">
              {!logoError ? (
                <img
                  src={medallionLogoUrl}
                  alt="Medallón Oficial Publicidad Total Q&R"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain filter brightness-105"
                />
              ) : (
                <div className="w-full h-full bg-[#1A1413] rounded-xl flex flex-col items-center justify-center p-2 text-center">
                  <Megaphone className="w-7 h-7 text-brand-cyan mb-0.5" />
                  <span className="font-sora font-extrabold text-[11px] leading-tight text-white">
                    TOTAL Q&R
                  </span>
                  <span className="font-sora font-bold text-[8px] text-brand-lime tracking-widest">
                    PENÍNSULA
                  </span>
                </div>
              )}
            </div>

            {/* Slogan Red Ribbon Badge */}
            <div className="inline-block bg-brand-crimson text-white font-sora font-bold text-xs px-3.5 py-1.5 rounded-lg tracking-wide mb-3 shadow-md shadow-brand-crimson/20">
              «¡Llevamos tu marca a las manos y oídos de todos!»
            </div>

            {/* Description Paragraph */}
            <p className="font-manrope text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-4">
              Especialistas en marketing BTL, perifoneo móvil y activaciones de
              alto impacto en el sureste de México con cobertura garantizada.
            </p>

            {/* Operational Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-[10px] font-sora font-bold text-brand-lime tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                7 DÍAS · 100% OPERATIVO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-[10px] font-sora font-bold text-brand-cyan tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                REPORTE FOTOGRÁFICO DIARIO
              </span>
            </div>
          </div>

          {/* Column 2: Servicios Principales (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider">
                SERVICIOS PRINCIPALES
              </h4>
              <div className="w-10 h-0.5 bg-brand-cyan mt-1.5 rounded-full" />
            </div>

            <ul className="space-y-2.5 text-xs font-manrope text-gray-300">
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Activaciones BTL en Punto de Venta</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Edecanes y Personal de Imagen</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Animadores y Conducción en Vivo</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
                    •
                  </span>
                  <span>Promotoría y Demostradoras</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-cyan transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-cyan/60 group-hover:text-brand-cyan transition-colors">
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

            <ul className="space-y-2.5 text-xs font-manrope text-gray-300">
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Perifoneo Móvil con Flota Propia</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Volanteo Estratégico por Supermanzanas</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Batucadas y Eventos Especiales</span>
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/60 group-hover:text-brand-lime transition-colors">
                    •
                  </span>
                  <span>Producción de Spots de Audio</span>
                </a>
              </li>
              <li>
                <a
                  href="#cobertura"
                  className="hover:text-brand-lime transition-colors flex items-center gap-2 group"
                >
                  <span className="text-brand-lime/60 group-hover:text-brand-lime transition-colors">
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
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-brand-whatsapp/15 border border-white/5 hover:border-brand-whatsapp/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-whatsapp/20 text-brand-whatsapp flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-400 uppercase tracking-wider">
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
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-brand-cyan/15 border border-white/5 hover:border-brand-cyan/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 text-brand-cyan flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-400 uppercase tracking-wider">
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
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-brand-crimson/15 border border-white/5 hover:border-brand-crimson/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-crimson/20 text-brand-crimson flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-400 uppercase tracking-wider">
                    CORREO ÚNICO AUTORIZADO
                  </div>
                  <div className="font-sora font-bold text-xs text-white group-hover:text-brand-crimson transition-colors break-all">
                    ventaspublicidad1@hotmail.com
                  </div>
                </div>
              </a>

              {/* Cobertura */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-sora font-bold text-gray-400 uppercase tracking-wider">
                    COBERTURA PENINSULAR
                  </div>
                  <div className="font-manrope text-xs text-gray-300">
                    Yucatán, Quintana Roo y Campeche
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-manrope text-gray-400">
          <p className="text-center sm:text-left">
            © 2026 Publicidad Total Q&R Operadora BTL para el Sureste Mexicano.
            Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">
              Términos del Servicio
            </span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Política de Privacidad de Datos
            </span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Reporte Operativo en Ruta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
