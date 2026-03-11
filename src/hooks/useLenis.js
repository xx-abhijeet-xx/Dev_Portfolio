import { useEffect } from 'react'

/**
 * useLenis
 * Loads Lenis smooth scroll from CDN and initialises it.
 * Lenis is loaded dynamically so it doesn't block the bundle.
 * Returns nothing — side-effect only.
 */
export function useLenis() {
  useEffect(() => {
    // Dynamically inject Lenis from CDN
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js'
    script.async = true
    script.onload = () => {
      const lenis = new window.Lenis({
        duration:  1.4,
        easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth:    true,
        smoothTouch: false,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Make lenis available globally for anchor links
      window.__lenis = lenis
    }
    document.head.appendChild(script)

    return () => {
      window.__lenis?.destroy()
      document.head.removeChild(script)
    }
  }, [])
}
