/**
 * HeroParticleLogoCanvas.jsx
 * ─────────────────────────────────────────────────────────────────
 * Lienzo WebGL (Three.js + Shaders GLSL personalizados) donde el
 * logotipo de JavrelStudio actúa como emisor y atractor central
 * de miles de micro-partículas fluidas sobre fondo claro.
 *
 * Características:
 *  - Muestreo de puntos del isotipo + tipografía "JS / JAVREL" en canvas 2D.
 *  - Física de fluidos (campo curl-like en GLSL) + atracción al logotipo.
 *  - Respuesta dinámica al movimiento del cursor y al scroll.
 *  - Paleta de alto contraste sobre blanco: Azul eléctrico (#2563EB),
 *    Cian profundo (#0891B2), Índigo vibrante (#4F46E5) y destellos iridiscentes.
 *  - Optimizado a 60 FPS con pausa fuera de viewport y dispose() completo.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uPixelRatio;

  attribute vec3  aTarget;
  attribute float aSeed;
  attribute float aSize;
  attribute float aColorMix;

  varying float vColorMix;
  varying float vAlpha;
  varying float vSeed;

  // Pseudo-simplex / trigonometric curl displacement
  vec3 fluidField(vec3 p, float t) {
    float nx = sin(p.y * 0.9 + t * 1.1) * cos(p.z * 0.7 - t * 0.8);
    float ny = cos(p.x * 0.85 - t * 0.9) * sin(p.z * 0.6 + t * 1.0);
    float nz = sin(p.x * 0.7 + p.y * 0.75 + t * 0.7);
    return vec3(nx, ny, nz);
  }

  void main() {
    vColorMix = aColorMix;
    vSeed = aSeed;

    // 1. Base logo position + breathing
    vec3 pos = aTarget;

    // 2. Fluid emission wave (particles periodically emit outward & return)
    float cycle = fract(aSeed * 3.17 + uTime * 0.14);
    float emitEnvelope = sin(cycle * 3.14159265);
    vec3 flow = fluidField(pos * 0.65 + aSeed * 4.0, uTime * 0.85);
    pos += flow * (0.14 + emitEnvelope * 0.55);

    // Subtle radial emission from center
    vec2 dirFromCenter = normalize(pos.xy + vec2(0.0001));
    pos.xy += dirFromCenter * (emitEnvelope * 0.18 * (0.5 + aSeed));
    pos.z += sin(uTime * 1.2 + aSeed * 12.0) * 0.25 + emitEnvelope * 0.45;

    // 3. Scroll dispersion (spatial depth scatter)
    float scrollAmt = clamp(uScroll, 0.0, 1.5);
    pos += flow * scrollAmt * 2.2;
    pos.z += scrollAmt * (aSeed - 0.5) * 4.0;
    pos.y += scrollAmt * 0.9;

    // 4. Cursor interaction (fluid vortex + repulsion)
    vec2 toCursor = pos.xy - uMouse * vec2(4.2, 2.4);
    float dist = length(toCursor);
    float radius = 1.65;
    if (dist < radius) {
      float strength = (1.0 - dist / radius);
      strength = strength * strength;
      vec2 pushDir = normalize(toCursor + vec2(0.0001));
      vec2 swirlDir = vec2(-pushDir.y, pushDir.x);
      pos.xy += pushDir * strength * 0.85 + swirlDir * strength * 0.55;
      pos.z += strength * 0.95;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    float baseSize = aSize * (0.85 + 0.35 * sin(uTime * 2.0 + aSeed * 20.0));
    gl_PointSize = baseSize * uPixelRatio * (18.0 / max(1.5, -mvPosition.z));

    vAlpha = (0.58 + 0.42 * (1.0 - emitEnvelope * 0.5)) * (1.0 - clamp(scrollAmt * 0.55, 0.0, 0.85));
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;

  varying float vColorMix;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // Smooth radial falloff with crisp core
    float core = smoothstep(0.5, 0.08, d);
    float ring = smoothstep(0.5, 0.22, d) - smoothstep(0.22, 0.05, d);

    // High-contrast light-mode palette:
    // Electric Blue (#2563EB), Deep Cyan (#0891B2), Vibrant Indigo (#4F46E5)
    vec3 cBlue   = vec3(0.145, 0.388, 0.922);
    vec3 cCyan   = vec3(0.031, 0.569, 0.698);
    vec3 cIndigo = vec3(0.310, 0.275, 0.898);
    vec3 cIridescent = vec3(0.55, 0.32, 0.96);

    float shift = fract(vColorMix + sin(uTime * 0.6 + vSeed * 6.283) * 0.15);
    vec3 col = mix(cBlue, cCyan, smoothstep(0.0, 0.5, shift));
    col = mix(col, cIndigo, smoothstep(0.45, 0.85, shift));
    col = mix(col, cIridescent, ring * 0.45);

    gl_FragColor = vec4(col, core * vAlpha * 0.88);
  }
`

/**
 * Sample particle target positions from an offscreen 2D canvas drawing
 * the JavrelStudio emblem ("JS" geometric mark + orbital ring).
 */
function sampleLogoPoints(count) {
  const w = 520
  const h = 260
  const off = document.createElement('canvas')
  off.width = w
  off.height = h
  const ctx = off.getContext('2d')

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#000000'

  // Outer orbital ring
  ctx.lineWidth = 5
  ctx.strokeStyle = '#000000'
  ctx.beginPath()
  ctx.ellipse(w / 2, h / 2, 195, 92, -0.12, 0, Math.PI * 2)
  ctx.stroke()

  // Monogram "JS"
  ctx.font = '900 132px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('JS', w / 2, h / 2 + 4)

  const img = ctx.getImageData(0, 0, w, h).data
  const candidates = []

  // Step 2px for fast sampling
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const alpha = img[(y * w + x) * 4 + 3]
      if (alpha > 90) {
        candidates.push([
          ((x / w) - 0.5) * 6.8,
          -((y / h) - 0.5) * 3.4,
        ])
      }
    }
  }

  const targets = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const sizes = new Float32Array(count)
  const colorMix = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const isAmbient = i > count * 0.72 || candidates.length === 0
    if (!isAmbient) {
      const pt = candidates[Math.floor(Math.random() * candidates.length)]
      targets[i * 3]     = pt[0] + (Math.random() - 0.5) * 0.08
      targets[i * 3 + 1] = pt[1] + (Math.random() - 0.5) * 0.08
      targets[i * 3 + 2] = (Math.random() - 0.5) * 0.35
      sizes[i] = 1.6 + Math.random() * 2.2
    } else {
      // Ambient fluid halo around the logo
      const angle = Math.random() * Math.PI * 2
      const rx = 2.2 + Math.random() * 2.8
      const ry = 1.0 + Math.random() * 1.5
      targets[i * 3]     = Math.cos(angle) * rx
      targets[i * 3 + 1] = Math.sin(angle) * ry
      targets[i * 3 + 2] = (Math.random() - 0.5) * 1.6
      sizes[i] = 1.1 + Math.random() * 1.8
    }
    seeds[i] = Math.random()
    colorMix[i] = Math.random()
  }

  return { targets, seeds, sizes, colorMix }
}

export default function HeroParticleLogoCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 1600 : 3800

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      100
    )
    camera.position.set(0, 0, 6.2)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const { targets, seeds, sizes, colorMix } = sampleLogoPoints(COUNT)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(targets.slice(), 3))
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aColorMix', new THREE.BufferAttribute(colorMix, 1))

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uScroll: { value: 0 },
      uPixelRatio: { value: dpr },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouseTarget = new THREE.Vector2(0, 0)
    const mouseSmooth = new THREE.Vector2(0, 0)

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    const onScroll = () => {
      const heroH = Math.max(1, container.clientHeight)
      uniforms.uScroll.value = Math.min(1.5, window.scrollY / heroH)
    }
    const onResize = () => {
      if (!container) return
      const w = Math.max(1, container.clientWidth)
      const h = Math.max(1, container.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(nextDpr)
      renderer.setSize(w, h)
      uniforms.uPixelRatio.value = nextDpr
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(onResize)
    ro.observe(container)

    let raf = 0
    let active = true
    const clock = new THREE.Clock()

    const tick = () => {
      if (!active) return
      raf = requestAnimationFrame(tick)
      const dt = Math.min(clock.getDelta(), 0.05)
      uniforms.uTime.value += dt

      mouseSmooth.lerp(mouseTarget, 0.08)
      uniforms.uMouse.value.copy(mouseSmooth)

      // Subtle 3D parallax of particle cloud
      points.rotation.y = mouseSmooth.x * 0.14
      points.rotation.x = -mouseSmooth.y * 0.09

      renderer.render(scene, camera)
    }

    // Pause WebGL when Hero is out of viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!active) {
            active = true
            clock.getDelta()
            tick()
          }
        } else {
          active = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.01 }
    )
    io.observe(container)

    tick()

    return () => {
      active = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 opacity-90"
    />
  )
}
