import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Check,
  X,
  ChevronDown,
  Search,
} from 'lucide-react';
import { StatePlazaSelector } from './StatePlazaSelector';
import { StateSelection, formatPlazasSummary } from '../services/geoService';
import { ScrollReveal } from './ScrollReveal';

interface ServiceCategory {
  category: string;
  services: string[];
}

const SERVICES_BY_CATEGORY: ServiceCategory[] = [
  {
    category: 'Activación de Marca',
    services: [
      'Edecanes AA y AAA',
      'Animadores Comerciales',
      'Audio Profesional',
      'Botargueros',
      'Zanqueros',
      'Batucada',
      'Pancarteros',
      'Promodegustadoras',
      'Gios',
    ],
  },
  {
    category: 'Audiovisuales',
    services: [
      'Fotografía de Eventos',
      'Video y Cobertura',
      'Pantallas Digitales',
    ],
  },
  {
    category: 'Perifoneo',
    services: [
      'Carros de Sonido (Flotilla propia con bocinas de alto alcance)',
      'Vallas Móviles',
    ],
  },
  {
    category: 'Volanteo',
    services: [
      'Volanteo Casa por Casa',
      'Publiandantes',
      'Volanteo Mano a Mano',
    ],
  },
  {
    category: 'Impresos',
    services: [
      'Volantes Publicitarios',
      'Lonas Gran Formato',
      'Vinil Publicitario',
    ],
  },
];

const ALL_SERVICES = SERVICES_BY_CATEGORY.flatMap((group) => group.services);

export const Contact: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<StateSelection[]>([
    { estado: 'Quintana Roo', enTodoElEstado: true, municipios: [] },
  ]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Edecanes AA y AAA',
  ]);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    telefonoWhatsApp: '',
    mensajeRequerimientos: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Cerrar el dropdown al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const removeService = (service: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  const clearAllServices = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedServices([]);
  };

  const selectAllServices = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedServices([...ALL_SERVICES]);
  };

  const filteredCategories = SERVICES_BY_CATEGORY.map((group) => {
    const matching = group.services.filter((s) =>
      s.toLowerCase().includes(serviceSearchTerm.toLowerCase().trim())
    );
    return {
      category: group.category,
      services: matching,
    };
  }).filter((group) => group.services.length > 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStates.length === 0) {
      setStatus('error');
      setErrorMessage(
        'Por favor selecciona al menos un estado para la plaza de despliegue.'
      );
      return;
    }

    const invalidState = selectedStates.find(
      (s) => !s.enTodoElEstado && s.municipios.length === 0
    );
    if (invalidState) {
      setStatus('error');
      setErrorMessage(
        `Por favor selecciona al menos un municipio o marca "En todo el estado" para ${invalidState.estado}.`
      );
      return;
    }

    if (selectedServices.length === 0) {
      setStatus('error');
      setErrorMessage(
        'Por favor selecciona al menos un servicio para tu cotización.'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const plazasFormatted = formatPlazasSummary(selectedStates);
      const accessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ||
        '4f19daf0-f52f-4487-9319-8454e32f2218';

      const payload = {
        access_key: accessKey,
        subject: `Nueva Cotización Q&R: ${formData.nombreEmpresa} (${plazasFormatted})`,
        from_name: formData.nombreEmpresa || 'Publicidad Total Q&R Web',
        to: 'ventaspublicidad1@hotmail.com',
        nombre_empresa: formData.nombreEmpresa,
        telefono_whatsapp: formData.telefonoWhatsApp,
        plaza_despliegue: plazasFormatted,
        servicios_solicitados: selectedServices.join(', '),
        requerimientos_especiales:
          formData.mensajeRequerimientos || 'Sin requerimientos especiales',
        fecha_envio: new Date().toLocaleString('es-MX', {
          timeZone: 'America/Cancun',
        }),
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setStatus('success');
        setFormData({
          nombreEmpresa: '',
          telefonoWhatsApp: '',
          mensajeRequerimientos: '',
        });
        setSelectedServices(['Edecanes AA y AAA']);
        setSelectedStates([
          { estado: 'Quintana Roo', enTodoElEstado: true, municipios: [] },
        ]);
      } else {
        setStatus('error');
        setErrorMessage(
          result.message ||
            'Ocurrió un error al enviar el formulario con Web3Forms. Por favor revisa la clave de acceso.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Error de conexión. Puedes escribirnos directamente por WhatsApp al 998 107 1359.'
      );
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 sm:py-24 bg-[#F8F9FA] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#092652]/10 border border-[#092652]/20 text-[11px] font-sora font-bold text-[#092652] uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Canales de Atención Directa</span>
            </div>

            <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092652] tracking-tight leading-[1.15]">
              Cotiza tu próximo operativo BTL{' '}
              <span className="text-brand-crimson">en minutos</span>
            </h2>

            <p className="font-manrope text-base sm:text-lg text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
              Respuesta clara y cotización formal. Sin intermediarios ni demoras
              burocráticas en toda la Península.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Canales de Atención Directa (5 cols) */}
          <ScrollReveal
            animation="fade-right"
            duration={700}
            className="lg:col-span-5"
          >
            <div className="space-y-5">
              {/* Card 1: Canal Más Rápido (WhatsApp) */}
              <div className="rounded-2xl bg-white border-2 border-brand-whatsapp/40 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-sora font-bold text-gray-500 uppercase tracking-wider">
                    # Canal más rápido (Ventas Directas)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-whatsapp/10 border border-brand-whatsapp/30 text-[10px] font-sora font-bold text-brand-whatsapp uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-whatsapp animate-pulse" />
                    Activo
                  </span>
                </div>

                <a
                  href="https://wa.me/529981071359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sora text-2xl sm:text-3xl font-extrabold text-[#092652] hover:text-brand-whatsapp transition-colors mb-2"
                >
                  998 107 1359
                </a>

                <p className="font-manrope text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                  Rápida atención comercial para Quintana Roo, Yucatán y
                  Campeche.
                </p>

                <a
                  href="https://wa.me/529981071359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-sora font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-brand-whatsapp/20 hover:shadow-lg hover:shadow-brand-whatsapp/30 active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Iniciar Chat en WhatsApp Ahora</span>
                </a>
              </div>

              {/* Card 2: Llamadas de Voz (Mérida) */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-sora font-bold text-gray-500 uppercase tracking-wider">
                    Llamadas de voz directas (Oficina Mérida)
                  </span>
                  <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                </div>

                <a
                  href="tel:9999318581"
                  className="block font-sora text-2xl sm:text-3xl font-extrabold text-[#092652] hover:text-brand-cyan transition-colors"
                >
                  999 931 8581
                </a>

                <div className="text-[11px] font-manrope text-gray-400 italic mb-2">
                  (Exclusivo llamadas telefónicas)
                </div>

                <p className="font-manrope text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Conmutador central para coordinación administrativa,
                  cotizaciones institucionales y compras públicas.
                </p>
              </div>

              {/* Card 3: Correo Electrónico */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-sora font-bold text-gray-500 uppercase tracking-wider">
                    Correo electrónico autorizado
                  </span>
                  <Mail className="w-4 h-4 text-brand-crimson shrink-0" />
                </div>

                <a
                  href="mailto:ventaspublicidad1@hotmail.com"
                  className="block font-sora text-lg sm:text-xl font-bold text-[#092652] hover:text-brand-crimson transition-colors break-all mb-2"
                >
                  ventaspublicidad1@hotmail.com
                </a>

                <p className="font-manrope text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Canal formal para envío de briefings, fichas técnicas y
                  órdenes de servicio. (Único correo autorizado para
                  cotizaciones).
                </p>
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[11px] font-sora font-bold text-gray-500 uppercase tracking-wider block mb-3">
                  Síguenos en nuestras redes oficiales
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/publicidadtotalqyr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Publicidad Total Q&R"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#1877F2]/10 border border-gray-200 hover:border-[#1877F2]/30 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Facebook className="w-5 h-5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora font-bold text-xs sm:text-sm text-[#092652] group-hover:text-[#1877F2] transition-colors truncate">
                        Facebook
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-manrope text-gray-400 group-hover:text-gray-600 transition-colors truncate">
                        @publicidadtotalqyr
                      </div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/publicidadtotal_qyr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de Publicidad Total Q&R"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#E4405F]/10 border border-gray-200 hover:border-[#E4405F]/30 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#E4405F]/10 text-[#E4405F] group-hover:bg-[#E4405F] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora font-bold text-xs sm:text-sm text-[#092652] group-hover:text-[#E4405F] transition-colors truncate">
                        Instagram
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-manrope text-gray-400 group-hover:text-gray-600 transition-colors truncate">
                        @publicidadtotal_qyr
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Form "Arma tu solicitud rápida" (7 cols) */}
          <ScrollReveal
            animation="fade-left"
            duration={700}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-white border border-gray-200/80 p-6 sm:p-8 lg:p-10 shadow-lg relative h-full">
              <div className="mb-6">
                <h3 className="font-sora font-bold text-2xl text-[#092652] tracking-tight">
                  Arma tu solicitud rápida
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-gray-500 mt-1">
                  Selecciona los parámetros de tu campaña y te entregamos
                  propuesta económica lo mas pronto posible.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-sora font-bold text-2xl text-gray-900">
                    ¡Solicitud Enviada con Éxito!
                  </h4>
                  <p className="font-manrope text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Hemos recibido los datos de tu campaña para{' '}
                    <span className="font-bold text-gray-900">
                      {formatPlazasSummary(selectedStates)}
                    </span>
                    . Un asesor comercial te enviará la propuesta económica
                    pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-sora font-semibold text-xs hover:bg-brand-primary-dark transition-colors"
                  >
                    Cotizar otro proyecto
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Plaza de Despliegue (Estados y Municipios vía API) */}
                  <StatePlazaSelector
                    selections={selectedStates}
                    onChange={setSelectedStates}
                  />

                  {/* 2. Servicio o Combinación BTL */}
                  <div className="relative" ref={servicesDropdownRef}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-sora text-xs font-bold text-gray-800 uppercase tracking-wider">
                        2. Servicio o Combinación BTL (Selecciona uno o más):
                      </label>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={clearAllServices}
                          className="text-[11px] font-sora font-semibold text-brand-crimson hover:underline"
                        >
                          Limpiar ({selectedServices.length})
                        </button>
                      )}
                    </div>

                    {/* Campo selector interactivo con Chips */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsServicesDropdownOpen((prev) => !prev)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsServicesDropdownOpen((prev) => !prev);
                        }
                      }}
                      className={`w-full min-h-[50px] p-2.5 rounded-xl bg-gray-50 border text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isServicesDropdownOpen
                          ? 'border-brand-primary ring-1 ring-brand-primary bg-white shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100/60'
                      }`}
                    >
                      {/* Contenedor de Chips */}
                      <div className="flex-1 flex flex-wrap gap-1.5 items-center">
                        {selectedServices.length === 0 ? (
                          <span className="text-gray-400 text-xs sm:text-sm font-manrope px-1 select-none">
                            Selecciona uno o más servicios del catálogo...
                          </span>
                        ) : (
                          selectedServices.map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center gap-1.5 py-1 pl-2.5 pr-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-sora font-semibold shadow-2xs animate-in fade-in zoom-in-95 duration-150"
                            >
                              <span>{service}</span>
                              <button
                                type="button"
                                onClick={(e) => removeService(service, e)}
                                title={`Eliminar ${service}`}
                                aria-label={`Eliminar ${service}`}
                                className="w-4 h-4 rounded-full hover:bg-brand-primary/20 text-brand-primary hover:text-brand-crimson flex items-center justify-center transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                      {/* Contador de seleccionados e icono de flecha */}
                      <div className="flex items-center gap-2 pl-2 border-l border-gray-200 shrink-0 text-gray-500">
                        {selectedServices.length > 0 && (
                          <span className="text-[11px] font-sora font-bold px-1.5 py-0.5 rounded-md bg-brand-primary text-white">
                            {selectedServices.length}
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isServicesDropdownOpen
                              ? 'rotate-180 text-brand-primary'
                              : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Menú desplegable con buscador y categorías */}
                    {isServicesDropdownOpen && (
                      <div className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Buscador de servicios */}
                        <div className="p-3 border-b border-gray-100 bg-gray-50/70">
                          <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={serviceSearchTerm}
                              onChange={(e) =>
                                setServiceSearchTerm(e.target.value)
                              }
                              placeholder="Buscar servicio (ej. edecanes, perifoneo, lonas)..."
                              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-800 placeholder-gray-400 transition-colors"
                              autoFocus
                            />
                            {serviceSearchTerm && (
                              <button
                                type="button"
                                onClick={() => setServiceSearchTerm('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Barra de acción rápida */}
                        <div className="px-4 py-2 border-b border-gray-100 bg-white flex items-center justify-between text-xs">
                          <span className="text-[11px] font-manrope text-gray-500">
                            {selectedServices.length} de {ALL_SERVICES.length}{' '}
                            seleccionados
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={selectAllServices}
                              className="text-[11px] font-sora font-semibold text-brand-primary hover:underline"
                            >
                              Seleccionar todos
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              type="button"
                              onClick={clearAllServices}
                              className="text-[11px] font-sora font-semibold text-gray-500 hover:text-brand-crimson hover:underline"
                            >
                              Deseleccionar
                            </button>
                          </div>
                        </div>

                        {/* Lista clasificada por categorías */}
                        <div className="max-h-64 sm:max-h-72 overflow-y-auto divide-y divide-gray-100">
                          {filteredCategories.length === 0 ? (
                            <div className="p-6 text-center text-xs text-gray-500 font-manrope">
                              No se encontraron servicios que coincidan con "
                              {serviceSearchTerm}".
                            </div>
                          ) : (
                            filteredCategories.map((group) => (
                              <div key={group.category} className="py-1">
                                <div className="px-4 py-1.5 bg-gray-50/80 font-sora font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center justify-between">
                                  <span>{group.category}</span>
                                  <span className="text-[9px] font-normal text-gray-400">
                                    {group.services.length} opciones
                                  </span>
                                </div>
                                <div className="p-1">
                                  {group.services.map((service) => {
                                    const isChecked =
                                      selectedServices.includes(service);
                                    return (
                                      <div
                                        key={service}
                                        role="checkbox"
                                        aria-checked={isChecked}
                                        tabIndex={0}
                                        onClick={() => toggleService(service)}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                          ) {
                                            e.preventDefault();
                                            toggleService(service);
                                          }
                                        }}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                          isChecked
                                            ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                              isChecked
                                                ? 'bg-brand-primary border-brand-primary text-white'
                                                : 'border-gray-300 bg-white'
                                            }`}
                                          >
                                            {isChecked && (
                                              <Check className="w-3 h-3 stroke-[3]" />
                                            )}
                                          </div>
                                          <span className="font-manrope">
                                            {service}
                                          </span>
                                        </div>
                                        {isChecked && (
                                          <span className="text-[10px] font-sora font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                                            Seleccionado
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Pie del desplegable */}
                        <div className="p-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="px-4 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary-dark text-white font-sora font-semibold text-xs transition-colors"
                          >
                            Listo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Datos para el envío de la cotización */}
                  <div className="space-y-4">
                    <label className="block font-sora text-xs font-bold text-gray-800 uppercase tracking-wider">
                      3. Datos para el envío de la cotización:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nombreEmpresa"
                          className="block font-sora text-[11px] font-bold text-gray-600 mb-1.5 uppercase"
                        >
                          NOMBRE O EMPRESA *
                        </label>
                        <input
                          id="nombreEmpresa"
                          name="nombreEmpresa"
                          type="text"
                          required
                          value={formData.nombreEmpresa}
                          onChange={handleInputChange}
                          placeholder="Ej. Corporativo Maya / Carlos Ruiz"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 placeholder-gray-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="telefonoWhatsApp"
                          className="block font-sora text-[11px] font-bold text-gray-600 mb-1.5 uppercase"
                        >
                          TELÉFONO / WHATSAPP *
                        </label>
                        <input
                          id="telefonoWhatsApp"
                          name="telefonoWhatsApp"
                          type="tel"
                          required
                          value={formData.telefonoWhatsApp}
                          onChange={handleInputChange}
                          placeholder="Ej. +52 998 123 4567"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 placeholder-gray-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mensajeRequerimientos"
                        className="block font-sora text-[11px] font-bold text-gray-600 mb-1.5 uppercase"
                      >
                        FECHA ESTIMADA O REQUERIMIENTOS ESPECIALES
                      </label>
                      <textarea
                        id="mensajeRequerimientos"
                        name="mensajeRequerimientos"
                        rows={3}
                        value={formData.mensajeRequerimientos}
                        onChange={handleInputChange}
                        placeholder="Indícanos días del evento, puntos de venta requeridos, número de horas o metas de prospección..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 placeholder-gray-400 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white font-sora font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando cotización...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud a Cotización</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
