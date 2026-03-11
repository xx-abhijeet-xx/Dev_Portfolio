import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EXPERIENCE, SKILLS, GRAVITY_SKILLS, SITE } from '@lib/constants'
import { GitHubStats } from '@ui/GitHubStats'

function GravityCanvas() {
  const zoneRef   = useRef(null)
  const canvasRef = useRef(null)
  const hintRef   = useRef(null)

  useEffect(() => {
    const zone   = zoneRef.current
    const canvas = canvasRef.current
    if (!zone || !canvas) return

    const W = () => zone.offsetWidth
    const H = () => zone.offsetHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(W(), H())

    const scene = new THREE.Scene()
    const cam   = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100)
    cam.position.z = 6

    const N         = GRAVITY_SKILLS.length
    const particles = GRAVITY_SKILLS.map((s, i) => {
      const a = (i / N) * Math.PI * 2
      const r = 1.6 + Math.random() * 1.3
      return { x: Math.cos(a)*r, y: Math.sin(a)*r, z: (Math.random()-0.5)*0.2,
               vx: 0, vy: 0, bx: Math.cos(a)*r, by: Math.sin(a)*r, color: s.color }
    })
    const meshes = particles.map((p) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 8, 8),
        new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.85 })
      )
      scene.add(m)
      return m
    })

    ;[1.9, 2.9].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.005, 6, 80),
        new THREE.MeshBasicMaterial({ color: 0x1e1e1e, transparent: true, opacity: 0.6 })
      )
      ring.rotation.x = Math.PI * 0.5 + i * 0.3
      scene.add(ring)
    })

    const cOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x63b3ff, transparent: true, opacity: 0.15 })
    )
    scene.add(cOrb)

    const pRings = [0.18, 0.34, 0.58].map((r) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.003, 6, 32),
        new THREE.MeshBasicMaterial({ color: 0x63b3ff, transparent: true, opacity: 0.15 })
      )
      scene.add(m)
      return m
    })

    let mX = 0, mY = 0, inside = false, hintGone = false, t = 0, raf

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mX = (e.clientX - rect.left) / W() * 8 - 4
      mY = -((e.clientY - rect.top) / H() * 8 - 4)
      inside = true
      if (!hintGone && hintRef.current) { hintRef.current.style.opacity = '0'; hintGone = true }
    }
    const onLeave = () => { inside = false }
    zone.addEventListener('mousemove', onMove)
    zone.addEventListener('mouseleave', onLeave)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      t  += 0.008
      pRings.forEach((pr, i) => {
        const s = 1 + Math.sin(t * 1.5 + i * 1.2) * 0.08
        pr.scale.set(s, s, 1)
        pr.material.opacity = 0.1 + Math.sin(t + i) * 0.05
        pr.rotation.z = t * 0.2 * (i + 1)
      })
      cOrb.material.opacity = 0.08 + Math.sin(t * 2) * 0.05
      cOrb.scale.setScalar(1 + Math.sin(t * 2) * 0.09)

      particles.forEach((p, i) => {
        if (inside) {
          const dx = mX - p.x, dy = mY - p.y, d = Math.sqrt(dx*dx + dy*dy) + 0.01
          p.vx += dx * 0.006 / (d + 0.5)
          p.vy += dy * 0.006 / (d + 0.5)
        } else {
          p.vx += (p.bx - p.x) * 0.025
          p.vy += (p.by - p.y) * 0.025
          const a = Math.atan2(p.y, p.x) + 0.006
          const r = Math.sqrt(p.x*p.x + p.y*p.y)
          p.vx += (Math.cos(a)*r - p.x) * 0.008
          p.vy += (Math.sin(a)*r - p.y) * 0.008
        }
        p.vx *= 0.88; p.vy *= 0.88
        p.x  += p.vx; p.y  += p.vy
        const maxR = 3.6, cr = Math.sqrt(p.x*p.x + p.y*p.y)
        if (cr > maxR) { p.x *= maxR/cr; p.y *= maxR/cr; p.vx *= -0.3; p.vy *= -0.3 }
        meshes[i].position.set(p.x, p.y, p.z + Math.sin(t + i) * 0.04)
        meshes[i].material.opacity = (inside && Math.sqrt((mX-p.x)**2 + (mY-p.y)**2) < 1) ? 0.95 : 0.75
      })

      if (!inside) scene.rotation.y = Math.sin(t * 0.1) * 0.1
      renderer.render(scene, cam)
    }
    animate()

    const ro = new ResizeObserver(() => {
      renderer.setSize(W(), H())
      cam.aspect = W() / H()
      cam.updateProjectionMatrix()
    })
    ro.observe(zone)

    return () => {
      cancelAnimationFrame(raf)
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={zoneRef} className="gravity-banner">
      <span className="gravity-corner tl">GRAVITY FIELD · TECH STACK</span>
      <span className="gravity-corner tr">INTERACTIVE · MOVE CURSOR IN</span>
      <span className="gravity-corner bl">{GRAVITY_SKILLS.length} TECHNOLOGIES</span>
      <span className="gravity-corner br">THREE.JS</span>
      <canvas ref={canvasRef} id="gravity-canvas" />
      <div ref={hintRef} className="gravity-hint">
        <div className="gravity-crosshair" />
        <p>Move cursor here to attract</p>
      </div>
    </div>
  )
}

/**
 * Experience
 * Gravity canvas banner + two-column timeline / skills + GitHub stats
 */
export function Experience() {
  return (
    <section id="experience">
      <p className="section-label">Career</p>

      <div className="exp-header reveal">
        <h2 className="section-title" style={{ marginBottom: 0 }}>EXPERIENCE<br />&amp; SKILLS</h2>
        <div className="exp-header-right">
          <div>Current Role <span>→ {SITE.company}</span></div>
          <div>Location     <span>→ {SITE.location}</span></div>
          <div>Status       <span>→ Open to Opportunities</span></div>
        </div>
      </div>

      <GravityCanvas />

      <div className="exp-grid">
        {/* Timeline */}
        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <div key={item.id} className="timeline-item reveal" style={{ transitionDelay: `${i * 0.2}s` }}>
              <div className="timeline-dot" style={item.current ? { animation: 'pulseGlow 2s infinite' } : {}} />
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-company">{item.company}</div>
              <ul className="timeline-bullets">
                {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="skills-panel reveal-right">
          {SKILLS.map((group) => (
            <div key={group.category} className="skill-group">
              <div className="skill-group-title">{group.category}</div>
              <div className="skill-tags">
                {group.tags.map((tag) => <span key={tag} className="skill-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub stats below */}
      <GitHubStats />
    </section>
  )
}
