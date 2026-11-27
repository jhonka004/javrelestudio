/**
 * App.jsx — Root component, wires all sections together
 */
import { useEffect, lazy, Suspense } from 'react'
import LiquidCanvasBackground from './components/LiquidCanvasBackground'
import Navbar                 from './components/Navbar'
import ElasticSideMenu        from './components/ElasticSideMenu'
import HeroSection            from './components/HeroSection'
import PortfolioSection       from './components/PortfolioSection'
import ServicesSection        from './components/ServicesSection'
import ContactSection         from './components/ContactSection'
import Footer                 from './components/Footer'

const InteractiveLabBanner = lazy(() => import('./components/InteractiveLabBanner'))

export default function App() {
  // Global scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Full-screen physics canvas (z-0, pointer-events:none) */}
      <LiquidCanvasBackground />

      {/* Page structure (z-10+) */}
      <div className="relative z-10">
        <Navbar />
        <ElasticSideMenu />

        <main>
          <HeroSection />

          <PortfolioSection />

          <ServicesSection />

          {/* Javrel Lab section — Contenedor protagonista ancho completo */}
          <section id="lab" className="py-28 px-6 bg-[#F8FAFC]/80">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <div className="reveal inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-5 text-xs font-mono font-semibold uppercase tracking-widest text-[#0891B2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] animate-pulse" />
                    Javrel Lab · 3D Engine
                  </div>
                  <h2 className="reveal text-4xl sm:text-5xl font-black text-[#0F172A] leading-tight mb-3 tracking-tight">
                    Laboratorio<br />
                    <span className="gradient-text">Interactivo Papertrails</span>
                  </h2>
                  <p className="reveal text-[#334155] text-lg max-w-2xl">
                    Explora un mundo procedural 3D en tiempo real directamente en el navegador:
                    física de papel plegado, clima dinámico, ciclo día/noche y navegación libre.
                  </p>
                </div>

                {/* Capabilities chips */}
                <div className="flex flex-wrap gap-2 reveal lg:max-w-md lg:justify-end">
                  {[
                    'Three.js / WebGL',
                    'Post-procesado HDR',
                    'Wave Function Collapse',
                    'Simuladores 3D',
                    'Audio Procedural',
                    '60 FPS',
                  ].map(chip => (
                    <span
                      key={chip}
                      className="glass-card text-xs font-mono font-medium text-[#334155] px-3 py-1.5 rounded-full"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal w-full">
                <Suspense fallback={<div className="h-[540px] sm:h-[640px] lg:h-[700px] rounded-3xl glass-card animate-pulse" />}>
                  <InteractiveLabBanner />
                </Suspense>
              </div>
            </div>
          </section>

          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
