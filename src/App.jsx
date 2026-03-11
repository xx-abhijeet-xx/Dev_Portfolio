import { useEffect, useState, useCallback } from 'react'

// Context
import { ThemeProvider } from '@/context/ThemeContext'

// Hooks
import { useLenis } from '@hooks/useLenis'

// Layout
import { Loader }  from '@layout/Loader'
import { Cursor }  from '@layout/Cursor'
import { Navbar }  from '@layout/Navbar'
import { Footer }  from '@layout/Footer'

// Sections
import { Hero }           from '@sections/Hero'
import { About }          from '@sections/About'
import { Experience }     from '@sections/Experience'
import { Projects }       from '@sections/Projects'
import { Certifications } from '@sections/Certifications'
import { Contact }        from '@sections/Contact'

// Chatbot
import { AskAV } from '@ui/AskAV'

function Inner() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  // Global scroll reveal
  useEffect(() => {
    if (!loaded) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item').forEach((el) =>
      observer.observe(el)
    )
    return () => observer.disconnect()
  }, [loaded])

  // Hero name letter animation
  useEffect(() => {
    if (!loaded) return
    const animate = (id, text, startDelay) => {
      const el = document.getElementById(id)
      if (!el) return
      let delay = startDelay
      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.className = 'letter'
        span.textContent = char
        span.style.animationDelay = `${delay}s`
        el.appendChild(span)
        delay += 0.06
      })
      return delay
    }
    const d = animate('name-line-1', 'ABHIJEET', 0.5)
    animate('name-line-2', 'VERMA', d + 0.1)
  }, [loaded])

  const handleLoaderDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderDone} />}
      <Cursor />
      <Navbar />
      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity .5s ease' }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      {/* AI Chatbot — always visible, floats bottom-right */}
      {loaded && <AskAV />}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  )
}
