// ─────────────────────────────────────────
//  SITE DATA — edit this file to update
//  the entire portfolio content
// ─────────────────────────────────────────

export const SITE = {
  name:           'Abhijeet Verma',
  initials:       'AV',
  role:           'Software Engineer',
  company:        'LTIMindtree',
  location:       'Pune, India',
  email:          'contact.abhijeetverma@gmail.com',
  linkedin:       'https://www.linkedin.com/in/abhijeet-verma-dev/',
  github:         'https://github.com/xx-abhijeet-xx',
  githubUsername: 'xx-abhijeet-xx',     // ← update when you rename
  portfolio:      'https://abhijeet-verma.vercel.app',
  openToWork:     true,
}

// ⚡ Update this whenever you pick up something new
// Shown as a live animated badge near the hero
export const CURRENTLY_LEARNING = [
  'System Design',
  'Microservices',
  'AWS',
]

export const TYPED_PHRASES = [
  'Full Stack Engineer @ LTIMindtree',
  'React · Java · Spring Boot',
  'Building Enterprise-Scale Systems',
  'Open to SDE Roles',
]

export const EXPERIENCE = [
  {
    id:      'ltimindtree',
    date:    'Sep 2024 — Present · Pune, India',
    role:    'Software Engineer',
    company: 'LTIMindtree · Full-time · Hybrid',
    current: true,
    bullets: [
      'Designed extensible, maintainable full-stack features using Java, Spring Boot & React for enterprise banking platforms',
      'Achieved ~25% reduction in page load time through targeted performance optimization',
      'Developed & deployed REST APIs with RBAC, secure auth, and MySQL/PostgreSQL persistence',
      'Reduced support tickets by 30% via real-time validation and automated workflows',
      'Contributed to CI/CD practices and full-cycle SDLC in Agile/Scrum sprints',
      'Conducted peer code reviews and collaborated cross-functionally with stakeholders',
    ],
  },
  {
    id:      'btech',
    date:    'Nov 2020 — Jun 2024 · Bhopal, India',
    role:    'B.Tech CSE',
    company: 'LNCT Group · AI & ML Specialization · CGPA 8.5',
    current: false,
    bullets: [
      'Specialized in AI/ML with coursework in DSA, Neural Networks, NLP, DBMS, OS, System Design',
      'Active in robotics and coding clubs; multiple project implementations',
    ],
  },
]

export const SKILLS = [
  { category: 'Frontend',              tags: ['React.js', 'Redux', 'TypeScript', 'Angular', 'TailwindCSS', 'GSAP', 'HTML5', 'CSS3'] },
  { category: 'Backend',               tags: ['Java', 'Spring Boot', 'Spring MVC', 'REST APIs', 'Node.js', 'Express.js', 'Python'] },
  { category: 'Databases & Tools',     tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Git', 'Maven', 'CI/CD', 'Linux', 'Postman'] },
  { category: 'AI / ML',               tags: ['Machine Learning', 'Neural Networks', 'NLP', 'Azure (EY Certified)'] },
  { category: 'Engineering Practices', tags: ['System Design', 'OOP', 'DSA', 'Unit Testing', 'Code Review', 'Agile/Scrum', 'SDLC'] },
]

// 20 tech particles for the gravity attractor (Experience section)
export const GRAVITY_SKILLS = [
  { label: 'React',       color: 0x63b3ff },
  { label: 'Java',        color: 0xa78bfa },
  { label: 'Spring',      color: 0x4ade80 },
  { label: 'TypeScript',  color: 0x63b3ff },
  { label: 'MySQL',       color: 0xfbbf24 },
  { label: 'Redis',       color: 0xef4444 },
  { label: 'Node.js',     color: 0x4ade80 },
  { label: 'Python',      color: 0xfbbf24 },
  { label: 'PostgreSQL',  color: 0x63b3ff },
  { label: 'MongoDB',     color: 0x4ade80 },
  { label: 'Git',         color: 0xfb923c },
  { label: 'CI/CD',       color: 0x63b3ff },
  { label: 'Redux',       color: 0xa78bfa },
  { label: 'REST API',    color: 0x22d3ee },
  { label: 'Linux',       color: 0xfbbf24 },
  { label: 'ML',          color: 0xa78bfa },
  { label: 'GSAP',        color: 0x63b3ff },
  { label: 'Docker',      color: 0x22d3ee },
  { label: 'Angular',     color: 0xef4444 },
  { label: 'TailwindCSS', color: 0x22d3ee },
]

export const PROJECTS = [
  {
    id:       'onboarding',
    number:   '01',
    tag:      'Production · LTIMindtree · NDA',
    name:     'Enterprise Onboarding Platform',
    desc:     'Full-stack onboarding automation system for a large-scale enterprise banking client, replacing manual Excel-based workflows. Actively used in production.',
    stack:    ['React.js', 'Java 8', 'Spring Boot', 'MySQL', 'Maven', 'REST APIs', 'RBAC'],
    links:    [],
    nda:      true,
    featured: true,
    impact: [
      'Built complex React frontend with candidate search, data tables & role-based UI',
      'Spring Boot REST APIs for end-to-end candidate management workflows',
      'Secure authentication with role-based access control (RBAC)',
      'Reduced manual onboarding effort significantly across enterprise operations',
      'Improved data accuracy by centralising onboarding & BGV tracking',
    ],
  },
  {
    id:       'chat',
    number:   '02',
    tag:      'Personal · Full Stack',
    name:     'Real-Time Chat Application',
    desc:     'Production-ready messaging platform with WebSocket communication, Redis pub/sub for scalability, and secure JWT-based authentication.',
    stack:    ['Next.js', 'TypeScript', 'Redis', 'WebSockets', 'JWT'],
    links:    [{ label: 'GitHub', url: 'https://github.com/xx-abhijeet-xx' }],
    featured: false,
  },
  {
    id:       'digital',
    number:   '03',
    tag:      'Personal · Frontend · Live',
    name:     'This Is Digital',
    desc:     'High-performance agency website with GSAP + ScrollTrigger animations, Locomotive Scroll, responsive design, deployed on Netlify.',
    stack:    ['JavaScript', 'GSAP', 'Locomotive Scroll', 'CSS3', 'Netlify'],
    links:    [
      { label: 'Live Site', url: 'https://thisisdigital.netlify.app/' },
      { label: 'GitHub',    url: 'https://github.com/xx-abhijeet-xx' },
    ],
    featured: false,
  },
  {
    id:       'neverland',
    number:   '04',
    tag:      'Personal · Frontend',
    name:     'Neverland Agency Website',
    desc:     'Full SDLC from concept to deployment. Immersive agency website with smooth scroll, GSAP animations and cross-browser compatibility.',
    stack:    ['JavaScript', 'GSAP', 'Locomotive Scroll', 'HTML5', 'CSS3'],
    links:    [{ label: 'GitHub', url: 'https://github.com/xx-abhijeet-xx' }],
    featured: false,
  },
]

export const CERTIFICATIONS = [
  { id: 'ey-azure',        issuer: 'EY',        name: 'Azure Essentials Masterclass',   date: 'Ernst & Young Associates LLP · Nov 2022', verified: true,  color: '#ffe600' },
  { id: 'microsoft-ai',   issuer: 'MICROSOFT',  name: 'AI Classroom Series',             date: 'Microsoft India · Dec 2020',              verified: true,  color: '#60a5fa' },
  { id: 'helsinki',       issuer: 'HELSINKI',   name: 'Elements of AI (2 ECTS)',          date: 'University of Helsinki · Dec 2021',        verified: true,  color: '#a78bfa' },
  { id: 'sheryians-react',issuer: 'SHERYIANS',  name: 'React JS & Next JS Developer',    date: 'Sheryians Coding School · Oct 2023',       verified: false, color: '#63b3ff' },
  { id: 'sheryians-be',   issuer: 'SHERYIANS',  name: 'Back-End Web Development',        date: 'Sheryians Coding School · Apr 2023',       verified: false, color: '#63b3ff' },
  { id: 'sheryians-fe',   issuer: 'SHERYIANS',  name: 'Front-End Web Development',       date: 'Sheryians Coding School · Nov 2022',       verified: false, color: '#63b3ff' },
]
