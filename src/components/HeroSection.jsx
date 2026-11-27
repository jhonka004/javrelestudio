/**
 * HeroSection.jsx — Monumental Light-Mode Editorial Hero
 * Integra HeroParticleLogoCanvas (emisor WebGL del logotipo JavrelStudio),
 * tipografía de alto contraste (#0F172A / #475569) y botones magnéticos.
 */
import { useEffect, useRef, useState, lazy, Suspense } from 'react'

const HeroParticleLogoCanvas = lazy(() => import('./HeroParticleLogoCanvas'))
const LivingVectorArt = lazy(() => import('./LivingVectorArt'))

const HEADLINE_WORDS = ['Software,', 'IA', '&', 'Experiencias', 'Digitales']

export default function HeroSection() {
  const badgeRef = useRef(null)
  const [mountHeavyEffects, setMountHeavyEffects] = useState(false)

  // Diferir Three.js y GSAP del Hero hasta después del primer render (< 1s FCP/LCP)
  useEffect(() => {
    let timerId = 0
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setMountHeavyEffects(true), { timeout: 300 })
      return () => window.cancelIdleCallback(idleId)
    }
    timerId = window.setTimeout(() => setMountHeavyEffects(true), 120)
    return () => window.clearTimeout(timerId)
  }, [])

  useEffect(() => {
    let t = 0
    let raf = 0
    const badge = badgeRef.current
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.02
      if (badge) {
        badge.style.transform = `translateY(${Math.sin(t) * 5}px)`
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  const onMagnet = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${dx * 0.16}px, ${dy * 0.16}px) scale(1.03)`
  }

  const offMagnet = (e) => {
    e.currentTarget.style.transform = 'translate(0,0) scale(1)'
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20 bg-white"
    >
      {/* Degradado Aurora vibrante estilo Lovable que se difumina hacia el blanco */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 20% 25%, rgba(59,130,246,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 30%, rgba(236,72,153,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 50% 55%, rgba(139,92,246,0.16) 0%, transparent 72%),
            linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 55%, #FFFFFF 100%)
          `,
        }}
        aria-hidden
      />

      {/* WebGL Particle Logo Emitter (Three.js + Custom Shaders) — diferido post-LCP */}
      {mountHeavyEffects && (
        <Suspense fallback={null}>
          <HeroParticleLogoCanvas />
          <LivingVectorArt
            variant="hero"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] sm:w-[700px] sm:h-[700px] opacity-65 z-0"
          />
        </Suspense>
      )}

      {/* Soft atmospheric aurora halos */}
      <div
        className="absolute top-1/4 left-1/5 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-35 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.24), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%)', animationDelay: '-3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Interactive Floating Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 glass-card rounded-full px-5 py-2.5 mb-9 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[#0891B2] animate-pulse" />
          <span className="text-[#0F172A] font-semibold tracking-tight">Javrel Studio</span>
          <span className="w-px h-3.5 bg-slate-300" />
          <span className="gradient-text font-semibold">WebGL · IA · Ingeniería</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-display font-black text-[#0F172A] tracking-tight leading-[0.92] mb-7 select-none">
          <div className="text-5xl sm:text-7xl lg:text-[6.5rem] xl:text-[8.2rem] overflow-hidden pb-2">
            <span
              className="block animate-fade-up"
              style={{ animationDelay: '0.08s', opacity: 0 }}
            >
              Construimos
            </span>
          </div>
          <div className="overflow-hidden pb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={word + i}
                className={`inline-block text-4xl sm:text-6xl lg:text-[5rem] xl:text-[6.4rem] animate-fade-up ${
                  i % 2 === 1 ? 'gradient-text' : ''
                }`}
                style={{ animationDelay: `${0.14 + i * 0.07}s`, opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-2xl mx-auto text-[#334155] text-lg sm:text-xl leading-relaxed mb-11 animate-fade-up font-medium"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          Plataformas web de alto rendimiento, sistemas ERP/CRM/POS a medida y automatización inteligente
          con acabados interactivos de nivel internacional.
        </p>

        {/* Magnetic CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          <a
            href="#contact"
            className="btn-magnetic px-8 py-4 rounded-full text-base font-bold text-white shadow-[0_18px_38px_-12px_rgba(37,99,235,0.45)] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 55%, #0891B2 100%)' }}
            onMouseMove={onMagnet}
            onMouseLeave={offMagnet}
          >
            Iniciar mi proyecto →
          </a>
          <a
            href="#portfolio"
            className="btn-magnetic glass-card px-8 py-4 rounded-full text-base font-semibold text-[#0F172A] hover:text-[#2563EB] transition-all duration-300"
            onMouseMove={onMagnet}
            onMouseLeave={offMagnet}
          >
            Explorar portafolio ↓
          </a>
        </div>

        {/* Stats strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 animate-fade-up"
          style={{ animationDelay: '0.88s', opacity: 0 }}
        >
          {[
            { n: '8+', label: 'Plataformas en producción' },
            { n: '60 FPS', label: 'Rendimiento WebGL fluido' },
            { n: '100%', label: 'Arquitectura a medida' },
            { n: 'IA', label: 'Automatización inteligente' },
          ].map(({ n, label }) => (
            <div key={label} className="glass-card rounded-2xl px-5 py-3 flex flex-col items-center gap-0.5">
              <span className="text-2xl sm:text-3xl font-black gradient-text">{n}</span>
              <span className="text-xs text-[#334155] font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator (spaced cleanly below stats) */}
      <div className="mt-12 flex flex-col items-center gap-1.5 opacity-45 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#475569]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  )
}
