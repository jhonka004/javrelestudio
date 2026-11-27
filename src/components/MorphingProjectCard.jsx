/**
 * MorphingProjectCard.jsx — Rediseño Pastel Glassmorphism (Ronda 5)
 * ─────────────────────────────────────────────────────────────────
 * Estética: Light luxury + 21st.dev
 *  - Geometría perfecta rounded-2xl, ZERO clipPath ni deformaciones
 *  - Fondo pastel suave por tarjeta + glassmorphism backdrop-blur
 *  - Spotlight hover: brillo radial que sigue el cursor
 *  - Framer Motion: elevación spring, zoom en preview, fade de badges
 *  - Borde degradado 1px tipo "passport card" (violet→orange / blue→cyan)
 *  - Tipografía #0F172A / #334155 — alto contraste en modo claro
 *  - Green Emeralds → https://greenesmeraldscol.com/ ✅
 */

import { useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ────────────────────────────────────────────
   TEMAS PASTEL por plataforma
   bg: gradiente claro del fondo de la tarjeta
   glass: color del vidrio sobre el gradiente
   border: colores del borde degradado
   accent: color del acento/botón/badge
   glow: color del spotlight hover
──────────────────────────────────────────── */
const THEMES = {
  comercia: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 60%, #EDE9FE 100%)',
    border: ['#6366F1', '#3B82F6'],
    accent: '#2563EB',
    glow: 'rgba(99,102,241,0.18)',
    tag: '#3B82F6',
    tagBg: '#EFF6FF',
    icon: '🏪',
  },
  javrelstore: {
    bg: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 60%, #E0F2FE 100%)',
    border: ['#0891B2', '#38BDF8'],
    accent: '#0891B2',
    glow: 'rgba(8,145,178,0.18)',
    tag: '#0891B2',
    tagBg: '#ECFEFF',
    icon: '🛒',
  },
  evora: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 60%, #FDF4FF 100%)',
    border: ['#7C3AED', '#C084FC'],
    accent: '#7C3AED',
    glow: 'rgba(124,58,237,0.16)',
    tag: '#7C3AED',
    tagBg: '#F5F3FF',
    icon: '🌸',
  },
  clones: {
    bg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 60%, #EEF2FF 100%)',
    border: ['#0EA5E9', '#6366F1'],
    accent: '#0EA5E9',
    glow: 'rgba(14,165,233,0.18)',
    tag: '#0EA5E9',
    tagBg: '#F0F9FF',
    icon: '🖥️',
  },
  green: {
    bg: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 60%, #ECFDF5 100%)',
    border: ['#059669', '#34D399'],
    accent: '#059669',
    glow: 'rgba(5,150,105,0.16)',
    tag: '#059669',
    tagBg: '#F0FDF4',
    icon: '💎',
  },
  realpe: {
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 60%, #F0F9FF 100%)',
    border: ['#38BDF8', '#818CF8'],
    accent: '#3B82F6',
    glow: 'rgba(56,189,248,0.18)',
    tag: '#3B82F6',
    tagBg: '#EFF6FF',
    icon: '👟',
  },
  mrpollo: {
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FFF7ED 100%)',
    border: ['#F59E0B', '#FB923C'],
    accent: '#D97706',
    glow: 'rgba(245,158,11,0.18)',
    tag: '#D97706',
    tagBg: '#FFFBEB',
    icon: '🍗',
  },
  jrcellcity: {
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #FDF4FF 100%)',
    border: ['#8B5CF6', '#EC4899'],
    accent: '#7C3AED',
    glow: 'rgba(139,92,246,0.18)',
    tag: '#7C3AED',
    tagBg: '#F5F3FF',
    icon: '📱',
  },
}

/* ────────────────────────────────────────────
   SPOTLIGHT HOOK — sigue el cursor por la tarjeta
──────────────────────────────────────────── */
function useSpotlight() {
  const [spot, setSpot] = useState({ x: '50%', y: '50%', opacity: 0 })

  const onMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpot({ x: `${x}%`, y: `${y}%`, opacity: 1 })
  }, [])

  const onLeave = useCallback(() => {
    setSpot((s) => ({ ...s, opacity: 0 }))
  }, [])

  return { spot, onMove, onLeave }
}

/* ────────────────────────────────────────────
   BORDE DEGRADADO — componente SVG inline
──────────────────────────────────────────── */
function GradientBorder({ colors, radius = 20 }) {
  const id = useRef(`gb-${Math.random().toString(36).slice(2, 8)}`).current
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.7" />
          <stop offset="100%" stopColor={colors[1]} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx={radius}
        ry={radius}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
        className="w-[calc(100%-1.5px)] h-[calc(100%-1.5px)]"
      />
    </svg>
  )
}

/* ────────────────────────────────────────────
   UI PREVIEWS por plataforma — modo claro
──────────────────────────────────────────── */
function ProjectWindowPreview({ previewId, theme }) {
  const { accent, tagBg, tag } = theme

  return (
    <div className="w-full h-full flex flex-col">
      {/* Barra de navegador */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5"
        style={{ background: 'rgba(255,255,255,0.7)' }}
      >
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <div
          className="ml-2 flex-1 h-5 rounded-full px-2 flex items-center"
          style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <span className="text-[9px] font-mono truncate" style={{ color: '#64748B' }}>
            {previewId === 'comercia' && 'comercia.cloud'}
            {previewId === 'javrelstore' && 'javrelstore.shop'}
            {previewId === 'evora' && 'evoraperfumes.com'}
            {previewId === 'clones' && 'clonesyperifericos.com'}
            {previewId === 'green' && 'greenesmeraldscol.com'}
            {previewId === 'realpe' && 'realpeshoes.vercel.app'}
            {previewId === 'mrpollo' && 'mrpollosp.com'}
            {previewId === 'jrcellcity' && 'jrcellcity-demo.pages.dev'}
          </span>
        </div>
      </div>

      {/* Contenido UI simulado */}
      <div className="flex-1 p-3 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03]">

        {previewId === 'comercia' && (
          <div className="h-full flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[['VENTAS', '$4.82M', '#2563EB'], ['FACTURAS', '142', '#059669'], ['STOCK', '98%', '#D97706']].map(([l, v, c]) => (
                <div key={l} className="rounded-xl p-2 bg-white/80 shadow-sm border border-black/5">
                  <div className="text-[8px] font-mono text-slate-400">{l}</div>
                  <div className="text-xs font-black" style={{ color: c }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-xl bg-white/80 border border-black/5 p-2 flex items-end gap-1 shadow-sm">
              {[38, 55, 48, 72, 60, 85, 70, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{
                  height: `${h}%`,
                  background: i >= 5 ? `linear-gradient(to top, ${accent}, ${accent}80)` : '#E2E8F0',
                }} />
              ))}
            </div>
          </div>
        )}

        {previewId === 'javrelstore' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-xl bg-white/80 border border-black/5 p-2.5 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>SETUP PRO 2026</div>
                <div className="text-xs font-bold text-slate-800">Gaming & Tech</div>
              </div>
              <span className="text-[8px] px-2 py-0.5 rounded-full font-bold" style={{ background: tagBg, color: tag, border: `1px solid ${accent}30` }}>HOT</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {['🎧 Audio', '⌨️ Teclados', '🖱️ Mouse', '💡 RGB'].map(item => (
                <div key={item} className="rounded-xl bg-white/80 border border-black/5 p-2 flex items-center gap-1.5 shadow-sm">
                  <span className="text-sm">{item.slice(0, 2)}</span>
                  <span className="text-[9px] font-semibold text-slate-600">{item.slice(3)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'evora' && (
          <div className="h-full flex flex-col gap-2 items-center justify-center">
            <div className="text-center mb-1">
              <div className="text-[8px] font-mono tracking-widest uppercase" style={{ color: accent }}>Boutique Olfativa</div>
              <div className="text-sm font-black text-slate-800 italic">Évora</div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full">
              {['🌹', '🌿', '🪵', '✨', '🌊', '🌸'].map((e, i) => (
                <div key={i} className="rounded-xl bg-white/80 border border-black/5 p-2 flex items-center justify-center shadow-sm text-lg">
                  {e}
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'clones' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-xl bg-white/80 border border-black/5 p-2 shadow-sm">
              <div className="text-[8px] font-mono text-slate-400 mb-1">CONFIGURADOR PC GAMER</div>
              <div className="flex flex-col gap-1">
                {[['CPU', 'AMD Ryzen 9', 100], ['GPU', 'RTX 4080', 90], ['RAM', '64GB DDR5', 75]].map(([c, v, p]) => (
                  <div key={c} className="flex items-center gap-2">
                    <div className="text-[8px] font-mono w-7 text-slate-400">{c}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${p}%`, background: `linear-gradient(to right, ${accent}, ${accent}99)` }} />
                    </div>
                    <div className="text-[8px] text-slate-500 w-14 truncate">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {previewId === 'green' && (
          <div className="h-full flex flex-col gap-2">
            <div className="text-center">
              <div className="text-[8px] font-mono tracking-widest" style={{ color: accent }}>ESMERALDAS · COLOMBIA</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {[['💎', 'Certificadas', 'GIA & Lab'], ['🌍', 'Exportación', 'Mundial'], ['✅', 'Calidad AAA', 'Verificada'], ['📦', 'Envío', 'Asegurado']].map(([icon, title, sub]) => (
                <div key={title} className="rounded-xl bg-white/80 border border-black/5 p-2 flex flex-col items-center gap-0.5 shadow-sm text-center">
                  <span>{icon}</span>
                  <div className="text-[9px] font-bold text-slate-800">{title}</div>
                  <div className="text-[7px] text-slate-400">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'realpe' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-xl bg-white/80 border border-black/5 p-2 shadow-sm flex items-center gap-2">
              <span className="text-lg">👟</span>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>NUEVA COLECCIÓN</div>
                <div className="text-xs font-bold text-slate-800">Realpe Shoes 2026</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {['Urbano', 'Deportivo', 'Casual', 'Premium'].map(cat => (
                <div key={cat} className="rounded-xl bg-white/80 border border-black/5 p-2 text-center shadow-sm">
                  <div className="text-[9px] font-bold text-slate-700">{cat}</div>
                  <div className="mt-1 h-0.5 w-full rounded" style={{ background: `linear-gradient(to right, ${accent}, ${accent}60)` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'mrpollo' && (
          <div className="h-full flex flex-col gap-2">
            <div className="text-center">
              <div className="text-sm font-black text-slate-800">🍗 Mr. Pollo</div>
              <div className="text-[8px] font-mono" style={{ color: accent }}>PEDIDOS EN LÍNEA</div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              {[['Pechuga BBQ', '$28.000', '⭐4.9'], ['Combo Familiar', '$52.000', '⭐5.0'], ['Alitas Crispy', '$18.000', '⭐4.8']].map(([item, price, stars]) => (
                <div key={item} className="rounded-xl bg-white/80 border border-black/5 px-2.5 py-1.5 flex items-center justify-between shadow-sm">
                  <span className="text-[9px] font-semibold text-slate-700">{item}</span>
                  <span className="text-[9px] font-bold" style={{ color: accent }}>{price}</span>
                  <span className="text-[8px] text-slate-400">{stars}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'jrcellcity' && (
          <div className="h-full flex flex-col gap-2">
            <div className="rounded-xl bg-white/80 border border-black/5 p-2 shadow-sm flex items-center gap-2">
              <span className="text-lg">📱</span>
              <div>
                <div className="text-[8px] font-mono" style={{ color: accent }}>CATÁLOGO DIGITAL</div>
                <div className="text-xs font-bold text-slate-800">JR CellCity</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 flex-1">
              {['iPhone', 'Samsung', 'Xiaomi', 'Fundas', 'Cables', 'Cargadores'].map(item => (
                <div key={item} className="rounded-xl bg-white/80 border border-black/5 p-1.5 text-center shadow-sm">
                  <div className="text-[8px] text-slate-600 font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   TARJETA PRINCIPAL
──────────────────────────────────────────── */
export default function MorphingProjectCard({ project, bentoClass = '', delay = 0 }) {
  const { name, desc, url, tag, previewId, techStack, featured } = project
  const theme = THEMES[previewId] || THEMES.comercia
  const cardRef = useRef(null)
  const { spot, onMove, onLeave } = useSpotlight()

  // 3D tilt suave
  const rotX = useSpring(useMotionValue(0), { stiffness: 150, damping: 25 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 150, damping: 25 })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rotX.set(-cy * 5)
    rotY.set(cx * 5)
    onMove(e)
  }, [rotX, rotY, onMove])

  const handleMouseLeave = useCallback((e) => {
    rotX.set(0)
    rotY.set(0)
    onLeave(e)
  }, [rotX, rotY, onLeave])

  return (
    <motion.article
      ref={cardRef}
      className={`group relative ${bentoClass}`}
      style={{
        minHeight: featured ? 340 : 300,
        perspective: 900,
        rotateX: rotX,
        rotateY: rotY,
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contenedor principal — geometría perfecta rounded-2xl + Glassmorphism profesional */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-white/75 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50"
        style={{
          background: theme.bg,
          minHeight: 'inherit',
        }}
      >
        {/* Borde degradado SVG */}
        <GradientBorder colors={theme.border} radius={16} />

        {/* Spotlight hover — radial glow que sigue el cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: spot.opacity,
            background: `radial-gradient(400px circle at ${spot.x} ${spot.y}, ${theme.glow}, transparent 70%)`,
            zIndex: 1,
          }}
        />

        {/* Capa glassmorphism cristal esmerilado encima del gradiente */}
        <div
          className="absolute inset-0 rounded-2xl bg-white/45 backdrop-blur-md"
        />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col h-full p-4 gap-3" style={{ minHeight: 'inherit' }}>

          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2"
                style={{
                  background: `${theme.accent}14`,
                  color: theme.accent,
                  border: `1px solid ${theme.accent}30`,
                }}
              >
                <span>{theme.icon}</span>
                {tag}
              </span>
              <h3 className="text-base font-black leading-tight tracking-tight" style={{ color: '#0F172A' }}>
                {name}
              </h3>
            </div>
            {/* Dot status animado */}
            <motion.div
              className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
              style={{ background: theme.accent }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Previsualización UI — ventana viva */}
          <div
            className="relative flex-1 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.06)',
              minHeight: 120,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8)',
            }}
          >
            <ProjectWindowPreview previewId={previewId} theme={theme} />
          </div>

          {/* Footer */}
          <div className="space-y-2.5">
            <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
              {desc}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5">
              {techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-[9px] font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.75)',
                    color: '#475569',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Botón */}
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-semibold text-xs cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${theme.border[0]}, ${theme.border[1]})`,
                color: '#FFFFFF',
                boxShadow: `0 4px 14px -2px ${theme.glow}`,
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 6px 20px -2px ${theme.glow}` }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explorar plataforma</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
