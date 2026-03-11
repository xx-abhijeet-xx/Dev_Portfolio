import { useCardTilt } from '@hooks/useCardTilt'
import { SITE } from '@lib/constants'

function BentoBox({ children, className = '', style = {} }) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt({ maxTiltX: 5, maxTiltY: 7, perspective: 900 })
  return (
    <div
      ref={ref}
      className={`b-box ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

/**
 * About
 * Bento grid layout — photo · name · bio · open-to-work · stats · resume CTA
 * (7 Certs and 10+ Projects cards intentionally removed per design decision)
 */
export function About() {
  return (
    <section id="about">
      <p className="section-label reveal">About Me</p>
      <h2 className="section-title reveal">WHO I AM</h2>

      <div className="bento-grid reveal">

        {/* Photo placeholder */}
        <BentoBox className="b-photo">
          <div className="b-photo-inner" role="img" aria-label="Abhijeet Verma — AV monogram placeholder" />
        </BentoBox>

        {/* Name */}
        <BentoBox className="b-name">
          <h3>ABHIJEET<br /><span>VERMA</span></h3>
          <p>Software Engineer · Full Stack · AI/ML · {SITE.location}</p>
        </BentoBox>

        {/* Bio */}
        <BentoBox className="b-bio">
          <p>
            Building production-grade banking platforms at <strong>LTIMindtree</strong> using{' '}
            <strong>React + Java + Spring Boot</strong>. CS graduate with AI &amp; ML specialization.
            Open to SDE / Full Stack roles at high-scale product companies.
          </p>
        </BentoBox>

        {/* Open to Work */}
        <BentoBox className="b-status">
          <div className="b-status-dot" aria-hidden="true" />
          <h4>OPEN TO WORK</h4>
          <p>SDE · Full Stack · Backend<br />Remote · Pune · Bangalore</p>
        </BentoBox>

        {/* Stats */}
        <BentoBox className="b-stat"><div className="n">1+</div><div className="l">Years Exp</div></BentoBox>
        <BentoBox className="b-stat"><div className="n">25%</div><div className="l">Load Time ↓</div></BentoBox>
        <BentoBox className="b-stat"><div className="n">30%</div><div className="l">Tickets ↓</div></BentoBox>

        {/* CTA */}
        <BentoBox className="b-cta">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="b-cta-link">
            VIEW RESUME ↗
          </a>
        </BentoBox>

        <BentoBox className="b-stat"><div className="n">8.5</div><div className="l">CGPA</div></BentoBox>

      </div>
    </section>
  )
}
