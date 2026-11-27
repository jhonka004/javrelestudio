/**
 * LivingVectorArt.jsx
 * ─────────────────────────────────────────────────────────────────
 * Ilustraciones vectoriales SVG minimalistas estructuradas por grupos (<g>)
 * en el DOM y animadas con GSAP + ScrollTrigger (estilo Hello Monday).
 * Reaccionan continuamente al movimiento del cursor y al scroll.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LivingVectorArt({ variant = 'hero', className = '' }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const ctx = gsap.context(() => {
      const orbitA = svg.querySelector('.vec-orbit-a')
      const orbitB = svg.querySelector('.vec-orbit-b')
      const nodes = svg.querySelectorAll('.vec-node')
      const paths = svg.querySelectorAll('.vec-draw')

      // Trazado continuo tipo dibujo vivo
      paths.forEach((p, idx) => {
        const len = p.getTotalLength ? p.getTotalLength() : 260
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len * 0.35 })
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 2.2 + idx * 0.4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      if (orbitA) {
        gsap.to(orbitA, {
          rotation: 360,
          transformOrigin: '50% 50%',
          duration: 28,
          repeat: -1,
          ease: 'none',
        })
      }
      if (orbitB) {
        gsap.to(orbitB, {
          rotation: -360,
          transformOrigin: '50% 50%',
          duration: 36,
          repeat: -1,
          ease: 'none',
        })
      }

      nodes.forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -10 : 10,
          scale: 1.08,
          transformOrigin: '50% 50%',
          duration: 2.6 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Reacción al scroll con ScrollTrigger
      gsap.to(svg, {
        y: variant === 'hero' ? 40 : -24,
        scrollTrigger: {
          trigger: svg.parentElement || svg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, svgRef)

    // Reacción suave al movimiento del cursor
    const xTo = gsap.quickTo(svg, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(svg, 'y', { duration: 0.7, ease: 'power3.out' })
    const rotTo = gsap.quickTo(svg, 'rotation', { duration: 0.9, ease: 'power3.out' })

    const onMove = (e) => {
      const nx = e.clientX / (window.innerWidth || 1) - 0.5
      const ny = e.clientY / (window.innerHeight || 1) - 0.5
      xTo(nx * 24)
      yTo(ny * 16)
      rotTo(nx * 4)
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [variant])

  if (variant === 'services') {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 420 180"
        fill="none"
        aria-hidden="true"
        className={`pointer-events-none select-none ${className}`}
      >
        <g className="vec-orbit-a" opacity="0.65">
          <path
            className="vec-draw"
            d="M 20 90 C 90 20, 160 160, 210 90 C 260 20, 330 160, 400 90"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </g>
        <g className="vec-orbit-b" opacity="0.55">
          <path
            className="vec-draw"
            d="M 20 90 C 90 150, 160 30, 210 90 C 260 150, 330 30, 400 90"
            stroke="#0891B2"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        </g>
        <g className="vec-node">
          <circle cx="95" cy="64" r="6" fill="#2563EB" fillOpacity="0.22" stroke="#2563EB" strokeWidth="1.5" />
        </g>
        <g className="vec-node">
          <circle cx="210" cy="90" r="9" fill="#4F46E5" fillOpacity="0.2" stroke="#4F46E5" strokeWidth="1.5" />
        </g>
        <g className="vec-node">
          <circle cx="325" cy="116" r="6" fill="#0891B2" fillOpacity="0.22" stroke="#0891B2" strokeWidth="1.5" />
        </g>
      </svg>
    )
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Grupo orbital exterior */}
      <g className="vec-orbit-a">
        <circle cx="300" cy="300" r="230" stroke="#2563EB" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="8 10" />
        <path
          className="vec-draw"
          d="M 300 70 A 230 230 0 0 1 530 300"
          stroke="#2563EB"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="vec-node" cx="530" cy="300" r="7" fill="#2563EB" />
      </g>

      {/* Grupo orbital interior */}
      <g className="vec-orbit-b">
        <ellipse cx="300" cy="300" rx="170" ry="118" transform="rotate(-24 300 300)" stroke="#0891B2" strokeOpacity="0.22" strokeWidth="1.2" />
        <path
          className="vec-draw"
          d="M 145 240 C 210 155, 390 155, 455 240"
          stroke="#4F46E5"
          strokeOpacity="0.38"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle className="vec-node" cx="145" cy="240" r="6" fill="#0891B2" />
      </g>

      {/* Nodos geométricos flotantes */}
      <g className="vec-node">
        <rect x="415" y="138" width="22" height="22" rx="6" transform="rotate(18 415 138)" stroke="#4F46E5" strokeOpacity="0.4" strokeWidth="1.5" fill="#4F46E5" fillOpacity="0.08" />
      </g>
      <g className="vec-node">
        <polygon points="150,435 166,462 134,462" stroke="#0891B2" strokeOpacity="0.42" strokeWidth="1.5" fill="#0891B2" fillOpacity="0.08" />
      </g>
    </svg>
  )
}
