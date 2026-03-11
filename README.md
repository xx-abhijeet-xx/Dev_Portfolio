# Abhijeet Verma — Portfolio v1.1

> Personal portfolio website built with **React 18 + Vite 5 + Tailwind CSS 3 + Three.js**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Branded Loader** | `AV.` intro screen with progress bar — fades out before hero renders |
| **Warp Speed Hero** | Three.js starfield, blue/purple/white particles, HUD overlay, ENGAGE toggle |
| **⚡ Currently Learning Badge** | Animated cycling badge near hero — edit in `constants.js` |
| **Bento Grid About** | Apple-style asymmetric card grid with stats, status, CTA |
| **Gravity Attractor** | 20 tech skill particles that swarm toward cursor (Three.js) |
| **GitHub Stats** | Live cards via `github-readme-stats` API — no API key needed |
| **Corner Bracket + 3D Tilt** | Hover style 02+04 on all cards |
| **Smooth Scroll (Lenis)** | Buttery inertial scroll via Lenis.js CDN |
| **Noise / Grain Overlay** | Animated SVG grain texture adds depth to dark backgrounds |
| **Dark / Light Mode** | ☀ toggle in nav — persisted to `localStorage` |
| **Mobile Nav Drawer** | Full-screen slide-in hamburger menu for mobile |
| **Cursor Trail** | 14-dot fading trail follows the cursor |
| **Scroll Reveal** | IntersectionObserver fade-in on all sections |
| **SEO Ready** | Meta tags, Open Graph, custom SVG favicon |
| **Fully Responsive** | Breakpoints at 900px + 600px |

---

## 🗂 Project Structure

```
av-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx        # Dark/Light mode state + localStorage
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Loader.jsx          # AV. branded intro loader
│   │   │   ├── Cursor.jsx          # Dot + ring + 14-dot trail
│   │   │   ├── Navbar.jsx          # Nav + theme toggle + mobile trigger
│   │   │   ├── MobileNav.jsx       # Slide-in hamburger drawer
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx            # Warp speed + typewriter + learning badge
│   │   │   ├── About.jsx           # Bento grid
│   │   │   ├── Experience.jsx      # Gravity canvas + timeline + skills + GitHub stats
│   │   │   ├── Projects.jsx        # Featured + regular cards
│   │   │   ├── Certifications.jsx  # 3-col cert grid
│   │   │   └── Contact.jsx         # CTA + social links
│   │   └── ui/
│   │       ├── BracketCard.jsx     # Reusable card: corner brackets + tilt
│   │       ├── CurrentlyLearning.jsx # ⚡ Animated learning badge
│   │       ├── GitHubStats.jsx     # Live GitHub stats cards
│   │       └── SectionLabel.jsx
│   ├── hooks/
│   │   ├── useLenis.js             # Smooth scroll (loads Lenis from CDN)
│   │   ├── useScrollReveal.js      # IntersectionObserver reveal
│   │   ├── useTypewriter.js        # Cycling typewriter
│   │   └── useCardTilt.js          # 3D perspective tilt
│   ├── lib/
│   │   ├── constants.js            # ← ALL content lives here
│   │   └── utils.js
│   ├── App.jsx                     # Root — loader → lenis → sections
│   ├── main.jsx
│   └── index.css                   # All styles + dark/light CSS vars
├── index.html
├── vite.config.js                  # Path aliases
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Clone / unzip the project
cd av-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

### Build for production
```bash
npm run build   # output: ./dist
npm run preview # preview production build
```

---

## ✏️ Updating Content

**Everything lives in `src/lib/constants.js`:**

| Export | What it controls |
|---|---|
| `SITE` | Name, email, LinkedIn, GitHub username, location |
| `CURRENTLY_LEARNING` | ⚡ Badge items — update whenever you level up |
| `TYPED_PHRASES` | Hero typewriter cycling phrases |
| `EXPERIENCE` | Timeline items and bullets |
| `SKILLS` | Skill group tags |
| `GRAVITY_SKILLS` | 20 particles in the Three.js gravity canvas |
| `PROJECTS` | Project cards, stack, links, impact bullets |
| `CERTIFICATIONS` | Cert cards with issuer, date, color |

### Update GitHub username
Change `SITE.githubUsername` in `constants.js` — the GitHub Stats cards update automatically.

### Add your photo
Drop `photo.jpg` in `/public/` then in `About.jsx` replace:
```jsx
<div className="b-photo-inner" />
// with:
<img src="/photo.jpg" alt="Abhijeet Verma" className="b-photo-img" />
```

---

## 🌐 Deploy to Vercel

**Option A — drag & drop:**
```bash
npm run build
# drag ./dist to vercel.com/new
```

**Option B — GitHub:**
1. Push repo to GitHub
2. Connect on vercel.com → Import
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| Vite | 5.0 | Build tool + dev server |
| Tailwind CSS | 3.4 | Utility-first styles |
| Three.js | 0.160 | Warp hero + gravity canvas |
| Lenis | 1.0 (CDN) | Smooth inertial scroll |
| Bebas Neue | — | Display headings |
| DM Mono | — | Code / labels |
| DM Sans | — | Body text |

---

## 📄 License
MIT © Abhijeet Verma

---

## 🤖 AI Chatbot Setup (Groq & Llama 3 — Free)

The portfolio includes a floating **AV Assistant** chatbot powered by Meta's Llama 3 model, running on Groq's lightning-fast hardware.

### Get your free API key (1 minute)

1. Go to [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign in with Google or GitHub → Click **"Create API Key"**
3. Copy the key

### Add to project

```bash
cp .env.example .env
# Edit .env and paste your key:
# VITE_GROQ_API_KEY=gsk_your_key_here