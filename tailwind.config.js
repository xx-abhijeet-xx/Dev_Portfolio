/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          accent: '#63b3ff',
          dim:    '#3b82f6',
        },
        purple: {
          accent: '#a78bfa',
        },
        dark: {
          bg:     '#02020c',
          section:'#06060f',
          card:   '#0c0c1a',
          border: '#1a1a2e',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        mono:    ['"DM Mono"', 'monospace'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        grad: 'linear-gradient(135deg, #63b3ff, #a78bfa)',
      },
      animation: {
        'blink':      'blink 1s infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'spin-slow':  'spin 5s linear infinite',
        'marquee':    'marquee 20s linear infinite',
        'warp':       'warp 0.1s linear infinite',
      },
      keyframes: {
        blink:      { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        pulseGlow:  {
          '0%,100%': { boxShadow: '0 0 8px #63b3ff' },
          '50%':     { boxShadow: '0 0 20px #63b3ff, 0 0 40px rgba(99,179,255,.25)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
