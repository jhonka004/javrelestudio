/**
 * BrowserPreviewCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta uniforme 3D GPU-accelerated con estética vibrante (estilo Lovable):
 *  - Altura 100% uniforme (h-full flex flex-col justify-between).
 *  - Viewport Safari fijo (h-[230px] overflow-hidden) para que las
 *    capturas .webp nunca estiren la tarjeta ni dejen espacios vacíos.
 *  - Hover corto tipo video-preview (scale 1.06 + translateY -12% acotado)
 *    + píldora flotante en cristal esmerilado.
 *  - 3D Tilt (perspective 1200px, preserve-3d, glare) y Flip 3D (Stack ↻).
 */

import { useRef, useState, useCallback, useEffect } from 'react'

const THEMES = {
  comercia: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #E0E7FF 100%)',
    accentBg: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
    border: 'rgba(59, 130, 246, 0.32)',
    accent: '#2563EB',
    glow: 'rgba(59, 130, 246, 0.24)',
  },
  javrelstore: {
    bg: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 50%, #E0F2FE 100%)',
    accentBg: 'linear-gradient(135deg, #0891B2 0%, #2563EB 100%)',
    border: 'rgba(8, 145, 178, 0.32)',
    accent: '#0891B2',
    glow: 'rgba(8, 145, 178, 0.24)',
  },
  evora: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 45%, #FCE7F3 100%)',
    accentBg: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    border: 'rgba(139, 92, 246, 0.32)',
    accent: '#7C3AED',
    glow: 'rgba(236, 72, 153, 0.22)',
  },
  clones: {
    bg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #EDE9FE 100%)',
    accentBg: 'linear-gradient(135deg, #0284C7 0%, #6366F1 100%)',
    border: 'rgba(14, 165, 233, 0.32)',
    accent: '#0284C7',
    glow: 'rgba(14, 165, 233, 0.24)',
  },
  green: {
    bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #E0F2FE 100%)',
    accentBg: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
    border: 'rgba(5, 150, 105, 0.32)',
    accent: '#059669',
    glow: 'rgba(16, 185, 129, 0.22)',
  },
  realpe: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 50%, #FCE7F3 100%)',
    accentBg: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    border: 'rgba(99, 102, 241, 0.32)',
    accent: '#4F46E5',
    glow: 'rgba(99, 102, 241, 0.22)',
  },
  mrpollo: {
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FFE4E6 100%)',
    accentBg: 'linear-gradient(135deg, #D97706 0%, #E11D48 100%)',
    border: 'rgba(217, 119, 6, 0.32)',
    accent: '#D97706',
    glow: 'rgba(245, 158, 11, 0.22)',
  },
  jrcellcity: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #FCE7F3 50%, #FFE4E6 100%)',
    accentBg: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    border: 'rgba(236, 72, 153, 0.32)',
    accent: '#7C3AED',
    glow: 'rgba(236, 72, 153, 0.22)',
  },
}

export default function BrowserPreviewCard({ project }) {
  const { name, desc, url, tag, previewId, techStack = [], specs = [] } = project
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
    const rx = (0.5 - py) * 9
    const ry = (px - 0.5) * 9

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
      className="group relative h-full"
      style={{
        perspective: '1200px',
        '--rx': '0deg',
        '--ry': '0deg',
        '--gx': '50%',
        '--gy': '50%',
        '--glare': '0',
      }}
    >
      {/* Contenedor 3D Tilt + Flip */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: isFlipped
            ? 'rotateY(180deg)'
            : 'rotateX(var(--rx)) rotateY(var(--ry))',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            CARA FRONTAL: Geometría uniforme + Viewport fijo h-[230px]
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/60 flex flex-col justify-between p-5 gap-4"
          style={{
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Capa glassmorphism suave */}
          <div className="pointer-events-none absolute inset-0 bg-white/45 rounded-3xl" />

          {/* Reflejo especular (Glare / Spotlight) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
            style={{
              opacity: 'var(--glare)',
              background: `radial-gradient(420px circle at var(--gx) var(--gy), rgba(255,255,255,0.68), ${theme.glow} 40%, transparent 72%)`,
              zIndex: 5,
            }}
          />

          {/* Top + Preview agrupados */}
          <div className="relative z-10 flex flex-col gap-3.5" style={{ transformStyle: 'preserve-3d' }}>
            {/* Header */}
            <div
              className="flex items-start justify-between gap-2"
              style={{ transform: 'translateZ(28px)' }}
            >
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 bg-white/90 shadow-sm"
                  style={{ color: theme.accent, border: `1px solid ${theme.border}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                  {tag}
                </span>
                <h3 className="text-xl font-black text-[#0F172A] leading-tight tracking-tight">
                  {name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-[#334155] bg-white/90 hover:bg-white border border-slate-200/80 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                title="Ver ficha técnica y stack"
              >
                Stack ↻
              </button>
            </div>

            {/* Marco Safari con altura estricta fija (nunca se estira ni deja huecos) */}
            <div
              className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-lg shadow-slate-900/5 flex flex-col"
              style={{ transform: 'translateZ(22px)' }}
            >
              {/* Barra superior macOS/Safari */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50/95 border-b border-slate-200/80 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 max-w-[200px]">
                  <svg className="w-2.5 h-2.5 text-emerald-600 shrink-0" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M9 5V3.5a3 3 0 0 0-6 0V5H2v6h8V5H9zm-4.5-1.5a1.5 1.5 0 0 1 3 0V5h-3V3.5z" />
                  </svg>
                  <span className="font-mono text-[10px] text-[#475569] truncate">
                    {host}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-semibold text-[#64748B]">LIVE</span>
              </div>

              {/* Viewport fijo h-[230px]: zoom suave + desplazamiento acotado (-12%) sin espacios vacíos */}
              <div className="relative h-[230px] w-full overflow-hidden bg-slate-100">
                {!imgError ? (
                  <img
                    src={`/previews/${previewId}.webp`}
                    alt={`Vista previa real de ${name}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="w-full h-[126%] object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-translate-y-[12%]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-white via-slate-50 to-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[#0F172A]">
                        {host}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-emerald-600">● Producción Cloud</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                        <div className="text-[8px] font-mono text-slate-400">UPTIME</div>
                        <div className="text-sm font-black text-[#0F172A]">99.9%</div>
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                        <div className="text-[8px] font-mono text-slate-400">LATENCIA</div>
                        <div className="text-sm font-black" style={{ color: theme.accent }}>&lt; 45ms</div>
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                        <div className="text-[8px] font-mono text-slate-400">CORE</div>
                        <div className="text-sm font-black text-[#0F172A] truncate">{techStack[0] || 'Cloud'}</div>
                      </div>
                    </div>
                    <div className="h-14 rounded-xl bg-white border border-slate-200/80 p-2.5 flex items-end gap-1.5">
                      {[42, 65, 52, 80, 68, 94, 78, 96].map((h, idx) => (
                        <div
                          key={idx}
                          className="flex-1 rounded-t transition-transform duration-500 origin-bottom group-hover:scale-y-105"
                          style={{
                            height: `${h}%`,
                            background: idx >= 5 ? theme.accentBg : '#CBD5E1',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Píldora flotante en cristal esmerilado al hacer hover */}
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-lg text-[11px] font-semibold text-[#0F172A] whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                  <span>Vista previa interactiva · {host}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer alineado abajo */}
          <div
            className="relative z-10 space-y-3 mt-auto"
            style={{ transform: 'translateZ(26px)' }}
          >
            <p className="text-sm leading-relaxed text-[#334155] font-medium line-clamp-2 min-h-[42px]">
              {desc}
            </p>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-xs text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: theme.accentBg,
                boxShadow: `0 8px 20px -4px ${theme.glow}`,
              }}
            >
              <span>Explorar plataforma</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARA TRASERA (Flip 3D): Ficha Técnica & Arquitectura
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/60 flex flex-col justify-between p-6"
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
                <h4 className="text-xl font-black text-[#0F172A]">{name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-[#0F172A] bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
              >
                ← Vista previa
              </button>
            </div>

            <p className="text-sm text-[#334155] leading-relaxed mb-4">
              {desc}
            </p>

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
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-xs text-white shadow-md transition-transform duration-200 hover:scale-[1.02]"
            style={{ background: theme.accentBg }}
          >
            <span>Abrir {host}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}
