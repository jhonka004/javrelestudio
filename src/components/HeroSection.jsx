/**
 * HeroSection.jsx — Hero 3D Premium de Javrel Studio
 * ─────────────────────────────────────────────────────────────────
 * Fiel a la composición 3D de referencia sobre fondo blanco (#FFFFFF / #F7FAFF):
 *  - Izquierda: Badge </> Desarrollo Web & Software, titular contundente
 *    "Javrel Studio — Ideas que se convierten en soluciones digitales",
 *    subtítulo y botones magnéticos "Ver Proyectos" y "Contáctame".
 *  - Derecha: Composición 3D interactiva con pantallas flotantes en
 *    perspectiva, cinta luminosa cian→violeta y cubos 3D flotantes.
 *  - Base: Barra de confianza (Alta Calidad, Seguridad Total, Soporte
 *    Continuo, Entrega a Tiempo).
 */
import { useEffect, useRef, useState, lazy, Suspense, useCallback } from 'react'

const HeroParticleLogoCanvas = lazy(() => import('./HeroParticleLogoCanvas'))

export default function HeroSection() {
  const stageRef = useRef(null)
  const [mountWebGL, setMountWebGL] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setMountWebGL(true), { timeout: 350 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(() => setMountWebGL(true), 150)
    return () => window.clearTimeout(t)
  }, [])

  const onStageMove = useCallback((e) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--hx', `${(ny * -6).toFixed(2)}deg`)
    el.style.setProperty('--hy', `${(nx * 8).toFixed(2)}deg`)
  }, [])

  const onStageLeave = useCallback(() => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--hx', '0deg')
    el.style.setProperty('--hy', '0deg')
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-6 bg-white"
    >
      {/* Fondo blanco con manchas de luz difuminadas en azul eléctrico y violeta */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 88% 18%, rgba(8,123,255,0.16) 0%, transparent 68%),
            radial-gradient(ellipse 50% 45% at 10% 82%, rgba(121,43,255,0.12) 0%, transparent 68%),
            radial-gradient(ellipse 45% 40% at 62% 55%, rgba(0,191,255,0.10) 0%, transparent 70%),
            linear-gradient(180deg, #FFFFFF 0%, #F7FAFF 60%, #FFFFFF 100%)
          `,
        }}
        aria-hidden
      />

      {/* Onda decorativa sutil en esquina superior derecha */}
      <svg
        className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] opacity-25"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <defs>
          <linearGradient id="heroOrb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#087BFF" />
            <stop offset="100%" stopColor="#792BFF" />
          </linearGradient>
        </defs>
        <circle cx="230" cy="170" r="160" fill="url(#heroOrb)" fillOpacity="0.18" />
        <circle cx="280" cy="240" r="110" fill="#00BFFF" fillOpacity="0.14" />
      </svg>

      {/* Canvas WebGL diferido en baja opacidad para conservar el emisor de partículas */}
      {mountWebGL && (
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Suspense fallback={null}>
            <HeroParticleLogoCanvas />
          </Suspense>
        </div>
      )}

      {/* Contenido Principal 2 Columnas */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* COLUMNA IZQUIERDA: Identidad & Copy */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/80 shadow-sm px-4 py-1.5 mb-6">
            <span
              className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #087BFF, #792BFF)' }}
            >
              &lt;/&gt;
            </span>
            <span className="text-xs font-bold text-[#101B45] tracking-wide">
              Desarrollo Web &amp; Software
            </span>
          </div>

          <h1 className="font-display font-black text-[#101B45] tracking-tight leading-[1.03] mb-4">
            <span className="block text-5xl sm:text-6xl xl:text-7xl">
              Javrel <span className="gradient-text">Studio</span>
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#101B45] leading-snug mb-5">
            Ideas que se convierten en{' '}
            <span className="relative inline-block gradient-text">
              soluciones
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2.5"
                viewBox="0 0 180 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 9 Q90 1 178 8"
                  fill="none"
                  stroke="url(#heroOrb)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            digitales
          </p>

          <p className="text-[#66718C] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
            Desarrollo de páginas web, aplicaciones y software a medida con tecnología de vanguardia.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#portfolio"
              className="btn-magnetic w-full sm:w-auto justify-center px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white shadow-[0_14px_30px_-6px_rgba(8,123,255,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #087BFF 0%, #173BCE 45%, #792BFF 100%)' }}
            >
              <span>Ver proyectos</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#contact"
              className="btn-magnetic w-full sm:w-auto justify-center px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#101B45] bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:border-blue-400/70 hover:text-[#087BFF] hover:scale-[1.03] transition-all"
            >
              <span>Contáctame</span>
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: Composición 3D de Pantallas Flotantes */}
        <div
          ref={stageRef}
          onMouseMove={onStageMove}
          onMouseLeave={onStageLeave}
          className="lg:col-span-6 relative flex items-center justify-center py-6"
          style={{
            perspective: '1200px',
            '--hx': '0deg',
            '--hy': '0deg',
          }}
        >
          <div
            className="relative w-full max-w-[560px] h-[340px] sm:h-[400px] transition-transform duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(var(--hx)) rotateY(var(--hy))',
            }}
          >
            {/* Resplandor ambiental detrás de las pantallas */}
            <div
              className="absolute inset-6 rounded-full blur-3xl opacity-55 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(8,123,255,0.28), rgba(121,43,255,0.22), transparent 70%)',
              }}
            />

            {/* Cinta luminosa cian -> violeta que envuelve las pantallas */}
            <svg
              viewBox="0 0 560 360"
              className="pointer-events-none absolute inset-0 w-full h-full z-20"
              aria-hidden
            >
              <defs>
                <linearGradient id="ribbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#00BFFF" />
                  <stop offset="50%" stopColor="#087BFF" />
                  <stop offset="100%" stopColor="#A12BFF" />
                </linearGradient>
              </defs>
              <path
                d="M40 245 C120 330, 420 320, 515 205"
                fill="none"
                stroke="url(#ribbonGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <path
                d="M40 245 C120 330, 420 320, 515 205"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
            </svg>

            {/* Pantalla secundaria izquierda (Dashboard oscuro) */}
            <div
              className="hidden sm:flex flex-col absolute left-0 top-14 w-[180px] h-[215px] rounded-2xl p-3 bg-[#0F172A]/95 border border-blue-400/30 shadow-2xl"
              style={{ transform: 'rotateY(18deg) translateZ(-30px)' }}
            >
              <div className="flex items-center gap-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-20 rounded bg-blue-500/40" />
                <div className="h-2 w-28 rounded bg-slate-700" />
                <div className="h-2 w-24 rounded bg-slate-700" />
                <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 border border-white/10" />
              </div>
            </div>

            {/* Pantalla secundaria derecha (Analytics claro) */}
            <div
              className="hidden sm:flex flex-col absolute right-2 top-10 w-[210px] h-[245px] rounded-2xl p-3.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl"
              style={{ transform: 'rotateY(-16deg) translateZ(-10px)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#101B45]">Métricas Cloud</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-end gap-1.5 h-24 p-2 rounded-xl bg-[#F7FAFF] border border-blue-100 mb-3">
                {[35, 58, 45, 76, 62, 92, 84].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background: i >= 4 ? 'linear-gradient(to top, #087BFF, #792BFF)' : '#CBD5E1',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border-4 border-[#087BFF] border-t-[#792BFF]" />
                <div>
                  <div className="text-xs font-black text-[#101B45]">99.9%</div>
                  <div className="text-[10px] text-[#66718C]">Uptime SLA</div>
                </div>
              </div>
            </div>

            {/* Pantalla Principal Central 3D */}
            <div
              className="relative mx-auto mt-4 w-[290px] sm:w-[340px] h-[250px] sm:h-[285px] rounded-2xl overflow-hidden border-2 border-white/80 shadow-[0_30px_70px_-15px_rgba(16,27,69,0.38)] z-10 flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #0B1437 0%, #173BCE 55%, #4C1D95 100%)',
                transform: 'rotateY(-10deg) rotateX(4deg) translateZ(28px)',
              }}
            >
              {/* Barra navegador */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/10 border-b border-white/15">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-[10px] text-white/75">javrelstudio.com</span>
                <span className="w-2 h-2 rounded-full bg-[#00BFFF]" />
              </div>

              {/* Contenido UI interno */}
              <div className="relative flex-1 p-5 flex flex-col justify-between overflow-hidden">
                <div
                  className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl opacity-65"
                  style={{ background: 'radial-gradient(circle, #00BFFF, #792BFF)' }}
                />
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/15 text-[#00BFFF] mb-2">
                    JS · Ingeniería Digital
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Innovación<br />Digital
                  </h2>
                  <p className="text-[11px] text-blue-100/80 mt-1">
                    Desarrolla, Conecta y Crece
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white shadow-md"
                    style={{ background: 'linear-gradient(135deg, #00BFFF, #087BFF)' }}
                  >
                    Explorar Proyectos →
                  </span>
                  <div className="w-16 h-11 rounded-lg bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center text-white font-mono text-[10px]">
                    60 FPS
                  </div>
                </div>
              </div>
            </div>

            {/* Cubos flotantes 3D decorativos */}
            <div
              className="animate-float absolute -top-2 right-12 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-sm shadow-xl z-30"
              style={{
                background: 'linear-gradient(135deg, #00BFFF, #087BFF)',
                transform: 'translateZ(50px) rotate(-10deg)',
              }}
            >
              &lt;/&gt;
            </div>
            <div
              className="animate-float absolute bottom-8 left-4 w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xl z-30"
              style={{
                background: 'linear-gradient(135deg, #087BFF, #173BCE)',
                animationDelay: '-2s',
                transform: 'translateZ(48px) rotate(8deg)',
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            </div>
            <div
              className="animate-float absolute top-24 -right-1 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xl z-30"
              style={{
                background: 'linear-gradient(135deg, #792BFF, #A12BFF)',
                animationDelay: '-4s',
                transform: 'translateZ(42px) rotate(12deg)',
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior de garantías */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-10">
        <div className="rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_12px_36px_-10px_rgba(16,27,69,0.08)] px-5 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '⚡', title: 'Alta Calidad', desc: 'Código optimizado' },
            { icon: '🛡️', title: 'Seguridad Total', desc: 'Tus datos protegidos' },
            { icon: '🎧', title: 'Soporte Continuo', desc: 'Siempre contigo' },
            { icon: '🚀', title: 'Entrega a Tiempo', desc: 'Cumplimos tus ideas' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(8,123,255,0.12), rgba(121,43,255,0.12))' }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#101B45] leading-tight">{item.title}</div>
                <div className="text-xs text-[#66718C]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
