import { useState, useEffect } from 'react'

/**
 * Cycling typewriter effect over an array of phrases.
 *
 * @param {string[]} phrases   - Phrases to cycle through
 * @param {number}   typeSpeed - ms per character while typing
 * @param {number}   delSpeed  - ms per character while deleting
 * @param {number}   pause     - ms to hold a completed phrase
 * @returns {string} current displayed text
 */
export function useTypewriter(phrases, { typeSpeed = 80, delSpeed = 40, pause = 2000 } = {}) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!phrases.length) return

    let phraseIndex = 0
    let charIndex   = 0
    let deleting    = false
    let timer

    const tick = () => {
      const phrase = phrases[phraseIndex]

      if (!deleting) {
        setText(phrase.slice(0, ++charIndex))
        if (charIndex === phrase.length) {
          deleting = true
          timer = setTimeout(tick, pause)
          return
        }
      } else {
        setText(phrase.slice(0, --charIndex))
        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
        }
      }

      timer = setTimeout(tick, deleting ? delSpeed : typeSpeed)
    }

    timer = setTimeout(tick, 1400)
    return () => clearTimeout(timer)
  }, [phrases, typeSpeed, delSpeed, pause])

  return text
}
