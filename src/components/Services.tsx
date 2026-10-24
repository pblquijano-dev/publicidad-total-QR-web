import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface ServiceItem {
  title: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  services: ServiceItem[];
}

const CATEGORIES: Category[] = [
  {
    id: 'activacion',
    name: 'Activación de Marca',
    services: [
      {
        title: 'Edecanes AA y AAA',
        description:
          'Personal de imagen calificado con excelente presentación, facilidad de palabra y vestuario corporativo coordinado para congresos, lanzamientos, expos y eventos VIP en la Península.',
      },
      {
        title: 'Animadores Comerciales',
        description:
          'Conducción profesional con micrófono en mano, animación de dinámicas, concursos y ambientación comercial para atraer clientes a tu tienda o sucursal.',
      },
      {
        title: 'Audio Profesional',
        description:
          'Sistemas de sonido de alta fidelidad y potencia para sonorización en punto de venta, carpas publicitarias y eventos masivos en exteriores.',
      },
      {
        title: 'Botargueros',
        description:
          'Animadores caracterizados de alta energía para dinamizar el punto de venta, interactuar con el público familiar y generar contenido de alto impacto visual.',
      },
      {
        title: 'Zanqueros',
        description:
          'Artistas visuales en zancos con vistosos vestuarios temáticos de gran impacto para elevar la visibilidad de tu marca desde largas distancias en avenidas y desfiles.',
      },
      {
        title: 'Batucada',
        description:
          'Espectáculo musical de percusión y ritmo en vivo para capturar la atención masiva en inauguraciones, eventos comerciales y desfiles festivos.',
      },
      {
        title: 'Pancarteros',
        description:
          'Personal dinámico en camellones y cruceros estratégicos con pancartas y flechas de alta visibilidad para desviar el tráfico hacia tu sucursal.',
      },
      {
        title: 'Promodegustadoras',
        description:
          'Personal capacitado en punto de venta para demostración de producto, degustación, entrega de muestras y desplazamiento de inventario en tienda.',
      },
      {
        title: 'Gios',
        description:
          'Personal masculino de imagen comercial y protocolo para bienvenida, eventos deportivos, exposiciones corporativas y activaciones de marca.',
      },
    ],
  },
  {
    id: 'audiovisuales',
    name: 'Audiovisuales',
    services: [
      {
        title: 'Fotografía de Eventos',
        description:
          'Cobertura fotográfica profesional en alta resolución para documentar activaciones, aperturas, congresos y campañas corporativas con entrega de material optimizado.',
      },
      {
        title: 'Video y Cobertura',
        description:
          'Producción audiovisual completa con tomas cinematográficas, reels dinámicos para redes sociales y videos resumen con edición y musicalización profesional.',
      },
      {
        title: 'Pantallas Digitales',
        description:
          'Renta e instalación de pantallas LED de gran formato y alta luminosidad para proyección de spots comerciales, branding dinámico y eventos en vivo.',
      },
    ],
  },
  {
    id: 'perifoneo',
    name: 'Perifoneo',
    services: [
      {
        title: 'Carros de Sonido (Flotilla propia con bocinas de alto alcance)',
        description:
          'Flotilla propia de unidades equipadas con bocinas de alto alcance y amplificadores profesionales recorriendo colonias, avenidas y supermanzanas estratégicas.',
      },
      {
        title: 'Vallas Móviles',
        description:
          'Unidades equipadas con paneles publicitarios iluminados de gran impacto visual que recorren las principales vialidades urbanas en horarios de máxima afluencia.',
      },
    ],
  },
  {
    id: 'volanteo',
    name: 'Volanteo',
    services: [
      {
        title: 'Volanteo Casa por Casa',
        description:
          'Distribución selectiva bajo puerta y en buzones por supermanzanas y fraccionamientos objetivo, con supervisión en campo y reportes de entrega.',
      },
      {
        title: 'Publiandantes',
        description:
          'Cuadrillas móviles de promotores equipados con mochilas banner y banderas publicitarias recorriendo andadores peatonales y centros comerciales.',
      },
      {
        title: 'Volanteo Mano a Mano',
        description:
          'Entrega personalizada y directa de material impreso a peatones y automovilistas en cruces, paraderos y semáforos de alto flujo con personal identificado.',
      },
    ],
  },
  {
    id: 'impresos',
    name: 'Impresos',
    services: [
      {
        title: 'Volantes Publicitarios',
        description:
          'Impresión en papel couché de primera calidad a todo color, con acabados brillante o mate para campañas masivas de difusión y promociones.',
      },
      {
        title: 'Lonas Gran Formato',
        description:
          'Impresión digital de lonas frontlit resistentes a la intemperie, con refuerzo perimetral y ojillos para fachadas, espectaculares y eventos.',
      },
      {
        title: 'Vinil Publicitario',
        description:
          'Vinil adhesivo de alta resistencia, microperforado para cristales y rotulación de flotillas vehiculares para transformar cualquier superficie en medio publicitario.',
      },
    ],
  },
];

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

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
              key={service.title}
              className="bg-surface border border-surface-container rounded-2xl shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <h3 className="font-sora font-bold text-lg text-brand-primary mb-2">
                  {service.title}
                </h3>
                <p className="font-manrope text-on-surface-variant text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <a
                href="https://wa.me/9981071359"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-surface font-sora font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
