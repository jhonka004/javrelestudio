/**
 * PortfolioSection.jsx — Bento Grid Asimétrico (Estilo 21st.dev)
 * 8 plataformas reales sin huecos vacíos, con enlaces verificados
 * (Green Emeralds -> https://greenesmeraldcol.com) y contraste alto.
 */
import MorphingProjectCard from './MorphingProjectCard'

const PROJECTS = [
  {
    name: 'ComerCIA POS',
    desc: 'Sistema POS, inventario multi-sucursal y facturación electrónica en la nube para comercios modernos.',
    url: 'https://comercia.cloud',
    tag: 'SaaS · POS · ERP',
    color: '#2563EB',
    previewId: 'comercia',
    techStack: ['React', 'Cloud API', 'Facturación'],
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-4',
  },
  {
    name: 'JavrelStore',
    desc: 'E-commerce Tech & Gaming con catálogo dinámico y checkout ultrarrápido.',
    url: 'https://javrelstore.shop',
    tag: 'E-commerce',
    color: '#0891B2',
    previewId: 'javrelstore',
    techStack: ['Vite', 'Pagos Online'],
    bentoClass: 'md:col-span-1 lg:col-span-2',
  },
  {
    name: 'Évora Perfumes',
    desc: 'Boutique online de perfumería de lujo con búsqueda por notas olfativas.',
    url: 'https://evoraperfumes.com',
    tag: 'Luxury · Retail',
    color: '#4F46E5',
    previewId: 'evora',
    techStack: ['UI Editorial', 'E-commerce'],
    bentoClass: 'md:col-span-1 lg:col-span-2',
  },
  {
    name: 'Clones & Periféricos',
    desc: 'Plataforma especializada en hardware, PC Gamer y periféricos de alto rendimiento.',
    url: 'https://clonesyperifericos.com',
    tag: 'Hardware · Gaming',
    color: '#2563EB',
    previewId: 'clones',
    techStack: ['Catálogo Pro', 'Filtros Técnicos'],
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-4',
  },
  {
    name: 'Green Emeralds',
    desc: 'Joyería y exportación internacional de esmeraldas colombianas certificadas.',
    url: 'https://greenesmeraldcol.com', // ✅ URL verificada: col con "c"
    tag: 'Export · Joyería',
    color: '#059669',
    previewId: 'green',
    techStack: ['Multi-idioma', 'Certificación'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'Realpe Shoes',
    desc: 'Tienda online de calzado urbano y deportivo con gestión inteligente de tallas.',
    url: 'https://realpeshoes.vercel.app',
    tag: 'Fashion · Store',
    color: '#0891B2',
    previewId: 'realpe',
    techStack: ['Vercel', 'Tallas Live'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'Mr. Pollo',
    desc: 'Plataforma de pedidos en línea y domicilios optimizada para conversión móvil.',
    url: 'https://mrpollosp.com',
    tag: 'FoodTech · Delivery',
    color: '#D97706',
    previewId: 'mrpollo',
    techStack: ['Pedidos Web', 'Mobile First'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'JR CellCity',
    desc: 'Catálogo digital de telefonía móvil y accesorios con búsqueda instantánea.',
    url: 'https://jrcellcity-demo.pages.dev',
    tag: 'Mobile · Catálogo',
    color: '#4F46E5',
    previewId: 'jrcellcity',
    techStack: ['Cloudflare Pages', 'Búsqueda'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
]

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-28 px-6 overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Mesh gradient lateral pastel — lavanda izquierda, durazno derecha */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-32 top-0 w-[520px] h-[520px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #DDD6FE 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -right-32 bottom-0 w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #BAE6FD 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[400px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FED7AA 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest">
              Portafolio Seleccionado
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-600/35 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-4 tracking-tight">
            Plataformas que<br />
            <span className="gradient-text">impulsan negocios reales</span>
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl">
            8 sistemas en producción — cada tarjeta es una ventana viva hacia nuestras plataformas web, e-commerce y SaaS.
          </p>
        </div>

        {/* Balanced Asymmetric Bento Grid (6 cols on lg -> zero empty gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {PROJECTS.map((project, i) => (
            <MorphingProjectCard
              key={project.name}
              project={project}
              bentoClass={project.bentoClass}
              delay={i * 45}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
