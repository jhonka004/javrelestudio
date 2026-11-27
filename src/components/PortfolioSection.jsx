/**
 * PortfolioSection.jsx — Bento Grid Asimétrico con BrowserPreviewCard 3D
 * 8 plataformas reales con capturas .webp optimizadas (loading="lazy"),
 * efecto 3D Tilt/Flip acelerado por GPU y enlace exacto:
 * Green Emeralds -> https://greenesmeraldscol.com/
 */
import BrowserPreviewCard from './BrowserPreviewCard'

const PROJECTS = [
  {
    name: 'ComerCIA POS',
    desc: 'Sistema POS, inventario multi-sucursal y facturación electrónica en la nube para comercios modernos.',
    url: 'https://comercia.cloud',
    tag: 'SaaS · POS · ERP',
    previewId: 'comercia',
    techStack: ['React', 'Cloud API', 'Facturación DIAN', 'PostgreSQL'],
    specs: ['Sincronización multi-caja en tiempo real', 'Control de inventario y kardex automático', 'Reportes financieros e impresión térmica'],
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-4',
  },
  {
    name: 'JavrelStore',
    desc: 'E-commerce Tech & Gaming con catálogo dinámico y checkout ultrarrápido.',
    url: 'https://javrelstore.shop',
    tag: 'E-commerce',
    previewId: 'javrelstore',
    techStack: ['Vite', 'React', 'Pagos Online', 'Edge CDN'],
    specs: ['Filtros instantáneos sin recarga', 'Carrito persistente y pasarela integrada', 'Optimización Core Web Vitals < 1s'],
    bentoClass: 'md:col-span-1 lg:col-span-2',
  },
  {
    name: 'Évora Perfumes',
    desc: 'Boutique online de perfumería de lujo con búsqueda por notas olfativas.',
    url: 'https://evoraperfumes.com',
    tag: 'Luxury · Retail',
    previewId: 'evora',
    techStack: ['UI Editorial', 'E-commerce', 'WebP CDN', 'SEO'],
    specs: ['Catálogo visual de alta conversión', 'Búsqueda por familia y notas olfativas', 'Checkout optimizado para móvil'],
    bentoClass: 'md:col-span-1 lg:col-span-2',
  },
  {
    name: 'Clones & Periféricos',
    desc: 'Plataforma especializada en hardware, PC Gamer y periféricos de alto rendimiento.',
    url: 'https://clonesyperifericos.com',
    tag: 'Hardware · Gaming',
    previewId: 'clones',
    techStack: ['Catálogo Pro', 'Filtros Técnicos', 'API Stock', 'React'],
    specs: ['Comparador técnico de componentes', 'Gestión de inventario en tiempo real', 'Alta velocidad de carga en catálogo extenso'],
    featured: true,
    bentoClass: 'md:col-span-2 lg:col-span-4',
  },
  {
    name: 'Green Emeralds',
    desc: 'Joyería y exportación internacional de esmeraldas colombianas certificadas.',
    url: 'https://greenesmeraldscol.com/',
    tag: 'Export · Joyería',
    previewId: 'green',
    techStack: ['Multi-idioma', 'Certificación', 'Edge Hosting', 'UI Luxury'],
    specs: ['Presentación de gemas certificadas', 'Arquitectura optimizada para clientes globales', 'Navegación fluida de alta nitidez'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'Realpe Shoes',
    desc: 'Tienda online de calzado urbano y deportivo con gestión inteligente de tallas.',
    url: 'https://realpeshoes.vercel.app',
    tag: 'Fashion · Store',
    previewId: 'realpe',
    techStack: ['Vercel', 'React', 'Tallas Live', 'Tailwind CSS'],
    specs: ['Selector de tallas y variantes en vivo', 'Despliegue edge en Vercel', 'Diseño mobile-first de carga rápida'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'Mr. Pollo',
    desc: 'Plataforma de pedidos en línea y domicilios optimizada para conversión móvil.',
    url: 'https://mrpollosp.com',
    tag: 'FoodTech · Delivery',
    previewId: 'mrpollo',
    techStack: ['Pedidos Web', 'Mobile First', 'WhatsApp API', 'Vite'],
    specs: ['Menú interactivo con combos dinámicos', 'Flujo de pedido en menos de 30 segundos', 'Cero fricción en dispositivos móviles'],
    bentoClass: 'md:col-span-1 lg:col-span-3',
  },
  {
    name: 'JR CellCity',
    desc: 'Catálogo digital de telefonía móvil y accesorios con búsqueda instantánea.',
    url: 'https://jrcellcity-demo.pages.dev',
    tag: 'Mobile · Catálogo',
    previewId: 'jrcellcity',
    techStack: ['Cloudflare Pages', 'Búsqueda', 'WebP', 'React'],
    specs: ['Filtrado ultrarrápido por marca y modelo', 'Distribución global en Cloudflare Edge', 'Interfaz ligera orientada a ventas'],
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
      {/* Mesh gradient Aurora lateral — azul eléctrico, violeta y magenta suave sobre blanco */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-32 top-0 w-[560px] h-[560px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #93C5FD 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute -right-32 bottom-0 w-[560px] h-[560px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #F9A8D4 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[480px] h-[340px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #C4B5FD 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest">
              Portafolio Seleccionado
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-600/35 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-4 tracking-tight">
            Plataformas reales<br />
            <span className="gradient-text">en producción</span>
          </h2>
          <p className="text-[#334155] text-lg max-w-2xl">
            Pasa el cursor para recorrer cada sitio web en vivo o gira cualquier tarjeta en 3D (<code className="font-mono text-sm text-[#2563EB]">Stack ↻</code>) para ver su arquitectura técnica.
          </p>
        </div>

        {/* Cuadrícula perfectamente uniforme y simétrica (todas las tarjetas misma dimensión) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
          {PROJECTS.map((project) => (
            <BrowserPreviewCard
              key={project.name}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
