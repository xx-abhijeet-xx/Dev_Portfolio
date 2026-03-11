import { useEffect, useState } from 'react'

/**
 * Loader
 * Branded AV. intro screen (≈1.9s) before the site reveals.
 * Sequence: initials appear → progress bar fills → fade out.
 */
export function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [leaving,  setLeaving]  = useState(false)

  useEffect(() => {
    const steps   = [20, 45, 65, 85, 100]
    const timings = [150, 350, 550, 750, 1000]
    timings.forEach((ms, i) => setTimeout(() => setProgress(steps[i]), ms))
    setTimeout(() => setLeaving(true),       1400)
    setTimeout(() => onComplete?.(),         1900)
  }, [onComplete])

  return (
    <div className={`loader-wrap${leaving ? ' leaving' : ''}`} aria-label="Loading">
      {/* Subtle grid */}
      <div className="loader-grid" aria-hidden="true" />

      {/* Centre */}
      <div className="loader-center">
        <div className="loader-initials">
          {'AV'.split('').map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.14}s` }}>{c}</span>
          ))}
          <span className="loader-dot">.</span>
        </div>
        <p className="loader-name">Abhijeet Verma</p>
        <p className="loader-role">Software Engineer</p>
      </div>

      {/* Progress */}
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
        <span className="loader-pct">{progress}%</span>
      </div>

      {/* Corners */}
      <span className="loader-corner tl">PORTFOLIO</span>
      <span className="loader-corner tr">2025</span>
      <span className="loader-corner bl">REACT · THREE.JS</span>
      <span className="loader-corner br">v1.0.0</span>
    </div>
  )
}
