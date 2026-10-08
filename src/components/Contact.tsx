import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    servicio: 'Activaciones de Marca BTL',
    estado: 'Quintana Roo',
    mensaje: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        access_key: 'YOUR_ACCESS_KEY_HERE', // Reemplazar con clave Web3Forms o envío por formulario
        to: 'ventaspublicidad1@hotmail.com',
        subject: `Nuevo Lead Landing Q&R: ${formData.nombre} - ${formData.servicio}`,
        from_name: formData.nombre,
        company: formData.empresa,
        phone: formData.telefono,
        email: formData.email,
        service: formData.servicio,
        region: formData.estado,
        message: formData.mensaje,
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
          nombre: '',
          empresa: '',
          telefono: '',
          email: '',
          servicio: 'Activaciones de Marca BTL',
          estado: 'Quintana Roo',
          mensaje: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          result.message ||
            'Ocurrió un error al enviar el formulario. Por favor contáctanos por WhatsApp.'
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
      className="py-24 bg-[#140F0E] relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#AB2020]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#009EE2] uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5 text-[#009EE2]" />
            <span>Contacto Inmediato</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Inicia tu Campaña con{' '}
            <span className="text-[#AB2020]">Publicidad Total Q&R</span>
          </h2>
          <p className="font-manrope text-base sm:text-lg text-gray-300 mt-4">
            Cotizamos tu proyecto en menos de 24 horas con propuesta técnica,
            rutas y cuadrillas a la medida de tu presupuesto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Contact Cards (Left column 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1413] border border-white/10 shadow-xl">
              <h3 className="font-sora font-bold text-xl text-white mb-6">
                Canales Directos de Atención
              </h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/529981071359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-[#25D366]/10 border border-white/5 hover:border-[#25D366]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#25D366]/20 text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400">
                      WhatsApp y Cotizaciones Rápidas
                    </div>
                    <div className="font-sora font-bold text-base text-white group-hover:text-[#25D366] transition-colors">
                      998 107 1359
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Atención inmediata en Cancún y Península
                    </div>
                  </div>
                </a>

                {/* Llamadas telefónicas */}
                <a
                  href="tel:9999318581"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-[#009EE2]/10 border border-white/5 hover:border-[#009EE2]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#009EE2]/20 text-[#009EE2] group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400">
                      Llamadas y Oficina Central
                    </div>
                    <div className="font-sora font-bold text-base text-white group-hover:text-[#009EE2] transition-colors">
                      999 931 8581
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Atención telefónica regional Peninsular
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:ventaspublicidad1@hotmail.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-[#AB2020]/10 border border-white/5 hover:border-[#AB2020]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#AB2020]/20 text-[#AB2020] group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400">
                      Correo Electrónico
                    </div>
                    <div className="font-sora font-bold text-sm text-white group-hover:text-[#AB2020] transition-colors break-all">
                      ventaspublicidad1@hotmail.com
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Recepción directa de licitaciones y RFP
                    </div>
                  </div>
                </a>
              </div>

              {/* Extra info */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-gray-400">
                  <Clock className="w-4 h-4 text-[#93C01F]" />
                  <span>Horario: Lunes a Sábado de 8:00 AM a 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-400">
                  <MapPin className="w-4 h-4 text-[#009EE2]" />
                  <span>Despliegue activo en Q. Roo, Yucatán y Campeche</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form (Right column 7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1413] border border-white/10 shadow-2xl relative">
              <h3 className="font-sora font-bold text-xl text-white mb-2">
                Solicita una Cotización Personalizada
              </h3>
              <p className="font-manrope text-xs sm:text-sm text-gray-400 mb-6">
                Completa los datos y un asesor se pondrá en contacto contigo a
                la brevedad.
              </p>

              {status === 'success' ? (
                <div className="p-8 rounded-xl bg-[#93C01F]/10 border border-[#93C01F]/30 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#93C01F]/20 text-[#93C01F] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-sora font-bold text-2xl text-white">
                    ¡Mensaje Recibido con Éxito!
                  </h4>
                  <p className="font-manrope text-sm text-gray-300 max-w-md mx-auto">
                    Hemos canalizado tu información a nuestro equipo comercial
                    en{' '}
                    <span className="text-white font-medium">
                      ventaspublicidad1@hotmail.com
                    </span>
                    . Nos comunicaremos contigo en breve.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#312782] hover:bg-[#3d32a0] text-white font-sora font-semibold text-xs transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Nombre Completo *
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white placeholder-gray-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="empresa"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Empresa / Negocio *
                      </label>
                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Ej. Grupo Peninsular"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white placeholder-gray-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="telefono"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ej. 998 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white placeholder-gray-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Correo Electrónico *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@empresa.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white placeholder-gray-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="servicio"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Servicio Principal de Interés
                      </label>
                      <select
                        id="servicio"
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1413] border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white transition-colors"
                      >
                        <option value="Activaciones de Marca BTL">
                          Activaciones de Marca BTL
                        </option>
                        <option value="Edecanes y Hostess">
                          Edecanes y Hostess
                        </option>
                        <option value="Animadores y Locución en Vivo">
                          Animadores y Locución en Vivo
                        </option>
                        <option value="Promotoría e Impulsadoras">
                          Promotoría e Impulsadoras
                        </option>
                        <option value="Perifoneo Móvil">Perifoneo Móvil</option>
                        <option value="Volanteo Estratégico Auditado">
                          Volanteo Estratégico Auditado
                        </option>
                        <option value="Batucadas y Performance">
                          Batucadas y Performance
                        </option>
                        <option value="Producción de Spots de Audio">
                          Producción de Spots de Audio
                        </option>
                        <option value="Campaña Integral Peninsular">
                          Campaña Integral Peninsular
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="estado"
                        className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Estado de Cobertura
                      </label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1413] border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white transition-colors"
                      >
                        <option value="Quintana Roo">
                          Quintana Roo (Cancún, Playa, Tulum, etc.)
                        </option>
                        <option value="Yucatán">
                          Yucatán (Mérida, Progreso, Valladolid, etc.)
                        </option>
                        <option value="Campeche">
                          Campeche (Cd. del Carmen, Campeche, etc.)
                        </option>
                        <option value="Toda la Península">
                          Toda la Península (Simultáneo)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block font-manrope text-xs font-semibold text-gray-300 mb-1.5"
                    >
                      Detalles del Proyecto / Fechas Estimadas
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu evento, volumen de volantes, días de perifoneo o personal requerido..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#009EE2] focus:ring-1 focus:ring-[#009EE2] text-sm text-white placeholder-gray-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#AB2020] hover:bg-[#c42525] text-white font-sora font-bold text-sm transition-all duration-300 shadow-lg shadow-[#AB2020]/30 hover:shadow-xl hover:shadow-[#AB2020]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando información...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Solicitud de Cotización</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center mt-3">
                    Tus datos se manejan con estricta confidencialidad para
                    fines de cotización comercial.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
