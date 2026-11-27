/**
 * BrowserPreviewCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta 3D Glassmorphism + Neumorphism fiel a la referencia visual:
 *  - Encabezado con etiqueta de categoría (# TAG) + botón Stack ↻.
 *  - Cuerpo horizontal:
 *     · Izquierda: Ventana de navegador/tablet 3D flotante con captura
 *       real .webp (o fallback UI) + emblema 3D decorativo superpuesto.
 *     · Derecha: Nombre del proyecto, dominio con indicador en vivo,
 *       descripción clara y botón gradiente "Explorar plataforma →".
 *  - Giro 3D a cara trasera con ficha técnica y stack completo.
 *  - GPU-accelerated (transform, opacity, preserve-3d, glare).
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import ProjectDecor3D from './ProjectDecor3D'

const THEMES = {
  comercia: {
    pillBg: 'rgba(8, 123, 255, 0.10)',
    pillText: '#087BFF',
    btnGrad: 'linear-gradient(135deg, #087BFF 0%, #173BCE 55%, #792BFF 100%)',
    border: 'rgba(8, 123, 255, 0.25)',
    glow: 'rgba(8, 123, 255, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(8,123,255,0.16), transparent 60%)',
  },
  javrelstore: {
    pillBg: 'rgba(121, 43, 255, 0.10)',
    pillText: '#792BFF',
    btnGrad: 'linear-gradient(135deg, #087BFF 0%, #792BFF 100%)',
    border: 'rgba(121, 43, 255, 0.25)',
    glow: 'rgba(121, 43, 255, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(121,43,255,0.15), transparent 60%)',
  },
  evora: {
    pillBg: 'rgba(161, 43, 255, 0.10)',
    pillText: '#792BFF',
    btnGrad: 'linear-gradient(135deg, #792BFF 0%, #A12BFF 100%)',
    border: 'rgba(161, 43, 255, 0.26)',
    glow: 'rgba(161, 43, 255, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(161,43,255,0.15), transparent 60%)',
  },
  clones: {
    pillBg: 'rgba(8, 123, 255, 0.10)',
    pillText: '#087BFF',
    btnGrad: 'linear-gradient(135deg, #087BFF 0%, #173BCE 65%, #EF4444 100%)',
    border: 'rgba(8, 123, 255, 0.26)',
    glow: 'rgba(8, 123, 255, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(8,123,255,0.16), transparent 60%)',
  },
  green: {
    pillBg: 'rgba(5, 150, 105, 0.10)',
    pillText: '#059669',
    btnGrad: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    border: 'rgba(16, 185, 129, 0.28)',
    glow: 'rgba(16, 185, 129, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(16,185,129,0.16), transparent 60%)',
  },
  realpe: {
    pillBg: 'rgba(8, 123, 255, 0.10)',
    pillText: '#087BFF',
    btnGrad: 'linear-gradient(135deg, #087BFF 0%, #792BFF 100%)',
    border: 'rgba(8, 123, 255, 0.25)',
    glow: 'rgba(8, 123, 255, 0.26)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(8,123,255,0.15), transparent 60%)',
  },
  mrpollo: {
    pillBg: 'rgba(234, 88, 12, 0.10)',
    pillText: '#EA580C',
    btnGrad: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 55%, #DC2626 100%)',
    border: 'rgba(234, 88, 12, 0.26)',
    glow: 'rgba(234, 88, 12, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(245,158,11,0.18), transparent 60%)',
  },
  jrcellcity: {
    pillBg: 'rgba(121, 43, 255, 0.10)',
    pillText: '#792BFF',
    btnGrad: 'linear-gradient(135deg, #087BFF 0%, #792BFF 100%)',
    border: 'rgba(121, 43, 255, 0.25)',
    glow: 'rgba(121, 43, 255, 0.28)',
    ambient: 'radial-gradient(circle at 20% 80%, rgba(121,43,255,0.15), transparent 60%)',
  },
}

export default function BrowserPreviewCard({ project, index = 0 }) {
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
    const rx = (0.5 - py) * 7
    const ry = (px - 0.5) * 7

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
      className="reveal group relative h-full"
      style={{
        perspective: '1200px',
        transitionDelay: `${index * 65}ms`,
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
            CARA FRONTAL: Glassmorphism + Neumorphism + Pantalla 3D
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full rounded-[26px] overflow-hidden bg-white/88 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-shadow duration-300 group-hover:shadow-[0_28px_60px_-14px_rgba(16,27,69,0.16)]"
          style={{
            border: `1.5px solid ${theme.border}`,
            boxShadow:
              '0 18px 44px -14px rgba(16, 27, 69, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Gradiente ambiental detrás de la pantalla 3D */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[26px]"
            style={{ background: theme.ambient }}
          />

          {/* Brillo especular interactivo (glare) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[26px] transition-opacity duration-300"
            style={{
              opacity: 'var(--glare)',
              background: `radial-gradient(460px circle at var(--gx) var(--gy), rgba(255,255,255,0.65), ${theme.glow} 32%, transparent 68%)`,
              zIndex: 5,
            }}
          />

          {/* Fila superior: # Categoría + Indicador Stack ↻ */}
          <div
            className="relative z-10 flex items-center justify-between gap-2"
            style={{ transform: 'translateZ(24px)' }}
          >
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider"
              style={{ background: theme.pillBg, color: theme.pillText }}
            >
              # {tag}
            </span>

            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold text-[#101B45] bg-white/95 border border-slate-200/90 shadow-sm hover:border-blue-400/70 hover:scale-105 transition-all"
              title="Ver ficha técnica y stack"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Stack ↻</span>
            </button>
          </div>

          {/* Cuerpo horizontal: Pantalla 3D izquierda + Info derecha */}
          <div
            className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center my-auto"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* IZQUIERDA: Pantalla 3D inclinada + Emblema 3D superpuesto */}
            <div
              className="sm:col-span-6 relative pb-3 pl-2"
              style={{ perspective: '900px', transform: 'translateZ(26px)' }}
            >
              <div
                className="relative rounded-2xl p-1.5 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0B1437] shadow-[0_20px_38px_-10px_rgba(16,27,69,0.38)] transition-transform duration-500 ease-out group-hover:[transform:rotateY(2deg)_rotateX(1deg)_scale(1.03)]"
                style={{ transform: 'rotateY(9deg) rotateX(3deg)' }}
              >
                {/* Barra navegador */}
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-900/95 rounded-t-xl border-b border-white/10">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-300 truncate max-w-[115px]">
                    {host}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                {/* Viewport fijo de la captura real */}
                <div className="relative h-[170px] w-full overflow-hidden rounded-b-xl bg-slate-100">
                  {!imgError ? (
                    <img
                      src={`/previews/${previewId}.webp`}
                      alt={`Vista previa de ${name}`}
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError(true)}
                      className="w-full h-[120%] object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-translate-y-[8%]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between p-3 bg-gradient-to-br from-white via-[#F7FAFF] to-blue-50">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-[#101B45] bg-white px-2 py-0.5 rounded border border-blue-100">
                          {host}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 font-semibold">● Cloud</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="rounded-lg bg-white p-2 border border-blue-100">
                          <div className="text-[8px] text-[#66718C]">UPTIME</div>
                          <div className="text-xs font-black text-[#101B45]">99.9%</div>
                        </div>
                        <div className="rounded-lg bg-white p-2 border border-blue-100">
                          <div className="text-[8px] text-[#66718C]">CORE</div>
                          <div className="text-xs font-black text-[#087BFF] truncate">{techStack[0] || 'React'}</div>
                        </div>
                      </div>
                      <div className="h-10 rounded-lg bg-white border border-blue-100 p-1.5 flex items-end gap-1">
                        {[40, 62, 50, 82, 68, 95].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${h}%`,
                              background: i >= 3 ? theme.btnGrad : '#CBD5E1',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Emblema 3D decorativo flotante en esquina inferior izquierda */}
              <div
                className="absolute -bottom-1 -left-1 z-20 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105"
                style={{ transform: 'translateZ(42px)' }}
                aria-hidden
              >
                <ProjectDecor3D previewId={previewId} />
              </div>
            </div>

            {/* DERECHA: Nombre, dominio, descripción y botón */}
            <div
              className="sm:col-span-6 flex flex-col justify-between gap-3"
              style={{ transform: 'translateZ(24px)' }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#101B45] leading-tight tracking-tight mb-1">
                  {name}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#66718C] mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{host}</span>
                </div>
                <p className="text-sm text-[#66718C] leading-relaxed line-clamp-3">
                  {desc}
                </p>
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: theme.btnGrad,
                  boxShadow: `0 10px 24px -6px ${theme.glow}`,
                }}
              >
                <span>Explorar plataforma</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARA TRASERA (Flip 3D): Ficha Técnica & Stack
           ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-[26px] overflow-hidden bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between p-6"
          style={{
            border: `1.5px solid ${theme.border}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.pillText }}>
                  Ficha Técnica · Arquitectura
                </span>
                <h4 className="text-xl font-black text-[#101B45]">{name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#101B45] bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
              >
                ← Vista previa
              </button>
            </div>

            <p className="text-sm text-[#66718C] leading-relaxed mb-4">
              {desc}
            </p>

            <div className="mb-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66718C] mb-2">
                Stack Principal
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-[#F7FAFF] text-[#101B45] border border-blue-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {specs.length > 0 && (
              <ul className="space-y-1.5">
                {specs.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#101B45]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: theme.btnGrad }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full font-bold text-xs text-white shadow-md transition-transform duration-200 hover:scale-[1.02]"
            style={{ background: theme.btnGrad }}
          >
            <span>Abrir {host}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}
