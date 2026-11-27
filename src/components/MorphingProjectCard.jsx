/**
 * MorphingProjectCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Liquid-deformable project card inspired by Hello Monday's morph cards.
 * Technique: SVG feTurbulence + feDisplacementMap on the card border,
 * combined with CSS 3D perspective tilt tracking the cursor.
 *
 * Animation math:
 *   - Tilt:  rx = (dy/H) * MAX_TILT,  ry = -(dx/W) * MAX_TILT
 *   - Spring lerp: val += (target - val) * STIFFNESS  each frame
 *   - Displacement scale: 0 → 28 on hover, ease-out expo
 */

import { useRef, useEffect, useCallback, useState } from 'react'

const MAX_TILT   = 12   // degrees
const STIFFNESS  = 0.08 // spring stiffness
const DISP_MAX   = 28   // max SVG displacement

// Generate a unique filter ID per card instance
let _uid = 0
const uid = () => `lm-${++_uid}`

export default function MorphingProjectCard({ project, style = {}, delay = 0 }) {
  const cardRef   = useRef(null)
  const rafRef    = useRef(null)
  const stateRef  = useRef({
    rx: 0, ry: 0,
    rxt: 0, ryt: 0,
    scale: 1, scaleT: 1,
    disp: 0, dispT: 0,
    glowX: 50, glowY: 50,
    inside: false,
  })
  const filterId  = useRef(uid()).current
  const [visible, setVisible] = useState(false)

  // Animate spring loop
  const animate = useCallback(() => {
    rafRef.current = requestAnimationFrame(animate)
    const s = stateRef.current
    const card = cardRef.current
    if (!card) return

    // Spring lerp
    s.rx    += (s.rxt    - s.rx)    * STIFFNESS
    s.ry    += (s.ryt    - s.ry)    * STIFFNESS
    s.scale += (s.scaleT - s.scale) * STIFFNESS
    s.disp  += (s.dispT  - s.disp)  * (STIFFNESS * 0.5)

    // Apply 3D transform
    card.style.transform = `
      perspective(900px)
      rotateX(${s.rx}deg)
      rotateY(${s.ry}deg)
      scale(${s.scale})
    `

    // Animate SVG turbulence displacement
    const feDisp = document.getElementById(`${filterId}-disp`)
    if (feDisp) feDisp.setAttribute('scale', s.disp.toFixed(2))

    // Move glass spotlight
    card.style.setProperty('--gx', `${s.glowX}%`)
    card.style.setProperty('--gy', `${s.glowY}%`)
  }, [filterId])

  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (cardRef.current) obs.observe(cardRef.current)

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      obs.disconnect()
    }
  }, [animate])

  const onEnter = useCallback(() => {
    const s = stateRef.current
    s.inside   = true
    s.scaleT   = 1.025
    s.dispT    = DISP_MAX
  }, [])

  const onLeave = useCallback(() => {
    const s    = stateRef.current
    s.inside   = false
    s.rxt      = 0
    s.ryt      = 0
    s.scaleT   = 1
    s.dispT    = 0
  }, [])

  const onMove = useCallback((e) => {
    const s    = stateRef.current
    if (!s.inside) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx   = e.clientX - rect.left  - rect.width  / 2
    const dy   = e.clientY - rect.top   - rect.height / 2
    s.rxt      = (dy / rect.height) * MAX_TILT
    s.ryt      = -(dx / rect.width)  * MAX_TILT
    s.glowX    = ((e.clientX - rect.left) / rect.width)  * 100
    s.glowY    = ((e.clientY - rect.top)  / rect.height) * 100
  }, [])

  const { name, desc, url, tag, color = '#2563EB', emoji = '🚀' } = project

  return (
    <>
      {/* Inline SVG filter — unique per card */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
        <defs>
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              id={`${filterId}-turb`}
              type="turbulence"
              baseFrequency="0.02 0.02"
              numOctaves="3"
              seed={Math.floor(Math.random() * 100)}
              result="noise"
            />
            <feDisplacementMap
              id={`${filterId}-disp`}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        style={{
          ...style,
          transitionDelay: `${delay}ms`,
          filter: `url(#${filterId})`,
          willChange: 'transform, filter',
          '--gx': '50%',
          '--gy': '50%',
        }}
        className={`
          liquid-card-wrap relative rounded-2xl overflow-hidden cursor-pointer
          glass-card group flex flex-col
          transition-opacity duration-700
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Glass spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle 180px at var(--gx) var(--gy), rgba(255,255,255,0.22) 0%, transparent 70%)`,
          }}
        />

        {/* Top color band — adapts to available height */}
        <div
          className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: `${color}18`, height: '110px' }}
        >
          {/* Animated code preview (purely CSS/JS) */}
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110 inline-block transition-transform">
              {emoji}
            </span>
          </div>
          {/* Shimmer stripe */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-bg pointer-events-none"
          />
          {/* Tag badge */}
          <span
            className="absolute top-3 left-3 font-mono text-[10px] font-medium px-2 py-1 rounded-full"
            style={{ background: `${color}25`, color }}
          >
            {tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 relative z-10 flex flex-col flex-1 min-h-0">
          <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-electric transition-colors duration-200 leading-snug">
            {name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">{desc}</p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase mt-auto"
            style={{ color }}
            onClick={e => e.stopPropagation()}
          >
            Ver proyecto
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Bottom border glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
    </>
  )
}
