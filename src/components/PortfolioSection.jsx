/**
 * PortfolioSection.jsx — Asymmetric gallery grid with liquid cards
 * 8 real Javrel Studio projects
 */
import MorphingProjectCard from './MorphingProjectCard'
import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    name: 'ComerCIA POS',
    desc: 'Sistema POS, Inventario y Facturación en la Nube para negocios modernos.',
    url:  'https://comercia.cloud',
    tag:  'SaaS · POS · ERP',
    color: '#2563EB',
    emoji: '🏪',
  },
  {
    name: 'JavrelStore',
    desc: 'E-commerce Tech & Gaming con experiencia de compra premium.',
    url:  'https://javrelstore.shop',
    tag:  'E-commerce',
    color: '#06B6D4',
    emoji: '🎮',
  },
  {
    name: 'Évora Perfumes',
    desc: 'Tienda online de perfumería de lujo con catálogo interactivo.',
    url:  'https://evoraperfumes.com',
    tag:  'E-commerce · Luxury',
    color: '#7C3AED',
    emoji: '🌸',
  },
  {
    name: 'Realpe Shoes',
    desc: 'Tienda online de calzado con gestión de tallas y pasarela de pago.',
    url:  'https://realpeshoes.vercel.app',
    tag:  'E-commerce · Fashion',
    color: '#F59E0B',
    emoji: '👟',
  },
  {
    name: 'Green Esmeralds',
    desc: 'Plataforma de joyería y exportación internacional de esmeraldas.',
    url:  'https://greenesmeraldsol.com',
    tag:  'E-commerce · Export',
    color: '#10B981',
    emoji: '💎',
  },
  {
    name: 'Clones & Periféricos',
    desc: 'Tienda de hardware, PC Gamer y accesorios con catálogo técnico.',
    url:  'https://clonesyperifericos.com',
    tag:  'E-commerce · Gaming',
    color: '#EF4444',
    emoji: '🖥️',
  },
  {
    name: 'Mr. Pollo',
    desc: 'Plataforma de pedidos en línea y domicilios para restaurante.',
    url:  'https://mrpollosp.com',
    tag:  'FoodTech · Orders',
    color: '#F97316',
    emoji: '🍗',
  },
  {
    name: 'JR CellCity',
    desc: 'Catálogo digital de celulares y accesorios con búsqueda avanzada.',
    url:  'https://jrcellcity-demo.pages.dev',
    tag:  'Catálogo · Mobile',
    color: '#8B5CF6',
    emoji: '📱',
  },
]

// Asymmetric grid layout variants
const GRID_VARIANTS = [
  { gridColumn: 'span 1', gridRow: 'span 2' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 2', gridRow: 'span 1' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 1', gridRow: 'span 2' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
]

export default function PortfolioSection() {
  const sectionRef = useRef(null)

  // Scroll-reveal for section heading
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="reveal flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-electric uppercase tracking-widest">Portafolio</span>
            <div className="flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent max-w-xs" />
          </div>
          <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-black text-ink leading-tight mb-4">
            Plataformas que<br />
            <span className="gradient-text">mueven negocios</span>
          </h2>
          <p className="reveal text-zinc-500 text-lg max-w-xl">
            8 proyectos reales en producción — desde e-commerce hasta sistemas ERP en la nube.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '280px',
          }}
        >
          {PROJECTS.map((project, i) => (
            <MorphingProjectCard
              key={project.name}
              project={project}
              style={GRID_VARIANTS[i] || {}}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
