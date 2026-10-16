import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lock,
  Sparkles,
  Check,
} from 'lucide-react';
import { StatePlazaSelector } from './StatePlazaSelector';
import { StateSelection, formatPlazasSummary } from '../services/geoService';

export const Contact: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<StateSelection[]>([
    { estado: 'Quintana Roo', enTodoElEstado: true, municipios: [] },
  ]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Activaciones de Marca',
  ]);
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    telefonoWhatsApp: '',
    mensajeRequerimientos: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const serviciosList = [
    'Activaciones de Marca',
    'Edecanes y Hostess',
    'Animadores y Locución en Vivo',
    'Promotoría e Impulsadoras',
    'Perifoneo Móvil',
    'Volanteo Estratégico',
    'Batucada',
    'Grabación de Spots',
    'Botarguero',
    'Pancartero',
    'Zanquero',
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

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
        subject: `[PRUEBA] Nueva Cotización Q&R: ${formData.nombreEmpresa} (${plazasFormatted})`,
        from_name: formData.nombreEmpresa || 'Publicidad Total Q&R Web',
        to: 'grupoveltium@gmail.com',
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
        setSelectedServices(['Activaciones de Marca']);
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
      className="py-20 sm:py-24 bg-surface dark:bg-brand-dark-surface transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-fixed/60 dark:bg-brand-primary/30 border border-brand-primary/20 dark:border-brand-primary/50 text-[11px] font-sora font-bold text-brand-primary-dark dark:text-brand-primary-soft uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Canales de Atención Directa</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary-dark dark:text-white tracking-tight leading-[1.15]">
            Cotiza tu próximo operativo BTL{' '}
            <span className="text-brand-crimson">en minutos</span>
          </h2>

          <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            Respuesta clara y cotización formal. Sin intermediarios ni demoras
            burocráticas en toda la Península.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Canales de Atención Directa (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Canal Más Rápido (WhatsApp) */}
            <div className="rounded-2xl bg-white dark:bg-brand-dark border-2 border-brand-whatsapp/40 dark:border-brand-whatsapp/30 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                className="block font-sora text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white hover:text-brand-whatsapp transition-colors mb-2"
              >
                998 107 1359
              </a>

              <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                Rápida atención comercial para Quintana Roo, Yucatán y Campeche.
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
            <div className="rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[11px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Llamadas de voz directas (Oficina Mérida)
                </span>
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
              </div>

              <a
                href="tel:9999318581"
                className="block font-sora text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white hover:text-brand-cyan transition-colors"
              >
                999 931 8581
              </a>

              <div className="text-[11px] font-manrope text-gray-400 dark:text-gray-400 italic mb-2">
                (Exclusivo llamadas telefónicas)
              </div>

              <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Conmutador central para coordinación administrativa,
                cotizaciones institucionales y compras públicas.
              </p>
            </div>

            {/* Card 3: Correo Electrónico */}
            <div className="rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[11px] font-sora font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Correo electrónico autorizado
                </span>
                <Mail className="w-4 h-4 text-brand-crimson shrink-0" />
              </div>

              <a
                href="mailto:ventaspublicidad1@hotmail.com"
                className="block font-sora text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-brand-crimson transition-colors break-all mb-2"
              >
                ventaspublicidad1@hotmail.com
              </a>

              <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Canal formal para envío de briefings, fichas técnicas y órdenes
                de servicio. (Único correo autorizado para cotizaciones).
              </p>
            </div>

            {/* Guarantee / SLA Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-low dark:bg-brand-dark-alt border border-gray-200/80 dark:border-white/10 flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 dark:bg-white/10 text-brand-primary dark:text-brand-primary-soft shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-brand-lime" />
              </div>
              <div>
                <div className="font-sora font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  Garantía de Despliegue
                </div>
                <div className="font-manrope text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  Equipo listo con supervisión física en Cancún, Mérida y
                  Campeche.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form "Arma tu solicitud rápida" (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-md dark:shadow-xl relative">
              <div className="mb-6">
                <h3 className="font-sora font-bold text-2xl text-gray-900 dark:text-white tracking-tight">
                  Arma tu solicitud rápida
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Selecciona los parámetros de tu campaña y te entregamos
                  propuesta económica lo mas pronto posible.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-sora font-bold text-2xl text-gray-900 dark:text-white">
                    ¡Solicitud Enviada con Éxito!
                  </h4>
                  <p className="font-manrope text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                    Hemos recibido los datos de tu campaña para{' '}
                    <span className="font-bold text-gray-900 dark:text-white">
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
                    <div className="p-4 rounded-xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Plaza de Despliegue (Estados y Municipios vía API) */}
                  <StatePlazaSelector
                    selections={selectedStates}
                    onChange={setSelectedStates}
                  />

                  {/* 2. Servicio o Combinación BTL */}
                  <div>
                    <label className="block font-sora text-xs font-bold text-gray-800 dark:text-gray-200 mb-2.5 uppercase tracking-wider">
                      2. Servicio o Combinación BTL (Selecciona uno o más):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviciosList.map((service) => {
                        const isChecked = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-sora font-semibold border transition-all duration-200 ${
                              isChecked
                                ? 'bg-brand-primary/10 dark:bg-brand-primary/30 border-brand-primary/50 text-brand-primary dark:text-white'
                                : 'bg-gray-50/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] transition-colors ${
                                isChecked
                                  ? 'bg-brand-primary border-brand-primary text-white'
                                  : 'border-gray-400 dark:border-gray-500'
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              )}
                            </span>
                            <span>{service}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Datos para el envío de la cotización */}
                  <div className="space-y-4">
                    <label className="block font-sora text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                      3. Datos para el envío de la cotización:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nombreEmpresa"
                          className="block font-sora text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase"
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="telefonoWhatsApp"
                          className="block font-sora text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase"
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mensajeRequerimientos"
                        className="block font-sora text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-6 rounded-xl bg-surface-low dark:bg-white/10 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-sora font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
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

                  {/* Privacy Disclaimer */}
                  <div className="flex items-center justify-center gap-2 text-[11px] font-manrope text-gray-500 dark:text-gray-400 pt-1">
                    <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>
                      Modo prueba: La solicitud se enviará a{' '}
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        grupoveltium@gmail.com
                      </span>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
