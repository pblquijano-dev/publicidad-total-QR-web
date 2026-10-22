import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Scale,
  Lock,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  AlertCircle,
} from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc,
  onClose,
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  // Sync activeDoc whenever initialDoc changes upon opening
  useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc, isOpen]);

  // Handle ESC key and scroll lock
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden animate-scaleUp transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-primary to-brand-lime pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-gray-200 bg-gray-50/90 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
              {activeDoc === 'terms' ? (
                <Scale className="w-5 h-5 text-brand-cyan" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
              )}
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-sora font-bold tracking-wider uppercase bg-gray-100 text-gray-600 border border-gray-200 mb-0.5">
                <Calendar className="w-3 h-3 text-brand-cyan" />
                Vigencia 2026 · Península de Yucatán
              </span>
              <h2
                id="legal-modal-title"
                className="font-sora font-bold text-base sm:text-lg text-gray-900 truncate"
              >
                {activeDoc === 'terms'
                  ? 'Términos y Condiciones del Servicio'
                  : 'Política de Privacidad y Tratamiento de Datos'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-brand-crimson/80 text-gray-500 hover:text-white flex items-center justify-center transition-all border border-gray-200 shrink-0"
            aria-label="Cerrar modal"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Selector Navigation Tabs */}
        <div className="px-5 sm:px-7 pt-3 pb-2 bg-gray-100/70 border-b border-gray-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveDoc('terms')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sora font-bold text-xs transition-all ${
              activeDoc === 'terms'
                ? 'bg-brand-cyan/15 text-brand-cyan-dark border border-brand-cyan/40 shadow-sm'
                : 'bg-white text-gray-600 hover:text-gray-900:text-white hover:bg-gray-50:bg-white/10 border border-gray-200/80'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Términos del Servicio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDoc('privacy')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sora font-bold text-xs transition-all ${
              activeDoc === 'privacy'
                ? 'bg-brand-lime/15 text-brand-lime-dark border border-brand-lime/40 shadow-sm'
                : 'bg-white text-gray-600 hover:text-gray-900:text-white hover:bg-gray-50:bg-white/10 border border-gray-200/80'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Política de Privacidad</span>
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 text-gray-700 font-manrope text-xs sm:text-sm leading-relaxed space-y-6">
          {activeDoc === 'terms' ? (
            /* ================= TÉRMINOS DEL SERVICIO ================= */
            <div className="space-y-6">
              {/* Introduction Box */}
              <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 text-gray-800">
                <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-cyan shrink-0" />
                  Publicidad Total Q&R · Términos de Contratación y Uso
                </p>
                <p className="text-xs text-gray-600">
                  Bienvenido a Publicidad Total Q&R. Al acceder a nuestro portal
                  web, solicitar cotizaciones o contratar nuestros servicios
                  publicitarios BTL, perifoneo móvil o activaciones en la
                  Península de Yucatán, usted acepta apegarse a los presentes
                  Términos y Condiciones del Servicio.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    1
                  </span>
                  Objeto y Alcance de las Operaciones
                </h3>
                <p className="text-gray-700 mb-2">
                  Publicidad Total Q&R presta servicios integrales de publicidad
                  exterior, mercadotecnia de campo (BTL) y difusión móvil en los
                  estados de Quintana Roo, Yucatán y Campeche, abarcando de
                  forma enunciativa más no limitativa:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-700">
                  <li>
                    <strong className="text-gray-900">Perifoneo Móvil:</strong>{' '}
                    Emisión sonora de spots comerciales mediante vehículos
                    acondicionados con sistemas de audio de alto rendimiento,
                    recorriendo rutas programadas en supermanzanas, colonias y
                    corredores comerciales.
                  </li>
                  <li>
                    <strong className="text-gray-900">Activaciones BTL:</strong>{' '}
                    Personal operativo en punto de venta, edecanes, animadores
                    con micrófono, botargueros, zanqueros, demostradoras y
                    batucadas.
                  </li>
                  <li>
                    <strong className="text-gray-900">
                      Volanteo y Distribución:
                    </strong>{' '}
                    Entrega mano a mano, punto fijo o casa por casa de material
                    impreso publicitario suministrado por el cliente o producido
                    por acuerdo mutuo.
                  </li>
                  <li>
                    <strong className="text-gray-900">
                      Producción de Audio:
                    </strong>{' '}
                    Grabación, edición y masterización de spots publicitarios
                    adaptados a la acústica y especificaciones de campo.
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    2
                  </span>
                  Cotizaciones, Tarifas y Reservas de Fecha
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    Todas las cotizaciones extendidas a través de nuestros
                    canales oficiales (WhatsApp, correo electrónico o llamada
                    telefónica) tienen una vigencia ordinaria de{' '}
                    <strong className="text-gray-900">15 días naturales</strong>{' '}
                    contados a partir de su emisión, salvo pacto expreso por
                    escrito.
                  </p>
                  <p>
                    Para confirmar y apartar fecha, horarios, unidades móviles y
                    el personal asignado a una campaña, se requiere la
                    confirmación formal de la orden de servicio y la liquidación
                    del anticipo pactado (generalmente 50% al momento de la
                    reserva y el 50% restante conforme al calendario operativo
                    convenido).
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    3
                  </span>
                  Obligaciones del Cliente y Permisos Municipales
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    El cliente es responsable de suministrar de manera oportuna
                    los audios, volantes, impresos o guiones publicitarios
                    requeridos para la jornada publicitaria antes del inicio de
                    la misma.
                  </p>
                  <p>
                    El cliente garantiza que cuenta con todos los derechos de
                    uso de marca, derechos de autor y licencias sobre los
                    contenidos, música o logotipos difundidos, deslindando a
                    Publicidad Total Q&R de cualquier controversia de propiedad
                    intelectual.
                  </p>
                  <p>
                    En materia de permisos municipales y anuencias en vía
                    pública o plazas comerciales, las partes coordinarán la
                    gestión ante las autoridades de cada municipio de la
                    Península (ej. Benito Juárez/Cancún, Solidaridad/Playa del
                    Carmen, Mérida, etc.) de acuerdo con la naturaleza de cada
                    servicio.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    4
                  </span>
                  Bitácoras, Evidencia y Reportes Fotográficos Diarios
                </h3>
                <p className="text-gray-700">
                  Como sello de transparencia y garantía operativa, Publicidad
                  Total Q&R se compromete a emitir al cliente un{' '}
                  <strong className="text-gray-900">
                    reporte fotográfico y/o bitácora diaria
                  </strong>{' '}
                  de las actividades realizadas (fotografías geolocalizadas,
                  rutas recorridas y momentos clave de activación en punto de
                  venta) remitidas vía WhatsApp o correo electrónico al término
                  de cada jornada o bloque contratado.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    5
                  </span>
                  Cancelaciones, Reprogramaciones y Contingencias Climáticas
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong className="text-gray-900">
                      Reprogramaciones ordinarias:
                    </strong>{' '}
                    El cliente podrá solicitar la reprogramación de fechas de
                    campaña notificando por escrito con al menos 48 horas de
                    anticipación a la fecha estipulada, sujeta a la
                    disponibilidad de unidades y talento.
                  </p>
                  <p>
                    <strong className="text-gray-900">
                      Causas de Fuerza Mayor y Clima:
                    </strong>{' '}
                    Dada la naturaleza climática de la Península de Yucatán
                    (temporada de tormentas tropicales, alertas ciclónicas o
                    lluvias torrenciales extraordinarias), cuando las
                    condiciones meteorológicas impidan el perifoneo seguro o
                    pongan en riesgo la integridad física del personal y el
                    equipo de audio, el servicio se suspenderá temporalmente y
                    se reprogramará de común acuerdo en la fecha más próxima
                    disponible sin penalización alguna para el cliente.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center text-xs shrink-0 font-bold">
                    6
                  </span>
                  Legislación Aplicable y Jurisdicción
                </h3>
                <p className="text-gray-700">
                  Para la interpretación, cumplimiento o resolución de cualquier
                  discrepancia surgida de la relación comercial o del uso de
                  este sitio web, las partes se someten expresamente a las leyes
                  mercantiles y civiles vigentes en los Estados Unidos Mexicanos
                  y a la jurisdicción de los tribunales competentes de la
                  Península de Yucatán (Cancún, Q. Roo o Mérida, Yucatán),
                  renunciando al fuero que por razón de domicilio presente o
                  futuro pudiera corresponderles.
                </p>
              </div>
            </div>
          ) : (
            /* ================= POLÍTICA DE PRIVACIDAD ================= */
            <div className="space-y-6">
              {/* Introduction Box */}
              <div className="p-4 rounded-xl bg-brand-lime/10 border border-brand-lime/25 text-gray-800">
                <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-lime shrink-0" />
                  Aviso de Privacidad Integral · Ley Federal de Protección de
                  Datos (LFPDPPP)
                </p>
                <p className="text-xs text-gray-600">
                  En cumplimiento con lo establecido por la Ley Federal de
                  Protección de Datos Personales en Posesión de los Particulares
                  (LFPDPPP) y su Reglamento en México, Publicidad Total Q&R pone
                  a su disposición el presente Aviso de Privacidad para
                  informarle sobre el tratamiento, custodia y protección de sus
                  datos personales.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    1
                  </span>
                  Identidad y Domicilio del Responsable
                </h3>
                <p className="text-gray-700">
                  <strong className="text-gray-900">
                    Publicidad Total Q&R
                  </strong>
                  , con operaciones activas en los estados de Quintana Roo
                  (Cancún, Playa del Carmen, Chetumal), Yucatán (Mérida y
                  municipios) y Campeche, es el responsable legítimo del uso y
                  protección de los datos personales que usted decida
                  facilitarnos a través de nuestros formularios digitales,
                  contacto vía WhatsApp, llamada telefónica o contratación
                  directa.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    2
                  </span>
                  Datos Personales que Recabamos
                </h3>
                <p className="text-gray-700 mb-2">
                  Para las finalidades descritas en este aviso, podemos recabar
                  los siguientes datos de manera directa:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-700">
                  <li>
                    <strong className="text-gray-900">
                      Datos de identificación y contacto:
                    </strong>{' '}
                    Nombre completo, empresa o marca que representa, número de
                    teléfono móvil o WhatsApp, y correo electrónico.
                  </li>
                  <li>
                    <strong className="text-gray-900">
                      Datos logísticos y de servicio:
                    </strong>{' '}
                    Ubicación del evento o campaña (supermanzana, colonia, plaza
                    comercial, municipio), fechas estimadas y especificaciones
                    técnicas de la activación requerida.
                  </li>
                  <li>
                    <strong className="text-gray-900">
                      Datos fiscales (exclusivamente para facturación):
                    </strong>{' '}
                    Registro Federal de Contribuyentes (RFC), razón social
                    fiscal, código postal fiscal, régimen tributario y
                    constancia de situación fiscal emitida por el SAT.
                  </li>
                </ul>
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-lime shrink-0" />
                  <span>
                    Importante: Publicidad Total Q&R{' '}
                    <strong>
                      no solicita ni trata datos personales sensibles
                    </strong>{' '}
                    (origen étnico, convicciones religiosas, estado de salud o
                    ideología).
                  </span>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    3
                  </span>
                  Finalidades del Tratamiento de los Datos
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong className="text-gray-900">
                      Finalidades Primarias (Necesarias para el servicio):
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                    <li>
                      Generar y remitir cotizaciones formales de perifoneo, BTL
                      o activaciones.
                    </li>
                    <li>
                      Planificar rutas, coordinar horarios y programar unidades
                      y talento en campo.
                    </li>
                    <li>
                      Remitir los reportes fotográficos de comprobación y
                      bitácoras de servicio.
                    </li>
                    <li>
                      Emisión de Comprobantes Fiscales Digitales por Internet
                      (CFDI) y cobro del servicio.
                    </li>
                  </ul>
                  <p className="pt-1">
                    <strong className="text-gray-900">
                      Finalidades Secundarias (Opcionales):
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                    <li>
                      Envío de promociones especiales, avisos de temporadas
                      altas o encuestas de satisfacción.
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500">
                    Usted puede negarse en cualquier momento al uso de sus datos
                    para finalidades secundarias enviando un correo a{' '}
                    <span className="text-brand-lime-dark font-semibold">
                      ventaspublicidad1@hotmail.com
                    </span>{' '}
                    sin que esto afecte el servicio contratado.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    4
                  </span>
                  No Transferencia de Datos Personales
                </h3>
                <p className="text-gray-700">
                  Sus datos personales{' '}
                  <strong className="text-gray-900">
                    no son vendidos, alquilados, comercializados ni transferidos
                  </strong>{' '}
                  a terceras empresas o agencias con fines mercadológicos. Solo
                  se realizarán aquellas transferencias legalmente previstas por
                  el artículo 37 de la LFPDPPP, tales como cumplimiento de
                  obligaciones tributarias ante el SAT o mandatos debidamente
                  fundados emitidos por autoridades mexicanas competentes.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    5
                  </span>
                  Medios para Ejercer los Derechos ARCO
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    De acuerdo con la LFPDPPP, usted tiene derecho a conocer qué
                    datos personales tenemos de usted, para qué los utilizamos y
                    las condiciones del uso que les damos (
                    <strong className="text-gray-900">Acceso</strong>
                    ). Asimismo, es su derecho solicitar la corrección de su
                    información (
                    <strong className="text-gray-900">Rectificación</strong>
                    ), solicitar que la eliminemos de nuestros registros (
                    <strong className="text-gray-900">Cancelación</strong>
                    ), así como oponerse al uso de sus datos para fines
                    específicos (
                    <strong className="text-gray-900">Oposición</strong>
                    ).
                  </p>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2 text-xs">
                    <p className="font-semibold text-gray-900">
                      ¿Cómo ejercer sus Derechos ARCO?
                    </p>
                    <p className="text-gray-700">
                      Envíe un correo electrónico dirigido a la Dirección de
                      Operaciones al correo:{' '}
                      <a
                        href="mailto:ventaspublicidad1@hotmail.com?subject=Solicitud%20de%20Derechos%20ARCO"
                        className="text-brand-cyan hover:underline font-mono"
                      >
                        ventaspublicidad1@hotmail.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      Su solicitud debe contener: 1) Nombre del titular y correo
                      para recibir respuesta, 2) Identificación oficial que
                      acredite titularidad o representación, 3) Descripción
                      clara del derecho ARCO a ejercer, y 4) Cualquier elemento
                      que facilite la localización de los datos. Responderemos
                      en un plazo máximo de 20 días hábiles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    6
                  </span>
                  Uso de Cookies y Tecnologías Web
                </h3>
                <p className="text-gray-700">
                  Nuestra plataforma digital puede emplear cookies técnicas y
                  analíticas mínimas con la finalidad de optimizar la velocidad
                  de carga, recordar sus preferencias de navegación y evaluar el
                  rendimiento del sitio. En ningún momento se asocian cookies a
                  información confidencial de identificación directa. Usted
                  puede desactivar o borrar las cookies configurando las
                  preferencias de seguridad en las opciones de su navegador web.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-lime/15 text-brand-lime flex items-center justify-center text-xs shrink-0 font-bold">
                    7
                  </span>
                  Actualizaciones al Aviso de Privacidad
                </h3>
                <p className="text-gray-700">
                  Publicidad Total Q&R se reserva el derecho de efectuar en
                  cualquier momento modificaciones o actualizaciones al presente
                  Aviso de Privacidad para la atención de novedades legislativas
                  o jurisprudenciales, políticas internas o nuevos
                  requerimientos de servicio. Cualquier cambio estará publicado
                  permanentemente en esta misma sección del sitio web.
                </p>
              </div>
            </div>
          )}

          {/* Quick Contact & Inquiries Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-sora font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0" />
                <span>
                  ¿Tienes dudas sobre nuestros documentos o contrataciones?
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Atención directa con nuestro equipo jurídico y operativo
                peninsular.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <a
                href="https://wa.me/529981071359?text=Hola,%20tengo%20una%20consulta%20sobre%20sus%20términos%20y%20políticas%20de%20servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-xs transition-transform hover:scale-105"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp 998 107 1359</span>
              </a>

              <a
                href="tel:9999318581"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-gray-100:bg-white/20 text-gray-800 font-sora font-bold text-xs transition-colors border border-gray-200 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>999 931 8581</span>
              </a>

              <a
                href="mailto:ventaspublicidad1@hotmail.com"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-gray-100:bg-white/20 text-gray-800 font-sora font-bold text-xs transition-colors border border-gray-200 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ventaspublicidad1@hotmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-gray-600 font-manrope flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
            <span>Operando en Yucatán, Quintana Roo y Campeche</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-deep text-white font-sora font-bold text-xs hover:brightness-110 shadow-md border border-white/10 transition-all text-center"
            >
              Cerrar y Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
