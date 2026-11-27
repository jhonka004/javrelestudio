/**
 * PortfolioSection.jsx — Galería 3D Premium de 2 Columnas
 * Conserva los 8 proyectos reales y todas sus URLs intactas.
 */
import BrowserPreviewCard from './BrowserPreviewCard'

const PROJECTS = [
  {
    name: 'ComerCIA POS',
    desc: 'Sistema POS, inventario multisucursal y facturación electrónica en la nube para comercios modernos.',
    url: 'https://comercia.cloud',
    tag: 'POS · ERP',
    previewId: 'comercia',
    techStack: ['React', 'Cloud API', 'Facturación DIAN', 'PostgreSQL'],
    specs: ['Sincronización multi-caja en tiempo real', 'Control de inventario y kardex automático', 'Reportes financieros e impresión térmica'],
  },
  {
    name: 'JavrelStore',
    desc: 'Tienda online moderna, segura y escalable, especializada en tecnología y gaming.',
    url: 'https://javrelstore.shop',
    tag: 'E-COMMERCE',
    previewId: 'javrelstore',
    techStack: ['Vite', 'React', 'Pagos Online', 'Edge CDN'],
    specs: ['Filtros instantáneos sin recarga', 'Carrito persistente y pasarela integrada', 'Optimización Core Web Vitals < 1s'],
  },
  {
    name: 'Évora Perfumes',
    desc: 'Boutique online de perfumes de lujo con una experiencia de compra elegante.',
    url: 'https://evoraperfumes.com',
    tag: 'LUXURY · RETAIL',
    previewId: 'evora',
    techStack: ['UI Editorial', 'E-commerce', 'WebP CDN', 'SEO'],
    specs: ['Catálogo visual de alta conversión', 'Búsqueda por familia y notas olfativas', 'Checkout optimizado para móvil'],
  },
  {
    name: 'Clones & Periféricos',
    desc: 'Plataforma especializada en hardware, PC Gamer y periféricos de alto rendimiento.',
    url: 'https://clonesyperifericos.com',
    tag: 'HARDWARE · GAMING',
    previewId: 'clones',
    techStack: ['Catálogo Pro', 'Filtros Técnicos', 'API Stock', 'React'],
    specs: ['Comparador técnico de componentes', 'Gestión de inventario en tiempo real', 'Alta velocidad de carga en catálogo extenso'],
  },
  {
    name: 'Green Emeralds',
    desc: 'Joyería y exportación internacional de esmeraldas colombianas certificadas.',
    url: 'https://greenesmeraldscol.com/',
    tag: 'EXPORT · JOYERÍA',
    previewId: 'green',
    techStack: ['Multi-idioma', 'Certificación', 'Edge Hosting', 'UI Luxury'],
    specs: ['Presentación de gemas certificadas', 'Arquitectura optimizada para clientes globales', 'Navegación fluida de alta nitidez'],
  },
  {
    name: 'Realpe Shoes',
    desc: 'Tienda online de calzado urbano y deportivo con gestión inteligente de tallas.',
    url: 'https://realpeshoes.vercel.app',
    tag: 'FASHION · STORE',
    previewId: 'realpe',
    techStack: ['Vercel', 'React', 'Tallas Live', 'Tailwind CSS'],
    specs: ['Selector de tallas y variantes en vivo', 'Despliegue edge en Vercel', 'Diseño mobile-first de carga rápida'],
  },
  {
    name: 'Mr. Pollo',
    desc: 'Plataforma de pedidos en línea y domicilios optimizada para dispositivos móviles.',
    url: 'https://mrpollosp.com',
    tag: 'FOODTECH · DELIVERY',
    previewId: 'mrpollo',
    techStack: ['Pedidos Web', 'Mobile First', 'WhatsApp API', 'Vite'],
    specs: ['Menú interactivo con combos dinámicos', 'Flujo de pedido en menos de 30 segundos', 'Cero fricción en dispositivos móviles'],
  },
  {
    name: 'JR CellCity',
    desc: 'Catálogo digital de telefonía móvil y accesorios con búsqueda instantánea.',
    url: 'https://jrcellcity-demo.pages.dev',
    tag: 'MOBILE · CATÁLOGO',
    previewId: 'jrcellcity',
    techStack: ['Cloudflare Pages', 'Búsqueda', 'WebP', 'React'],
    specs: ['Filtrado ultrarrápido por marca y modelo', 'Distribución global en Cloudflare Edge', 'Interfaz ligera orientada a ventas'],
  },
]

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFF 50%, #FFFFFF 100%)' }}
    >
      {/* Manchas de luz difuminadas y ondas suaves en azul eléctrico y violeta */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-36 top-12 w-[540px] h-[540px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #087BFF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute -right-36 bottom-12 w-[540px] h-[540px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #792BFF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-blue-200/80 shadow-sm px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#087BFF]" />
            <span className="font-mono text-xs font-bold text-[#087BFF] uppercase tracking-widest">
              Portafolio Seleccionado
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#101B45] leading-tight mb-4 tracking-tight">
            Mis <span className="gradient-text">Proyectos</span> en Producción
          </h2>
          <p className="text-[#66718C] text-base sm:text-lg">
            Ocho plataformas reales diseñadas con arquitectura moderna, alto rendimiento y experiencia de usuario premium.
          </p>
        </div>

        {/* Cuadrícula de 2 columnas en escritorio, 1 en móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
          {PROJECTS.map((project, index) => (
            <BrowserPreviewCard
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
