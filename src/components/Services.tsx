import React from 'react';
import {
  Sparkles,
  Users,
  Mic,
  TrendingUp,
  Megaphone,
  Radio,
  FileText,
  Music,
  Disc3,
  MessageCircle,
  Check,
} from 'lucide-react';

export const Services: React.FC = () => {
  const primaryServices = [
    {
      id: 'activaciones',
      title: 'Activaciones de Marca BTL',
      description:
        'Impactos memorables en puntos de venta, plazas comerciales y eventos masivos con dinámicas interactivas y muestreo de producto.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1X5UgOjwG78IQhOyOX3Cb_YKIDY4rXwKUY-ljGbzJJRJBWK2S_2bsdMi32qN7ARWb0dXI_vmlgYGMAh6INYhvoobYK3qZfXt1yYKB3GbENJgJg_wLozUSnUU4JuEQBqL0xkFhYyVbCRbTuqirrvSvzqDOVEpg8BQR41X-ydb-AWPJVvyGx8kg0WM71s1DTOdN2sEom5L_lYBH8IhwROwvk3d1evEVVGoVOou1TpiVr4H0SoZemfDFe47OQ',
      icon: Sparkles,
      kpi: 'Alto Engagement',
      badge: 'Servicio Estrella',
      highlights: [
        'Estrategias personalizadas por giro',
        'Montaje de stands y ambientación',
        'Supervisión y reporte de interacción',
      ],
      whatsappMsg:
        'Hola, me interesa cotizar el servicio de *Activaciones de Marca BTL* para mi empresa en la Península.',
    },
    {
      id: 'edecanes',
      title: 'Edecanes y Hostess Profesionales',
      description:
        'Personal con excelente presencia, carisma y protocolo para congresos, exposiciones, inauguraciones y lanzamientos exclusivos.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1VO__62WMqlrtmmRyU4tpspmU2kK-_EGHXGIUkAdA6bctSHszwbVvzysxgFjJ5qdNt1OHUkF-Wp2bFuzjC-IWVxS-TGX4XK_dp88j_LOP6u1Rt5_k9WCc7xPqM7rMkG-l7AbM5nqGUxTEFACXIiyX7KxUJ3VN_ltkrJdq98EwSclAPgF5nr6tYy36Aq4zAGX6DCJ75FYp4UjBoGrIcg-lX9f7Mosq5AbaIb0dFn-HyU6y_8G6oCDUdls3E',
      icon: Users,
      kpi: 'Imagen de Élite',
      badge: 'Protocolo VIP',
      highlights: [
        'Edecanes AAA, AA y Promotoras',
        'Uniformes personalizados',
        'Puntualidad y atención al cliente',
      ],
      whatsappMsg:
        'Hola, me gustaría cotizar *Edecanes y Hostess* para un evento corporativo en la Península.',
    },
    {
      id: 'animadores',
      title: 'Animadores y Locución en Vivo',
      description:
        'Locutores dinámicos y presentadores con gran carisma para generar tráfico inmediato y transformar mirones en compradores activos.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1U-JLKKRs5hwJmEterDe6f63LXEX0XCtg30hoNMbn__9TxlqWJqUhobizfbvjvC-P2p6poeLm5SROKJCDBsPhlEO_zCwR_NTsXYCP_d2HWCRUxN4XGg72RZRW9WDKVe3RRY6lkPaCWyUtSPgGlB48Uxqao1ImhlaBtixaoPJU5yC36S0HZ60mup6IG9vT9iewC1AJDk2-IVmRW48cvDxFDuUAw6_mjYBr1zMeXxD4CqFB0suU46U3Qpsw',
      icon: Mic,
      kpi: 'Atracción Inmediata',
      badge: 'Conversión en Vivo',
      highlights: [
        'Locución comercial persuasiva',
        'Manejo de dinámicas de regalos',
        'Equipos portátiles de audio inalámbrico',
      ],
      whatsappMsg:
        'Hola, solicito informes y cotización de *Animadores y Locución en Vivo* para mi negocio.',
    },
    {
      id: 'promotoria',
      title: 'Promotoría e Impulsadoras de Venta',
      description:
        'Fuerza de ventas en punto de venta (PDV) enfocada en rotación de inventario, degustación, abordaje y registro de métricas.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1VOJ3Ymua11LgujaZlhXcZpm4SO54oko8Le9K5RaUPTc5vXWJfREMBFoEoGIRPBJ9NjqnW5t1t5yZ-BVpyc1N-85eL3xjPIw-6gYhoC0UL86blhnbk1IgBWqDKxPI7eNsAORTwAOKRdCEe20XxIFXaYBwOnq4Ni3v7BHEYe5-Xtv-zRPIwHXNKSIkXvBEBKnVU1PVVG5gQOabXeUIyykwANPU7O2ew-xivAjfE-4aM1ZdKe2twgYT65Vr8',
      icon: TrendingUp,
      kpi: 'Incremento en Ventas',
      badge: 'Punto de Venta',
      highlights: [
        'Capacitación técnica de producto',
        'Control de existencias y exhibición',
        'Reportes diarios de ventas y muestreo',
      ],
      whatsappMsg:
        'Hola, deseo cotizar una cuadrilla de *Promotoría e Impulsadoras* para piso de venta.',
    },
  ];

  const secondaryServices = [
    {
      title: 'Perifoneo Móvil de Alta Definición',
      description:
        'Unidades móviles equipadas con audio de largo alcance recorriendo zonas residenciales y corredores comerciales estratégicos.',
      icon: Radio,
      tag: 'Cobertura Masiva',
      whatsappMsg:
        'Hola, me interesa una cotización de rutas de *Perifoneo Móvil* en la Península.',
    },
    {
      title: 'Volanteo Estratégico Auditado',
      description:
        'Distribución mano a mano en cruceros, centros de afluencia o casa por casa con filtros de público meta y evidencia fotográfica.',
      icon: FileText,
      tag: 'Mano a Mano',
      whatsappMsg:
        'Hola, quiero cotizar una campaña de *Volanteo Estratégico Auditado*.',
    },
    {
      title: 'Batucadas y Performance BTL',
      description:
        'Músicos en vivo, zanqueros y comparsas llenas de ritmo que capturan al instante la atención de toda la avenida.',
      icon: Music,
      tag: 'Impacto Visual y Sonoro',
      whatsappMsg:
        'Hola, me interesa contratar *Batucadas y Performance BTL* para una gran inauguración.',
    },
    {
      title: 'Producción de Spots y Audio Comercial',
      description:
        'Creación de guiones comerciales de alta conversión, locución profesional y masterización para perifoneo y redes.',
      icon: Disc3,
      tag: 'Locución y Audio',
      whatsappMsg:
        'Hola, quiero solicitar la *Producción de un Spot Comercial* profesional.',
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-[#140F0E] relative">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#312782]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#009EE2] uppercase tracking-wider mb-4">
            <Megaphone className="w-3.5 h-3.5 text-[#009EE2]" />
            <span>Portafolio Especializado BTL</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Soluciones Integrales para{' '}
            <span className="text-[#AB2020]">Dominar la Calle</span>
          </h2>
          <p className="font-manrope text-base sm:text-lg text-gray-300 mt-4">
            Combinamos presencia humana, sonido profesional y logística de
            precisión para que tu marca no pase desapercibida.
          </p>
        </div>

        {/* Priority 4 Star Services (Magazine Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {primaryServices.map((service) => {
            const IconComponent = service.icon;
            const waUrl = `https://wa.me/529981071359?text=${encodeURIComponent(
              service.whatsappMsg
            )}`;

            return (
              <div
                key={service.id}
                className="group rounded-2xl bg-[#1A1413] border border-white/10 overflow-hidden hover:border-[#009EE2]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* 16:9 Image container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1413] via-[#1A1413]/40 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#312782]/90 backdrop-blur-md text-white font-sora font-semibold text-xs border border-white/20">
                        {service.badge}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#93C01F] text-[#1A1413] font-sora font-extrabold text-xs">
                        {service.kpi}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#009EE2] text-white shadow-lg">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-sora font-bold text-xl sm:text-2xl text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="font-manrope text-sm text-gray-300 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#93C01F] shrink-0" />
                          <span className="font-manrope text-xs sm:text-sm text-gray-200">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="px-6 pb-6 pt-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-[#1A1413] font-sora font-bold text-sm border border-[#25D366]/40 hover:border-[#25D366] transition-all duration-200 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Cotizar este servicio por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Services (Support Capsules) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-sora text-xl sm:text-2xl font-bold text-white">
              Cápsulas de Soporte Publicitario
            </h3>
            <p className="font-manrope text-sm text-gray-400 mt-1">
              Herramientas complementarias para reforzar el impacto de tus
              campañas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryServices.map((capsule, idx) => {
              const IconComp = capsule.icon;
              const waUrl = `https://wa.me/529981071359?text=${encodeURIComponent(
                capsule.whatsappMsg
              )}`;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1A1413] border border-white/10 hover:border-[#93C01F]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#009EE2]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold text-[#93C01F] bg-[#93C01F]/10 px-2 py-0.5 rounded-full border border-[#93C01F]/20">
                        {capsule.tag}
                      </span>
                    </div>

                    <h4 className="font-sora font-bold text-sm text-white mb-2">
                      {capsule.title}
                    </h4>
                    <p className="font-manrope text-xs text-gray-400 leading-relaxed mb-4">
                      {capsule.description}
                    </p>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-white transition-colors pt-2 border-t border-white/5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
