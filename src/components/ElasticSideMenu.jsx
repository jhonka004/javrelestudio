/**
 * ElasticSideMenu.jsx
 * ─────────────────────────────────────────────────────────────────
 * Borde lateral orgánico y ondulado fijo en el margen derecho.
 * Construido con SVG <path> de curvas de Bézier dinámicas animadas
 * mediante GSAP + ScrollTrigger (velocidad de scroll + posición Y
 * del cursor) al estilo Hello Monday.
 * Funciona también como disparador de menú rápido lateral.
 */
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { num: '01', label: 'Inicio', href: '#hero', desc: 'Estudio & WebGL' },
  { num: '02', label: 'Portafolio', href: '#portfolio', desc: '8 Plataformas Reales' },
  { num: '03', label: 'Soluciones', href: '#services', desc: 'Web, ERP/POS & IA' },
  { num: '04', label: 'Javrel Lab', href: '#lab', desc: 'Mundo 3D Interactivo' },
  { num: '05', label: 'Cotizar', href: '#contact', desc: 'Contacto Directo' },
]

export default function ElasticSideMenu() {
  const pathRef = useRef(null)
  const triggerBtnRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#hero')

  useEffect(() => {
    const pathEl = pathRef.current
    const btnEl = triggerBtnRef.current
    if (!pathEl) return

    // Estado físico elástico (width=120 viewBox, borde derecho en x=120)
    const state = {
      scrollVel: 0,
      targetVel: 0,
      cursorY: 0.5,
      targetCursorY: 0.5,
      hoverPull: 0,
      targetHoverPull: 0,
      phase: 0,
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const vel = gsap.utils.clamp(-1800, 1800, self.getVelocity())
        state.targetVel = vel / 1800 // -1 .. 1
      },
    })

    const onPointerMove = (e) => {
      const vw = window.innerWidth || 1
      const vh = window.innerHeight || 1
      state.targetCursorY = gsap.utils.clamp(0.15, 0.85, e.clientY / vh)

      // Si el puntero se acerca al borde derecho (últimos 140px), atrae la curva
      const distFromRight = vw - e.clientX
      state.targetHoverPull = distFromRight < 150
        ? gsap.utils.clamp(0, 1, (150 - distFromRight) / 150)
        : 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Observer para resaltar la sección activa
    const sectionIds = ['hero', 'portfolio', 'services', 'lab', 'contact']
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.35 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    const renderTick = () => {
      state.phase += 0.035
      // Decaimiento suave de velocidad de scroll hacia 0
      state.targetVel *= 0.9
      state.scrollVel += (state.targetVel - state.scrollVel) * 0.14
      state.cursorY += (state.targetCursorY - state.cursorY) * 0.12
      state.hoverPull += (state.targetHoverPull - state.hoverPull) * 0.14

      // ViewBox: 0..120 ancho, 0..1000 alto
      const H = 1000
      const R = 120
      const baseStrip = 10 // Franja base visible en reposo

      const cy = state.cursorY * H
      const pull = 28 + state.hoverPull * 38 + Math.abs(state.scrollVel) * 24
      const skew = state.scrollVel * 110 // Deformación asimétrica por dirección de scroll
      const wave = Math.sin(state.phase) * 3.5

      const topX = R - baseStrip + wave * 0.4
      const botX = R - baseStrip - wave * 0.4
      const peakX = Math.max(18, R - baseStrip - pull)

      const y1 = Math.max(40, cy - 170 + skew * 0.45)
      const y2 = Math.min(H - 40, cy + 170 + skew * 0.45)

      // Curva de Bézier continua de arriba (y=0) hacia abajo (y=1000)
      const d = [
        `M ${R} 0`,
        `L ${topX.toFixed(1)} 0`,
        `C ${(topX - Math.abs(state.scrollVel) * 14).toFixed(1)} ${(y1 * 0.55).toFixed(1)},`,
        `  ${(topX).toFixed(1)} ${(y1 - 45).toFixed(1)},`,
        `  ${(topX - pull * 0.32).toFixed(1)} ${(y1 + 20).toFixed(1)}`,
        `C ${(peakX).toFixed(1)} ${(cy - 75 + skew * 0.2).toFixed(1)},`,
        `  ${(peakX).toFixed(1)} ${(cy + 75 + skew * 0.2).toFixed(1)},`,
        `  ${(botX - pull * 0.32).toFixed(1)} ${(y2 - 20).toFixed(1)}`,
        `C ${(botX).toFixed(1)} ${(y2 + 45).toFixed(1)},`,
        `  ${(botX - Math.abs(state.scrollVel) * 14).toFixed(1)} ${(y2 + (H - y2) * 0.45).toFixed(1)},`,
        `  ${botX.toFixed(1)} ${H}`,
        `L ${R} ${H}`,
        'Z',
      ].join(' ')

      pathEl.setAttribute('d', d)

      if (btnEl) {
        const pct = gsap.utils.clamp(16, 84, (cy / H) * 100)
        btnEl.style.top = `${pct}%`
        btnEl.style.transform = `translate3d(${(-state.hoverPull * 10).toFixed(1)}px, -50%, 0)`
      }
    }

    gsap.ticker.add(renderTick)

    return () => {
      gsap.ticker.remove(renderTick)
      st.kill()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <>
      {/* Franja SVG orgánica fija en el borde derecho */}
      <aside
        aria-label="Navegación lateral elástica"
        className="fixed top-0 right-0 h-screen w-[76px] sm:w-[92px] z-40 pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 120 1000"
          preserveAspectRatio="none"
          className="w-full h-full block drop-shadow-[-6px_0_18px_rgba(37,99,235,0.22)]"
        >
          <defs>
            <linearGradient id="elasticSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M 120 0 L 110 0 L 110 1000 L 120 1000 Z"
            fill="url(#elasticSideGrad)"
          />
        </svg>

        {/* Botón disparador dentro de la onda elástica */}
        <button
          ref={triggerBtnRef}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú rápido"
          style={{ top: '50%' }}
          className="pointer-events-auto absolute right-2 w-10 h-10 rounded-full bg-white/95 text-[#0F172A] shadow-lg border border-blue-200/70 flex items-center justify-center hover:scale-110 hover:text-[#2563EB] transition-colors duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 5.5h12M3 9h12M3 12.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </aside>

      {/* Menú lateral desplegable */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white/95 backdrop-blur-xl border-l border-slate-200/80 shadow-2xl z-50 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-cyan-400">JS</span>
                    </div>
                    <span className="font-bold text-[#0F172A] tracking-tight">Javrel Studio</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#334155] hover:text-[#0F172A] hover:bg-slate-100 transition"
                    aria-label="Cerrar menú"
                  >
                    ✕
                  </button>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-widest text-[#2563EB] font-semibold mb-4">
                  Navegación Rápida
                </p>

                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeHref === item.href
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-50/90 border-blue-200 text-[#2563EB]'
                              : 'border-transparent hover:bg-slate-50 hover:border-slate-200/80 text-[#0F172A]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="font-mono text-xs text-[#475569]">{item.num}</span>
                            <div>
                              <div className="font-bold text-base leading-tight">{item.label}</div>
                              <div className="text-xs text-[#475569]">{item.desc}</div>
                            </div>
                          </div>
                          <span className="text-sm opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            →
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-200/80">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 px-5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  style={{ background: 'linear-gradient(135deg,#2563EB,#4F46E5)' }}
                >
                  Iniciar proyecto ahora →
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
