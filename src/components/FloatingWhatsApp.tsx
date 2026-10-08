import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/529981071359?text=' +
    encodeURIComponent(
      '¡Hola! Me comunico desde el sitio web de Publicidad Total Q&R y requiero cotizar una campaña publicitaria en la Península.'
    );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-[#1A1413] text-white text-xs font-sora font-semibold shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        ¡Cotiza por WhatsApp ahora! 👋
      </span>

      {/* Pulsing ring */}
      <div className="relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp a Publicidad Total Q&R"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-[#1A1413] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>
    </div>
  );
};
