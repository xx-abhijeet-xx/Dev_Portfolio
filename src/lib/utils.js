/**
 * Utility helpers used across the portfolio
 */

/**
 * Clamp a number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/**
 * Linear interpolation
 */
export const lerp = (a, b, t) => a + (b - a) * t

/**
 * Map a value from one range to another
 */
export const mapRange = (val, inMin, inMax, outMin, outMax) =>
  ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin

/**
 * Easing: ease-out cubic
 */
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Debounce a function
 */
export const debounce = (fn, ms = 100) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

/**
 * Check if element is in viewport
 */
export const isInViewport = (el, offset = 0) => {
  const rect = el.getBoundingClientRect()
  return rect.top <= window.innerHeight - offset && rect.bottom >= 0
}

/**
 * Format a class string — filters falsy values
 * Usage: cn('foo', isActive && 'bar', undefined)
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ')
