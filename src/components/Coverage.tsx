import React from 'react';
import { MapPin, Truck, CheckCircle2, Shield, Compass } from 'lucide-react';

export const Coverage: React.FC = () => {
  const hubs = [
    {
      state: 'Quintana Roo',
      hubCity: 'Cancún & Riviera Maya',
      cities: [
        'Cancún (Benito Juárez)',
        'Playa del Carmen (Solidaridad)',
        'Tulum',
        'Chetumal',
        'Cozumel e Isla Mujeres',
        'Puerto Morelos y Felipe Carrillo Puerto',
      ],
      accent: 'border-[#009EE2]/30 dark:border-[#009EE2]/40',
      badgeBg: 'bg-[#009EE2]/10 text-[#009EE2] border-[#009EE2]/30',
      gradient:
        'from-[#009EE2]/10 dark:from-[#009EE2]/15 via-white dark:via-transparent to-white dark:to-transparent',
    },
    {
      state: 'Yucatán',
      hubCity: 'Mérida & Zona Metropolitana',
      cities: [
        'Mérida (Norte, Sur, Oriente, Poniente)',
        'Kanasín y Umán',
        'Progreso y Costa Esmeralda',
        'Valladolid',
        'Tizimín',
        'Motul y Ticul',
      ],
      accent: 'border-[#312782]/30 dark:border-[#312782]/60',
      badgeBg:
        'bg-[#312782]/10 dark:bg-[#312782]/30 text-[#312782] dark:text-white border-[#312782]/40 dark:border-[#312782]',
      gradient:
        'from-[#312782]/10 dark:from-[#312782]/25 via-white dark:via-transparent to-white dark:to-transparent',
    },
    {
      state: 'Campeche',
      hubCity: 'Campeche & Carmen',
      cities: [
        'San Francisco de Campeche',
        'Ciudad del Carmen',
        'Champotón',
        'Escárcega',
        'Calkiní y Hecelchakán',
        'Candelaria',
      ],
      accent: 'border-[#AB2020]/30 dark:border-[#AB2020]/40',
      badgeBg: 'bg-[#AB2020]/10 text-[#AB2020] border-[#AB2020]/30',
      gradient:
        'from-[#AB2020]/10 dark:from-[#AB2020]/15 via-white dark:via-transparent to-white dark:to-transparent',
    },
  ];

  return (
    <section
      id="cobertura"
      className="py-24 bg-[#fff8f6] dark:bg-[#1A1413] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#312782]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-[#93C01F] uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#93C01F]" />
            <span>Despliegue Peninsular</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Centro de Despliegue Logístico en{' '}
            <span className="text-[#009EE2]">3 Estados</span>
          </h2>
          <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4">
            Contamos con capacidad operativa autónoma en toda la Península de
            Yucatán para ejecutar activaciones simultáneas con la misma calidad
            y disciplina.
          </p>
        </div>

        {/* 3 Regional Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {hubs.map((hub, index) => (
            <div
              key={index}
              className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#140F0E] border ${hub.accent} bg-gradient-to-b ${hub.gradient} backdrop-blur-md shadow-md dark:shadow-xl flex flex-col justify-between hover:translate-y-[-2px] transition-transform`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-sora font-bold px-3 py-1 rounded-full border ${hub.badgeBg}`}
                  >
                    {hub.state}
                  </span>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>

                <h3 className="font-sora font-bold text-xl text-gray-900 dark:text-white mb-4">
                  {hub.hubCity}
                </h3>

                <p className="font-manrope text-xs text-gray-500 dark:text-gray-400 mb-4 font-semibold uppercase tracking-wider">
                  Puntos de Cobertura Activa:
                </p>

                <ul className="space-y-2.5">
                  {hub.cities.map((city, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#93C01F] shrink-0 mt-0.5" />
                      <span className="font-manrope text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {city}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <Truck className="w-4 h-4 text-[#009EE2]" />
                <span>Rutas y cuadrillas con transporte propio</span>
              </div>
            </div>
          ))}
        </div>

        {/* Foreign Commitment Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#312782] via-[#1A1413] to-[#AB2020] p-1 shadow-2xl">
          <div className="rounded-[14px] bg-[#1A1413]/90 backdrop-blur-md p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#93C01F]/10 border border-[#93C01F]/30 text-[#93C01F] shrink-0">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-sora font-bold text-lg sm:text-xl text-white mb-1">
                  Compromiso de Alcance Peninsular sin Intermediarios
                </h4>
                <p className="font-manrope text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
                  Llegamos a cualquier rincón, cabecera municipal o corredor
                  turístico de la Península con logística propia, supervisión en
                  campo y viáticos transparentes. Tu marca en las manos
                  correctas en cualquier coordenada peninsular.
                </p>
              </div>
            </div>

            <a
              href="#contacto"
              className="shrink-0 px-6 py-3 rounded-xl bg-white text-[#1A1413] hover:bg-gray-100 font-sora font-bold text-sm transition-all duration-200 shadow-md"
            >
              Consultar Ruta Específica
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
