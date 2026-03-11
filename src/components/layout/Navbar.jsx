import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MobileNav } from './MobileNav'

const NAV_LINKS = ['about', 'experience', 'projects', 'certifications', 'contact']

/**
 * Navbar
 * Fixed top bar with:
 * - Active section highlight (scroll-based)
 * - Dark / Light mode toggle button
 * - MobileNav hamburger (hidden on desktop)
 */
export function Navbar() {
  const [active, setActive] = useState('')
  const { theme, toggle }   = useTheme()

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const handler  = () => {
      let cur = ''
      sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 260) cur = s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className="site-nav">
      <div className="nav-logo">AV<span>.</span></div>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href={`#${link}`} className={active === link ? 'active' : ''}>
              {link === 'certifications' ? 'Certs' : link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀' : '◑'}
        </button>
        <MobileNav />
      </div>
    </nav>
  )
}
