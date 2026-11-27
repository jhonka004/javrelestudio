/**
 * ContactSection.jsx — Quote form + WhatsApp CTA with smart message
 */
import { useState } from 'react'

const NEEDS = [
  { id: 'web',    label: '🌐 Sitio Web / Landing',    msg: 'Sitio web o landing page' },
  { id: 'ecomm',  label: '🛒 E-commerce / Tienda',     msg: 'tienda e-commerce' },
  { id: 'erp',    label: '⚙️ ERP / CRM / POS',         msg: 'sistema ERP, CRM o POS' },
  { id: 'app',    label: '📱 App Móvil / PWA',          msg: 'aplicación móvil o PWA' },
  { id: 'ai',     label: '🤖 IA / Automatización',      msg: 'solución de IA o automatización' },
  { id: 'other',  label: '✨ Otro proyecto',             msg: 'un proyecto personalizado' },
]

export default function ContactSection() {
  const [selected, setSelected] = useState([])
  const [name, setName]         = useState('')

  const toggle = (id) => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  )

  const buildWAMsg = () => {
    const needsText = selected.length
      ? selected.map(id => NEEDS.find(n => n.id === id)?.msg).join(', ')
      : 'un proyecto digital'
    const greeting  = name ? `Hola, soy ${name}` : 'Hola'
    return encodeURIComponent(
      `${greeting}. Me interesa cotizar ${needsText} con Javrel Studio. ¿Podemos hablar?`
    )
  }

  const waUrl = `https://wa.me/573001234567?text=${buildWAMsg()}`

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* BG Blobs */}
      <div
        className="absolute top-0 inset-x-0 h-96 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.04), transparent)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6 text-xs font-mono uppercase tracking-widest text-electric">
            Cotización Rápida
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-ink mb-4 leading-tight">
            ¿Listo para construir<br />
            <span className="gradient-text">algo increíble?</span>
          </h2>
          <p className="text-zinc-500 text-lg">
            Cuéntanos qué necesitas — te respondemos en menos de 24 h.
          </p>
        </div>

        {/* Quote card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          {/* Name */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-ink mb-2">Tu nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white/70 text-ink placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 transition"
            />
          </div>

          {/* Need selector */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-ink mb-3">
              ¿Qué necesitas? <span className="text-zinc-400 font-normal">(selecciona uno o varios)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {NEEDS.map(n => {
                const active = selected.includes(n.id)
                return (
                  <button
                    key={n.id}
                    onClick={() => toggle(n.id)}
                    className={`
                      text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                      ${active
                        ? 'border-electric bg-electric/8 text-electric shadow-sm shadow-electric/20'
                        : 'border-zinc-200 bg-white/50 text-zinc-600 hover:border-zinc-300 hover:bg-white/80'
                      }
                    `}
                  >
                    {n.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-magnetic inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-bold text-white shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Escribirnos por WhatsApp
            </a>
            <a
              href="mailto:hola@javrelstudio.com"
              className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border border-zinc-200 glass-card text-sm font-semibold text-ink hover:border-electric/40 transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Enviar correo
            </a>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs text-zinc-400 mt-5">
            🔒 Tu información es 100% confidencial · Respuesta garantizada en &lt; 24 h
          </p>
        </div>
      </div>
    </section>
  )
}
