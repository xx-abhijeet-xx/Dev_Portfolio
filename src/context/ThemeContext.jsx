import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

/**
 * ThemeProvider
 * Manages dark / light mode.
 * Persists choice in localStorage.
 * Sets data-theme on <html> — CSS variables switch via [data-theme="light"] selector.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('av-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('av-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
