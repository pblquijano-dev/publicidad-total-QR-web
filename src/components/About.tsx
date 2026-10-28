import React, { useState } from 'react';
import { ShieldCheck, Clock, MessageCircle, ThumbsUp } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { getAssetUrl } from '../utils/assets';

type TabType = 'mision' | 'vision' | 'valores';

interface TabItem {
  id: TabType;
  label: string;
}

const kpiList = [
  {
    metric: '+10,000',
    title: 'Volantes Diarios',
    description: 'Volantes diarios distribuidos con control',
    metricColor: 'text-brand-cyan',
  },
  {
    metric: '3 Estados',
    title: 'Cobertura Peninsular',
    description: 'Yucatán, Quintana Roo y Campeche',
    metricColor: 'text-brand-cyan',
  },
  {
    metric: '100%',
    title: 'Equipo Propio',
    description: 'Flotilla y equipo de sonido propio para perifoneo',
    metricColor: 'text-brand-cyan',
  },
  {
    metric: 'Evidencia',
    title: 'Supervisión en Campo',
    description: 'Reporte fotográfico diario entregado al cliente',
    metricColor: 'text-brand-crimson-light',
  },
];

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
    <section
      id="nosotros"
      className="w-full bg-brand-primary relative overflow-hidden border-b border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-brand-primary-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Encabezado de sección */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-sora font-semibold tracking-wide uppercase mb-3">
              • Nuestra Identidad Institucional
            </span>
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-4 tracking-tight">
              Sobre Nosotros
            </h2>
            <p className="font-manrope text-blue-100/80 text-base sm:text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed">
              Compromiso, experiencia y seriedad en servicios publicitarios en
              toda la Península.
            </p>
          </div>
        </ScrollReveal>

        {/* Contenedor Identidad: Logo institucional a la izquierda, Tabs e Info a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* Columna Izquierda: Logo Institucional */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal animation="fade-up" duration={700}>
              <div className="relative group w-full mx-auto max-w-[340px] sm:max-w-[400px] lg:max-w-none flex items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden hover:border-brand-cyan/30 transition-all duration-500">
                {/* Glow decorativo de fondo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 via-transparent to-brand-crimson/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute -top-12 -left-12 w-36 h-36 bg-brand-cyan/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-brand-crimson/20 rounded-full blur-2xl pointer-events-none" />

                <img
                  src={getAssetUrl('/images/logo-dark.png')}
                  alt="Publicidad Total Q&R - Identidad Institucional"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full max-h-[300px] sm:max-h-[350px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Columna Derecha: Tabs e Información */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Selector de Pestañas (Tabs) */}
            <ScrollReveal animation="fade-up" delay={100} duration={650}>
              <div className="flex justify-center lg:justify-start mb-6">
                <div
                  role="tablist"
                  aria-label="Identidad Institucional"
                  className="inline-flex p-1.5 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md gap-2"
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
                        className={`px-5 sm:px-6 py-2.5 min-w-[100px] sm:min-w-[110px] text-sm sm:text-base font-sora transition-all duration-300 ${
                          isActive
                            ? 'bg-brand-cyan text-white font-bold rounded-xl shadow-lg shadow-brand-cyan/25'
                            : 'text-blue-100/70 hover:text-white hover:bg-white/[0.08] font-medium rounded-xl'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Contenido de las pestañas */}
            <div className="transition-all duration-300 w-full">
              {activeTab === 'mision' && (
                <div
                  id="panel-mision"
                  role="tabpanel"
                  aria-labelledby="tab-mision"
                  className="bg-white/[0.07] border border-white/12 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl shadow-black/20 text-left transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-36 h-1 bg-gradient-to-r from-brand-cyan to-transparent opacity-80" />
                  <p className="font-manrope text-white text-base sm:text-lg lg:text-xl leading-relaxed italic">
                    “Somos una agencia publicitaria que da a conocer con éxito
                    cada trabajo que se desarrolla con el profesionalismo y
                    seriedad precisa en el uso de servicios publicitarios,
                    contribuyendo con el desarrollo y crecimiento comercial de
                    los clientes.”
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div
                  id="panel-vision"
                  role="tabpanel"
                  aria-labelledby="tab-vision"
                  className="bg-white/[0.07] border border-white/12 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl shadow-black/20 text-left transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-36 h-1 bg-gradient-to-r from-brand-cyan to-transparent opacity-80" />
                  <p className="font-manrope text-white text-base sm:text-lg lg:text-xl leading-relaxed italic">
                    “Llegar a ser la agencia de servicios de publicidad número
                    uno a nivel península, brindando servicios de calidad, con
                    la experiencia y profesionalismo que nos caracteriza.”
                  </p>
                </div>
              )}

              {activeTab === 'valores' && (
                <div
                  id="panel-valores"
                  role="tabpanel"
                  aria-labelledby="tab-valores"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full transition-all"
                >
                  {values.map((val) => {
                    const IconComp = val.icon;
                    return (
                      <div
                        key={val.title}
                        className="bg-white/[0.07] border border-white/12 backdrop-blur-md p-5 rounded-2xl hover:bg-white/[0.11] hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-lg shadow-black/20 group"
                      >
                        <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-brand-cyan/15 border border-brand-cyan/25 text-brand-cyan flex-shrink-0 group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="font-sora font-bold text-base text-white mb-1.5 group-hover:text-brand-cyan transition-colors">
                          {val.title}
                        </h3>
                        <p className="font-manrope text-blue-100/75 text-xs sm:text-sm leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPI / Metric Cards Section */}
        <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiList.map((kpi, index) => (
              <ScrollReveal
                key={index}
                animation="fade-up"
                delay={index * 120}
                duration={650}
              >
                <div className="p-6 rounded-2xl bg-white/[0.07] border border-white/12 backdrop-blur-md shadow-lg shadow-black/20 hover:bg-white/[0.11] hover:border-white/25 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1 group">
                  <div>
                    <div
                      className={`font-sora font-extrabold text-3xl sm:text-4xl tracking-tight leading-none mb-3 ${kpi.metricColor}`}
                    >
                      {kpi.metric}
                    </div>
                    <p className="font-sora font-bold text-base text-white mb-1.5">
                      {kpi.title}
                    </p>
                    <p className="font-manrope text-xs sm:text-sm text-blue-100/75 leading-relaxed">
                      {kpi.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Institutional Presence Strip */}
          <ScrollReveal animation="fade-up" delay={200} duration={650}>
            <div className="text-center py-4 px-6 rounded-2xl bg-white/[0.06] border border-white/12 backdrop-blur-md shadow-md flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-lime shrink-0 animate-pulse" />
              <p className="font-manrope text-xs sm:text-sm font-semibold text-blue-100/90 tracking-wide">
                Presencia y activaciones en las principales plazas comerciales,
                avenidas y supermercados del Sureste
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
