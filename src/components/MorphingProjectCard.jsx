/**
 * MorphingProjectCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta Bento Grid de alto impacto visual con:
 *  - Fondos dark/mesh-gradient (gris pizarra, índigo, cian profundo)
 *  - Liquid SVG clipPath warp animado con GSAP en hover
 *  - Previsualizaciones UI vivas de cada plataforma
 *  - Tipografía blanca de alto contraste sobre fondos oscuros
 *  - Microinteracciones Framer Motion
 */

import { useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'

/* ─── Paleta de mesh-gradients por tarjeta ─── */
const CARD_THEMES = {
  comercia: {
    bg: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0C2340 100%)',
    accent: '#3B82F6',
    glow: 'rgba(37,99,235,0.35)',
    border: 'rgba(59,130,246,0.3)',
  },
  javrelstore: {
    bg: 'linear-gradient(135deg, #0C1A2E 0%, #0E7490 50%, #0F172A 100%)',
    accent: '#06B6D4',
    glow: 'rgba(8,145,178,0.35)',
    border: 'rgba(6,182,212,0.3)',
  },
  evora: {
    bg: 'linear-gradient(135deg, #1E0B3A 0%, #4C1D95 50%, #1E0B3A 100%)',
    accent: '#A78BFA',
    glow: 'rgba(79,70,229,0.4)',
    border: 'rgba(167,139,250,0.3)',
  },
  clones: {
    bg: 'linear-gradient(135deg, #0F172A 0%, #1D2D3F 40%, #0A2540 100%)',
    accent: '#38BDF8',
    glow: 'rgba(14,165,233,0.3)',
    border: 'rgba(56,189,248,0.25)',
  },
  green: {
    bg: 'linear-gradient(135deg, #052E16 0%, #064E3B 50%, #022C22 100%)',
    accent: '#34D399',
    glow: 'rgba(5,150,105,0.4)',
    border: 'rgba(52,211,153,0.3)',
  },
  realpe: {
    bg: 'linear-gradient(135deg, #0C1A2E 0%, #155E75 50%, #0F172A 100%)',
    accent: '#22D3EE',
    glow: 'rgba(8,145,178,0.35)',
    border: 'rgba(34,211,238,0.25)',
  },
  mrpollo: {
    bg: 'linear-gradient(135deg, #1C1109 0%, #78350F 50%, #1C1109 100%)',
    accent: '#FBBF24',
    glow: 'rgba(217,119,6,0.4)',
    border: 'rgba(251,191,36,0.3)',
  },
  jrcellcity: {
    bg: 'linear-gradient(135deg, #150B2E 0%, #3730A3 50%, #150B2E 100%)',
    accent: '#818CF8',
    glow: 'rgba(99,102,241,0.4)',
    border: 'rgba(129,140,248,0.3)',
  },
}

/* ─── SVG Liquid Warp ClipPath ─── */
function LiquidClipWrapper({ children, accentColor, glowColor, borderColor }) {
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({
    mx: 0.5, my: 0.5,     // mouse normalizado [0..1]
    warp: 0,              // intensidad actual 0..1
    isHovered: false,
  })

  // Genera los 4 puntos de control de Bezier cúbico para los 4 lados
  const buildPath = useCallback((w, h, s) => {
    const inset = 16 // border-radius base
    const amp = s * 22 // amplitud máxima del warp
    const { mx, my } = stateRef.current

    // Curvas Bezier que se deforman según posición del cursor
    const topWarp    = (mx - 0.5) * amp
    const bottomWarp = (0.5 - mx) * amp
    const leftWarp   = (my - 0.5) * amp
    const rightWarp  = (0.5 - my) * amp

    return [
      `M ${inset} 0`,
      `Q ${w / 2 + topWarp} ${-amp * s * 0.3} ${w - inset} 0`,        // top
      `Q ${w + amp * s * 0.3} ${h / 2 + rightWarp} ${w} ${h - inset}`,// right
      `Q ${w / 2 + bottomWarp} ${h + amp * s * 0.3} ${inset} ${h}`,   // bottom
      `Q ${-amp * s * 0.3} ${h / 2 + leftWarp} 0 ${inset}`,           // left
      'Z',
    ].join(' ')
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const container = svg.parentElement
    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect()
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(container)

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      stateRef.current.mx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      stateRef.current.my = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    }

    const onEnter = () => { stateRef.current.isHovered = true }
    const onLeave = () => { stateRef.current.isHovered = false }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    // Loop de animación
    const tick = () => {
      const st = stateRef.current
      const target = st.isHovered ? 1 : 0
      st.warp += (target - st.warp) * 0.08  // lerp suave

      const { width: w, height: h } = container.getBoundingClientRect()
      if (pathRef.current && w > 0) {
        pathRef.current.setAttribute('d', buildPath(w, h, st.warp))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [buildPath])

  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`)

  return (
    <div className="relative w-full h-full overflow-visible">
      {/* SVG que define el clipPath dinámico y el borde luminoso */}
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: 'visible', zIndex: 2 }}
      >
        <defs>
          <clipPath id={clipId.current} clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} />
          </clipPath>
          <filter id={`glow-${clipId.current}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Borde luminoso que sigue el path */}
        <path
          ref={(el) => {
            // Mirror del pathRef para el borde glow
            if (el && pathRef.current) {
              const observer = new MutationObserver(() => {
                el.setAttribute('d', pathRef.current?.getAttribute('d') || '')
              })
              if (pathRef.current) {
                observer.observe(pathRef.current, { attributes: true, attributeFilter: ['d'] })
              }
              el.setAttribute('d', pathRef.current?.getAttribute('d') || '')
            }
          }}
          fill="none"
          stroke={borderColor}
          strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
        />
      </svg>

      {/* Contenido clippeado */}
      <div
        className="w-full h-full"
        style={{ clipPath: `url(#${clipId.current})` }}
      >
        {children}
      </div>
    </div>
  )
}

/* ─── Previsualizaciones UI por plataforma ─── */
function ProjectWindowPreview({ previewId, color, url, theme }) {
  const host = url.replace(/^https?:\/\//, '')
  const { accent } = theme

  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: 'transparent' }}>
      {/* Mini barra de navegador — dark mode */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/70" />
          <span className="w-2 h-2 rounded-full bg-amber-500/70" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
        </div>
        <span className="font-mono text-[9px] truncate max-w-[160px] px-2 py-0.5 rounded" style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {host}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
      </div>

      {/* Contenido UI vivo */}
      <div className="relative flex-1 p-3 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03]">

        {previewId === 'comercia' && (
          <div className="h-full flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[['VENTAS', '$4.82M', '+18%'], ['FACTURAS', '142', 'DIAN'], ['STOCK', '98.2%', '3 sedes']].map(([label, val, sub]) => (
                <div key={label} className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
                  <div className="text-xs font-black text-white">{val}</div>
                  <div className="text-[8px] font-semibold" style={{ color: accent }}>{sub}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-lg p-2 flex items-end gap-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[38, 55, 48, 72, 60, 85, 70, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i >= 5 ? `linear-gradient(to top, ${accent}, ${accent}99)` : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>
        )}

        {previewId === 'javrelstore' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-lg p-2.5 flex items-center justify-between" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.25)' }}>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>SETUP PRO 2026</div>
                <div className="text-xs font-bold text-white">Periféricos Gaming</div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}50` }}>TOP</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {['🎧 Audio Studio', '⌨️ Mech Keys', '🖱️ Pro Mouse', '💡 RGB Setup'].map((item) => (
                <div key={item} className="rounded-lg p-2 flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-sm">{item.slice(0, 2)}</span>
                  <span className="text-[9px] text-white/70">{item.slice(3)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'evora' && (
          <div className="h-full flex flex-col gap-2">
            <div className="text-center py-2">
              <div className="text-[8px] font-mono tracking-widest uppercase" style={{ color: accent }}>Boutique Olfativa</div>
              <div className="text-sm font-black text-white italic">Évora Perfumes</div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              {['🌹', '🌿', '🪵', '✨', '🌊', '🌸'].map((e, i) => (
                <div key={i} className="rounded-xl flex flex-col items-center justify-center p-2 gap-1" style={{ background: i === 0 ? `${accent}20` : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 0 ? accent + '50' : 'rgba(255,255,255,0.08)'}` }}>
                  <span className="text-lg">{e}</span>
                  <div className="w-full h-0.5 rounded" style={{ background: `${accent}60` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'clones' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
              <span className="text-base">🖥️</span>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>CONFIGURADOR PC</div>
                <div className="text-xs font-bold text-white">Build Pro Gamer</div>
              </div>
            </div>
            <div className="flex-1 grid grid-rows-4 gap-1">
              {[['CPU', 'AMD Ryzen 9', '100%'], ['GPU', 'RTX 4080', '90%'], ['RAM', '64GB DDR5', '75%'], ['SSD', '2TB NVMe', '60%']].map(([comp, val, pct]) => (
                <div key={comp} className="flex items-center gap-2 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-[8px] font-mono w-7" style={{ color: 'rgba(255,255,255,0.4)' }}>{comp}</div>
                  <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full" style={{ width: pct, background: `linear-gradient(to right, ${accent}, ${accent}99)` }} />
                  </div>
                  <div className="text-[8px] text-white/60">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'green' && (
          <div className="h-full flex flex-col gap-2">
            <div className="text-center pt-1">
              <div className="text-[8px] font-mono tracking-widest" style={{ color: accent }}>ESMERALDAS · COLOMBIA</div>
              <div className="text-xs font-black text-white">Green Emeralds</div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-1.5">
              {[['💎', 'Certificadas', 'GIA & Lab'], ['🌍', 'Exportación', 'Mundial'], ['✅', 'Calidad', 'AAA'], ['📦', 'Envío', 'Asegurado']].map(([icon, title, sub]) => (
                <div key={title} className="rounded-lg p-2 flex flex-col items-center gap-1 text-center" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                  <span>{icon}</span>
                  <div className="text-[9px] font-bold text-white">{title}</div>
                  <div className="text-[8px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'realpe' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-lg p-2 flex items-center gap-2" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
              <span className="text-lg">👟</span>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>NUEVA COLECCIÓN</div>
                <div className="text-xs font-bold text-white">Realpe Shoes 2026</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-1.5">
              {[['Urbano', '#cian'], ['Deportivo', '#azul'], ['Casual', '#slate'], ['Premium', '#gold']].map(([cat]) => (
                <div key={cat} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-xs font-bold text-white">{cat}</div>
                  <div className="mt-1 h-0.5 w-full rounded" style={{ background: accent }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'mrpollo' && (
          <div className="h-full flex flex-col gap-2">
            <div className="text-center py-1">
              <div className="text-[8px] font-mono" style={{ color: accent }}>PEDIDOS EN LÍNEA</div>
              <div className="text-sm font-black text-white">🍗 Mr. Pollo</div>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              {[['Pechuga BBQ', '$28.000', '⭐4.9'], ['Combo Familiar', '$52.000', '⭐5.0'], ['Alitas Crispy', '$18.000', '⭐4.8']].map(([item, price, stars]) => (
                <div key={item} className="rounded-lg px-2.5 py-1.5 flex items-center justify-between" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
                  <span className="text-[9px] font-semibold text-white">{item}</span>
                  <span className="text-[8px]" style={{ color: accent }}>{price}</span>
                  <span className="text-[8px] text-white/50">{stars}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'jrcellcity' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-lg p-2 flex items-center gap-2" style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)' }}>
              <span className="text-lg">📱</span>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>CATÁLOGO DIGITAL</div>
                <div className="text-xs font-bold text-white">JR CellCity</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1">
              {['iPhone', 'Samsung', 'Xiaomi', 'Fundas', 'Cables', 'Cargadores'].map((item) => (
                <div key={item} className="rounded-md p-1.5 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-[8px] text-white/70">{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Componente principal de tarjeta ─── */
export default function MorphingProjectCard({ project, bentoClass = '', delay = 0 }) {
  const { name, desc, url, tag, color, previewId, techStack, featured } = project
  const theme = CARD_THEMES[previewId] || CARD_THEMES.comercia
  const cardRef = useRef(null)

  // 3D tilt suave con spring
  const rotX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rotX.set(-cy * 7)
    rotY.set(cx * 7)
  }, [rotX, rotY])

  const handleMouseLeave = useCallback(() => {
    rotX.set(0)
    rotY.set(0)
  }, [rotX, rotY])

  return (
    <motion.article
      ref={cardRef}
      className={`group relative ${bentoClass} cursor-pointer`}
      style={{
        minHeight: featured ? 320 : 280,
        perspective: 800,
        rotateX: rotX,
        rotateY: rotY,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <LiquidClipWrapper
        accentColor={theme.accent}
        glowColor={theme.glow}
        borderColor={theme.border}
      >
        {/* Fondo mesh gradient principal */}
        <div
          className="absolute inset-0"
          style={{ background: theme.bg }}
        />

        {/* Noise texture overlay sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Glow ambiental en hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col h-full p-4 gap-3">
          {/* Header: tag + nombre */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider mb-1.5"
                style={{ background: `${theme.accent}18`, color: theme.accent, border: `1px solid ${theme.accent}30` }}
              >
                {tag}
              </span>
              <h3 className="text-base font-black text-white leading-tight tracking-tight">
                {name}
              </h3>
            </div>
            {/* Indicador de color / status */}
            <div
              className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 animate-pulse"
              style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }}
            />
          </div>

          {/* Previsualización UI */}
          <div
            className="relative flex-1 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: `1px solid ${theme.border}`,
              minHeight: 120,
            }}
          >
            <ProjectWindowPreview
              previewId={previewId}
              color={color}
              url={url}
              theme={theme}
            />
          </div>

          {/* Footer: descripción, tech stack, botón */}
          <div className="space-y-2.5">
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {desc}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5">
              {techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA: Explorar plataforma */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300"
              style={{
                background: `${theme.accent}18`,
                border: `1px solid ${theme.accent}40`,
                color: theme.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${theme.accent}30`
                e.currentTarget.style.borderColor = `${theme.accent}70`
                e.currentTarget.style.boxShadow = `0 0 20px ${theme.glow}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${theme.accent}18`
                e.currentTarget.style.borderColor = `${theme.accent}40`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span>Explorar plataforma</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </LiquidClipWrapper>
    </motion.article>
  )
}
