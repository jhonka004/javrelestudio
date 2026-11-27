/**
 * Navbar.jsx — Barra de navegación horizontal blanca con píldora
 * central en cristal translúcido, icono JS 3D y botón Iniciar Proyecto.
 */
import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio',    href: '#hero',      icon: 'home' },
  { label: 'Proyectos', href: '#portfolio', icon: 'grid' },
  { label: 'Servicios', href: '#services',  icon: 'cog' },
  { label: 'Lab',       href: '#lab',       icon: 'lab' },
  { label: 'Contacto',  href: '#contact',   icon: 'mail' },
]

function NavIcon({ type }) {
  switch (type) {
    case 'home':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.5 1.5 7v7.5h4.5v-4h4v4h4.5V7L8 1.5z" />
        </svg>
      )
    case 'grid':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="2" width="5" height="5" rx="1.2" />
          <rect x="9" y="2" width="5" height="5" rx="1.2" />
          <rect x="2" y="9" width="5" height="5" rx="1.2" />
          <rect x="9" y="9" width="5" height="5" rx="1.2" />
        </svg>
      )
    case 'cog':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" strokeLinecap="round" />
        </svg>
      )
    case 'lab':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 2h4M7 2v4l-3.5 6.2A1.2 1.2 0 0 0 4.5 14h7a1.2 1.2 0 0 0 1-1.8L9 6V2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="3.5" width="12" height="9" rx="1.8" />
          <path d="M2.5 4.5 8 9l5.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-sm'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo JS + Javrel Studio */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform"
            style={{ background: 'linear-gradient(135deg, #087BFF 0%, #173BCE 50%, #792BFF 100%)' }}
          >
            <span className="font-mono text-sm font-black text-white tracking-tighter">JS</span>
          </div>
          <span className="font-display font-extrabold text-[#101B45] text-base sm:text-lg tracking-tight">
            Javrel <span className="gradient-text">Studio</span>
          </span>
        </a>

        {/* Desktop links inside white translucent pill */}
        <ul className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm">
          {links.map((l, idx) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  idx === 0
                    ? 'bg-[#EFF6FF] text-[#087BFF]'
                    : 'text-[#66718C] hover:text-[#101B45] hover:bg-slate-100/70'
                }`}
              >
                <NavIcon type={l.icon} />
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Iniciar Proyecto */}
        <a
          href="#contact"
          className="hidden md:inline-flex btn-magnetic items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
          style={{ background: 'linear-gradient(135deg, #087BFF 0%, #173BCE 45%, #792BFF 100%)' }}
        >
          <span>Iniciar Proyecto</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          className="lg:hidden p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm"
          onClick={() => setOpen(o => !o)}
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-[#101B45] transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-[#101B45] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#101B45] transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/70 px-6 pb-6 shadow-xl">
          <ul className="flex flex-col gap-2 pt-4">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#101B45] hover:bg-blue-50 hover:text-[#087BFF] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <NavIcon type={l.icon} />
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white w-full shadow-lg shadow-blue-600/25"
            style={{ background: 'linear-gradient(135deg, #087BFF 0%, #792BFF 100%)' }}
          >
            Iniciar Proyecto →
          </a>
        </div>
      )}
    </header>
  )
}
