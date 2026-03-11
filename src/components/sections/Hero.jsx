import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTypewriter } from '@hooks/useTypewriter'
import { SITE, TYPED_PHRASES } from '@lib/constants'
import { CurrentlyLearning } from '@ui/CurrentlyLearning'

/**
 * Hero
 * Full-viewport warp-speed starfield hero section.
 * - Three.js particle warp (blue/purple/white stars)
 * - Letter-by-letter name reveal
 * - Typewriter subtitle cycling
 * - ⚡ Currently Learning badge
 * - Warp ENGAGE toggle
 * - HUD velocity + coordinate overlay
 */
export function Hero() {
  const canvasRef  = useRef(null)
  const warpRef    = useRef({ speed: 1, isWarp: false })
  const hudVelRef  = useRef(null)
  const hudBarRef  = useRef(null)
  const hudXRef    = useRef(null)
  const hudYRef    = useRef(null)
  const hudZRef    = useRef(null)
  const [warpOn, setWarpOn] = useState(false)
  const typedText  = useTypewriter(TYPED_PHRASES)

  // Three.js warp stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const cam   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 500)
    cam.position.z = 0.5

    const N   = 2000
    const pos = new Float32Array(N * 3)
    const vel = new Float32Array(N)
    const col = new Float32Array(N * 3)

    const spawnStar = (i) => {
      pos[i*3]   = (Math.random() - 0.5) * 14
      pos[i*3+1] = (Math.random() - 0.5) * 10
      pos[i*3+2] = (Math.random() - 0.5) * 60 - 30
      vel[i]     = 0.04 + Math.random() * 0.12
      const t    = Math.random()
      if      (t < 0.12) { col[i*3]=0.25; col[i*3+1]=0.6;  col[i*3+2]=1    } // blue
      else if (t < 0.22) { col[i*3]=0.55; col[i*3+1]=0.4;  col[i*3+2]=0.95 } // purple
      else               { col[i*3]=0.9;  col[i*3+1]=0.92; col[i*3+2]=1    } // white
    }
    for (let i = 0; i < N; i++) spawnStar(i)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true })
    scene.add(new THREE.Points(geo, mat))

    let frame = 0
    const p   = geo.attributes.position

    const animate = () => {
      const raf = requestAnimationFrame(animate)
      frame++
      const w = warpRef.current
      w.speed += ((w.isWarp ? 9 : 1) - w.speed) * 0.04

      for (let i = 0; i < N; i++) {
        p.array[i*3+2] += vel[i] * w.speed
        if (w.speed > 2) { p.array[i*3] *= 0.9995; p.array[i*3+1] *= 0.9995 }
        if (p.array[i*3+2] > 2) spawnStar(i)
      }
      p.needsUpdate = true
      mat.size = 0.04 + w.speed * 0.009

      if (frame % 3 === 0) {
        const v = w.speed / 9
        if (hudVelRef.current) hudVelRef.current.textContent = (v * 0.99).toFixed(2) + 'c'
        if (hudBarRef.current) {
          hudBarRef.current.style.width      = (v * 100) + '%'
          hudBarRef.current.style.background = w.isWarp ? 'rgba(99,179,255,.7)' : 'rgba(99,179,255,.3)'
        }
        if (hudXRef.current) hudXRef.current.textContent = (Math.random() * 0.001 - 0.0005).toFixed(4)
        if (hudYRef.current) hudYRef.current.textContent = (Math.random() * 0.001 - 0.0005).toFixed(4)
        if (hudZRef.current) hudZRef.current.textContent = '+' + (frame * 0.0003).toFixed(3)
      }

      renderer.render(scene, cam)
      return raf
    }
    const raf = animate()

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); renderer.dispose() }
  }, [])

  useEffect(() => { warpRef.current.isWarp = warpOn }, [warpOn])

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="hero-canvas" />

      {/* HUD coords top-left */}
      <div className="warp-coords">
        <div className="warp-coord-row">X <span ref={hudXRef}>+0.0000</span></div>
        <div className="warp-coord-row">Y <span ref={hudYRef}>+0.0000</span></div>
        <div className="warp-coord-row">Z <span ref={hudZRef}>+0.000</span></div>
      </div>

      {/* HUD velocity top-right */}
      <div className="warp-hud">
        <div className="warp-hud-label">Velocity</div>
        <div className="warp-hud-val" ref={hudVelRef}>0.00c</div>
        <div className="warp-hud-bar-wrap"><div className="warp-hud-bar" ref={hudBarRef} /></div>
      </div>

      <div className="hero-content">
        <p className="hero-tag">// Software Engineer · Full Stack · AI/ML</p>

        <h1 className="hero-name">
          <span className="hero-line" id="name-line-1" />
          <span className="hero-line" id="name-line-2" />
        </h1>

        <p className="hero-subtitle">
          <span className="typed-text">{typedText}</span>
          <span className="cursor-blink" />
        </p>

        {/* ⚡ Currently Learning badge */}
        <CurrentlyLearning />

        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">View Work</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn ↗</a>
        </div>

        <div className="warp-row">
          <div className="warp-divider" />
          <span className="warp-status-txt">Warp Drive</span>
          <button className={`warp-btn${warpOn ? ' on' : ''}`} onClick={() => setWarpOn((p) => !p)}>
            {warpOn ? 'DISENGAGE ↓' : 'ENGAGE ↑'}
          </button>
          <div className="warp-divider" style={{ transform: 'scaleX(-1)' }} />
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      <div className="hero-number">01</div>
    </section>
  )
}
