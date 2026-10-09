import React from 'react';
import {
  X,
  Check,
  AlertTriangle,
  Compass,
  Sparkles,
  Megaphone,
  Camera,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const About: React.FC = () => {
  const badPractices = [
    {
      title: 'Volanteo a ciegas :',
      description:
        'Nunca sabes si tus volantes se entregaron o terminaron en la basura.',
    },
    {
      title: 'Personal improvisado :',
      description:
        'Edecanes y animadores sin capacitación sobre tu producto o marca.',
    },
    {
      title: 'Equipos desgastados :',
      description:
        'Sonido saturado y carros descuidados que dañan la imagen de tu negocio.',
    },
  ];

  const goodPractices = [
    {
      title: 'Reparto auditado :',
      description:
        'Estudio previo por supermanzanas y reporte fotográfico diario.',
    },
    {
      title: 'Personal seleccionado :',
      description: 'Briefing obligatorio de marca y uniforme impecable.',
    },
    {
      title: 'Flotilla propia y bocinas de alta fidelidad :',
      description: 'Unidades adaptadas con locución profesional grabada.',
    },
  ];

  const pillars = [
    {
      icon: Compass,
      title: 'Supervisión en Sitio',
      isMetric: false,
      description:
        'Coordinador exclusivo asignado en cada jornada para auditoría de rutas, ritmo de entrega y control de personal.',
      linkText: 'Control activo en vivo',
      linkIcon: 'arrow',
      linkColor: 'text-[#009EE2]',
      iconBg: 'bg-[#009EE2]/10 text-[#009EE2]',
    },
    {
      icon: Sparkles,
      stat: '+10,000',
      title: 'Impactos Diarios',
      isMetric: true,
      description:
        'Alcance medible con volanteo mano a mano, activación en semáforos clave y zonas comerciales de alto tráfico.',
      linkText: 'Densidad urbana estratégica',
      linkIcon: 'none',
      linkColor: 'text-[#AB2020] dark:text-red-400',
      iconBg:
        'bg-[#312782]/10 dark:bg-[#312782]/30 text-[#312782] dark:text-[#c5c0ff]',
    },
    {
      icon: Megaphone,
      title: 'Flota Propia Sin Intermediarios',
      isMetric: false,
      description:
        'Unidades móviles adaptadas para perifoneo, audio de alta potencia, carpas, módulos y mobiliario listos para operar.',
      linkText: 'Logística 100% interna',
      linkIcon: 'arrow',
      linkColor: 'text-[#009EE2]',
      iconBg: 'bg-[#009EE2]/10 text-[#009EE2]',
    },
    {
      icon: Camera,
      title: 'Reporte de Cierre con Fotos',
      isMetric: false,
      description:
        'Transparencia total entregada al cliente con bitácora fotográfica geolocalizada y testimonios de público alcanzado.',
      linkText: 'Auditoría verificable',
      linkIcon: 'check',
      linkColor: 'text-[#5C7C0B] dark:text-[#93C01F]',
      iconBg: 'bg-[#93C01F]/15 text-[#5C7C0B] dark:text-[#93C01F]',
    },
  ];

  return (
    <section
      id="nosotros"
      className="py-20 sm:py-24 bg-[#fff8f6] dark:bg-[#1A1413] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#312782]/10 dark:bg-[#312782]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#009EE2]/10 dark:bg-[#009EE2]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e4dfff]/60 dark:bg-[#312782]/30 border border-[#312782]/20 dark:border-[#312782]/50 text-[11px] font-sora font-bold text-[#1a086d] dark:text-[#c5c0ff] uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#009EE2] inline-block animate-pulse" />
            <span>Nuestra postura operativa</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a086d] dark:text-white tracking-tight leading-[1.15]">
            En la calle no valen las promesas:
            <br />{' '}
            <span className="text-[#009EE2]">
              Vale lo que tu cliente ve y escucha
            </span>
          </h2>

          <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-5 leading-relaxed max-w-3xl">
            Nacimos en la Península para erradicar la informalidad de la
            publicidad de campo. Un solo proveedor responsable de tu marca,
            personal capacitado antes de salir a punto de venta y evidencia real
            de lo ejecutado.
          </p>
        </div>

        {/* Two-Column Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Card: La Informalidad Tradicional */}
          <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-[#fef5f4] dark:bg-[#251617]/50 border border-red-200/80 dark:border-red-900/40 shadow-sm flex flex-col justify-between relative">
            <div>
              {/* Top Category Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100/90 dark:bg-red-950/60 text-[#b42725] dark:text-red-300 border border-red-200 dark:border-red-900/50 text-[11px] font-sora font-bold tracking-wider uppercase mb-6">
                Riesgo habitual del mercado
              </div>

              {/* Card Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-[#b42725] dark:text-red-400 font-bold shrink-0">
                  <X className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-sora font-bold text-xl sm:text-2xl text-[#1a1413] dark:text-white">
                  La informalidad Tradicional
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {badPractices.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/40 text-[#b42725] dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <p className="font-manrope text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        {item.title}{' '}
                      </strong>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Alert Result */}
            <div className="mt-8 pt-6 border-t border-red-200/60 dark:border-red-900/40 flex items-center gap-2.5 text-xs sm:text-sm font-manrope font-semibold text-[#b42725] dark:text-red-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                Resultado: Pérdidas directas de presupuesto y nulo retorno
                publicitario.
              </span>
            </div>
          </div>

          {/* Card: El Estándar Profesional Q&R */}
          <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-gradient-to-br from-[#1a086d] via-[#231577] to-[#312782] text-white shadow-xl shadow-[#1a086d]/20 border border-[#423993] flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#009EE2]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Category Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#93C01F] border border-[#93C01F]/40 text-[11px] font-sora font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
                <span>★</span>
                <span>Garantía operativa comprobable</span>
              </div>

              {/* Card Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-[#93C01F] text-[#1a086d] flex items-center justify-center font-bold shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h3 className="font-sora font-bold text-xl sm:text-2xl text-white">
                  El Estándar Profesional Q&R
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {goodPractices.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-[#93C01F]/20 text-[#93C01F] flex items-center justify-center shrink-0 mt-0.5 border border-[#93C01F]/40">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <p className="font-manrope text-sm sm:text-base text-gray-200 leading-relaxed">
                      <strong className="font-semibold text-white">
                        {item.title}{' '}
                      </strong>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Success Result */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-manrope font-semibold text-[#93C01F] relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#93C01F] inline-block animate-pulse shrink-0" />
              <span>
                Resultado: Certeza del 100% en cobertura y retorno de inversión
                visible.
              </span>
            </div>
          </div>
        </div>

        {/* Pilares de Certidumbre Operativa */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-sora font-bold uppercase tracking-widest text-[#312782] dark:text-[#009EE2] block mb-1">
                Infraestructura y rigor en campo
              </span>
              <h3 className="font-sora text-2xl sm:text-3xl font-bold text-[#1a086d] dark:text-white">
                Pilares de Certidumbre Operativa
              </h3>
            </div>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-manrope font-semibold text-gray-600 dark:text-gray-300 shadow-sm self-start sm:self-auto">
              Yucatán | Quintana Roo | Campeche
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-[#1f1716] border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${pillar.iconBg}`}
                      >
                        <IconComp className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    {/* Metric / Title */}
                    {pillar.isMetric ? (
                      <div className="mb-3">
                        <span className="font-sora font-extrabold text-2xl sm:text-3xl text-[#1a086d] dark:text-[#c5c0ff] block">
                          {pillar.stat}
                        </span>
                        <h4 className="font-sora font-bold text-base text-gray-900 dark:text-white">
                          {pillar.title}
                        </h4>
                      </div>
                    ) : (
                      <h4 className="font-sora font-bold text-base text-gray-900 dark:text-white mb-3 leading-snug">
                        {pillar.title}
                      </h4>
                    )}

                    {/* Description */}
                    <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Link / Tag */}
                  <div
                    className={`text-xs font-sora font-semibold flex items-center gap-1.5 pt-4 border-t border-gray-100 dark:border-white/5 ${pillar.linkColor}`}
                  >
                    <span>{pillar.linkText}</span>
                    {pillar.linkIcon === 'arrow' && (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    )}
                    {pillar.linkIcon === 'check' && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1a086d] via-[#241378] to-[#120547] text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-[#312782] overflow-hidden">
          {/* Subtle lighting accents */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#009EE2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#AB2020]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-sora font-bold tracking-widest text-[#93C01F] uppercase block mb-2">
                ¿Planeando tu próxima activación?
              </span>
              <h3 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
                Coordina tu campaña de campo con personal auditado
              </h3>
              <p className="font-manrope text-sm sm:text-base text-gray-300 leading-relaxed">
                Despliegue ágil en Cancún, Playa del Carmen, Mérida y Campeche.
                Asesoría de rutas y aforo sin costo.
              </p>
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-3 bg-[#AB2020] hover:bg-[#8F1B1B] text-white font-sora font-semibold text-sm sm:text-base px-7 py-4 rounded-xl shadow-lg hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
            >
              <span>Cotizar Activación Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
