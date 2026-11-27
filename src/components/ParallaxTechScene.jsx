/**
 * ParallaxTechScene.jsx
 * ─────────────────────────────────────────────────────────────────
 * Escena vectorial SVG multicapa 100% en código (estilo Bycyklen
 * adaptado a la paleta luminosa Aurora de JavrelStudio).
 * Conectada a GSAP + ScrollTrigger (scrub continuo) y mousemove 3D.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxTechScene() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const layerSkyRef = useRef(null)
  const layerFarRef = useRef(null)
  const layerMidRef = useRef(null)
  const layerNearRef = useRef(null)
  const vehicleRef = useRef(null)
  const wheelFrontRef = useRef(null)
  const wheelBackRef = useRef(null)
  const dataPulseRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return

    const ctx = gsap.context(() => {
      // Parallax continuo controlado por el scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      })

      tl.to(layerFarRef.current, { x: -70, ease: 'none' }, 0)
        .to(layerMidRef.current, { x: -160, ease: 'none' }, 0)
        .to(layerNearRef.current, { x: -240, ease: 'none' }, 0)
        .fromTo(
          vehicleRef.current,
          { x: -120 },
          { x: 520, ease: 'none' },
          0
        )
        .to(
          [wheelFrontRef.current, wheelBackRef.current],
          {
            rotation: 720,
            transformOrigin: '50% 50%',
            ease: 'none',
          },
          0
        )
        .fromTo(
          dataPulseRef.current,
          { strokeDashoffset: 240 },
          { strokeDashoffset: 0, ease: 'none' },
          0
        )
    }, sectionRef)

    // Desplazamiento suave 3D con el puntero del mouse
    const qFarX = gsap.quickTo(layerFarRef.current, 'y', { duration: 0.8, ease: 'power3.out' })
    const qMidX = gsap.quickTo(layerMidRef.current, 'y', { duration: 0.7, ease: 'power3.out' })
    const qSkyX = gsap.quickTo(layerSkyRef.current, 'x', { duration: 0.9, ease: 'power3.out' })
    const qSkyY = gsap.quickTo(layerSkyRef.current, 'y', { duration: 0.9, ease: 'power3.out' })
    const qVehY = gsap.quickTo(vehicleRef.current, 'y', { duration: 0.6, ease: 'power3.out' })

    const onMouseMove = (e) => {
      const rect = stage.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      qSkyX(nx * -18)
      qSkyY(ny * -14)
      qFarX(ny * -10)
      qMidX(ny * -18)
      qVehY(ny * -8)
    }

    const onMouseLeave = () => {
      qSkyX(0)
      qSkyY(0)
      qFarX(0)
      qMidX(0)
      qVehY(0)
    }

    stage.addEventListener('mousemove', onMouseMove)
    stage.addEventListener('mouseleave', onMouseLeave)

    return () => {
      ctx.revert()
      stage.removeEventListener('mousemove', onMouseMove)
      stage.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative py-20 sm:py-24 px-6 bg-white overflow-hidden"
    >
      {/* Transición Aurora superior suave */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(139,92,246,0.10) 0%, rgba(59,130,246,0.06) 45%, transparent 100%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono font-semibold uppercase tracking-widest bg-white/80 backdrop-blur-md border border-slate-200/80 text-[#3B82F6] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse" />
              Arquitectura en Movimiento · Scroll Parallax
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] leading-tight tracking-tight">
              Ingeniería que fluye{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 52%, #EC4899 100%)',
                }}
              >
                a velocidad real
              </span>
            </h2>
          </div>
          <p className="text-[#475569] text-base sm:text-lg max-w-xl">
            Desplázate y mueve el cursor sobre la escena: cada capa representa nuestra infraestructura
            cloud, automatización con IA y despliegue continuo en producción.
          </p>
        </div>

        {/* Contenedor protagonista Glassmorphism de la escena SVG */}
        <div
          ref={stageRef}
          className="relative w-full rounded-3xl overflow-hidden bg-white/75 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-200/70"
        >
          {/* Barra superior minimalista tipo ventana de estudio */}
          <div className="relative z-20 flex items-center justify-between px-5 py-3 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]/80" />
              <span className="ml-2 font-mono text-[11px] font-medium text-[#475569]">
                javrel-pipeline.svg · 60 FPS Parallax
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#475569]">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-semibold">
                ScrollTrigger
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-[#7C3AED] font-semibold">
                Depth 3D
              </span>
            </div>
          </div>

          {/* Escena SVG Vectorial Multicapa */}
          <div className="relative w-full aspect-[16/7] min-h-[260px] sm:min-h-[360px] bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]">
            <svg
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full block select-none"
              role="img"
              aria-label="Escena interactiva de ciudad digital y flujo de desarrollo JavrelStudio"
            >
              <defs>
                <linearGradient id="auroraSky" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EFF6FF" />
                  <stop offset="45%" stopColor="#F5F3FF" />
                  <stop offset="100%" stopColor="#FDF2F8" />
                </linearGradient>
                <radialGradient id="auroraOrb1" cx="25%" cy="30%" r="45%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="auroraOrb2" cx="75%" cy="25%" r="45%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="auroraOrb3" cx="52%" cy="55%" r="40%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Fondo cielo aurora */}
              <rect width="1200" height="500" fill="url(#auroraSky)" />

              {/* CAPA 0: Orbes Aurora & Nubes Geométricas */}
              <g ref={layerSkyRef}>
                <rect width="1200" height="500" fill="url(#auroraOrb1)" />
                <rect width="1200" height="500" fill="url(#auroraOrb2)" />
                <rect width="1200" height="500" fill="url(#auroraOrb3)" />

                {/* Sol / Núcleo IA */}
                <circle cx="930" cy="115" r="56" fill="#FFFFFF" fillOpacity="0.75" />
                <circle cx="930" cy="115" r="38" fill="url(#trackGrad)" fillOpacity="0.18" />

                {/* Nubes minimalistas */}
                <g fill="#FFFFFF" fillOpacity="0.85">
                  <rect x="140" y="78" width="130" height="28" rx="14" />
                  <rect x="175" y="64" width="70" height="24" rx="12" />
                  <rect x="520" y="96" width="150" height="30" rx="15" />
                  <rect x="555" y="80" width="82" height="24" rx="12" />
                </g>
              </g>

              {/* CAPA 1 (Lejana): Skyline Cloud & Torres de Datos */}
              <g ref={layerFarRef} transform="translate(0, 0)">
                <g fill="#DBEAFE" fillOpacity="0.7">
                  <rect x="40" y="190" width="95" height="210" rx="8" />
                  <rect x="155" y="140" width="110" height="260" rx="8" />
                  <rect x="330" y="210" width="80" height="190" rx="8" />
                  <rect x="460" y="155" width="125" height="245" rx="8" />
                  <rect x="650" y="185" width="90" height="215" rx="8" />
                  <rect x="790" y="130" width="120" height="270" rx="8" />
                  <rect x="970" y="175" width="105" height="225" rx="8" />
                  <rect x="1110" y="150" width="115" height="250" rx="8" />
                </g>
                {/* Ventanas luminosas */}
                <g fill="#93C5FD" fillOpacity="0.45">
                  <rect x="175" y="165" width="70" height="8" rx="4" />
                  <rect x="175" y="185" width="48" height="8" rx="4" />
                  <rect x="482" y="180" width="80" height="8" rx="4" />
                  <rect x="482" y="200" width="56" height="8" rx="4" />
                  <rect x="812" y="156" width="74" height="8" rx="4" />
                  <rect x="812" y="176" width="52" height="8" rx="4" />
                </g>
              </g>

              {/* CAPA 2 (Media): Arquitectura Digital, Nodos y Árboles Geométricos */}
              <g ref={layerMidRef}>
                {/* Haces de luz diagonales estilo Bycyklen */}
                <polygon points="820,0 1050,0 740,400 510,400" fill="url(#beamGrad)" />

                {/* Edificios/Módulos medios */}
                <g>
                  <rect x="90" y="245" width="140" height="155" rx="12" fill="#EDE9FE" />
                  <rect x="108" y="265" width="104" height="10" rx="5" fill="#C4B5FD" />
                  <rect x="108" y="285" width="72" height="10" rx="5" fill="#DDD6FE" />

                  <rect x="520" y="230" width="170" height="170" rx="14" fill="#E0E7FF" />
                  <circle cx="605" cy="278" r="24" fill="#8B5CF6" fillOpacity="0.22" />
                  <path
                    d="M593 278 l8 8 l16 -16"
                    stroke="#6366F1"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  <rect x="920" y="250" width="160" height="150" rx="12" fill="#FCE7F3" />
                  <rect x="942" y="274" width="116" height="12" rx="6" fill="#F9A8D4" fillOpacity="0.7" />
                  <rect x="942" y="296" width="82" height="10" rx="5" fill="#FBCFE8" />
                </g>

                {/* Árboles / Nodos geométricos estilizados */}
                {[
                  { x: 310, r: 44, c: '#3B82F6', op: 0.22 },
                  { x: 370, r: 34, c: '#8B5CF6', op: 0.25 },
                  { x: 765, r: 46, c: '#EC4899', op: 0.2 },
                  { x: 825, r: 32, c: '#3B82F6', op: 0.22 },
                  { x: 1150, r: 40, c: '#8B5CF6', op: 0.22 },
                ].map((tree, idx) => (
                  <g key={idx}>
                    <line
                      x1={tree.x}
                      y1="400"
                      x2={tree.x}
                      y2={345 - tree.r * 0.3}
                      stroke="#94A3B8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx={tree.x} cy={320} r={tree.r} fill={tree.c} fillOpacity={tree.op} />
                    <circle cx={tree.x} cy={320} r={tree.r * 0.45} fill="#FFFFFF" fillOpacity="0.55" />
                  </g>
                ))}
              </g>

              {/* CAPA 3 (Primer plano): Autopista de Datos y Suelo */}
              <g ref={layerNearRef}>
                <rect x="-150" y="396" width="1650" height="104" fill="#FFFFFF" />
                <line x1="-150" y1="396" x2="1500" y2="396" stroke="#E2E8F0" strokeWidth="2" />

                {/* Línea de datos animada */}
                <line
                  ref={dataPulseRef}
                  x1="-120"
                  y1="400"
                  x2="1480"
                  y2="400"
                  stroke="url(#trackGrad)"
                  strokeWidth="4"
                  strokeDasharray="18 14"
                  strokeLinecap="round"
                />

                {/* Postes / Balizas de red */}
                {[120, 420, 720, 1020, 1320].map((px) => (
                  <g key={px}>
                    <rect x={px} y="340" width="5" height="56" rx="2.5" fill="#CBD5E1" />
                    <circle cx={px + 2.5} cy="338" r="5" fill="#3B82F6" />
                  </g>
                ))}
              </g>

              {/* ELEMENTO PRINCIPAL EN MOVIMIENTO: Vehículo / Bicicleta Tecnológica Javrel */}
              <g ref={vehicleRef} transform="translate(220, 294)">
                {/* Sombra suave en el suelo */}
                <ellipse cx="95" cy="108" rx="74" ry="8" fill="#0F172A" fillOpacity="0.10" />

                {/* Estela luminosa detrás */}
                <line
                  x1="-55"
                  y1="62"
                  x2="16"
                  y2="62"
                  stroke="url(#trackGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
                <line
                  x1="-35"
                  y1="74"
                  x2="12"
                  y2="74"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.45"
                />

                {/* Rueda trasera */}
                <g ref={wheelBackRef} transform="translate(46, 80)">
                  <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="0" cy="0" r="8" fill="#3B82F6" />
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
                  <line x1="0" y1="-18" x2="0" y2="18" stroke="#94A3B8" strokeWidth="2.5" />
                </g>

                {/* Rueda delantera */}
                <g ref={wheelFrontRef} transform="translate(144, 80)">
                  <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="0" cy="0" r="8" fill="#EC4899" />
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
                  <line x1="0" y1="-18" x2="0" y2="18" stroke="#94A3B8" strokeWidth="2.5" />
                </g>

                {/* Cuadro / Chasis aerodinámico */}
                <path
                  d="M46 80 L84 44 L132 44 L144 80 M84 44 L98 80 L46 80 M126 32 L138 32"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Módulo de energía Aurora */}
                <rect x="78" y="34" width="42" height="14" rx="7" fill="url(#trackGrad)" />

                {/* Piloto / Ingeniero estilizado */}
                <path
                  d="M84 44 L76 18 L104 20 L124 34"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Casco & visor */}
                <circle cx="88" cy="4" r="11" fill="#0F172A" />
                <path d="M88 -7 A11 11 0 0 1 99 4 L88 4 Z" fill="#3B82F6" />

                {/* Tarjeta holográfica flotante sobre el vehículo */}
                <g transform="translate(122, -16)">
                  <rect
                    x="0"
                    y="0"
                    width="94"
                    height="32"
                    rx="10"
                    fill="#FFFFFF"
                    fillOpacity="0.92"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  <circle cx="15" cy="16" r="4.5" fill="#10B981" />
                  <text
                    x="26"
                    y="19"
                    fill="#0F172A"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                  >
                    DEPLOY OK
                  </text>
                </g>
              </g>
            </svg>

            {/* Footer overlay sutil con métricas */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 px-3.5 py-1.5 text-[11px] font-medium text-[#334155] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                CI/CD Automatizado · React · IA · Cloud
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 px-3.5 py-1.5 text-[11px] font-mono text-[#475569] shadow-sm">
                Haz scroll para animar ↔
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
