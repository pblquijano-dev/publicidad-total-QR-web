// Servicio para consultar Estados y Municipios de México a través de API pública
// Fuente: Base de datos oficial INEGI estructurada en JSON

const API_URL =
  'https://cdn.jsdelivr.net/gh/cisnerosnow/json-estados-municipios-mexico@master/estados-municipios.json';

// Fallback local en caso de falla de red o uso offline
const FALLBACK_DATA: Record<string, string[]> = {
  'Quintana Roo': [
    'Benito Juárez (Cancún)',
    'Playa del Carmen (Solidaridad)',
    'Tulum',
    'Cozumel',
    'Othón P. Blanco (Chetumal)',
    'Isla Mujeres',
    'Puerto Morelos',
    'Bacalar',
    'Felipe Carrillo Puerto',
    'José María Morelos',
    'Lázaro Cárdenas (Holbox)',
  ],
  Yucatán: [
    'Mérida',
    'Valladolid',
    'Progreso',
    'Tizimín',
    'Kanasín',
    'Umán',
    'Motul',
    'Izamal',
    'Tekax',
    'Ticul',
    'Hunucmá',
    'Chemax',
    'Maxcanú',
    'Oxkutzcab',
    'Espita',
  ],
  Campeche: [
    'Campeche',
    'Carmen (Cd. del Carmen)',
    'Champotón',
    'Calkiní',
    'Escárcega',
    'Hecelchakán',
    'Hopelchén',
    'Palizada',
    'Tenabo',
    'Candelaria',
    'Calakmul',
    'Dzitbalché',
    'Seybaplaya',
  ],
};

let cachedData: Record<string, string[]> | null = null;
let pendingPromise: Promise<Record<string, string[]>> | null = null;

export async function fetchStatesAndMunicipalities(): Promise<
  Record<string, string[]>
  > {
  if (cachedData) {
    return cachedData;
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = (async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      cachedData = data;
      return data;
    } catch (err) {
      console.warn(
        'No se pudo conectar a la API de municipios de México, usando respaldo local:',
        err
      );
      return FALLBACK_DATA;
    } finally {
      pendingPromise = null;
    }
  })();

  return pendingPromise;
}

/**
 * Obtiene la lista de todos los estados disponibles desde el API.
 */
export async function getEstados(): Promise<string[]> {
  const data = await fetchStatesAndMunicipalities();
  const states = Object.keys(data);
  return states.sort((a, b) => a.localeCompare(b, 'es'));
}

/**
 * Obtiene los municipios de un estado determinado utilizando el API.
 */
export async function getMunicipiosPorEstado(
  estado: string
): Promise<string[]> {
  const data = await fetchStatesAndMunicipalities();
  if (data[estado]) {
    return [...data[estado]].sort((a, b) => a.localeCompare(b, 'es'));
  }

  // Búsqueda sin acentos o insensible a mayúsculas
  const normalizedSearch = estado
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const foundKey = Object.keys(data).find(
    (key) =>
      key
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase() === normalizedSearch
  );

  if (foundKey && data[foundKey]) {
    return [...data[foundKey]].sort((a, b) => a.localeCompare(b, 'es'));
  }

  return FALLBACK_DATA[estado] || [];
}

export interface StateSelection {
  estado: string;
  enTodoElEstado: boolean;
  municipios: string[];
}

/**
 * Formatea el resumen de plazas de despliegue para el envío de correo y mensajes
 */
export function formatPlazasSummary(selections: StateSelection[]): string {
  if (selections.length === 0) return 'Sin plaza seleccionada';

  return selections
    .map((s) => {
      if (s.enTodoElEstado) {
        return `${s.estado} (En todo el estado)`;
      }
      if (s.municipios.length === 0) {
        return `${s.estado} (Sin municipios seleccionados)`;
      }
      return `${s.estado} (${s.municipios.join(', ')})`;
    })
    .join('; ');
}
