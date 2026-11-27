/**
 * MorphingProjectCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta Bento Grid con Light Glassmorphism (frosted glass claro),
 * paralaje sutil en la vista previa al hacer hover, elevación suave,
 * reflejo de luz superior y transiciones fluidas al hacer scroll.
 */

import { useRef, useEffect, useCallback, useState } from 'react'

export default function MorphingProjectCard({ project, bentoClass = '', delay = 0 }) {
  const cardRef = useRef(null)
  const previewRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMove = useCallback((e) => {
    const card = cardRef.current
    const preview = previewRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5

    card.style.setProperty('--gx', `${((nx + 0.5) * 100).toFixed(1)}%`)
    card.style.setProperty('--gy', `${((ny + 0.5) * 100).toFixed(1)}%`)
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${(-ny * 5).toFixed(2)}deg) rotateY(${(nx * 5).toFixed(2)}deg)`

    if (preview) {
      preview.style.transform = `translate3d(${(nx * 14).toFixed(1)}px, ${(ny * 10).toFixed(1)}px, 0) scale(1.06)`
    }
  }, [])

  const onLeave = useCallback(() => {
    const card = cardRef.current
    const preview = previewRef.current
    if (card) {
      card.style.transform = 'translateY(0px) perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
    if (preview) {
      preview.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
    }
  }, [])

  const { name, desc, url, tag, color = '#2563EB', emoji = '🚀', featured = false, metrics } = project

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transitionDelay: visible ? `${delay}ms` : '0ms',
        '--gx': '50%',
        '--gy': '50%',
      }}
      className={`
        glass-card relative rounded-3xl overflow-hidden flex flex-col group cursor-pointer
        transition-[opacity,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:shadow-[0_28px_60px_-15px_rgba(37,99,235,0.16)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${bentoClass}
      `}
    >
      {/* Top light specular highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)' }}
      />

      {/* Interactive cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 220px at var(--gx) var(--gy), rgba(255,255,255,0.55) 0%, transparent 70%)`,
        }}
      />

      {/* Visual preview area with subtle parallax */}
      <div
        className={`relative overflow-hidden flex items-center justify-center flex-shrink-0 ${
          featured ? 'h-48 sm:h-56' : 'h-32 sm:h-36'
        }`}
        style={{
          background: `linear-gradient(135deg, ${color}18 0%, rgba(248,250,252,0.9) 100%)`,
        }}
      >
        {/* Subtle decorative code-art grid */}
        <div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${color}33 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Parallax preview element */}
        <div
          ref={previewRef}
          className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        >
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg border border-white/80 backdrop-blur-md"
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.9), ${color}22)` }}
          >
            <span className="text-4xl sm:text-5xl select-none">{emoji}</span>
          </div>
        </div>

        {/* Category tag */}
        <span
          className="absolute top-3.5 left-3.5 z-20 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/60"
          style={{ background: 'rgba(255,255,255,0.82)', color }}
        >
          {tag}
        </span>

        {metrics && (
          <span className="absolute top-3.5 right-3.5 z-20 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-900/85 text-white">
            {metrics}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 relative z-10 flex flex-col flex-1 min-h-0">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-1.5 group-hover:text-[#2563EB] transition-colors duration-200 leading-snug">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4 flex-1">
          {desc}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase mt-auto w-fit"
          style={{ color }}
          onClick={(e) => e.stopPropagation()}
        >
          Ver plataforma
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Bottom iridescent accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, #0891B2, transparent)` }}
      />
    </article>
  )
}
