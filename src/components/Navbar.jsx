/**
 * Navbar.jsx — Sticky navigation with blur glassmorphism
 */
import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio',     href: '#hero' },
  { label: 'Proyectos', href: '#portfolio' },
  { label: 'Servicios', href: '#services' },
  { label: 'Lab',       href: '#lab' },
  { label: 'Contacto',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled ? 'glass-card shadow-sm' : 'bg-transparent'}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="font-mono text-xs font-bold" style={{ color: '#06B6D4' }}>JS</span>
          </div>
          <span className="font-display font-bold text-ink text-sm tracking-tight hidden sm:block">
            Javrel<span className="gradient-text">Studio</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-zinc-500 hover:text-ink transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex btn-magnetic items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
        >
          Iniciar Proyecto
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg glass-card"
          onClick={() => setOpen(o => !o)}
        >
          <div className={`w-5 flex flex-col gap-1 transition-all ${open ? 'gap-0' : ''}`}>
            <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-0.5' : ''}`} />
            <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-0.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-t border-white/60 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white w-full justify-center"
            style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
          >
            Iniciar Proyecto →
          </a>
        </div>
      )}
    </header>
  )
}
