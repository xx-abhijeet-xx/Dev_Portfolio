import { PROJECTS } from '@lib/constants'
import { useCardTilt } from '@hooks/useCardTilt'
import { useEffect } from 'react'

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
)
const ExtIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
)

function ProjectCard({ project, delay = 0 }) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt()

  // inject TR + BL bracket spans
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

  if (project.featured) {
    return (
      <div
        ref={ref}
        className="bracket-card project-card featured reveal"
        style={{ transitionDelay: `${delay}s`, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div>
          <div className="project-number">{project.number}</div>
          <div className="project-tag">{project.tag}</div>
          <div className="project-name">{project.name}</div>
          <p className="project-desc">{project.desc}</p>
          <div className="project-stack">
            {project.stack.map((s) => <span key={s} className="stack-pill">{s}</span>)}
          </div>
          {project.nda && <div className="project-links"><span className="proj-nda">⚠ Confidential per NDA</span></div>}
        </div>
        <div className="project-impact">
          <div className="impact-title">Impact</div>
          {project.impact.map((item, i) => <div key={i} className="impact-item">{item}</div>)}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="bracket-card project-card reveal"
      style={{ transitionDelay: `${delay}s`, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-number">{project.number}</div>
      <div className="project-tag">{project.tag}</div>
      <div className="project-name">{project.name}</div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-stack">
        {project.stack.map((s) => <span key={s} className="stack-pill">{s}</span>)}
      </div>
      <div className="project-links">
        {project.links.map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="proj-link">
            {l.label === 'GitHub' ? <GitHubIcon /> : <ExtIcon />} {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/** Projects — 2-col grid, featured card spans full width */
export function Projects() {
  return (
    <section id="projects">
      <p className="section-label reveal">Work</p>
      <h2 className="section-title reveal">PROJECTS</h2>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.08} />)}
      </div>
    </section>
  )
}
