/**
 * InteractiveLabBanner.jsx
 * ─────────────────────────────────────────────────────────────────
 * Javrel Lab — Integración nativa en React del motor Three.js de
 * Papertrails (https://github.com/xikhar/papertrails).
 *
 * Características:
 *  - Carga diferida (IntersectionObserver) para no bloquear el Hero.
 *  - Pausa automática del loop WebGL cuando sale del viewport (60 FPS).
 *  - Limpieza completa de memoria WebGL, listeners y audio al desmontar.
 *  - Contenedor amplio de ancho completo (max-w-7xl) y gran altura.
 *  - Botón funcional de Pantalla Completa + controles de Day/Night, Vista y Audio.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { CONFIG } from '../papertrails/core/config.js'
import { bus } from '../papertrails/core/events.js'
import { state } from '../papertrails/core/state.js'
import { createLoop } from '../papertrails/core/loop.js'
import { loadAssets } from '../papertrails/assets/loader.js'
import { createWFC } from '../papertrails/world/wfc.js'
import { createWorld } from '../papertrails/world/world.js'
import { createTraveller } from '../papertrails/player/traveller.js'
import { createControls } from '../papertrails/player/controls.js'
import { createFollowCamera } from '../papertrails/camera/follow.js'
import { createRenderer } from '../papertrails/render/renderer.js'
import { createLights } from '../papertrails/render/lights.js'
import { createPost } from '../papertrails/render/post.js'
import { createMaterials } from '../papertrails/render/materials.js'
import { createPaperAudio } from '../papertrails/audio/paper.js'
import { createMusic } from '../papertrails/audio/music.js'
import { createDayNight } from '../papertrails/render/daynight.js'
import { createLife } from '../papertrails/life/life.js'
import { createAnimals } from '../papertrails/life/animals.js'
import { createGame } from '../papertrails/game/index.js'
import { createViews } from '../papertrails/camera/views.js'

const hypot2 = (a, b) => Math.sqrt(a * a + b * b)

export default function InteractiveLabBanner() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const apiRef = useRef(null)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'ready' | 'error'
  const [fullscreen, setFullscreen] = useState(false)
  const [isNight, setIsNight] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const onFsChange = () => {
      setFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const toggleFS = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  const handleToggleDayNight = useCallback(() => {
    apiRef.current?.daynight?.toggle()
    setIsNight((n) => !n)
  }, [])

  const handleCycleView = useCallback(() => {
    apiRef.current?.views?.next()
  }, [])

  const handleToggleMusic = useCallback(() => {
    apiRef.current?.music?.toggle()
    setIsMuted((m) => !m)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let disposed = false
    let booted = false
    const cleanupFns = []
    let loopInstance = null

    const bootEngine = async () => {
      if (booted || disposed) return
      booted = true
      setStatus('loading')

      try {
        const quality = window.innerWidth < 768 ? 'med' : 'high'
        const seed = CONFIG.DEFAULT_SEED
        state.seed = seed
        state.quality = quality

        const scene = new THREE.Scene()
        const rendererObj = createRenderer({ canvas, quality })
        const { renderer, setSize: setRendererSize } = rendererObj

        const materials = createMaterials({ quality })
        const assets = await loadAssets({ materials, renderer, quality })
        if (disposed) {
          rendererObj.dispose()
          return
        }
        materials.setTextures(assets.textures)

        const lights = createLights({ scene, quality })
        const wfc = createWFC({ seed })
        const world = createWorld({ scene, assets, wfc, materials, quality })
        const traveller = createTraveller({ scene, assets, world, materials })

        const w0 = Math.max(1, container.clientWidth)
        const h0 = Math.max(1, container.clientHeight)
        const follow = createFollowCamera({ aspect: w0 / h0 })
        const controls = createControls({ domElement: canvas, camera: follow.camera, traveller })
        const views = createViews({ follow })
        const post = createPost({ renderer, scene, camera: follow.camera, quality })
        const audio = createPaperAudio({ muted: true })
        const music = createMusic({ audio })
        const daynight = createDayNight({ scene, night: false })

        const life = CONFIG.life.enabled === false
          ? null
          : createLife({ scene, assets, wfc, world, daynight, camera: follow.camera, quality, seed })

        const animals = CONFIG.animals.enabled === false
          ? null
          : createAnimals({ scene, renderer, world, wfc, traveller, daynight, assets, seed, quality })

        const game = createGame({
          scene, renderer, world, wfc, traveller, follow, controls,
          lights, post, daynight, music, audio, life, assets, materials,
          seed, quality, persist: false,
        })
        follow.setAssistGate(game.modal)

        const plainDepth = new THREE.MeshDepthMaterial()
        scene.traverse((o) => {
          if (o.isMesh && !o.isBatchedMesh && !o.isInstancedMesh && o.castShadow && !o.customDepthMaterial) {
            o.customDepthMaterial = plainDepth
          }
        })

        const idle = { x: 0, z: 0 }
        const _right = new THREE.Vector3()

        const update = (dt) => {
          state.time = loop.time
          state.frame = loop.frame
          const input = controls.getInput(dt) || idle
          traveller.update(dt, game.modal() ? idle : input)
          const p = traveller.position
          const t = state.traveller
          t.x = p.x; t.y = p.y; t.z = p.z
          t.dirX = traveller.moveDir.x; t.dirZ = traveller.moveDir.z; t.speed = traveller.speed
          _right.setFromMatrixColumn(follow.camera.matrixWorld, 0)
          const rl = hypot2(_right.x, _right.z) || 1
          state.listener.x = p.x; state.listener.z = p.z
          state.listener.rightX = _right.x / rl
          state.listener.rightZ = _right.z / rl
          world.update(dt, p, traveller.moveDir)
          views.update(dt)
          follow.update(dt, traveller)
          daynight.update(dt)
          if (life) life.update(dt, p, follow.camera)
          if (animals) animals.update(dt)
          game.update(dt)
          lights.update(dt, traveller, follow.camera)
          materials.update(dt)
        }

        const render = (dt) => {
          post.setFocus(follow.focusPoint)
          post.render(dt)
          game.atlasmap.render()
        }

        const loop = createLoop({ update, render })
        loopInstance = loop

        const resize = () => {
          const w = Math.max(1, container.clientWidth)
          const h = Math.max(1, container.clientHeight)
          setRendererSize(w, h)
          follow.setAspect(w / h)
          post.setSize(w, h)
          bus.emit('resize', { width: w, height: h, dpr: renderer.getPixelRatio() })
        }

        const ro = new ResizeObserver(resize)
        ro.observe(container)

        const onKey = (e) => {
          if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
          const isFocused = document.activeElement === canvas || !!document.fullscreenElement
          if (!isFocused) return
          if (e.code === 'KeyN') handleToggleDayNight()
          else if (e.code === 'KeyV' && !game.modal()) views.next()
          else if (e.code === 'KeyM') handleToggleMusic()
        }
        window.addEventListener('keydown', onKey)

        const unsubFirst = bus.once('input:first', () => setHasInteracted(true))

        if (animals) await animals.ready
        if (disposed) {
          ro.disconnect()
          window.removeEventListener('keydown', onKey)
          controls.dispose()
          game.dispose()
          rendererObj.dispose()
          return
        }

        resize()

        let startX = 0
        let startZ = 0
        if (!world.isWalkable(0, 0)) {
          outer: for (let r = 0.25; r <= 6; r += 0.25) {
            for (let i = 0; i < 16; i++) {
              const a = (i / 16) * Math.PI * 2
              const nx = Math.cos(a) * r
              const nz = Math.sin(a) * r
              if (world.isWalkable(nx, nz)) {
                startX = nx
                startZ = nz
                break outer
              }
            }
          }
        }

        traveller.teleport(startX, startZ)
        controls.clearTarget()
        update(0)
        follow.snap(traveller)
        if (world.faceCamera) world.faceCamera()
        if (life) life.update(0, traveller.position, follow.camera)
        lights.update(0, traveller, follow.camera)
        render(0)
        loop.start()

        apiRef.current = { daynight, views, music }
        setStatus('ready')

        cleanupFns.push(() => {
          loop.stop()
          ro.disconnect()
          window.removeEventListener('keydown', onKey)
          if (typeof unsubFirst === 'function') unsubFirst()
          controls.dispose()
          game.dispose()
          life?.dispose?.()
          animals?.dispose?.()
          world?.dispose?.()
          post?.dispose?.()
          plainDepth.dispose()
          scene.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose()
            if (obj.material) {
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
              else obj.material.dispose()
            }
          })
          rendererObj.dispose()
        })
      } catch (err) {
        console.error('[JavrelLab] Papertrails init failed:', err)
        if (!disposed) setStatus('error')
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!booted) bootEngine()
          else loopInstance?.start()
        } else {
          loopInstance?.stop()
        }
      },
      { rootMargin: '300px 0px', threshold: 0.01 }
    )
    io.observe(container)

    return () => {
      disposed = true
      io.disconnect()
      cleanupFns.forEach((fn) => {
        try { fn() } catch (_) {}
      })
    }
  }, [handleToggleDayNight, handleToggleMusic])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-slate-900 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] border border-slate-200/70 transition-all duration-500 ${
        fullscreen ? 'h-screen rounded-none' : 'h-[540px] sm:h-[640px] lg:h-[700px] rounded-3xl'
      }`}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        onClick={() => canvasRef.current?.focus()}
        className="w-full h-full block outline-none cursor-pointer touch-none"
      />

      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-md z-20">
          <div className="w-10 h-10 rounded-full border-2 border-blue-600/20 border-t-blue-600 animate-spin mb-4" />
          <p className="font-mono text-xs uppercase tracking-widest text-slate-600">
            {status === 'error'
              ? 'Error al cargar el entorno WebGL'
              : 'Cargando mundo interactivo 3D (Papertrails Engine)...'}
          </p>
        </div>
      )}

      {/* HUD superior — Light Glassmorphism */}
      <div className="absolute top-5 left-5 right-5 pointer-events-none flex items-start justify-between gap-4 z-10">
        <div className="glass-card rounded-2xl px-4 py-3 pointer-events-auto">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold text-cyan-700 uppercase tracking-widest">
              Javrel Lab · Motor Papertrails 3D
            </span>
          </div>
          <h3 className="text-slate-900 text-sm sm:text-base font-bold leading-snug">
            Simulador de Mundo Procedural en Tiempo Real
          </h3>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleCycleView}
            title="Cambiar cámara (V)"
            className="glass-card px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            Vista (V)
          </button>
          <button
            onClick={handleToggleDayNight}
            title="Alternar Día / Noche (N)"
            className="glass-card px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors hidden sm:inline-flex"
          >
            {isNight ? '☀️ Día' : '🌙 Noche'}
          </button>
          <button
            onClick={handleToggleMusic}
            title="Audio procedural (M)"
            className="glass-card px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors hidden sm:inline-flex"
          >
            {isMuted ? '🔇 Audio' : '🔊 Audio'}
          </button>
          <button
            onClick={toggleFS}
            title={fullscreen ? 'Salir de pantalla completa' : 'Expandir a pantalla completa'}
            className="glass-card px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900/90 hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              {fullscreen ? (
                <path d="M5 1v4H1M11 1v4h4M15 11h-4v4M1 11h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            <span className="hidden sm:inline">{fullscreen ? 'Salir' : 'Pantalla completa'}</span>
          </button>
        </div>
      </div>

      {/* Hint inferior */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity duration-700 ${
          hasInteracted ? 'opacity-75' : 'opacity-100'
        }`}
      >
        <div className="glass-card rounded-full px-4 py-1.5 text-[11px] font-mono text-slate-700 whitespace-nowrap">
          Haz clic o usa WASD para caminar · Shift correr · V cámara · N día/noche
        </div>
      </div>
    </div>
  )
}
