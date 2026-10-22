import React from 'react';
import {
  Target,
  Compass,
  ShieldCheck,
  Clock,
  MessageCircle,
  ThumbsUp,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = () => {
  const values = [
    {
      title: 'Responsabilidad',
      description:
        'Compromiso en cada solicitud, entregando el servicio en tiempo y forma según las características pactadas.',
      icon: ShieldCheck,
      iconBg: 'bg-[#092652]/10 text-[#092652]',
      hoverBorder: 'hover:border-[#092652]',
    },
    {
      title: 'Puntualidad',
      description:
        'Conocimiento exacto de fecha y hora de entrega del servicio conforme a lo solicitado.',
      icon: Clock,
      iconBg: 'bg-red-50 text-[#AB2020]',
      hoverBorder: 'hover:border-[#AB2020]',
    },
    {
      title: 'Comunicación',
      description:
        'Contacto constante entre el equipo de trabajo y el cliente para resolver dudas y dar seguimiento a los pedidos.',
      icon: MessageCircle,
      iconBg: 'bg-cyan-50 text-[#009EE2]',
      hoverBorder: 'hover:border-[#009EE2]',
    },
    {
      title: 'Integridad',
      description:
        'Honestidad y transparencia en cada servicio, cumpliendo promesas y manteniendo equidad y respeto.',
      icon: ThumbsUp,
      iconBg: 'bg-lime-50 text-[#93C01F]',
      hoverBorder: 'hover:border-[#93C01F]',
    },
  ];

  return (
    <section
      id="nosotros"
      className="w-full bg-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Header Institucional */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="bg-[#092652]/10 text-[#092652] font-semibold text-xs px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#092652]/20 uppercase tracking-wide font-sora">
              • NUESTRA IDENTIDAD INSTITUCIONAL
            </span>
            <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-[#092652] tracking-tight">
              Sobre Nosotros: Expertos en BTL y Activaciones
            </h2>
            <p className="font-manrope text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
              Compromiso, experiencia y profesionalismo al servicio del
              desarrollo y crecimiento comercial de tu marca en el sureste.
            </p>
          </div>
        </ScrollReveal>

        {/* Tarjetas Misión y Visión (Efecto de convergencia izquierda-derecha) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto items-stretch">
          {/* Misión (desliza desde la izquierda) */}
          <ScrollReveal animation="fade-right" duration={700}>
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border-t-4 border-[#092652] border-x border-b border-gray-200/80 shadow-sm hover:shadow-md transition-all h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#092652]/10 text-[#092652] flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-2xl font-sora font-bold text-[#092652]">
                  MISIÓN
                </h3>
              </div>
              <p className="font-manrope text-gray-700 text-base leading-relaxed">
                Somos una agencia publicitaria que da a conocer con éxito cada
                trabajo que se desarrolla con el profesionalismo y seriedad
                precisa en el uso de servicios publicitarios, contribuyendo con
                el desarrollo y crecimiento comercial de los clientes.
              </p>
            </div>
          </ScrollReveal>

          {/* Visión (desliza desde la derecha) */}
          <ScrollReveal animation="fade-left" duration={700}>
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border-t-4 border-[#009EE2] border-x border-b border-gray-200/80 shadow-sm hover:shadow-md transition-all h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#009EE2] flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-2xl font-sora font-bold text-[#092652]">
                  VISIÓN
                </h3>
              </div>
              <p className="font-manrope text-gray-700 text-base leading-relaxed">
                Llegar a ser la agencia de servicios de publicidad número uno a
                nivel península, brindando servicios de calidad, con la
                experiencia y profesionalismo que nos caracteriza.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Sección Nuestros Valores */}
        <div className="mb-16">
          <ScrollReveal animation="fade-up" duration={650}>
            <h3 className="text-2xl sm:text-3xl font-sora font-bold text-[#092652] text-center mb-8">
              Nuestros Valores
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  delay={idx * 120}
                  duration={650}
                >
                  <div
                    className={`bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200/80 shadow-sm ${val.hoverBorder} transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-md h-full`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center flex-shrink-0 ${val.iconBg}`}
                    >
                      <IconComp className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h4 className="font-sora font-bold text-lg text-[#092652] mb-2">
                      {val.title}
                    </h4>
                    <p className="font-manrope text-gray-600 text-sm leading-relaxed flex-grow">
                      {val.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Banner CTA */}
        <ScrollReveal animation="zoom-in" duration={750}>
          <div className="bg-gradient-to-r from-[#092652] via-[#0d3875] to-[#092652] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#092652]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl text-center md:text-left relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-[#93C01F] font-sora">
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
                className="inline-flex items-center justify-center gap-2 bg-[#AB2020] hover:bg-[#8F1B1B] text-white px-6 py-3.5 rounded-xl font-sora font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all text-center"
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
