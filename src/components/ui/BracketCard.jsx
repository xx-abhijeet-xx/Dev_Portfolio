import { useEffect, useRef } from 'react'
import { useCardTilt } from '@hooks/useCardTilt'

/**
 * BracketCard
 * A card with animated corner brackets (style 02) and 3D tilt (style 04).
 * All other cards in the portfolio extend this base.
 *
 * @param {string}    className  - extra Tailwind / CSS classes
 * @param {ReactNode} children
 * @param {object}    tiltOptions - passed to useCardTilt
 */
export function BracketCard({ children, className = '', tiltOptions = {}, style = {} }) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt(tiltOptions)

  // Inject the two extra bracket corner spans (tr + bl)
  const innerRef = useRef(null)
  useEffect(() => {
    const card = ref.current
    if (!card) return
    ;['tr', 'bl'].forEach((pos) => {
      if (card.querySelector(`.pc-br.${pos}`)) return // avoid duplicates
      const el = document.createElement('span')
      el.className = `pc-br ${pos}`
      card.appendChild(el)
    })
  }, [ref])

  return (
    <div
      ref={ref}
      className={`bracket-card ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
