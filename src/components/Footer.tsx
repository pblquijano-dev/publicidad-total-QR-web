import React from 'react';
import {
  Megaphone,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Shield,
  CheckCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1413] text-white border-t border-white/10 relative overflow-hidden pt-16 pb-12">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#312782]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand medallion & slogan (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              {/* 200px Medallion Emblem */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#312782] via-[#009EE2] to-[#AB2020] p-0.5 shadow-xl shadow-[#312782]/30 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#1A1413] rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
                  <Megaphone className="w-7 h-7 text-[#009EE2] mb-0.5" />
                  <span className="font-sora font-extrabold text-[11px] leading-tight text-white">
                    TOTAL Q&R
                  </span>
                  <span className="font-sora font-bold text-[8px] text-[#93C01F] tracking-widest">
                    PENÍNSULA
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-sora font-extrabold text-xl text-white tracking-tight">
                  PUBLICIDAD TOTAL Q&R
                </h3>
                <p className="font-sora font-semibold text-xs text-[#009EE2] tracking-wider mt-0.5 uppercase">
                  Agencia Peninsular de Marketing BTL
                </p>
              </div>
            </div>

            {/* Official Slogan */}
            <blockquote className="border-l-2 border-[#93C01F] pl-3 py-1 my-3 font-manrope italic text-sm text-gray-300">
              «Llevamos tu marca a las manos y oídos de todos»
            </blockquote>

            <p className="font-manrope text-xs text-gray-400 max-w-md leading-relaxed mt-2">
              Líderes en logística de calle, volanteo supervisado, perifoneo
              móvil de alta potencia y activación de marca en Quintana Roo,
              Yucatán y Campeche.
            </p>
          </div>

          {/* Navigation Directory (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs font-manrope text-gray-300">
              <li>
                <a
                  href="#nosotros"
                  className="hover:text-[#009EE2] transition-colors"
                >
                  Manifiesto y Certezas
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-[#009EE2] transition-colors"
                >
                  Servicios BTL
                </a>
              </li>
              <li>
                <a
                  href="#cobertura"
                  className="hover:text-[#009EE2] transition-colors"
                >
                  Hubs de Cobertura
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-[#009EE2] transition-colors"
                >
                  Cotización en Línea
                </a>
              </li>
            </ul>
          </div>

          {/* Services Directory (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs font-manrope text-gray-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#93C01F] shrink-0" />
                <span>Activaciones BTL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#93C01F] shrink-0" />
                <span>Edecanes y Hostess</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#93C01F] shrink-0" />
                <span>Animadores en Vivo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#93C01F] shrink-0" />
                <span>Perifoneo Móvil</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#93C01F] shrink-0" />
                <span>Volanteo Auditado</span>
              </li>
            </ul>
          </div>

          {/* Contact & Regional Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-4">
              Atención Regional
            </h4>
            <ul className="space-y-3 text-xs font-manrope text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#009EE2] shrink-0 mt-0.5" />
                <span>Cancún · Playa del Carmen · Mérida · Campeche</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#93C01F] shrink-0" />
                <span>998 107 1359 / 999 931 8581</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#AB2020] shrink-0" />
                <span className="break-all">ventaspublicidad1@hotmail.com</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Shield className="w-4 h-4 text-[#009EE2] shrink-0" />
                <span>Personal con seguro y equipo de seguridad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-manrope text-gray-400">
          <p>
            © {new Date().getFullYear()} Publicidad Total Q&R. Todos los
            derechos reservados. Península de Yucatán, México.
          </p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
