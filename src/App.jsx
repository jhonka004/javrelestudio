/**
 * App.jsx — Root component, wires all sections together
 */
import LiquidCanvasBackground from './components/LiquidCanvasBackground'
import Navbar                 from './components/Navbar'
import HeroSection            from './components/HeroSection'
import PortfolioSection       from './components/PortfolioSection'
import ServicesSection        from './components/ServicesSection'
import InteractiveLabBanner   from './components/InteractiveLabBanner'
import ContactSection         from './components/ContactSection'
import Footer                 from './components/Footer'
import { useEffect }          from 'react'

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

        <main>
          <HeroSection />

          <PortfolioSection />

          <ServicesSection />

          {/* Javrel Lab section */}
          <section id="lab" className="py-28 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <div className="reveal inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6 text-xs font-mono uppercase tracking-widest text-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  Javrel Lab
                </div>
                <h2 className="reveal text-4xl sm:text-5xl font-black text-ink leading-tight mb-4">
                  Laboratorio<br />
                  <span className="gradient-text">Interactivo</span>
                </h2>
                <p className="reveal text-zinc-500 text-lg max-w-xl">
                  También construimos simuladores, experiencias gamificadas y entornos virtuales web.
                  Mueve el cursor para explorar en tiempo real.
                </p>
              </div>

              <div className="reveal">
                <InteractiveLabBanner />
              </div>

              {/* Capabilities chips */}
              <div className="mt-8 flex flex-wrap gap-3 reveal">
                {[
                  'Three.js / WebGL',
                  'HTML5 Canvas 2D',
                  'Física de partículas',
                  'Simuladores web',
                  'Experiencias gamificadas',
                  'WebXR / AR',
                  'Shaders GLSL',
                  'Realidad aumentada',
                ].map(chip => (
                  <span
                    key={chip}
                    className="glass-card text-xs font-mono text-zinc-500 px-3 py-1.5 rounded-full"
                  >
                    {chip}
                  </span>
                ))}
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
