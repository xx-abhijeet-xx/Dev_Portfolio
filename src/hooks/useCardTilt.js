import { useRef, useCallback } from 'react'

/**
 * Returns event handlers to apply a 3D perspective tilt
 * to any card element on mouse move.
 *
 * @param {object} options
 * @param {number} options.maxTiltX - max degrees of X-axis rotation
 * @param {number} options.maxTiltY - max degrees of Y-axis rotation
 * @param {number} options.perspective - perspective distance in px
 */
export function useCardTilt({ maxTiltX = 7, maxTiltY = 10, perspective = 900 } = {}) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const card = ref.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    card.style.transform  = `perspective(${perspective}px) rotateY(${x * maxTiltY * 2}deg) rotateX(${-y * maxTiltX * 2}deg) translateZ(6px)`
    card.style.transition = 'transform 0.1s ease'
  }, [maxTiltX, maxTiltY, perspective])

  const onMouseLeave = useCallback(() => {
    const card = ref.current
    if (!card) return
    card.style.transform  = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) translateZ(0)`
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  }, [perspective])

  return { ref, onMouseMove, onMouseLeave }
}
