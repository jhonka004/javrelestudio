/**
 * BrowserPreviewCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta 3D GPU-accelerated (<1s load, zero Framer Motion overhead):
 *  - Vista previa real (.webp optimizado, loading="lazy", decoding="async")
 *    con marco Safari/macOS y auto-scroll vertical fluido en hover.
 *  - Fallback elegante si alguna captura no carga.
 *  - 3D Tilt & Perspective (1200px, preserve-3d, translateZ en capas)
 *    actualizado vía requestAnimationFrame + CSS vars (cero reflows).
 *  - Brillo especular (glare/spotlight) tipo vidrio pulido.
 *  - Giro 3D completo (flip) hacia la ficha técnica / stack del proyecto.
 */

import { useRef, useState, useCallback, useEffect } from 'react'

const THEMES = {
  comercia: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 55%, #EDE9FE 100%)',
    border: 'rgba(59, 130, 246, 0.35)',
    grad: ['#2563EB', '#4F46E5'],
    accent: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.22)',
  },
  javrelstore: {
    bg: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 55%, #E0F2FE 100%)',
    border: 'rgba(8, 145, 178, 0.35)',
    grad: ['#0891B2', '#3B82F6'],
    accent: '#0891B2',
    glow: 'rgba(8, 145, 178, 0.22)',
  },
  evora: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 55%, #FDF2F8 100%)',
    border: 'rgba(139, 92, 246, 0.35)',
    grad: ['#7C3AED', '#EC4899'],
    accent: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.20)',
  },
  clones: {
    bg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 55%, #EEF2FF 100%)',
    border: 'rgba(14, 165, 233, 0.35)',
    grad: ['#0284C7', '#6366F1'],
    accent: '#0284C7',
    glow: 'rgba(14, 165, 233, 0.22)',
  },
  green: {
    bg: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 55%, #ECFDF5 100%)',
    border: 'rgba(5, 150, 105, 0.35)',
    grad: ['#059669', '#10B981'],
    accent: '#059669',
    glow: 'rgba(5, 150, 105, 0.20)',
  },
  realpe: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 55%, #F0F9FF 100%)',
    border: 'rgba(56, 189, 248, 0.35)',
    grad: ['#2563EB', '#06B6D4'],
    accent: '#2563EB',
    glow: 'rgba(56, 189, 248, 0.22)',
  },
  mrpollo: {
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 55%, #FFF7ED 100%)',
    border: 'rgba(217, 119, 6, 0.35)',
    grad: ['#D97706', '#EA580C'],
    accent: '#D97706',
    glow: 'rgba(217, 119, 6, 0.20)',
  },
  jrcellcity: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 55%, #FCE7F3 100%)',
    border: 'rgba(139, 92, 246, 0.35)',
    grad: ['#7C3AED', '#EC4899'],
    accent: '#7C3AED',
    glow: 'rgba(139, 92, 246, 0.20)',
  },
}

export default function BrowserPreviewCard({ project, bentoClass = '' }) {
  const { name, desc, url, tag, previewId, techStack = [], specs = [], featured } = project
  const theme = THEMES[previewId] || THEMES.comercia
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const cardRef = useRef(null)
  const rafRef = useRef(0)
  const [imgError, setImgError] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * 11 // rotateX max ±5.5deg
    const ry = (px - 0.5) * 11 // rotateY max ±5.5deg

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
      el.style.setProperty('--glare', '1')
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--glare', '0')
    })
  }, [])

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${bentoClass}`}
      style={{
        minHeight: featured ? 400 : 370,
        perspective: '1200px',
        '--rx': '0deg',
        '--ry': '0deg',
        '--gx': '50%',
        '--gy': '50%',
        '--glare': '0',
      }}
    >
      {/* Contenedor 3D con Tilt + Flip (GPU accelerated) */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          minHeight: 'inherit',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: isFlipped
            ? 'rotateY(180deg)'
            : 'rotateX(var(--rx)) rotateY(var(--ry))',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            CARA FRONTAL: Vista previa real + Marco Safari + 3D Depth
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden bg-white/75 backdrop-blur-xl shadow-xl shadow-slate-200/60 flex flex-col p-4 gap-3"
          style={{
            minHeight: 'inherit',
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Capa glassmorphism cristalina */}
          <div className="pointer-events-none absolute inset-0 bg-white/45 rounded-2xl" />

          {/* Reflejo especular (Glare / Spotlight) tipo vidrio pulido */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: 'var(--glare)',
              background: `radial-gradient(420px circle at var(--gx) var(--gy), rgba(255,255,255,0.65), ${theme.glow} 38%, transparent 72%)`,
              zIndex: 5,
            }}
          />

          {/* Header con profundidad Z */}
          <div
            className="relative z-10 flex items-start justify-between gap-2"
            style={{ transform: 'translateZ(34px)' }}
          >
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 bg-white/85 shadow-sm"
                style={{ color: theme.accent, border: `1px solid ${theme.border}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                {tag}
              </span>
              <h3 className="text-lg font-black text-[#0F172A] leading-tight tracking-tight">
                {name}
              </h3>
            </div>

            {/* Botón Flip 3D a Ficha Técnica */}
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-[#334155] bg-white/85 hover:bg-white border border-slate-200/80 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
              title="Ver ficha técnica y arquitectura 3D"
            >
              Stack ↻
            </button>
          </div>

          {/* Marco de navegador macOS/Safari con captura real auto-scroll */}
          <div
            className="relative z-10 flex-1 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-lg shadow-slate-900/5 flex flex-col"
            style={{ minHeight: 185, transform: 'translateZ(26px)' }}
          >
            {/* Barra superior Safari */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50/95 border-b border-slate-200/80 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 max-w-[190px] sm:max-w-[230px]">
                <svg className="w-2.5 h-2.5 text-emerald-600 shrink-0" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M9 5V3.5a3 3 0 0 0-6 0V5H2v6h8V5H9zm-4.5-1.5a1.5 1.5 0 0 1 3 0V5h-3V3.5z" />
                </svg>
                <span className="font-mono text-[10px] text-[#475569] truncate">
                  {host}
                </span>
              </div>
              <span className="text-[9px] font-mono font-semibold text-[#64748B] hidden sm:inline">
                LIVE
              </span>
            </div>

            {/* Viewport de captura real .webp con auto-scroll GPU en hover */}
            <div className="relative flex-1 overflow-hidden bg-slate-100">
              {!imgError ? (
                <img
                  src={`/previews/${previewId}.webp`}
                  alt={`Vista previa real de ${name}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="w-full h-auto min-h-full object-cover object-top will-change-transform transition-transform duration-[5500ms] ease-in-out group-hover:-translate-y-[calc(100%-190px)]"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-white via-slate-50 to-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0F172A]">
                      {host}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-emerald-600">● Arquitectura Cloud</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <div className="rounded-lg bg-white p-2 border border-slate-200/80 shadow-xs">
                      <div className="text-[8px] font-mono text-slate-400">RENDIMIENTO</div>
                      <div className="text-xs font-black text-[#0F172A]">99.9%</div>
                    </div>
                    <div className="rounded-lg bg-white p-2 border border-slate-200/80 shadow-xs">
                      <div className="text-[8px] font-mono text-slate-400">LATENCIA</div>
                      <div className="text-xs font-black" style={{ color: theme.accent }}>&lt; 45ms</div>
                    </div>
                    <div className="rounded-lg bg-white p-2 border border-slate-200/80 shadow-xs">
                      <div className="text-[8px] font-mono text-slate-400">STACK</div>
                      <div className="text-xs font-black text-[#0F172A]">{techStack[0] || 'Cloud'}</div>
                    </div>
                  </div>
                  <div className="h-10 rounded-lg bg-white border border-slate-200/80 p-2 flex items-end gap-1">
                    {[42, 65, 52, 80, 68, 94, 78, 96].map((h, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: idx >= 5 ? `linear-gradient(to top, ${theme.grad[0]}, ${theme.grad[1]})` : '#CBD5E1',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Sutil indicador de recorrido en hover */}
              <div className="pointer-events-none absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/75 text-white text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                Auto-scroll ↓
              </div>
            </div>
          </div>

          {/* Footer con descripción y CTA */}
          <div
            className="relative z-10 space-y-2.5"
            style={{ transform: 'translateZ(30px)' }}
          >
            <p className="text-xs leading-relaxed text-[#334155] font-medium line-clamp-2">
              {desc}
            </p>

            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${theme.grad[0]}, ${theme.grad[1]})`,
                  boxShadow: `0 6px 18px -4px ${theme.glow}`,
                }}
              >
                <span>Explorar plataforma</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARA TRASERA (Flip 180°/360°): Ficha Técnica & Arquitectura
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/60 flex flex-col justify-between p-5"
          style={{
            border: `1px solid ${theme.border}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                  Ficha Técnica · Arquitectura
                </span>
                <h4 className="text-lg font-black text-[#0F172A]">{name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-[#0F172A] bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ← Vista previa
              </button>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed mb-4">
              {desc}
            </p>

            {/* Stack tecnológico */}
            <div className="mb-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                Stack Principal
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-[#0F172A] border border-slate-200/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Especificaciones clave */}
            {specs.length > 0 && (
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  Capacidades en Producción
                </div>
                <ul className="space-y-1.5">
                  {specs.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#334155]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-transform duration-200 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${theme.grad[0]}, ${theme.grad[1]})` }}
          >
            <span>Abrir {host}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}
