import React from 'react';
import {
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Navigation,
  Sparkles,
  Award,
  Radio,
} from 'lucide-react';

export const About: React.FC = () => {
  const comparisons = [
    {
      bad: 'Volantes tirados en la basura o entregados sin filtro de público meta.',
      good: 'Entrega mano a mano focalizada con segmentación de audiencia real.',
    },
    {
      bad: 'Sin evidencia ni certeza de las rutas recorridas por el personal.',
      good: 'Supervisión en campo, bitácoras y reporte fotográfico con geolocalización.',
    },
    {
      bad: 'Personal improvisado, sin uniforme y sin conocimiento de la marca.',
      good: 'Edecanes, promotores y animadores capacitados con uniforme institucional.',
    },
    {
      bad: 'Equipos de audio deficientes y unidades con fallas mecánicas.',
      good: 'Flota móvil moderna equipada con audio profesional de alta fidelidad.',
    },
  ];

  const bentoItems = [
    {
      icon: Navigation,
      title: 'Auditoría y GPS en Tiempo Real',
      description:
        'Cada activación y ruta de perifoneo cuenta con trazabilidad satelital y supervisión activa en campo para garantizar la cobertura pactada.',
      badge: 'Certeza 100%',
      gradient:
        'from-[#312782]/10 dark:from-[#312782]/40 to-white dark:to-[#1A1413]/60',
      border: 'border-[#312782]/20 dark:border-[#312782]/40',
      iconColor: 'text-[#009EE2]',
    },
    {
      icon: Award,
      title: 'Personal Seleccionado y Capacitado',
      description:
        'Edecanes, animadores, promotores y choferes con excelente presentación y entrenamiento previo sobre los beneficios de tu producto.',
      badge: 'Imagen Impecable',
      gradient:
        'from-[#AB2020]/10 dark:from-[#AB2020]/20 to-white dark:to-[#1A1413]/60',
      border: 'border-[#AB2020]/20 dark:border-[#AB2020]/40',
      iconColor: 'text-[#AB2020]',
    },
    {
      icon: Radio,
      title: 'Potencia de Audio y Claridad Sonora',
      description:
        'Perifoneo móvil con plantas de poder autónomas y bocinas de compresión marina que entregan spots nítidos sin distorsión.',
      badge: 'Alta Fidelidad',
      gradient:
        'from-[#009EE2]/10 dark:from-[#009EE2]/20 to-white dark:to-[#1A1413]/60',
      border: 'border-[#009EE2]/20 dark:border-[#009EE2]/40',
      iconColor: 'text-[#009EE2]',
    },
    {
      icon: ShieldCheck,
      title: 'Cumplimiento Legal y Logística Integral',
      description:
        'Coordinación de permisos municipales en las 3 entidades peninsulares y respaldo logístico para activaciones sin contratiempos.',
      badge: 'Cero Riesgos',
      gradient:
        'from-[#93C01F]/10 dark:from-[#93C01F]/20 to-white dark:to-[#1A1413]/60',
      border: 'border-[#93C01F]/20 dark:border-[#93C01F]/40',
      iconColor: 'text-[#93C01F]',
    },
  ];

  return (
    <section
      id="nosotros"
      className="py-24 bg-[#fff8f6] dark:bg-[#1A1413] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#312782]/10 dark:bg-[#312782]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#009EE2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-[#009EE2] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#93C01F]" />
            <span>Manifiesto Operativo BTL</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            El Estándar que Transforma la Publicidad en{' '}
            <span className="text-[#009EE2]">Ventas Reales</span>
          </h2>
          <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            Eliminamos la informalidad del marketing de calle. Diseñamos
            estrategias presenciales con disciplina militar, supervisión
            continua y resultados medibles en cada punto de contacto.
          </p>
        </div>

        {/* Comparison Block */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-sora text-2xl font-bold text-gray-900 dark:text-white">
              ¿Por qué elegir un estándar profesional?
            </h3>
            <p className="font-manrope text-sm text-gray-500 dark:text-gray-400 mt-1">
              Compara la publicidad tradicional no auditada contra nuestro
              modelo Q&R
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* The Old Way */}
            <div className="p-6 sm:p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-3 pb-5 border-b border-red-200 dark:border-red-900/30 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400 border border-red-500/20">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-lg text-red-900 dark:text-red-200">
                    La vieja publicidad informal
                  </h4>
                  <p className="font-manrope text-xs text-red-600 dark:text-red-400/80">
                    Riesgo de presupuesto tirado y daño a la imagen de tu marca
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="font-manrope text-sm text-gray-700 dark:text-gray-300 leading-snug">
                      {item.bad}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Q&R Standard */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#312782]/20 border border-[#312782]/20 dark:border-[#312782]/40 backdrop-blur-sm shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#93C01F]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 pb-5 border-b border-gray-100 dark:border-white/10 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#93C01F]/10 flex items-center justify-center text-[#93C01F] border border-[#93C01F]/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-lg text-gray-900 dark:text-white">
                    El Estándar Publicidad Total Q&R
                  </h4>
                  <p className="font-manrope text-xs text-[#93C01F]">
                    Garantía de impacto, reporte fotográfico y retorno
                    comprobable
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#93C01F] shrink-0 mt-0.5" />
                    <p className="font-manrope text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">
                      {item.good}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Certezas Operativas */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-sora text-2xl font-bold text-gray-900 dark:text-white">
              Certezas Operativas de Campo
            </h3>
            <p className="font-manrope text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pilares de infraestructura que aseguran la excelencia en cada
              activación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bentoItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-gradient-to-b ${item.gradient} border ${item.border} backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-md`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-white group-hover:scale-110 transition-transform">
                        <IconComp className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <span className="text-[11px] font-semibold font-manrope px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-black/5 dark:border-white/10">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-sora font-bold text-base text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="font-manrope text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
