/**
 * LiquidCanvasBackground.jsx
 * ─────────────────────────────────────────────────────────────────
 * Full-screen HTML5 Canvas background (60 FPS via requestAnimationFrame)
 * Features:
 *   - Translucent crystal orbs with soft physics reacting to cursor
 *   - Fluid wave ripples on mouse move & click
 *   - Light spark trails following cursor
 * Math references extracted from Hello Monday / Active Theory mechanics:
 *   - Spring physics: Hooke's law  F = -k·Δx  (damped)
 *   - Ripple: r(t) = v·t,  alpha(t) = 1 - t/maxT
 *   - Orb repulsion: F = G / d²  (inverse-square)
 */

import { useEffect, useRef, useCallback } from 'react'

// ── Easing helpers (cubic-bezier inspired by Hello Monday curve) ──
const easeOutExpo  = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
const easeInOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2

// ── Clamp utility ──────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

// ── Orb class (glass crystal bubble) ──────────────────────────────
class Orb {
  constructor(canvas) {
    this.reset(canvas)
  }

  reset(canvas) {
    this.r      = 40 + Math.random() * 90
    this.x      = Math.random() * canvas.width
    this.y      = Math.random() * canvas.height
    this.vx     = (Math.random() - 0.5) * 0.4
    this.vy     = (Math.random() - 0.5) * 0.4
    this.hue    = [210, 185, 270, 45][Math.floor(Math.random() * 4)]  // blue/cyan/violet/amber
    this.alpha  = 0.12 + Math.random() * 0.14
    this.phase  = Math.random() * Math.PI * 2
    this.speed  = 0.004 + Math.random() * 0.006
  }

  update(canvas, mouse) {
    this.phase += this.speed

    // Gentle float drift
    this.x += this.vx + Math.sin(this.phase) * 0.3
    this.y += this.vy + Math.cos(this.phase * 0.7) * 0.3

    // Cursor repulsion (inverse-square, capped)
    const dx = this.x - mouse.x
    const dy = this.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const repulseRadius = this.r * 4
    if (dist < repulseRadius && dist > 0) {
      const force = (repulseRadius - dist) / repulseRadius * 1.8
      this.x += (dx / dist) * force
      this.y += (dy / dist) * force
    }

    // Boundary wrap
    if (this.x < -this.r * 2)   this.x = canvas.width  + this.r
    if (this.x > canvas.width  + this.r * 2) this.x = -this.r
    if (this.y < -this.r * 2)   this.y = canvas.height + this.r
    if (this.y > canvas.height + this.r * 2) this.y = -this.r
  }

  draw(ctx) {
    // Radial gradient — translucent glass orb
    const g = ctx.createRadialGradient(
      this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.1,
      this.x, this.y, this.r
    )
    g.addColorStop(0,   `hsla(${this.hue},80%,96%,${this.alpha * 1.5})`)
    g.addColorStop(0.4, `hsla(${this.hue},70%,80%,${this.alpha})`)
    g.addColorStop(1,   `hsla(${this.hue},60%,60%,0)`)

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

    // Specular highlight
    const spec = ctx.createRadialGradient(
      this.x - this.r * 0.35, this.y - this.r * 0.35, 1,
      this.x - this.r * 0.35, this.y - this.r * 0.35, this.r * 0.5
    )
    spec.addColorStop(0,   `rgba(255,255,255,0.55)`)
    spec.addColorStop(1,   `rgba(255,255,255,0)`)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = spec
    ctx.fill()
  }
}

// ── Ripple class ───────────────────────────────────────────────────
class Ripple {
  constructor(x, y, isClick = false) {
    this.x       = x
    this.y       = y
    this.radius  = 0
    this.maxR    = isClick ? 220 : 120
    this.speed   = isClick ? 5   : 2.5
    this.alpha   = isClick ? 0.5 : 0.25
    this.hue     = isClick ? 210 : 185
    this.dead    = false
  }

  update() {
    this.radius += this.speed
    this.alpha  *= 0.965
    if (this.radius >= this.maxR || this.alpha < 0.005) this.dead = true
  }

  draw(ctx) {
    const progress = this.radius / this.maxR
    const lw = easeOutExpo(1 - progress) * 2.5

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(${this.hue},85%,65%,${this.alpha})`
    ctx.lineWidth   = lw
    ctx.stroke()

    // Inner fill glow
    if (progress < 0.3) {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
      g.addColorStop(0,   `hsla(${this.hue},85%,75%,${this.alpha * 0.15})`)
      g.addColorStop(1,   `transparent`)
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }
  }
}

// ── Spark class ───────────────────────────────────────────────────
class Spark {
  constructor(x, y) {
    const angle  = Math.random() * Math.PI * 2
    const speed  = 0.5 + Math.random() * 2.5
    this.x       = x
    this.y       = y
    this.vx      = Math.cos(angle) * speed
    this.vy      = Math.sin(angle) * speed - 1
    this.life    = 1
    this.decay   = 0.025 + Math.random() * 0.03
    this.size    = 1 + Math.random() * 2.5
    this.hue     = [210, 185, 270, 45][Math.floor(Math.random() * 4)]
    this.dead    = false
  }

  update() {
    this.x    += this.vx
    this.y    += this.vy
    this.vy   += 0.06   // gravity
    this.vx   *= 0.98   // drag
    this.life -= this.decay
    if (this.life <= 0) this.dead = true
  }

  draw(ctx) {
    const radius = Math.max(0.01, this.size * this.life)
    const a = easeOutExpo(Math.max(0, this.life))
    ctx.beginPath()
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${this.hue},90%,75%,${a})`
    ctx.fill()
  }
}

// ── Main Component ─────────────────────────────────────────────────
export default function LiquidCanvasBackground() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    orbs:    [],
    ripples: [],
    sparks:  [],
    mouse:   { x: -999, y: -999 },
    lastMouse: { x: -999, y: -999 },
    raf:     null,
    frameCount: 0,
  })

  // Spawn sparks on mouse trail (throttled)
  const spawnTrailSpark = useCallback((x, y) => {
    const s = stateRef.current
    if (Math.random() < 0.25) {
      s.sparks.push(new Spark(x, y))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const s      = stateRef.current

    // ── Resize handler ──────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Init orbs ──────────────────────────────────────────────
    const ORB_COUNT = Math.floor((canvas.width * canvas.height) / 55000)
    s.orbs = Array.from({ length: clamp(ORB_COUNT, 8, 20) }, () => new Orb(canvas))

    // ── Mouse events ───────────────────────────────────────────
    const onMouseMove = (e) => {
      s.mouse.x = e.clientX
      s.mouse.y = e.clientY

      const dx = e.clientX - s.lastMouse.x
      const dy = e.clientY - s.lastMouse.y
      const speed = Math.sqrt(dx*dx + dy*dy)

      if (speed > 2) {
        s.ripples.push(new Ripple(e.clientX, e.clientY, false))
        spawnTrailSpark(e.clientX, e.clientY)
        s.lastMouse.x = e.clientX
        s.lastMouse.y = e.clientY
      }
    }

    const onClick = (e) => {
      s.ripples.push(new Ripple(e.clientX, e.clientY, true))
      for (let i = 0; i < 12; i++) {
        s.sparks.push(new Spark(e.clientX, e.clientY))
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    // ── Render loop ────────────────────────────────────────────
    const render = () => {
      s.raf = requestAnimationFrame(render)
      s.frameCount++

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle radial vignette on background
      const vg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
      )
      vg.addColorStop(0, 'rgba(241,245,249,0)')
      vg.addColorStop(1, 'rgba(226,232,240,0.15)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw orbs
      for (const orb of s.orbs) {
        orb.update(canvas, s.mouse)
        orb.draw(ctx)
      }

      // Draw ripples
      s.ripples = s.ripples.filter(r => !r.dead)
      for (const r of s.ripples) {
        r.update()
        r.draw(ctx)
      }

      // Draw sparks
      s.sparks = s.sparks.filter(sp => !sp.dead)
      for (const sp of s.sparks) {
        sp.update()
        sp.draw(ctx)
      }

      // Keep arrays bounded
      if (s.ripples.length > 60) s.ripples.splice(0, s.ripples.length - 60)
      if (s.sparks.length  > 200) s.sparks.splice(0, s.sparks.length - 200)
    }

    render()

    return () => {
      cancelAnimationFrame(s.raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
    }
  }, [spawnTrailSpark])

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      aria-hidden="true"
    />
  )
}
