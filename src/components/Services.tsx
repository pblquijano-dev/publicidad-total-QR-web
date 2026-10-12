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
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Services: React.FC = () => {
  const primaryServices = [
    {
      id: 'activaciones',
      title: 'Activaciones de Marca',
      description:
        'Montaje de carpa publicitaria, equipo de audio profesional, dinámicas comerciales en punto de venta, perifoneo en vivo y entrega de material promocional para atraer clientes a tu tienda.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1X5UgOjwG78IQhOyOX3Cb_YKIDY4rXwKUY-ljGbzJJRJBWK2S_2bsdMi32qN7ARWb0dXI_vmlgYGMAh6INYhvoobYK3qZfXt1yYKB3GbENJgJg_wLozUSnUU4JuEQBqL0xkFhYyVbCRbTuqirrvSvzqDOVEpg8BQR41X-ydb-AWPJVvyGx8kg0WM71s1DTOdN2sEom5L_lYBH8IhwROwvk3d1evEVVGoVOou1TpiVr4H0SoZemfDFe47OQ',
      icon: Sparkles,
      kpi: 'Alto Engagement',
      badge: 'Servicio Estrella',
      highlights: [
        'Montaje de carpa publicitaria y equipo de audio profesional',
        'Dinámicas comerciales y perifoneo en punto de venta',
        'Supervisión presencial y entrega de material promocional',
      ],
      whatsappMsg:
        'Hola, me interesa cotizar el servicio de *Activaciones de Marca* para mi empresa en la Península.',
    },
    {
      id: 'edecanes',
      title: 'Edecanes y Hostess',
      description:
        'Personal de imagen con excelente presentación y vestuario coordinado para inauguraciones, eventos corporativos, congresos y expos. Briefing previo sobre tu producto y puntualidad rigurosa.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1VO__62WMqlrtmmRyU4tpspmU2kK-_EGHXGIUkAdA6bctSHszwbVvzysxgFjJ5qdNt1OHUkF-Wp2bFuzjC-IWVxS-TGX4XK_dp88j_LOP6u1Rt5_k9WCc7xPqM7rMkG-l7AbM5nqGUxTEFACXIiyX7KxUJ3VN_ltkrJdq98EwSclAPgF5nr6tYy36Aq4zAGX6DCJ75FYp4UjBoGrIcg-lX9f7Mosq5AbaIb0dFn-HyU6y_8G6oCDUdls3E',
      icon: Users,
      kpi: 'Imagen y Protocolo',
      badge: 'Personal Capacitado',
      highlights: [
        'Excelente presentación y vestuario coordinado para eventos',
        'Briefing previo sobre tu marca, producto y dinámicas',
        'Puntualidad rigurosa y trato cordial en todo momento',
      ],
      whatsappMsg:
        'Hola, me gustaría cotizar *Edecanes y Hostess* para un evento en la Península.',
    },
    {
      id: 'animadores',
      title: 'Animadores y Locución en Vivo',
      description:
        'Locutores y animadores con micrófono y equipo de audio de alta potencia para conducir dinámicas, interactuar con el público e invitar a los transeúntes a conocer tus promociones.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1U-JLKKRs5hwJmEterDe6f63LXEX0XCtg30hoNMbn__9TxlqWJqUhobizfbvjvC-P2p6poeLm5SROKJCDBsPhlEO_zCwR_NTsXYCP_d2HWCRUxN4XGg72RZRW9WDKVe3RRY6lkPaCWyUtSPgGlB48Uxqao1ImhlaBtixaoPJU5yC36S0HZ60mup6IG9vT9iewC1AJDk2-IVmRW48cvDxFDuUAw6_mjYBr1zMeXxD4CqFB0suU46U3Qpsw',
      icon: Mic,
      kpi: 'Atracción Inmediata',
      badge: 'Conversión en Vivo',
      highlights: [
        'Locución comercial persuasiva y perifoneo en vivo',
        'Conducción de dinámicas de regalos y concursos',
        'Equipo de audio de alta potencia para eventos comerciales',
      ],
      whatsappMsg:
        'Hola, solicito informes y cotización de *Animadores y Locución en Vivo* para mi negocio.',
    },
    {
      id: 'promotoria',
      title: 'Promotoría e Impulsadoras',
      description:
        'Personal capacitado en piso de venta para demostración de producto, degustación, entrega de muestras y desplazamiento de producto en tienda de autoservicio.',
      image:
        'https://lh3.googleusercontent.com/aida/AEtjO1VOJ3Ymua11LgujaZlhXcZpm4SO54oko8Le9K5RaUPTc5vXWJfREMBFoEoGIRPBJ9NjqnW5t1t5yZ-BVpyc1N-85eL3xjPIw-6gYhoC0UL86blhnbk1IgBWqDKxPI7eNsAORTwAOKRdCEe20XxIFXaYBwOnq4Ni3v7BHEYe5-Xtv-zRPIwHXNKSIkXvBEBKnVU1PVVG5gQOabXeUIyykwANPU7O2ew-xivAjfE-4aM1ZdKe2twgYT65Vr8',
      icon: TrendingUp,
      kpi: 'Impulso de Venta',
      badge: 'Piso de Venta',
      highlights: [
        'Demostración de producto y degustación en piso de venta',
        'Entrega de muestras y desplazamiento en tiendas de autoservicio',
        'Supervisión presencial y reporte de actividades diario',
      ],
      whatsappMsg:
        'Hola, deseo cotizar una cuadrilla de *Promotoría e Impulsadoras* para punto de venta.',
    },
  ];

  const secondaryServices = [
    {
      title: 'Perifoneo Móvil',
      description:
        'Vehículos adaptados con bocinas de alto alcance (mínimo 5 horas diarias por unidad).',
      icon: Radio,
      tag: 'Sonido en Calle',
      whatsappMsg:
        'Hola, me interesa una cotización de rutas de *Perifoneo Móvil* en la Península.',
    },
    {
      title: 'Volanteo Estratégico',
      description:
        'Distribución mano a mano y en buzones por supermanzanas y colonias clave con reporte de entrega.',
      icon: FileText,
      tag: 'Mano a Mano',
      whatsappMsg:
        'Hola, quiero cotizar una campaña de *Volanteo Estratégico*.',
    },
    {
      title: 'Batucada',
      description:
        'Animación rítmica y música en vivo para aperturas y aniversarios.',
      icon: Music,
      tag: 'Música en Vivo',
      whatsappMsg:
        'Hola, me interesa contratar *Batucada* para una inauguración.',
    },
    {
      title: 'Grabación de Spots',
      description:
        'Producción de audio publicitario con locución profesional para perifoneo y radio.',
      icon: Disc3,
      tag: 'Locución y Audio',
      whatsappMsg:
        'Hola, quiero solicitar la *Grabación de Spots* profesional.',
    },
  ];

  return (
    <section
      id="servicios"
      className="py-20 sm:py-24 bg-surface-low dark:bg-brand-dark-alt transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-fixed/60 dark:bg-brand-primary/30 border border-brand-primary/20 dark:border-brand-primary/50 text-[11px] font-sora font-bold text-brand-primary-dark dark:text-brand-primary-soft uppercase tracking-widest mb-4">
            <Megaphone className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Portafolio Especializado BTL</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary-dark dark:text-white tracking-tight leading-[1.15]">
            Soluciones Integrales para{' '}
            <span className="text-brand-crimson">Dominar la Calle</span>
          </h2>

          <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            Combinamos presencia humana, sonido profesional y logística de
            precisión para que tu marca no pase desapercibida y genere ventas
            inmediatas.
          </p>
        </div>

        {/* Priority 4 Star Services (Magazine Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {primaryServices.map((service) => {
            const IconComponent = service.icon;
            const waUrl = `https://wa.me/529981071359?text=${encodeURIComponent(
              service.whatsappMsg
            )}`;

            return (
              <div
                key={service.id}
                className="group rounded-3xl bg-white dark:bg-brand-dark border border-gray-200/90 dark:border-white/10 overflow-hidden hover:border-brand-cyan/60 dark:hover:border-brand-cyan/50 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between relative"
              >
                <div>
                  {/* 16:9 Image container with badges and overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Top Left Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-brand-primary/90 backdrop-blur-md text-white font-sora font-semibold text-xs border border-white/20 shadow-sm">
                        {service.badge}
                      </span>
                    </div>

                    {/* Top Right KPI Indicator */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-brand-lime text-brand-dark font-sora font-extrabold text-xs shadow-sm">
                        {service.kpi}
                      </span>
                    </div>

                    {/* Bottom Title & Icon Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-brand-cyan text-white shadow-lg shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-sora font-bold text-xl sm:text-2xl text-white drop-shadow-sm leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-brand-lime/20 text-brand-lime-dark dark:text-brand-lime flex items-center justify-center shrink-0 mt-0.5 border border-brand-lime/40">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="font-manrope text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
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
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 fill-current transition-transform group-hover/btn:scale-110" />
                    <span>Cotizar este servicio por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Services (Support Capsules) */}
        <div className="mb-20">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-sora font-bold uppercase tracking-widest text-brand-primary dark:text-brand-cyan block mb-1">
              Servicios complementarios
            </span>
            <h3 className="font-sora text-2xl sm:text-3xl font-bold text-brand-primary-dark dark:text-white">
              Cápsulas de Soporte Publicitario
            </h3>
            <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Herramientas tácticas y periféricas para reforzar el impacto y la
              recordación de tus campañas en calle.
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
                  className="p-6 rounded-2xl bg-white dark:bg-brand-dark border border-gray-200/90 dark:border-white/10 hover:border-brand-cyan/60 dark:hover:border-brand-cyan/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-colors duration-200">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-sora font-bold text-brand-lime-dark dark:text-brand-lime bg-brand-lime/10 px-2.5 py-0.5 rounded-full border border-brand-lime/30 uppercase tracking-wider">
                        {capsule.tag}
                      </span>
                    </div>

                    <h4 className="font-sora font-bold text-base text-brand-primary-dark dark:text-white mb-2 leading-snug">
                      {capsule.title}
                    </h4>
                    <p className="font-manrope text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                      {capsule.description}
                    </p>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-sora font-semibold text-brand-whatsapp hover:text-brand-whatsapp-hover dark:hover:text-white transition-colors pt-3 border-t border-gray-100 dark:border-white/5 w-full"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-primary-dark via-brand-primary-deep to-brand-primary-deepest text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-brand-primary overflow-hidden">
          {/* Subtle lighting accents */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-crimson/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-lime border border-brand-lime/30 text-[11px] font-sora font-bold tracking-wider uppercase mb-3 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
                <span>Despliegue operativo garantizado</span>
              </div>
              <h3 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
                ¿Requieres un paquete integral para tu evento o marca?
              </h3>
              <p className="font-manrope text-sm sm:text-base text-gray-300 leading-relaxed">
                Armamos tu propuesta personalizada con edecanes, perifoneo,
                animadores y dinámicas interactivas adaptadas al presupuesto y
                metas de tu empresa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://wa.me/529981071359?text=Hola,%20deseo%20cotizar%20un%20paquete%20completo%20de%20servicios%20BTL%20para%20mi%20marca."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-brand-dark font-sora font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Express</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-brand-crimson hover:bg-brand-crimson-hover text-white font-sora font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
