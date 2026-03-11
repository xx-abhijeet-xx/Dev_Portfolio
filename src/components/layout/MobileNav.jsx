import { useState, useEffect } from 'react'
import { SITE } from '@lib/constants'

const LINKS = [
  { href: '#about',          label: 'About'      },
  { href: '#experience',     label: 'Experience' },
  { href: '#projects',       label: 'Projects'   },
  { href: '#certifications', label: 'Certs'      },
  { href: '#contact',        label: 'Contact'    },
]

/**
 * MobileNav
 * Hamburger button + full-screen slide-in drawer for mobile viewports.
 * Body scroll is locked while drawer is open.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {open && <div className="drawer-backdrop" onClick={close} aria-hidden="true" />}

      <nav className={`mobile-drawer${open ? ' open' : ''}`} aria-label="Mobile navigation">
        <div className="drawer-header">
          <div className="drawer-logo">AV<span>.</span></div>
          <button className="drawer-close" onClick={close} aria-label="Close menu">✕</button>
        </div>

        <ul className="drawer-links">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? `${i * 0.07}s` : '0s' }}>
              <a href={l.href} onClick={close}>
                <span className="drawer-num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="drawer-socials">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={SITE.github}   target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </nav>
    </>
  )
}
