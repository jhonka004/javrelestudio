/**
 * PortfolioSection.jsx — Bento Grid Asimétrico Moderno
 * 8 plataformas reales de Javrel Studio con tamaños variables
 * (tarjetas destacadas grandes combinadas con medianas y verticales).
 */
import MorphingProjectCard from './MorphingProjectCard'
import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    name: 'ComerCIA POS',
    desc: 'Sistema POS, Inventario y Facturación en la Nube diseñado para operar múltiples sucursales en tiempo real.',
    url: 'https://comercia.cloud',
    tag: 'SaaS · POS · ERP',
    metrics: 'Cloud ERP',
    color: '#2563EB',
    emoji: '🏪',
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    name: 'JavrelStore',
    desc: 'E-commerce Tech & Gaming con checkout ultrarrápido y catálogo dinámico.',
    url: 'https://javrelstore.shop',
    tag: 'E-commerce',
    color: '#0891B2',
    emoji: '🎮',
    bentoClass: 'md:col-span-1 lg:col-span-1',
  },
  {
    name: 'Évora Perfumes',
    desc: 'Boutique online de perfumería de lujo con experiencia sensorial y filtros por notas.',
    url: 'https://evoraperfumes.com',
    tag: 'E-commerce · Luxury',
    color: '#4F46E5',
    emoji: '🌸',
    bentoClass: 'md:col-span-1 lg:col-span-1',
  },
  {
    name: 'Clones & Periféricos',
    desc: 'Tienda especializada en hardware, PC Gamer y periféricos de alto desempeño.',
    url: 'https://clonesyperifericos.com',
    tag: 'Hardware · Gaming',
    metrics: 'Alto Tráfico',
    color: '#2563EB',
    emoji: '🖥️',
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-2',
  },
  {
    name: 'Realpe Shoes',
    desc: 'Tienda online de calzado urbano y deportivo con gestión inteligente de tallas.',
    url: 'https://realpeshoes.vercel.app',
    tag: 'Fashion · E-commerce',
    color: '#0891B2',
    emoji: '👟',
    bentoClass: 'md:col-span-1 lg:col-span-1',
  },
  {
    name: 'Green Esmeralds',
    desc: 'Plataforma de joyería y exportación internacional de esmeraldas colombianas certificadas.',
    url: 'https://greenesmeraldsol.com',
    tag: 'Export · Luxury',
    metrics: 'Global',
    color: '#059669',
    emoji: '💎',
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-2',
  },
  {
    name: 'Mr. Pollo',
    desc: 'Plataforma de pedidos en línea y domicilios optimizada para conversión móvil.',
    url: 'https://mrpollosp.com',
    tag: 'FoodTech · Orders',
    color: '#D97706',
    emoji: '🍗',
    bentoClass: 'md:col-span-1 lg:col-span-1',
  },
  {
    name: 'JR CellCity',
    desc: 'Catálogo digital de telefonía móvil y accesorios con búsqueda instantánea.',
    url: 'https://jrcellcity-demo.pages.dev',
    tag: 'Mobile · Catálogo',
    color: '#4F46E5',
    emoji: '📱',
    bentoClass: 'md:col-span-1 lg:col-span-1',
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    els?.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <div className="reveal flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold text-[#2563EB] uppercase tracking-widest">
              Portafolio Seleccionado
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-600/30 to-transparent max-w-xs" />
          </div>
          <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-4 tracking-tight">
            Plataformas que<br />
            <span className="gradient-text">impulsan negocios reales</span>
          </h2>
          <p className="reveal text-[#475569] text-lg max-w-2xl">
            8 sistemas en producción — desde ecosistemas e-commerce de alto tráfico hasta ERP y POS en la nube.
          </p>
        </div>

        {/* Modern Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto">
          {PROJECTS.map((project, i) => (
            <MorphingProjectCard
              key={project.name}
              project={project}
              bentoClass={project.bentoClass}
              delay={i * 55}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
