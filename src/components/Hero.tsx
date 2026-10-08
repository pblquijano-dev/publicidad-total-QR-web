import React from 'react';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const kpiList = [
    {
      icon: Users,
      value: '+10,000',
      label: 'Impactos / Volantes por día',
      accent: 'text-[#009EE2]',
    },
    {
      icon: MapPin,
      value: '3 Estados',
      label: 'Quintana Roo, Yucatán y Campeche',
      accent: 'text-[#93C01F]',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Equipo y personal propio capacitado',
      accent: 'text-[#009EE2]',
    },
    {
      icon: FileCheck2,
      value: 'Auditado',
      label: 'Reporte fotográfico y monitoreo GPS',
      accent: 'text-[#93C01F]',
    },
  ];

  const heroBgUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1UAzO7NtqFecGgTOEeBkgb5frOMq6gwU6ei1i34OSiznLr7kG4XBBkXW3U4uzeJmCV8Lsxnzd55DwaaGyAtplSAo7pTxQ2l2USfk2zZJ03GZ9KDq7RM6Low6yW0Tqi_mCBJi7MEOhsTzgu5NVyLx1JNtjJ8eAFl8OiN9DZ2TRlB6XkWuhwC3iRnByUOMNza38XzKxuSic0UQAZ6T-kUGj91rtDByD-Y4uqcVaAw25xuyQgzBZSVkihS9A';

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* Background Image & Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroBgUrl}
          alt="Activación BTL y eventos en vivo"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1413]/95 via-[#1A1413]/85 to-[#312782]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1413] via-transparent to-transparent" />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#009EE2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-[#AB2020]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-gray-200 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#93C01F]" />
            <span>Agencia Líder en Marketing de Campo & BTL</span>
          </div>

          {/* Main Title H1 */}
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Hacemos Visible tu Marca en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009EE2] via-white to-[#93C01F]">
              Toda la Península
            </span>{' '}
            de Yucatán
          </h1>

          {/* Subtitle */}
          <p className="font-manrope text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-normal max-w-2xl">
            Especialistas en activaciones BTL de alto impacto, perifoneo
            estratégico, edecanes profesionales y volanteo masivo auditado en
            Quintana Roo, Yucatán y Campeche. Llevamos tu mensaje directo al
            consumidor.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#AB2020] hover:bg-[#c42525] text-white font-sora font-bold text-base transition-all duration-300 shadow-lg shadow-[#AB2020]/40 hover:shadow-xl hover:shadow-[#AB2020]/60 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Cotizar Campaña BTL</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sora font-semibold text-base backdrop-blur-md border border-white/20 transition-all duration-300 hover:border-white/40"
            >
              Ver Servicios
            </a>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#1A1413]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {kpiList.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-2 rounded-lg"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
                  <IconComponent className={`w-5 h-5 ${kpi.accent}`} />
                </div>
                <div>
                  <div className="font-sora font-extrabold text-xl sm:text-2xl text-white leading-tight">
                    {kpi.value}
                  </div>
                  <div className="font-manrope text-xs sm:text-sm text-gray-400 mt-0.5 leading-snug">
                    {kpi.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
