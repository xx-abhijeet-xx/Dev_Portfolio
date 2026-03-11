import { SITE } from '@lib/constants'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-text">{SITE.name} <span>·</span> {SITE.role} <span>·</span> {SITE.company}</div>
      <div className="footer-text">Built with <span>♥</span> and too much coffee</div>
    </footer>
  )
}
