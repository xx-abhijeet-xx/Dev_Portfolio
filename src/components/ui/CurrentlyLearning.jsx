import { useState, useEffect } from 'react'
import { CURRENTLY_LEARNING } from '@lib/constants'

/**
 * CurrentlyLearning
 * Animated badge that cycles through items in CURRENTLY_LEARNING.
 * ⚡ Currently learning: System Design · Microservices · AWS
 * Update the array in constants.js whenever you level up.
 */
export function CurrentlyLearning() {
  const [idx, setIdx]     = useState(0)
  const [fade, setFade]   = useState(true)

  useEffect(() => {
    if (CURRENTLY_LEARNING.length < 2) return
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % CURRENTLY_LEARNING.length)
        setFade(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="learning-badge">
      <span className="learning-icon">⚡</span>
      <span className="learning-prefix">Currently learning</span>
      <span className={`learning-item${fade ? ' visible' : ''}`}>
        {CURRENTLY_LEARNING[idx]}
      </span>
      <span className="learning-dot" />
    </div>
  )
}
