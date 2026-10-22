import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Trash2,
  Check,
  Search,
  Loader2,
  X,
  ChevronDown,
} from 'lucide-react';
import { getMunicipiosPorEstado, StateSelection } from '../services/geoService';

interface StatePlazaSelectorProps {
  selections: StateSelection[];
  onChange: (selections: StateSelection[]) => void;
}

const PRIMARY_STATES = ['Quintana Roo', 'Yucatán', 'Campeche'];

const ALL_STATE_OPTION = 'En todo el estado';

export const StatePlazaSelector: React.FC<StatePlazaSelectorProps> = ({
  selections,
  onChange,
}) => {
  const [municipiosCache, setMunicipiosCache] = useState<
    Record<string, string[]>
  >({});
  const [loadingMunicipios, setLoadingMunicipios] = useState<
    Record<string, boolean>
  >({});
  const [searchTermPerState, setSearchTermPerState] = useState<
    Record<string, string>
  >({});
  const [openDropdownState, setOpenDropdownState] = useState<string | null>(
    null
  );

  // Cargar municipios para los estados seleccionados utilizando el API
  useEffect(() => {
    selections.forEach((sel) => {
      if (!municipiosCache[sel.estado] && !loadingMunicipios[sel.estado]) {
        setLoadingMunicipios((prev) => ({ ...prev, [sel.estado]: true }));
        getMunicipiosPorEstado(sel.estado)
          .then((munis) => {
            setMunicipiosCache((prev) => ({ ...prev, [sel.estado]: munis }));
          })
          .catch((err) => {
            console.error(`Error cargando municipios para ${sel.estado}:`, err);
          })
          .finally(() => {
            setLoadingMunicipios((prev) => ({ ...prev, [sel.estado]: false }));
          });
      }
    });
  }, [selections, municipiosCache, loadingMunicipios]);

  // Agregar estado de la península
  const handleAddState = (estado: string) => {
    if (!estado) return;
    if (selections.some((s) => s.estado === estado)) {
      return;
    }
    onChange([...selections, { estado, enTodoElEstado: true, municipios: [] }]);
  };

  // Remover estado
  const handleRemoveState = (estado: string) => {
    if (selections.length <= 1) return;
    onChange(selections.filter((s) => s.estado !== estado));
  };

  // Toggle "En todo el estado"
  const handleToggleEnTodoElEstado = (
    estado: string,
    shouldCloseOnActivate = false
  ) => {
    let willActivate = false;
    onChange(
      selections.map((s) => {
        if (s.estado === estado) {
          const nextVal = !s.enTodoElEstado;
          willActivate = nextVal;
          return {
            ...s,
            enTodoElEstado: nextVal,
            // Si se elije "En todo el estado" se deben limpiar los demás municipios
            municipios: nextVal ? [] : s.municipios,
          };
        }
        return s;
      })
    );

    // Si se activa "En todo el estado", se cierra la lista de opciones
    if (willActivate && shouldCloseOnActivate) {
      setOpenDropdownState(null);
      setSearchTermPerState((prev) => ({ ...prev, [estado]: '' }));
    }
  };

  // Toggle municipio individual
  const handleToggleMunicipio = (estado: string, municipio: string) => {
    if (municipio === ALL_STATE_OPTION) {
      handleToggleEnTodoElEstado(estado, true);
      return;
    }

    onChange(
      selections.map((s) => {
        if (s.estado === estado) {
          const exists = s.municipios.includes(municipio);
          const nextMunicipios = exists
            ? s.municipios.filter((m) => m !== municipio)
            : [...s.municipios, municipio];
          return {
            ...s,
            // Si se elije otro municipio, se deselecciona automáticamente "En todo el estado"
            enTodoElEstado: false,
            municipios: nextMunicipios,
          };
        }
        return s;
      })
    );
  };

  // Quitar municipio individual
  const handleRemoveMunicipio = (estado: string, municipio: string) => {
    onChange(
      selections.map((s) => {
        if (s.estado === estado) {
          return {
            ...s,
            municipios: s.municipios.filter((m) => m !== municipio),
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Selector de estados (Quintana Roo, Yucatán, Campeche) */}
      <div>
        <label className="block font-sora text-xs font-bold text-gray-800 mb-2.5 uppercase tracking-wider">
          1. Plaza de Despliegue (Selecciona uno o más estados):
        </label>

        {/* Botones de selección de estado */}
        <div className="grid grid-cols-3 gap-2">
          {PRIMARY_STATES.map((stateName) => {
            const isSelected = selections.some((s) => s.estado === stateName);
            return (
              <button
                key={stateName}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    if (selections.length > 1) {
                      handleRemoveState(stateName);
                    }
                  } else {
                    handleAddState(stateName);
                  }
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-sora font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-xs ring-1 ring-brand-primary/30'
                    : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span className="truncate">{stateName}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-brand-primary stroke-[2.5] shrink-0" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjetas por cada Estado Seleccionado */}
      <div className="space-y-3">
        {selections.map((sel) => {
          const isLoadingMunis = loadingMunicipios[sel.estado];
          const munisList = municipiosCache[sel.estado] || [];
          const searchTerm = searchTermPerState[sel.estado] || '';
          const isDropdownOpen = openDropdownState === sel.estado;

          // Filtrar municipios por término de búsqueda
          const filteredMunis = munisList.filter((m) =>
            m.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Verificar si "En todo el estado" coincide con el término de búsqueda
          const showAllStateOption =
            searchTerm === '' ||
            ALL_STATE_OPTION.toLowerCase().includes(searchTerm.toLowerCase()) ||
            'todo'.includes(searchTerm.toLowerCase()) ||
            'estado'.includes(searchTerm.toLowerCase());

          const totalSelectedCount =
            (sel.enTodoElEstado ? 1 : 0) + sel.municipios.length;

          return (
            <div
              key={sel.estado}
              className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 transition-all duration-200"
            >
              {/* Cabecera del Estado */}
              <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-gray-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sora font-bold text-xs sm:text-sm text-gray-900">
                      {sel.estado}
                    </h4>
                    <span className="text-[11px] font-manrope text-gray-500">
                      {sel.enTodoElEstado
                        ? 'Cobertura en todo el estado'
                        : sel.municipios.length > 0
                          ? `${sel.municipios.length} municipio(s) seleccionado(s)`
                          : 'Sin municipios seleccionados'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveState(sel.estado)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Quitar este estado"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Selector de Municipios */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-sora font-semibold text-gray-600">
                  <span>Municipios o cobertura ({sel.estado}):</span>
                  {isLoadingMunis && (
                    <span className="flex items-center gap-1 text-brand-primary text-[10px]">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Cargando municipios...
                    </span>
                  )}
                </div>

                {/* Chips de municipios y opción "En todo el estado" seleccionados */}
                {totalSelectedCount > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white border border-gray-200/80">
                    {/* Chip "En todo el estado" si está activo */}
                    {sel.enTodoElEstado && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sora font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/30">
                        <span>En todo el estado</span>
                        <button
                          type="button"
                          onClick={() => handleToggleEnTodoElEstado(sel.estado)}
                          className="p-0.5 hover:bg-brand-primary/20 rounded text-brand-primary transition-colors"
                          title="Quitar En todo el estado"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {/* Chips de municipios individuales */}
                    {sel.municipios.map((muni) => (
                      <span
                        key={muni}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sora font-medium bg-gray-100 text-gray-800 border border-gray-200"
                      >
                        <span>{muni}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveMunicipio(sel.estado, muni)
                          }
                          className="p-0.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                          title={`Quitar ${muni}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Buscador y botón para abrir la lista desplegable */}
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={`Buscar municipio o 'En todo el estado' en ${sel.estado}...`}
                        value={searchTerm}
                        onFocus={() => setOpenDropdownState(sel.estado)}
                        onChange={(e) => {
                          setSearchTermPerState((prev) => ({
                            ...prev,
                            [sel.estado]: e.target.value,
                          }));
                          setOpenDropdownState(sel.estado);
                        }}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownState(isDropdownOpen ? null : sel.estado)
                      }
                      className="px-3 py-2 rounded-xl text-xs font-sora font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                    >
                      <span>Opciones ({munisList.length + 1})</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Menú desplegable de opciones (incluye "En todo el estado" y municipios del API) */}
                  {isDropdownOpen && (
                    <div className="absolute z-30 mt-1 w-full max-h-60 overflow-y-auto rounded-xl bg-white border border-gray-200 shadow-xl p-2 space-y-1">
                      {isLoadingMunis ? (
                        <div className="py-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                          <span>Cargando municipios...</span>
                        </div>
                      ) : (
                        <>
                          <div className="px-2 py-1 flex items-center justify-between text-[10px] text-gray-400 font-manrope border-b border-gray-100 mb-1">
                            <span>Haz clic para seleccionar o quitar</span>
                            <span>
                              {filteredMunis.length +
                                (showAllStateOption ? 1 : 0)}{' '}
                              opciones
                            </span>
                          </div>

                          {/* 1. OPCIÓN "En todo el estado" al inicio de la lista */}
                          {showAllStateOption && (
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleEnTodoElEstado(sel.estado, true)
                              }
                              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-sora flex items-center justify-between transition-colors mb-1 ${
                                sel.enTodoElEstado
                                  ? 'bg-brand-primary/15 text-brand-primary font-bold border border-brand-primary/30'
                                  : 'bg-surface-low hover:bg-brand-primary/10 text-brand-primary font-semibold'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                <span>
                                  {ALL_STATE_OPTION} ({sel.estado})
                                </span>
                              </div>
                              {sel.enTodoElEstado && (
                                <Check className="w-3.5 h-3.5 text-brand-primary shrink-0 stroke-[2.5]" />
                              )}
                            </button>
                          )}

                          {/* 2. LISTA DE MUNICIPIOS OBTENIDOS POR API */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 border-t border-gray-100">
                            {filteredMunis.map((muni) => {
                              const isChecked = sel.municipios.includes(muni);
                              return (
                                <button
                                  key={muni}
                                  type="button"
                                  onClick={() =>
                                    handleToggleMunicipio(sel.estado, muni)
                                  }
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-sora flex items-center justify-between transition-colors ${
                                    isChecked
                                      ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                                      : 'hover:bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  <span className="truncate pr-2">{muni}</span>
                                  {isChecked && (
                                    <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}

                      <div className="pt-2 border-t border-gray-100 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setOpenDropdownState(null)}
                          className="px-3 py-1 text-[11px] font-sora font-semibold text-brand-primary hover:underline"
                        >
                          Listo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {totalSelectedCount === 0 && (
                  <p className="text-[11px] font-manrope text-amber-600 italic">
                    * Selecciona "En todo el estado" o uno o más municipios
                    específicos.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
