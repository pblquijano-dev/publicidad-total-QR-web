import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { MessageCircle, X } from 'lucide-react';
import type { GeoJsonObject } from 'geojson';
import peninsulaGeo from '../data/peninsula.json';
import { ScrollReveal } from './ScrollReveal';

interface StateCoverageInfo {
  id: 'yucatan' | 'quintana-roo' | 'campeche';
  name: 'Yucatán' | 'Quintana Roo' | 'Campeche';
  tag: string;
  badge: string;
  color: string;
  hoverColor: string;
  activeColor: string;
  centroid: [number, number];
  description: string;
  waText: string;
}

const STATE_COVERAGE: Record<string, StateCoverageInfo> = {
  'Quintana Roo': {
    id: 'quintana-roo',
    name: 'Quintana Roo',
    tag: 'Corredor Turístico & Comercial',
    badge: 'Máximo Impacto',
    color: '#009EE2',
    hoverColor: '#38bdf8',
    activeColor: '#0284c7',
    centroid: [-88.12, 19.67],
    description:
      'Cobertura líder en el polo comercial y turístico del Caribe Mexicano con activaciones de marca, perifoneo móvil, edecanes de imagen y volanteo masivo.',
    waText:
      'Hola, solicito cotización para una campaña en el estado de Quintana Roo',
  },
  Yucatán: {
    id: 'yucatan',
    name: 'Yucatán',
    tag: 'Sede Central (Matriz)',
    badge: 'Base Operativa',
    color: '#16A34A',
    hoverColor: '#22c55e',
    activeColor: '#15803d',
    centroid: [-88.93, 20.78],
    description:
      'Nuestra matriz operativa con capacidad de despliegue masivo e inmediato para perifoneo móvil de alta fidelidad, volanteo supervisado y eventos comerciales BTL.',
    waText:
      'Hola, solicito cotización para una campaña en el estado de Yucatán',
  },
  Campeche: {
    id: 'campeche',
    name: 'Campeche',
    tag: 'Sede Estatal',
    badge: 'Operativos Programados',
    color: '#AB2020',
    hoverColor: '#dc2626',
    activeColor: '#991b1b',
    centroid: [-90.31, 18.83],
    description:
      'Operativos foráneos programados y campañas estratégicas con personal capacitado y unidades de audio en los principales municipios del estado.',
    waText:
      'Hola, solicito cotización para una campaña en el estado de Campeche',
  },
};

export const Coverage: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Manejar clic en un estado
  const handleStateClick = (stateName: string) => {
    if (STATE_COVERAGE[stateName]) {
      setSelectedState((prev) => (prev === stateName ? null : stateName));
    }
  };

  const activeStateInfo = selectedState ? STATE_COVERAGE[selectedState] : null;

  return (
    <section
      id="cobertura"
      className="w-full pt-20 lg:pt-24 bg-[#99E0FF] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="w-full relative z-10">
        {/* Header de Sección */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-[#092652]/10 text-[#092652] font-semibold text-xs px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#092652]/20 font-sora">
              • COBERTURA REGIONAL EN MAPA
            </span>
            <h2 className="font-sora text-[#092652] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              Cobertura Publicitaria en la Península de Yucatán
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3 font-manrope">
              Interactúa directamente con el mapa para consultar la información
              operativa de Quintana Roo, Yucatán y Campeche.
            </p>
          </div>
        </ScrollReveal>

        {/* Contenedor del Mapa con react-simple-maps */}
        <ScrollReveal animation="zoom-in" duration={800}>
          <div className="relative w-full overflow-hidden bg-[#99E0FF] group/map select-none">
            {/* Mapa SVG de react-simple-maps */}
            <div className="w-full h-[450px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 4700,
                  center: [-89.15, 19.8],
                }}
                width={800}
                height={520}
                className="w-full h-full max-h-[580px]"
              >
                {/* Geografías de la Península */}
                <Geographies
                  geography={peninsulaGeo as unknown as GeoJsonObject}
                >
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = (geo.properties?.name as string) || '';
                      const stateInfo = STATE_COVERAGE[stateName];
                      const isPeninsula = Boolean(stateInfo);

                      // Colores para estados vecinos fuera de la Península
                      let fill = '#F2F4F8';
                      const stroke = '#A4B6CB';
                      let strokeWidth = 0.8;
                      let cursor = 'default';

                      if (isPeninsula) {
                        const isSelected = selectedState === stateName;
                        const isHovered = hoveredState === stateName;

                        fill = isSelected
                          ? stateInfo.activeColor
                          : isHovered
                            ? stateInfo.hoverColor
                            : stateInfo.color;

                        strokeWidth = isSelected ? 3 : 1.8;
                        cursor = 'pointer';
                      }

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={strokeWidth}
                          className="outline-none transition-all duration-200"
                          style={{
                            cursor,
                            fillOpacity: isPeninsula
                              ? selectedState && selectedState !== stateName
                                ? 0.55
                                : 0.95
                              : 0.45,
                          }}
                          onMouseEnter={() => {
                            if (isPeninsula) setHoveredState(stateName);
                          }}
                          onMouseLeave={() => {
                            if (isPeninsula) setHoveredState(null);
                          }}
                          onClick={() => {
                            if (isPeninsula) handleStateClick(stateName);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Rótulos Centrales de Nombres de Estados */}
                {Object.values(STATE_COVERAGE).map((state) => {
                  const isSelected = selectedState === state.name;

                  return (
                    <Marker
                      key={state.id}
                      coordinates={state.centroid}
                      onClick={() => handleStateClick(state.name)}
                      className="cursor-pointer group/label"
                    >
                      <text
                        textAnchor="middle"
                        className={`font-sora tracking-widest fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none uppercase transition-all duration-200 ${
                          isSelected
                            ? 'text-[15px] sm:text-[17px] font-extrabold fill-yellow-200'
                            : 'text-[12px] sm:text-[14px] font-bold fill-white group-hover/label:scale-105'
                        }`}
                      >
                        {state.name}
                      </text>
                    </Marker>
                  );
                })}
              </ComposableMap>
            </div>

            {/* Tarjeta Flotante Interactiva de Detalle del Estado Seleccionado */}
            {activeStateInfo && (
              <div className="absolute bottom-4 right-4 sm:right-6 max-w-xs sm:max-w-sm w-[calc(100%-2rem)] bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-gray-200/90 z-30 animate-fadeIn font-manrope">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold font-sora uppercase tracking-wider text-white shadow-xs"
                    style={{ backgroundColor: activeStateInfo.color }}
                  >
                    {activeStateInfo.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    aria-label="Cerrar detalle de estado"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-sora text-xl font-bold text-[#092652]">
                  {activeStateInfo.name}
                </h3>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {activeStateInfo.tag}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                  {activeStateInfo.description}
                </p>

                <a
                  href={`https://wa.me/529981071359?text=${encodeURIComponent(
                    activeStateInfo.waText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-white font-sora font-bold text-xs transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                  style={{ backgroundColor: activeStateInfo.color }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Cotizar en {activeStateInfo.name}</span>
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Coverage;
