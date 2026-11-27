/**
 * InteractiveLabBanner.jsx
 * ─────────────────────────────────────────────────────────────────
 * Javrel Lab — panoramic interactive canvas container.
 * Renders a mini particle-physics environment + interactive cursor
 * attractor / repulsor. Demonstrates real-time gamified web capabilities.
 *
 * Physics:
 *   - Particle gravity: vy += G (per frame)
 *   - Attraction to cursor:  F = (target - pos) * K
 *   - Turbulence: Perlin-like noise via sin/cos superposition
 *   - Color: HSL cycling around a palette over time
 */

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Lightweight 2D Perlin-like smooth noise ──────────────────────
const smoothNoise = (x, y, t) =>
  (Math.sin(x * 1.3 + t) + Math.cos(y * 0.9 + t * 1.1) +
   Math.sin((x + y) * 0.7 + t * 0.8)) / 3

// ─── Particle ─────────────────────────────────────────────────────
class LabParticle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x    = Math.random() * this.canvas.width
    this.y    = Math.random() * this.canvas.height
    this.vx   = (Math.random() - 0.5) * 1.5
    this.vy   = (Math.random() - 0.5) * 1.5
    this.size = 1.5 + Math.random() * 3
    this.hue  = 200 + Math.random() * 100  // blue–violet range
    this.life = 0.6 + Math.random() * 0.4
    this.maxLife = this.life
    this.trail = []
  }

  update(mouse, time, mode) {
    // Record trail
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 8) this.trail.shift()

    // Turbulence field
    const nx = smoothNoise(this.x / 120, this.y / 120, time) * 0.6
    const ny = smoothNoise(this.x / 100, this.y / 100, time + 100) * 0.6

    this.vx += nx * 0.03
    this.vy += ny * 0.03

    // Cursor interaction
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const K = mode === 'attract' ? 0.0012 : -0.0018

    if (dist < 220 && dist > 1) {
      this.vx += (dx / dist) * K * dist
      this.vy += (dy / dist) * K * dist
    }

    // Damping
    this.vx *= 0.97
    this.vy *= 0.97

    this.x += this.vx
    this.y += this.vy
    this.life -= 0.003

    // Hue drift
    this.hue += 0.3

    // Wrap + respawn
    if (this.x < 0 || this.x > this.canvas.width ||
        this.y < 0 || this.y > this.canvas.height ||
        this.life <= 0) {
      this.reset()
    }
  }

  draw(ctx) {
    const a = Math.min(this.life / this.maxLife, 1) * 0.85
    // Trail
    if (this.trail.length > 2) {
      ctx.beginPath()
      ctx.moveTo(this.trail[0].x, this.trail[0].y)
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y)
      }
      ctx.strokeStyle = `hsla(${this.hue},90%,70%,${a * 0.3})`
      ctx.lineWidth   = this.size * 0.5
      ctx.stroke()
    }
    // Core
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${this.hue},90%,72%,${a})`
    ctx.fill()
  }
}

// ─── Component ────────────────────────────────────────────────────
export default function InteractiveLabBanner() {
  const canvasRef   = useRef(null)
  const rafRef      = useRef(null)
  const stateRef    = useRef({
    particles: [],
    mouse: { x: 400, y: 200 },
    mode: 'attract',
    time: 0,
    fullscreen: false,
  })
  const [mode, setMode]           = useState('attract')
  const [fullscreen, setFullscreen] = useState(false)
  const [hovered, setHovered]     = useState(false)

  const toggleMode = useCallback(() => {
    setMode(m => {
      const next = m === 'attract' ? 'repel' : 'attract'
      stateRef.current.mode = next
      return next
    })
  }, [])

  const toggleFS = useCallback(() => {
    const container = canvasRef.current?.parentElement
    if (!document.fullscreenElement) {
      container?.requestFullscreen?.()
      setFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const s      = stateRef.current

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    new ResizeObserver(resize).observe(canvas)

    // Init particles
    const COUNT = 220
    s.particles = Array.from({ length: COUNT }, () => new LabParticle(canvas))

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      s.mouse.x  = e.clientX - rect.left
      s.mouse.y  = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('touchmove', (e) => {
      const t = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      s.mouse.x = t.clientX - rect.left
      s.mouse.y = t.clientY - rect.top
    }, { passive: true })

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      s.time += 0.008

      // Dark blurred trail effect
      ctx.fillStyle = 'rgba(9,9,11,0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid lines (subtle)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth   = 1
      const gSize = 60
      for (let gx = 0; gx < canvas.width; gx += gSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke()
      }
      for (let gy = 0; gy < canvas.height; gy += gSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke()
      }

      // Cursor glow
      const r = s.mode === 'attract' ? 90 : 70
      const cg = ctx.createRadialGradient(s.mouse.x, s.mouse.y, 0, s.mouse.x, s.mouse.y, r)
      cg.addColorStop(0, s.mode === 'attract' ? 'rgba(37,99,235,0.18)' : 'rgba(124,58,237,0.18)')
      cg.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(s.mouse.x, s.mouse.y, r, 0, Math.PI * 2)
      ctx.fillStyle = cg
      ctx.fill()

      // Particles
      for (const p of s.particles) {
        p.update(s.mouse, s.time, s.mode)
        p.draw(ctx)
      }

      // Crosshair cursor
      ctx.strokeStyle = s.mode === 'attract' ? 'rgba(37,99,235,0.7)' : 'rgba(124,58,237,0.7)'
      ctx.lineWidth   = 1.5
      const ch = 10
      ctx.beginPath(); ctx.moveTo(s.mouse.x - ch, s.mouse.y); ctx.lineTo(s.mouse.x + ch, s.mouse.y); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(s.mouse.x, s.mouse.y - ch); ctx.lineTo(s.mouse.x, s.mouse.y + ch); ctx.stroke()
      ctx.beginPath(); ctx.arc(s.mouse.x, s.mouse.y, 4, 0, Math.PI * 2); ctx.stroke()
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="relative rounded-3xl overflow-hidden bg-ink" style={{ height: 440 }}>
      <canvas ref={canvasRef} id="lab-canvas" />

      {/* UI overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="font-mono text-xs text-cyan/80 uppercase tracking-widest">Javrel Lab · Live</span>
            </div>
            <h2 className="text-white/90 text-xl font-bold leading-tight">
              Simulador de Partículas<br />
              <span className="gradient-text">Interactivo en Tiempo Real</span>
            </h2>
          </div>
          <button
            onClick={toggleFS}
            className="pointer-events-auto glass-card text-white/70 hover:text-white p-2 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            title="Pantalla completa"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMode}
            className="pointer-events-auto btn-magnetic px-4 py-2 rounded-full text-xs font-semibold text-white transition-all"
            style={{
              background: mode === 'attract'
                ? 'linear-gradient(135deg,#2563EB,#06B6D4)'
                : 'linear-gradient(135deg,#7C3AED,#2563EB)',
            }}
          >
            {mode === 'attract' ? '⬤ Modo Atracción' : '⬤ Modo Repulsión'}
          </button>
          <span className="text-white/40 text-xs font-mono">
            Mueve el cursor para interactuar
          </span>
        </div>
      </div>
    </div>
  )
}
