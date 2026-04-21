import { useEffect, useState } from 'react'

const SKILLS_DESIGN = [
  { name: 'Figma / Prototyping', level: 'Production' },
  { name: 'User Research', level: 'Production' },
  { name: 'Design Systems', level: 'Production' },
  { name: 'Wireframing', level: 'Production' },
  { name: 'React / Vite', level: 'Building' },
  { name: 'HTML & CSS', level: 'Building' },
]

const SKILLS_CLOUD = [
  { name: 'AWS S3 (Simple Storage Service)', level: 'Deployed' },
  { name: 'AWS CloudFront (CDN)', level: 'Deployed' },
  { name: 'AWS Lambda (Serverless Compute)', level: 'Deployed' },
  { name: 'AWS IAM (Identity & Access Management)', level: 'Deployed' },
  { name: 'Terraform (Infrastructure as Code)', level: 'Deployed' },
  { name: 'Docker + AWS ECS Fargate (Containers)', level: 'Deployed' },
  { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Deployed' },
]

const LEVEL_STYLE = {
  'Deployed':   { bg: '#0F2A1A', color: '#4ADE80', border: '#166534' },
  'Production': { bg: '#0F2A1A', color: '#4ADE80', border: '#166534' },
  'Building':   { bg: '#1C1A0F', color: '#FACC15', border: '#854D0E' },
  'Learning':   { bg: '#1A1A2E', color: '#818CF8', border: '#3730A3' },
}

const LEVEL_STYLE_LIGHT = {
  'Deployed':   { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
  'Production': { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
  'Building':   { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
  'Learning':   { bg: '#EEF2FF', color: '#3730A3', border: '#A5B4FC' },
}

const PROJECTS = [
  {
    num: '01',
    title: 'Automated Global Web Hosting',
    desc: 'Portfolio deployed to AWS S3 and CloudFront with Origin Access Control enforcing zero-public-access security. HTTPS-only traffic enforced globally.',
    outcome: '< 200ms global latency · $0.50/mo · Zero public S3 access',
    tags: ['AWS S3', 'CloudFront', 'OAC', 'GitHub Actions'],
    github: 'https://github.com/obooks29/portfolio',
  },
  {
    num: '02',
    title: 'Serverless Contact API',
    desc: 'Event-driven backend: API Gateway triggers Lambda which calls SES. No servers, no idle cost. Scales to zero automatically. Full CORS handling and input validation.',
    outcome: 'Free tier · Sub-200ms response · 0 servers managed',
    tags: ['AWS Lambda', 'API Gateway', 'AWS SES', 'AWS IAM'],
    github: 'https://github.com/obooks29/portfolio',
  },
  {
    num: '03',
    title: 'Infrastructure as Code',
    desc: 'Entire AWS stack reproduced in Terraform. S3 remote state with DynamoDB locking. One command provisions or destroys all resources, no console clicking required.',
    outcome: 'Full stack in < 3 min · Peer-reviewable infra · Reproducible',
    tags: ['Terraform', 'AWS S3 Backend', 'IaC', 'DynamoDB'],
    github: 'https://github.com/obooks29/terraform-portfolio',
  },
  {
    num: '04',
    title: 'Observability Dashboard',
    desc: 'CloudWatch dashboard tracking CPU, memory, errors on EC2. SNS alarm fires within 90 seconds of threshold breach. Custom CloudWatch Agent for memory metrics.',
    outcome: 'Alert in 90s · Custom metrics · Full lifecycle visibility',
    tags: ['AWS CloudWatch', 'AWS SNS', 'AWS EC2', 'Alarms'],
    github: 'https://github.com/obooks29/portfolio',
  },
  {
    num: '05',
    title: 'Containerised ECS Deploy',
    desc: 'Multi-stage Docker build reduces image from 1.2GB to 26.89MB. Pushed to ECR, deployed on Fargate with no EC2 instances to manage. Portfolio served live from the running container.',
    outcome: '26.89MB image · Fargate task running · 0 EC2 instances managed',
    tags: ['Docker', 'AWS ECR', 'AWS ECS Fargate', 'Nginx'],
    github: 'https://github.com/obooks29/portfolio',
  },
  {
    num: '06',
    title: 'Multi-Environment Pipeline',
    desc: 'Dev, Staging, and Production with isolated GitHub Actions workflows per environment. Manual approval gate on production. Branch protection with required status checks.',
    outcome: '3 isolated envs · Prod requires approval · Pipeline runs in 19s',
    tags: ['GitHub Actions', 'AWS S3', 'CloudFront', 'CI/CD'],
    github: 'https://github.com/obooks29/portfolio',
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach((f) => {
              f.style.width = f.dataset.pct + '%'
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    const el = document.getElementById('skills')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const levelStyle = darkMode ? LEVEL_STYLE : LEVEL_STYLE_LIGHT

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">PORT<span>.</span>FOLIO</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/cv.pdf" target="_blank" rel="noreferrer" className="nav-cv">CV ↓</a></li>
        </ul>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle light/dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-text" aria-hidden="true">BUILD<br/>DEPLOY</div>
        <div className="hero-content">
          <div className="status-strip">
            <span className="status-dot-anim" />
            AWS Cloud Practitioner (CLF-C02): In Progress · Target: June 2026
          </div>
          <p className="hero-eyebrow">Cloud &amp; DevOps Engineer · UI/UX Background</p>
          <h1 className="hero-name">
            BUKOLA<br/>
            <span className="accent">JIMOH</span>
          </h1>
          <p className="hero-tagline">
            I architect secure, automated AWS infrastructure and bring a designer's eye to every system I build.
            Specialising in scalable cloud deployments, CI/CD pipelines, and Infrastructure as Code.
          </p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">Get in Touch →</a>
            <a href="/cv.pdf" className="btn-secondary" target="_blank" rel="noreferrer">Download CV ↓</a>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <span className="section-num" aria-hidden="true">01</span>
        <p className="section-label">About me</p>
        <h2 className="section-title">WHO<br/>I AM</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a <strong>Cloud and DevOps Engineer</strong> who started out in UI/UX design.
              My design background is not a detour. It's one of my biggest advantages as an engineer.
              It means I understand how systems are built from the infrastructure up, and how they're
              actually experienced from the interface down.
            </p>
            <p>
              I think like a designer: I write cleaner documentation and communicate complex system
              designs more clearly than most. As a Cloud Engineer, I specialise in <strong>AWS and automation</strong>.
              I bring a unique focus on clarity and developer experience to every project.
            </p>
            <p>
              I'm not just interested in making sure a system works. I want to make sure
              it's <strong>secure, scalable, and easy for other humans to use</strong>.
            </p>
            <div className="badge">
              <span className="dot" />
              Open to Cloud / DevOps · Junior to Mid level roles
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-num">3+</div>
              <div className="stat-label">Years in UI/UX Design</div>
            </div>
            <div className="stat">
              <div className="stat-num">6</div>
              <div className="stat-label">AWS Projects Deployed</div>
            </div>
            <div className="stat">
              <div className="stat-num">CLF</div>
              <div className="stat-label">In Progress · AWS Cloud Practitioner</div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="arch-callout">
          <p className="section-label" style={{marginBottom: '0.5rem'}}>System Architecture &amp; Design Decisions</p>
          <p className="arch-intro">
            Cloud engineers don't just build. They choose <em>why</em> one approach beats another.
            Below is the architecture behind this portfolio site and the reasoning behind each decision.
            This is the kind of thinking I bring to every project.
          </p>
          <div className="arch-diagram">
            <div className="arch-node user">
              <span className="arch-icon">👤</span>
              <strong>You</strong>
              <small>The visitor</small>
            </div>
            <div className="arch-arrow">→<span>HTTPS only</span></div>
            <div className="arch-node cdn">
              <span className="arch-icon">🌍</span>
              <strong>CloudFront</strong>
              <small>Global CDN + SSL</small>
            </div>
            <div className="arch-arrow">→<span>Private access only</span></div>
            <div className="arch-node storage">
              <span className="arch-icon">🗄️</span>
              <strong>S3 Bucket</strong>
              <small>Locked down · Not public</small>
            </div>
            <div className="arch-arrow">←<span>Auto-deploys on git push</span></div>
            <div className="arch-node cicd">
              <span className="arch-icon">⚙️</span>
              <strong>GitHub Actions</strong>
              <small>CI/CD Pipeline</small>
            </div>
          </div>
          <div className="arch-decisions">
            <div className="arch-decision">
              <span className="arch-decision-label">Why S3 over a web server?</span>
              <span className="arch-decision-val">S3 is serverless: no server to patch, reboot, or pay for when idle. Hosting cost drops from ~$20/mo (EC2) to ~$0.50/mo.</span>
            </div>
            <div className="arch-decision">
              <span className="arch-decision-label">Why CloudFront?</span>
              <span className="arch-decision-val">CloudFront caches the site at 400+ edge locations worldwide, so visitors in Lagos, London, or Los Angeles all load in under 200ms.</span>
            </div>
            <div className="arch-decision">
              <span className="arch-decision-label">Why Origin Access Control?</span>
              <span className="arch-decision-val">OAC keeps the S3 bucket completely private. Only CloudFront can read it. Even if someone finds the bucket URL, they get Access Denied.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <span className="section-num" aria-hidden="true">02</span>
        <p className="section-label">What I bring</p>
        <h2 className="section-title">SKILLS &amp;<br/>TOOLS</h2>
        <div className="skills-grid">
          <div className="skill-col">
            <p className="skill-col-title">Design</p>
            {SKILLS_DESIGN.map((s) => (
              <div className="skill-row" key={s.name}>
                <span className="skill-name">{s.name}</span>
                <span className="skill-tag" style={{
                  background: levelStyle[s.level].bg,
                  color: levelStyle[s.level].color,
                  border: `1px solid ${levelStyle[s.level].border}`
                }}>{s.level}</span>
              </div>
            ))}
          </div>
          <div className="skill-col">
            <p className="skill-col-title">Cloud / DevOps</p>
            {SKILLS_CLOUD.map((s) => (
              <div className="skill-row" key={s.name}>
                <span className="skill-name">{s.name}</span>
                <span className="skill-tag" style={{
                  background: levelStyle[s.level].bg,
                  color: levelStyle[s.level].color,
                  border: `1px solid ${levelStyle[s.level].border}`
                }}>{s.level}</span>
              </div>
            ))}
            <div className="skill-legend">
              <span style={{color:'#16a34a'}}>● Deployed</span>
              <span style={{color:'#ca8a04'}}>● Building</span>
              <span style={{color:'#6366f1'}}>● Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projects">
        <span className="section-num" aria-hidden="true">03</span>
        <p className="section-label">Case studies</p>
        <h2 className="section-title">SELECTED<br/>WORK</h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className="proj-card" key={p.num}>
              <div className="proj-num">{p.num}</div>
              <div className="proj-title">{p.title}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-outcome">{p.outcome}</div>
              <div className="tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              {p.github && p.github !== '#' && (
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-github">
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <span className="section-num" aria-hidden="true">04</span>
        <p className="section-label">Let's connect</p>
        <div className="contact-grid">
          <h2 className="contact-big">LET'S<br/>WORK<br/><span>TOGETHER</span></h2>
          <div className="contact-links">
            <a href="mailto:bukolaayodelejimoh@gmail.com" className="clink">
              <span className="clink-type">Email</span>
              <span className="clink-val">bukolaayodelejimoh@gmail.com</span>
            </a>
            <a href="https://github.com/obooks29" target="_blank" rel="noreferrer" className="clink">
              <span className="clink-type">GitHub</span>
              <span className="clink-val">github.com/obooks29</span>
            </a>
            <a href="https://linkedin.com/in/bukolajimoh" target="_blank" rel="noreferrer" className="clink">
              <span className="clink-type">LinkedIn</span>
              <span className="clink-val">linkedin.com/in/bukolajimoh</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Bukola Jimoh · <span className="orange">Cloud &amp; DevOps Engineer</span></p>
        <p>Deployed on <span className="orange">AWS</span> · S3 + CloudFront + GitHub Actions</p>
      </footer>
    </>
  )
}
