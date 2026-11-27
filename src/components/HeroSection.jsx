/**
 * HeroSection.jsx — Monumental editorial hero
 * Animated headline with staggered character reveal,
 * magnetic CTA buttons, floating badge.
 */
import { useEffect, useRef } from 'react'

const HEADLINE_WORDS = ['Software,', 'IA', '&', 'Experiencias', 'Digitales']

export default function HeroSection() {
  const badgeRef = useRef(null)

  useEffect(() => {
    // Floating badge animation
    let t = 0
    let raf
    const badge = badgeRef.current
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.02
      if (badge) {
        badge.style.transform = `translateY(${Math.sin(t) * 6}px)`
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  // Magnetic button effect
  const onMagnet = (e) => {
    const btn  = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx   = e.clientX - rect.left - rect.width  / 2
    const dy   = e.clientY - rect.top  - rect.height / 2
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) scale(1.03)`
  }
  const offMagnet = (e) => {
    e.currentTarget.style.transform = 'translate(0,0) scale(1)'
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradient aura blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)', animationDelay: '-3s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)', animationDelay: '-1.5s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-10 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-ink/70">Javrel Studio</span>
          <span className="w-px h-3 bg-ink/20" />
          <span className="gradient-text font-semibold">Ingeniería de Software & IA</span>
        </div>

        {/* Main headline — editorial large */}
        <h1 className="font-display font-black text-ink leading-[0.9] mb-6 select-none">
          <div className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] overflow-hidden pb-2">
            <span
              className="block animate-fade-up"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              Construimos
            </span>
          </div>
          <div className="overflow-hidden pb-2">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={word + i}
                className={`inline-block text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[7rem] animate-fade-up mr-4
                  ${i % 2 === 1 ? 'gradient-text' : ''}`}
                style={{ animationDelay: `${0.15 + i * 0.08}s`, opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-2xl mx-auto text-zinc-500 text-lg sm:text-xl leading-relaxed mb-12 animate-fade-up"
          style={{ animationDelay: '0.65s', opacity: 0 }}
        >
          Plataformas web de alto rendimiento, sistemas ERP/CRM/POS a medida y automatización inteligente
          para empresas que quieren crecer sin límites.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <a
            href="#contact"
            className="btn-magnetic px-8 py-4 rounded-full text-base font-bold text-white shadow-lg shadow-electric/30 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
            onMouseMove={onMagnet}
            onMouseLeave={offMagnet}
          >
            Iniciar mi proyecto →
          </a>
          <a
            href="#portfolio"
            className="btn-magnetic glass-card px-8 py-4 rounded-full text-base font-semibold text-ink hover:shadow-md transition-all duration-300"
            onMouseMove={onMagnet}
            onMouseLeave={offMagnet}
          >
            Ver portafolio ↓
          </a>
        </div>

        {/* Stats strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-20 animate-fade-up"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          {[
            { n: '8+', label: 'Plataformas en producción' },
            { n: '100%', label: 'Proyectos entregados' },
            { n: '5★', label: 'Calidad en cada entrega' },
            { n: 'IA', label: 'Automatización inteligente' },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-ink gradient-text">{n}</span>
              <span className="text-xs text-zinc-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  )
}
