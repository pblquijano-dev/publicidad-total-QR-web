import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { Check, ArrowRight, Maximize2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LocationPin {
  id: string;
  name: string;
  state: 'Quintana Roo' | 'Yucatán' | 'Campeche';
  role: string;
  badge: string;
  description: string;
  color: string;
  lat: number;
  lng: number;
  waText: string;
}

const PINS: LocationPin[] = [
  {
    id: 'merida',
    name: 'Mérida',
    state: 'Yucatán',
    role: 'Sede Central (Matriz)',
    badge: 'Base Operativa',
    description: 'Sede con perifoneo, volanteo masivo y activaciones.',
    color: '#16A34A', // Color Verde para Mérida
    lat: 20.96737,
    lng: -89.59259,
    waText: 'Hola, solicito cotización para Mérida, Yucatán',
  },
  {
    id: 'cancun',
    name: 'Cancún',
    state: 'Quintana Roo',
    role: 'Plaza Comercial & Turística',
    badge: 'Alto Flujo',
    description:
      'Activaciones en plazas comerciales, perifoneo y volanteo de alto impacto con cuadrillas especializadas.',
    color: '#009EE2',
    lat: 21.16191,
    lng: -86.85153,
    waText: 'Hola, solicito cotización para Cancún, Quintana Roo',
  },
  {
    id: 'puerto-morelos',
    name: 'Puerto Morelos',
    state: 'Quintana Roo',
    role: 'Corredor Turístico',
    badge: 'Riviera Maya',
    description:
      'Campañas de posicionamiento en accesos estratégicos, tiendas y desarrollos turísticos.',
    color: '#009EE2',
    lat: 20.85408,
    lng: -86.87449,
    waText: 'Hola, solicito cotización para Puerto Morelos, Quintana Roo',
  },
  {
    id: 'playa-del-carmen',
    name: 'Playa del Carmen',
    state: 'Quintana Roo',
    role: 'Corredor Riviera Maya',
    badge: 'Comercial & Eventos',
    description:
      'Edecanes, promotores y perifoneo en avenidas principales, ferias y zonas de alta afluencia.',
    color: '#009EE2',
    lat: 20.62956,
    lng: -87.07389,
    waText: 'Hola, solicito cotización para Playa del Carmen, Quintana Roo',
  },
  {
    id: 'campeche',
    name: 'Campeche',
    state: 'Campeche',
    role: 'Sede Estatal',
    badge: 'Operativos Programados',
    description: 'Operativos comerciales y campañas foráneas programadas.',
    color: '#AB2020',
    lat: 19.83013,
    lng: -90.53491,
    waText: 'Hola, solicito cotización para Campeche, Campeche',
  },
];

// Estilos oscuros para Google Maps
const darkMapStyle: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1A1413' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1A1413' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#c5c0ff' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9c94f4' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#120547' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#312782' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#231577' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d8e3fb' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#423993' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1a086d' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#002337' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#009EE2' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#002337' }],
  },
];

// Estilos claros para Google Maps
const lightMapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9e6ff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#cbd5e1' }],
  },
];

// Generador de íconos SVG personalizados de Google Maps para cada pin
const createMarkerIcon = (color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <path d="M16 0C7.16 0 0 7.16 0 16c0 11.5 14.5 24.8 15.1 25.4.5.5 1.3.5 1.8 0C17.5 40.8 32 27.5 32 16 32 7.16 24.84 0 16 0z" fill="${color}" filter="url(#shadow)"/>
      <circle cx="16" cy="15" r="7" fill="#ffffff"/>
      <circle cx="16" cy="15" r="3.5" fill="${color}"/>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(32, 42),
    anchor: new google.maps.Point(16, 42),
  };
};

export const Coverage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [activePin, setActivePin] = useState<LocationPin | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const initialDarkRef = useRef(isDark);

  // Inicialización de la API de Google Maps
  useEffect(() => {
    let isMounted = true;

    try {
      setOptions({
        key: (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '',
        v: 'weekly',
      });

      Promise.all([importLibrary('maps'), importLibrary('marker')])
        .then(([mapsLib, markerLib]) => {
          if (!isMounted || !mapContainerRef.current) return;

          const defaultCenter = { lat: 20.65, lng: -88.75 };

          const map = new mapsLib.Map(mapContainerRef.current, {
            center: defaultCenter,
            zoom: 7,
            styles: initialDarkRef.current ? darkMapStyle : lightMapStyle,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          });

          mapInstanceRef.current = map;
          const infoWindow = new mapsLib.InfoWindow();
          infoWindowRef.current = infoWindow;

          // Crear pines nativos de la API de Google Maps
          PINS.forEach((pin) => {
            const marker = new markerLib.Marker({
              position: { lat: pin.lat, lng: pin.lng },
              map,
              title: pin.name,
              icon: createMarkerIcon(pin.color),
            });

            marker.addListener('click', () => {
              setActivePin(pin);
              infoWindow.setContent(`
                <div style="font-family: 'Manrope', sans-serif; padding: 6px; max-width: 240px; color: #1A1413;">
                  <div style="display: inline-block; background-color: ${pin.color}20; color: ${pin.color}; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 6px; font-family: 'Sora', sans-serif; margin-bottom: 4px; text-transform: uppercase;">
                    ${pin.badge}
                  </div>
                  <h4 style="font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; margin: 0 0 2px 0; color: #1A1413;">
                    ${pin.name}
                  </h4>
                  <p style="font-size: 11px; color: #666; margin: 0 0 8px 0;">
                    ${pin.state} • ${pin.role}
                  </p>
                  <p style="font-size: 11px; color: #333; line-height: 1.4; margin: 0 0 10px 0;">
                    ${pin.description}
                  </p>
                  <a href="https://wa.me/529981071359?text=${encodeURIComponent(pin.waText)}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background-color: ${pin.color}; color: #ffffff; font-size: 11px; font-weight: bold; font-family: 'Sora', sans-serif; padding: 6px 12px; border-radius: 8px; text-decoration: none;">
                    Cotizar en ${pin.name}
                  </a>
                </div>
              `);
              infoWindow.open(map, marker);
            });

            markersRef.current[pin.id] = marker;
          });

          setMapLoaded(true);
        })
        .catch((err: unknown) => {
          console.error('Error cargando Google Maps API:', err);
          if (isMounted) {
            setMapError(true);
          }
        });
    } catch (err: unknown) {
      console.error('Error inicializando Google Maps API:', err);
      if (isMounted) {
        setMapError(true);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Actualizar tema del mapa de Google Maps dinámicamente
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setOptions({
        styles: isDark ? darkMapStyle : lightMapStyle,
      });
    }
  }, [isDark]);

  // Enfocar un pin en el mapa
  const focusPin = (pin: LocationPin) => {
    setActivePin(pin);
    const map = mapInstanceRef.current;
    const marker = markersRef.current[pin.id];

    if (map && marker) {
      map.panTo({ lat: pin.lat, lng: pin.lng });
      map.setZoom(10);

      if (infoWindowRef.current) {
        infoWindowRef.current.setContent(`
          <div style="font-family: 'Manrope', sans-serif; padding: 6px; max-width: 240px; color: #1A1413;">
            <div style="display: inline-block; background-color: ${pin.color}20; color: ${pin.color}; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 6px; font-family: 'Sora', sans-serif; margin-bottom: 4px; text-transform: uppercase;">
              ${pin.badge}
            </div>
            <h4 style="font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; margin: 0 0 2px 0; color: #1A1413;">
              ${pin.name}
            </h4>
            <p style="font-size: 11px; color: #666; margin: 0 0 8px 0;">
              ${pin.state} • ${pin.role}
            </p>
            <p style="font-size: 11px; color: #333; line-height: 1.4; margin: 0 0 10px 0;">
              ${pin.description}
            </p>
            <a href="https://wa.me/529981071359?text=${encodeURIComponent(pin.waText)}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background-color: ${pin.color}; color: #ffffff; font-size: 11px; font-weight: bold; font-family: 'Sora', sans-serif; padding: 6px 12px; border-radius: 8px; text-decoration: none;">
              Cotizar en ${pin.name}
            </a>
          </div>
        `);
        infoWindowRef.current.open(map, marker);
      }
    }
  };

  // Restablecer la vista completa de la Península
  const resetMapView = () => {
    setActivePin(null);
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: 20.65, lng: -88.75 });
      mapInstanceRef.current.setZoom(7);
    }
  };

  return (
    <section
      id="cobertura"
      className="w-full py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-brand-dark transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-primary/5 dark:bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-brand-cyan/5 dark:bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header de Sección */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="bg-indigo-50 dark:bg-brand-primary/20 text-[#312782] dark:text-brand-primary-soft font-semibold text-xs px-3.5 py-1.5 rounded-full inline-block mb-3 border border-indigo-100 dark:border-brand-primary/40 font-sora">
            • COBERTURA REGIONAL EN MAPA
          </span>
          <h2 className="font-sora text-[#312782] dark:text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Zonas de Cobertura en la Península
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-3 font-manrope">
            Visualiza nuestro radio operativo activo en Quintana Roo, Yucatán y
            Campeche.
          </p>
        </div>

        {/* Contenedor del Mapa con la API de Google Maps y Pines Nativos */}
        <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg mb-6 group/map">
          {/* Contenedor nativo para Google Maps */}
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Fallback en caso de bloqueo de red */}
          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-brand-dark-surface p-6 text-center">
              <div>
                <p className="font-sora font-bold text-base text-gray-800 dark:text-white mb-2">
                  Mapa Interactivo de la Península
                </p>
                <p className="font-manrope text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Cargando visualización de zonas operativas.
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1912440.3204928224!2d-89.28448839077054!3d20.46313936665796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1728695000000!5m2!1ses-419!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Mapa de Cobertura"
                  className="w-full h-80 rounded-2xl filter saturate-105"
                />
              </div>
            </div>
          )}

          {/* Badge Superior Izquierdo: Leyenda de Sede y Plazas */}
          <div className="bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 text-xs font-semibold text-gray-800 dark:text-gray-200 font-manrope">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
              <span>Mérida (Matriz)</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#009EE2]" />
              <span>Cancún • P. Morelos • Playa del Carmen</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#AB2020]" />
              <span>Campeche</span>
            </div>
          </div>

          {/* Botón Superior Derecho para restablecer vista completa */}
          {mapLoaded && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={resetMapView}
                className="bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-white/10 flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/10 transition-all font-sora cursor-pointer active:scale-95"
                title="Restablecer vista a toda la Península"
              >
                <Maximize2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:inline">Vista Peninsular</span>
              </button>
            </div>
          )}
        </div>

        {/* Barra de Selección Rápida de Plazas para Móviles y Escritorio */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs font-sora font-semibold text-gray-500 dark:text-gray-400 mr-1">
            Puntos con cobertura:
          </span>
          {PINS.map((pin) => {
            const isSelected = activePin?.id === pin.id;

            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => focusPin(pin)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sora font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-md scale-105'
                    : 'bg-white dark:bg-brand-dark-surface text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: pin.color }}
                />
                <span>{pin.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjetas de Cobertura por Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* QUINTANA ROO */}
          <article className="bg-[#F8F9FA] dark:bg-brand-dark-surface rounded-2xl p-6 sm:p-7 border-t-4 border-[#009EE2] border-x border-b border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[#009EE2] font-bold text-xs uppercase tracking-wider block font-sora">
                ESTADO
              </span>
              <h3 className="font-sora text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
                Quintana Roo
              </h3>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2.5 font-manrope">
                Ciudades con cobertura:
              </span>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    const p = PINS.find((item) => item.id === 'cancun');
                    if (p) focusPin(p);
                  }}
                  className="w-full text-left bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-3.5 py-2.5 rounded-xl shadow-xs flex items-center justify-between gap-2 mb-2 text-sm font-manrope hover:border-[#009EE2] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#009EE2] shrink-0 stroke-[2.5]" />
                    <span>Cancún</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-sora">
                    Ver en mapa
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const p = PINS.find((item) => item.id === 'puerto-morelos');
                    if (p) focusPin(p);
                  }}
                  className="w-full text-left bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-3.5 py-2.5 rounded-xl shadow-xs flex items-center justify-between gap-2 mb-2 text-sm font-manrope hover:border-[#009EE2] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#009EE2] shrink-0 stroke-[2.5]" />
                    <span>Puerto Morelos</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-sora">
                    Ver en mapa
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const p = PINS.find(
                      (item) => item.id === 'playa-del-carmen'
                    );
                    if (p) focusPin(p);
                  }}
                  className="w-full text-left bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-3.5 py-2.5 rounded-xl shadow-xs flex items-center justify-between gap-2 mb-2 text-sm font-manrope hover:border-[#009EE2] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#009EE2] shrink-0 stroke-[2.5]" />
                    <span>Playa del Carmen</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-sora">
                    Ver en mapa
                  </span>
                </button>
              </div>
            </div>
            <a
              className="w-full mt-6 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 font-manrope group"
              href="https://wa.me/529981071359?text=Hola%2C%20solicito%20cotizaci%C3%B3n%20para%20Quintana%20Roo"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Cotizar en Quintana Roo</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 transition-transform group-hover:translate-x-1" />
            </a>
          </article>

          {/* YUCATÁN */}
          <article className="bg-[#F8F9FA] dark:bg-brand-dark-surface rounded-2xl p-6 sm:p-7 border-t-4 border-[#16A34A] border-x border-b border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[#16A34A] dark:text-emerald-400 font-bold text-xs uppercase tracking-wider block font-sora">
                SEDE CENTRAL
              </span>
              <h3 className="font-sora text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
                Yucatán
              </h3>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2.5 font-manrope">
                Ciudad con cobertura:
              </span>
              <button
                type="button"
                onClick={() => {
                  const p = PINS.find((item) => item.id === 'merida');
                  if (p) focusPin(p);
                }}
                className="w-full text-left bg-white dark:bg-brand-dark-card border border-[#16A34A]/30 dark:border-emerald-500/40 text-[#16A34A] dark:text-emerald-400 font-bold px-4 py-3 rounded-xl shadow-xs flex items-center justify-between gap-2 text-base font-manrope hover:border-[#16A34A] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#16A34A] dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>Mérida</span>
                </div>
                <span className="text-[10px] text-gray-400 font-sora">
                  Ver en mapa
                </span>
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed font-manrope">
                Sede con perifoneo, volanteo masivo y activaciones.
              </p>
            </div>
            <a
              className="w-full mt-6 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 font-manrope group"
              href="https://wa.me/529981071359?text=Hola%2C%20solicito%20cotizaci%C3%B3n%20para%20Yucat%C3%A1n"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Cotizar en Yucatán</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 transition-transform group-hover:translate-x-1" />
            </a>
          </article>

          {/* CAMPECHE */}
          <article className="bg-[#F8F9FA] dark:bg-brand-dark-surface rounded-2xl p-6 sm:p-7 border-t-4 border-[#AB2020] border-x border-b border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[#AB2020] dark:text-red-400 font-bold text-xs uppercase tracking-wider block font-sora">
                ESTADO
              </span>
              <h3 className="font-sora text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
                Campeche
              </h3>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2.5 font-manrope">
                Ciudad con cobertura:
              </span>
              <button
                type="button"
                onClick={() => {
                  const p = PINS.find((item) => item.id === 'campeche');
                  if (p) focusPin(p);
                }}
                className="w-full text-left bg-white dark:bg-brand-dark-card border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-4 py-3 rounded-xl shadow-xs flex items-center justify-between gap-2 text-base font-manrope hover:border-[#AB2020] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#AB2020] dark:text-red-400 shrink-0 stroke-[2.5]" />
                  <span>Campeche</span>
                </div>
                <span className="text-[10px] text-gray-400 font-sora">
                  Ver en mapa
                </span>
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed font-manrope">
                Operativos comerciales y campañas foráneas programadas.
              </p>
            </div>
            <a
              className="w-full mt-6 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 font-manrope group"
              href="https://wa.me/529981071359?text=Hola%2C%20solicito%20cotizaci%C3%B3n%20para%20Campeche"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Cotizar en Campeche</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        </div>

        {/* Banner de Cobertura Foránea */}
        <aside className="bg-gradient-to-r from-[#1A1413] via-[#231577] to-[#312782] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md max-w-6xl mx-auto border border-brand-primary/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col relative z-10 text-center sm:text-left">
            <h3 className="font-sora font-bold text-lg sm:text-xl text-white">
              ¿Requieres activación en otro municipio de la Península?
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 font-manrope max-w-2xl">
              Coordinamos el traslado de unidades de perifoneo y personal con
              viáticos transparentes.
            </p>
          </div>
          <a
            className="bg-[#AB2020] hover:bg-[#8F1B1B] text-white font-semibold rounded-xl px-6 py-3 text-xs transition-colors shadow-md whitespace-nowrap shrink-0 font-sora relative z-10 hover:shadow-lg active:scale-95"
            href="https://wa.me/529981071359?text=Hola%2C%20deseo%20consultar%20cobertura%20for%C3%A1nea"
            rel="noopener noreferrer"
            target="_blank"
          >
            Consultar Cobertura Foránea
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Coverage;
