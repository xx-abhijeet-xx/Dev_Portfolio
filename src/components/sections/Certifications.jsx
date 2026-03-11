import { CERTIFICATIONS } from '@lib/constants'
import { useCardTilt } from '@hooks/useCardTilt'
import { useEffect } from 'react'

function CertCard({ cert, delay }) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt({ maxTiltX: 5, maxTiltY: 7 })

  useEffect(() => {
    const card = ref.current
    if (!card) return
    ;['tr', 'bl'].forEach((pos) => {
      if (card.querySelector(`.pc-br.${pos}`)) return
      const el = document.createElement('span')
      el.className = `pc-br ${pos}`
      card.appendChild(el)
    })
  }, [ref])

  return (
    <div
      ref={ref}
      className="bracket-card cert-card reveal"
      style={{ transitionDelay: `${delay}s`, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {cert.verified && <div className="cert-verified" aria-label="Verified issuer" />}
      <div className="cert-issuer-badge" style={{ color: cert.color }}>{cert.issuer}</div>
      <div className="cert-name">{cert.name}</div>
      <div className="cert-date">{cert.date}</div>
    </div>
  )
}

/** Certifications — 3-col grid */
export function Certifications() {
  return (
    <section id="certifications">
      <p className="section-label reveal">Credentials</p>
      <h2 className="section-title reveal">CERTIFICATIONS</h2>
      <div className="certs-grid">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
