import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Adds the `visible` class when the element enters the viewport.
 *
 * @param {object} options
 * @param {number} options.threshold  - 0–1, portion visible before triggering
 * @param {string} options.rootMargin - CSS margin string for the observer root
 */
export function useScrollReveal({ threshold = 0.08, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
