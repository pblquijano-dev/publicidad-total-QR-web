import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  MessageCircle,
  ThumbsUp,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

type TabType = 'mision' | 'vision' | 'valores';

interface TabItem {
  id: TabType;
  label: string;
}

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('mision');

  const tabs: TabItem[] = [
    { id: 'mision', label: 'Misión' },
    { id: 'vision', label: 'Visión' },
    { id: 'valores', label: 'Valores' },
  ];

  const values = [
    {
      title: 'Responsabilidad',
      description:
        'La empresa se compromete en cada una de las solicitudes, comprometiéndose con el cliente y entregando el servicio en tiempo y forma de acuerdo con las características especificadas en el contrato.',
      icon: ShieldCheck,
    },
    {
      title: 'Puntualidad',
      description:
        'Estar informados de la fecha y hora de entrega del servicio, tomando en cuenta las características con las que el cliente ha solicitado el servicio.',
      icon: Clock,
    },
    {
      title: 'Comunicación',
      description:
        'El equipo de trabajo deberá estar en constante comunicación para tomar en cuenta las solicitudes del cliente, resolver dudas y dar seguimiento continuo con el fin de ofrecer un servicio de calidad.',
      icon: MessageCircle,
    },
    {
      title: 'Integridad',
      description:
        'Se ofrece con honestidad y transparencia todo servicio, cumpliendo con las promesas y compromisos hacia los clientes, manteniendo equidad y respeto hacia la plantilla laboral.',
      icon: ThumbsUp,
    },
  ];

  return (
    <section id="nosotros" className="w-full bg-surface">
      <div className="bg-surface py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center">
            <span className="bg-brand-primary-fixed text-brand-primary font-sora text-xs font-semibold px-3.5 py-1.5 rounded-full inline-block mb-3">
              • NUESTRA IDENTIDAD INSTITUCIONAL
            </span>
            <h2 className="font-sora font-bold text-3xl sm:text-4xl text-brand-primary text-center mb-3">
              Sobre Nosotros
            </h2>
            <p className="font-manrope text-on-surface-variant text-center max-w-2xl mx-auto mb-10">
              Compromiso, experiencia y seriedad en servicios publicitarios en
              toda la Península.
            </p>
          </div>
        </ScrollReveal>

        {/* Selector de Pestañas (Tabs) con useState */}
        <ScrollReveal animation="fade-up" delay={100} duration={650}>
          <div
            role="tablist"
            aria-label="Identidad Institucional"
            className="flex justify-center gap-3 mb-10"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 min-w-[120px] ${
                    isActive
                      ? 'bg-brand-primary text-surface font-sora font-semibold rounded-xl shadow-sm transition-all'
                      : 'bg-surface text-on-surface-variant hover:text-brand-primary border border-surface-dim font-manrope font-medium rounded-xl transition-all'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Contenido de las pestañas */}
        <div className="transition-all duration-300">
          {activeTab === 'mision' && (
            <div
              id="panel-mision"
              role="tabpanel"
              aria-labelledby="tab-mision"
              className="bg-surface-low border border-surface-container p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm max-w-3xl mx-auto text-center transition-all"
            >
              <p className="font-manrope text-on-surface text-xl leading-1 opacity-70">
                <i>
                  Somos una agencia publicitaria que da a conocer con éxito cada
                  trabajo que se desarrolla con el profesionalismo y seriedad
                  precisa en el uso de servicios publicitarios, contribuyendo
                  con el desarrollo y crecimiento comercial de los clientes.
                </i>
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div
              id="panel-vision"
              role="tabpanel"
              aria-labelledby="tab-vision"
              className="bg-surface-low border border-surface-container p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm max-w-3xl mx-auto text-center transition-all"
            >
              <p className="font-manrope text-on-surface text-xl leading-1 opacity-70">
                <i>
                  Llegar a ser la agencia de servicios de publicidad número uno
                  a nivel península, brindando servicios de calidad, con la
                  experiencia y profesionalismo que nos caracteriza.
                </i>
              </p>
            </div>
          )}

          {activeTab === 'valores' && (
            <div
              id="panel-valores"
              role="tabpanel"
              aria-labelledby="tab-valores"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto transition-all"
            >
              {values.map((val) => {
                const IconComp = val.icon;
                return (
                  <div
                    key={val.title}
                    className="bg-surface border border-surface-dim p-6 rounded-2xl hover:border-brand-primary transition-colors flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-brand-primary-fixed text-brand-primary flex-shrink-0">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-sora font-bold text-base text-brand-primary mb-2">
                      {val.title}
                    </h3>
                    <p className="font-manrope text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Banner CTA */}
        <ScrollReveal animation="zoom-in" duration={750}>
          <div className="mt-16 bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-primary rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-brand-primary/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl text-center md:text-left relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-lime font-sora">
                ¿Planeando tu próxima activación?
              </span>
              <h4 className="text-2xl sm:text-3xl font-sora font-bold mt-1 text-white">
                Coordina tu campaña de campo con personal capacitado
              </h4>
              <p className="text-blue-100 font-manrope text-sm mt-2">
                Despliegue ágil en Cancún, Playa del Carmen, Mérida y Campeche
                con supervisión presencial y reportes fotográficos.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
              <a
                className="inline-flex items-center justify-center gap-2 bg-brand-crimson hover:bg-brand-crimson-hover text-white px-6 py-3.5 rounded-xl font-sora font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all text-center"
                href="https://wa.me/529981071359?text=Hola,%20solicito%20cotizaci%C3%B3n%20para%20activaci%C3%B3n%20BTL"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Cotizar Activación Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
