/**
 * ServicesSection.jsx — 4 pillars with glassmorphism cards
 */
import { useEffect, useRef } from 'react'

const SERVICES = [
  {
    icon: '🌐',
    title: 'Desarrollo Web & E-commerce',
    subtitle: 'Alto Rendimiento',
    items: [
      'Tiendas online con Vite + React',
      'Pasarelas de pago integradas',
      'SEO técnico y Core Web Vitals',
      'Panel admin personalizado',
    ],
    color: '#2563EB',
    grad: 'from-blue-500/10 to-cyan-500/5',
  },
  {
    icon: '⚙️',
    title: 'Sistemas ERP, CRM y POS',
    subtitle: 'A Medida',
    items: [
      'Gestión de inventario en tiempo real',
      'CRM con pipeline de ventas',
      'Facturación electrónica',
      'Reportes y dashboards',
    ],
    color: '#4F46E5',
    grad: 'from-indigo-500/8 to-blue-500/5',
  },
  {
    icon: '📱',
    title: 'Apps Web & Móviles',
    subtitle: 'Multiplataforma',
    items: [
      'Progressive Web Apps (PWA)',
      'React Native / Expo',
      'APIs REST & GraphQL',
      'Autenticación y seguridad',
    ],
    color: '#0891B2',
    grad: 'from-cyan-500/8 to-teal-500/5',
  },
  {
    icon: '🤖',
    title: 'Automatización e IA',
    subtitle: 'Inteligencia Aplicada',
    items: [
      'Chatbots con LLMs (GPT/Gemini)',
      'Automatización con n8n / Make',
      'Análisis predictivo',
      'Integración de APIs de IA',
    ],
    color: '#F59E0B',
    grad: 'from-amber-500/10 to-orange-500/5',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="reveal inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6 text-xs font-mono font-semibold uppercase tracking-widest text-[#2563EB]">
            Ecosistema de Soluciones
          </div>
          <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-4 tracking-tight">
            Qué <span className="gradient-text">desarrollamos</span>
          </h2>
          <p className="reveal text-[#475569] text-lg max-w-2xl mx-auto">
            Cuatro pilares tecnológicos para llevar tu negocio al siguiente nivel digital.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`reveal relative glass-card rounded-3xl p-6 group hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-15px_rgba(37,99,235,0.14)] transition-all duration-500 cursor-default
                bg-gradient-to-br ${s.grad}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/80 shadow-sm"
                style={{ background: `${s.color}16` }}
              >
                {s.icon}
              </div>

              <h3 className="text-base font-bold text-[#0F172A] mb-0.5">{s.title}</h3>
              <p className="text-xs font-semibold mb-4" style={{ color: s.color }}>{s.subtitle}</p>

              <ul className="space-y-2">
                {s.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#475569]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1.5px ${s.color}30` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
