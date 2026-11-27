/**
 * MorphingProjectCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Tarjeta Bento Grid tipo "Ventana Viva" con previsualizaciones UI
 * dinámicas de cada plataforma, microinteracciones con Framer Motion,
 * bordes definidos (border-slate-200/80) y contraste impecable en modo claro.
 */

import { motion } from 'framer-motion'

function ProjectWindowPreview({ previewId, color, url }) {
  const host = url.replace(/^https?:\/\//, '')

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm flex flex-col">
      {/* Mini barra de navegador */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50/90 border-b border-slate-200/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400/80" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-[10px] text-[#475569] truncate max-w-[160px] bg-white px-2 py-0.5 rounded border border-slate-200/70">
          {host}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      </div>

      {/* Contenido UI vivo por plataforma */}
      <div className="relative flex-1 p-3.5 overflow-hidden bg-gradient-to-br from-white via-slate-50/70 to-slate-100/60 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {previewId === 'comercia' && (
          <div className="h-full flex flex-col justify-between gap-2.5">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                <div className="text-[9px] font-mono text-[#475569]">VENTAS HOY</div>
                <div className="text-sm font-black text-[#0F172A]">$4.82M</div>
                <div className="text-[9px] font-semibold text-emerald-600">+18.4% ↑</div>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                <div className="text-[9px] font-mono text-[#475569]">FACTURAS DIAN</div>
                <div className="text-sm font-black text-[#2563EB]">142</div>
                <div className="text-[9px] font-semibold text-[#475569]">En línea</div>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-xs">
                <div className="text-[9px] font-mono text-[#475569]">STOCK OK</div>
                <div className="text-sm font-black text-[#0F172A]">98.2%</div>
                <div className="text-[9px] font-semibold text-[#0891B2]">3 sedes</div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-white border border-slate-200/80 p-2.5 flex items-end gap-1.5">
              {[38, 62, 48, 76, 58, 88, 72, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md transition-all duration-500 group-hover:opacity-100 opacity-85"
                  style={{
                    height: `${h}%`,
                    background: i >= 6 ? 'linear-gradient(to top, #2563EB, #0891B2)' : '#CBD5E1',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {previewId === 'javrelstore' && (
          <div className="h-full flex flex-col justify-between gap-2">
            <div className="rounded-xl bg-[#0F172A] text-white p-3 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono text-cyan-400 uppercase">Setup Pro 2026</div>
                <div className="text-xs font-bold">Periféricos & Gaming</div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                TOP
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              <div className="rounded-xl bg-white border border-slate-200/80 p-2.5 flex flex-col justify-between">
                <div className="h-8 rounded-lg bg-gradient-to-r from-cyan-500/15 to-blue-600/15 flex items-center justify-center text-sm">
                  🎧
                </div>
                <div className="text-[10px] font-bold text-[#0F172A]">Audio Studio</div>
                <div className="text-[10px] font-mono font-bold text-[#0891B2]">$389.000</div>
              </div>
              <div className="rounded-xl bg-white border border-slate-200/80 p-2.5 flex flex-col justify-between">
                <div className="h-8 rounded-lg bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 flex items-center justify-center text-sm">
                  ⌨️
                </div>
                <div className="text-[10px] font-bold text-[#0F172A]">Mech RGB 75%</div>
                <div className="text-[10px] font-mono font-bold text-[#2563EB]">$249.000</div>
              </div>
            </div>
          </div>
        )}

        {previewId === 'evora' && (
          <div className="h-full flex flex-col justify-between rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/70 border border-indigo-100 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#4F46E5] font-semibold">
                ÉVORA · PARIS
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-100 text-[#4F46E5] font-semibold">
                Eau de Parfum
              </span>
            </div>
            <div className="my-auto flex items-center gap-3">
              <div className="w-11 h-14 rounded-xl bg-gradient-to-b from-indigo-500/20 to-purple-600/25 border border-indigo-200 flex items-center justify-center text-lg shadow-inner">
                ✨
              </div>
              <div>
                <div className="text-xs font-black text-[#0F172A]">L&apos;Essence Noir</div>
                <div className="text-[10px] text-[#334155]">Bergamota · Oud · Ámbar</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-semibold text-[#4F46E5]">
              <span>100 ml</span>
              <span>Catálogo sensorial →</span>
            </div>
          </div>
        )}

        {previewId === 'clones' && (
          <div className="h-full flex flex-col justify-between gap-2.5">
            <div className="flex items-center justify-between bg-[#0F172A] text-white rounded-xl px-3 py-2.5">
              <div>
                <div className="text-[9px] font-mono text-blue-400">WORKSTATION & GAMING</div>
                <div className="text-xs font-bold">Configurador PC a Medida</div>
              </div>
              <div className="text-right font-mono text-[10px] text-emerald-400 font-bold">
                144+ FPS
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              {[
                { k: 'GPU', v: 'RTX Series' },
                { k: 'CPU', v: 'Ryzen / Core' },
                { k: 'RAM', v: 'DDR5 6000' },
              ].map((spec) => (
                <div key={spec.k} className="rounded-xl bg-white border border-slate-200/80 p-2 flex flex-col justify-center">
                  <span className="font-mono text-[9px] text-[#2563EB] font-bold">{spec.k}</span>
                  <span className="text-[10px] font-bold text-[#0F172A]">{spec.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewId === 'green' && (
          <div className="h-full flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/70 border border-emerald-200/70 p-3">
            <div className="flex flex-col justify-between h-full">
              <span className="inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                ● MUZO · EXPORT
              </span>
              <div>
                <div className="text-xs font-black text-[#0F172A]">Esmeraldas Certificadas</div>
                <div className="text-[10px] text-[#334155]">Origen Colombia · Envío Global</div>
              </div>
              <div className="text-[10px] font-bold text-emerald-700">Certificación Internacional ✓</div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-300/70 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="10,4 22,4 28,12 16,28 4,12" fill="#059669" fillOpacity="0.22" stroke="#059669" strokeWidth="1.8" />
                <polyline points="4,12 28,12" stroke="#059669" strokeWidth="1.3" />
                <polyline points="10,4 16,12 22,4" stroke="#059669" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        )}

        {previewId === 'realpe' && (
          <div className="h-full flex flex-col justify-between gap-2 rounded-xl bg-white border border-slate-200/80 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0F172A]">URBAN RUNNER v2</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-[#0891B2] border border-cyan-200">
                NEW DROP
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl">👟</span>
              <div className="flex gap-1">
                {['39', '40', '41', '42'].map((t, idx) => (
                  <span
                    key={t}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${
                      idx === 1
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-slate-50 text-[#334155] border-slate-200'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#334155]">Pago contraentrega & online</span>
              <span className="font-bold text-[#0891B2]">$219.900</span>
            </div>
          </div>
        )}

        {previewId === 'mrpollo' && (
          <div className="h-full flex flex-col justify-between gap-2 rounded-xl bg-gradient-to-br from-amber-50/80 to-white border border-amber-200/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0F172A]">Pedido en Línea</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                ⏱ 18-25 min
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl p-2 border border-amber-200/60">
              <span className="text-xl">🍗</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-[#0F172A] truncate">Combo Familiar Crunch</div>
                <div className="text-[10px] text-[#334155]">Papas + Bebida 1.5L</div>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-700">+$42k</span>
            </div>
            <div className="text-[10px] font-semibold text-amber-700 flex justify-between">
              <span>Seguimiento en vivo</span>
              <span>Ordenar →</span>
            </div>
          </div>
        )}

        {previewId === 'jrcellcity' && (
          <div className="h-full flex flex-col justify-between gap-2 rounded-xl bg-white border border-slate-200/80 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0F172A]">Catálogo Mobile 5G</span>
              <span className="text-[9px] font-mono text-[#4F46E5] font-bold">STOCK LIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2">
                <div className="text-[10px] font-bold text-[#0F172A]">📱 Pro Max 256GB</div>
                <div className="text-[9px] text-[#334155]">Garantía 12 meses</div>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2">
                <div className="text-[10px] font-bold text-[#0F172A]">⚡ Carga MagSafe</div>
                <div className="text-[9px] text-[#334155]">Accesorios orig.</div>
              </div>
            </div>
            <div className="text-[10px] font-semibold text-[#4F46E5]">Comparador instantáneo →</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MorphingProjectCard({ project, bentoClass = '', delay = 0 }) {
  const {
    name,
    desc,
    url,
    tag,
    color = '#2563EB',
    featured = false,
    previewId,
    techStack = [],
  } = project

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`
        glass-card relative rounded-3xl overflow-hidden flex flex-col group
        border border-slate-200/80
        shadow-[0_20px_40px_-15px_rgba(15,23,42,0.08)]
        hover:shadow-[0_28px_60px_-15px_rgba(37,99,235,0.16)]
        hover:border-blue-300/70 transition-all duration-300
        ${bentoClass}
      `}
    >
      {/* Reflejo superior de luz */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)' }}
      />

      {/* Ventana Viva del proyecto */}
      <div className={`p-3.5 pb-0 flex-shrink-0 ${featured ? 'h-56 sm:h-64' : 'h-44 sm:h-48'}`}>
        <ProjectWindowPreview previewId={previewId} color={color} url={url} />
      </div>

      {/* Información y badges */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: `${color}14`, color }}
            >
              {tag}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1.5 group-hover:text-[#2563EB] transition-colors leading-snug">
            {name}
          </h3>
          <p className="text-sm text-[#334155] leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Badges tecnológicos + Botón Explorar plataforma */}
        <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-[#334155] border border-slate-200/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all duration-200 group-hover:shadow-md"
            style={{ backgroundColor: color }}
          >
            Explorar plataforma
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
