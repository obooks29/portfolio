import { useEffect, useState } from 'react'

/* DATA LAYER  */

const SKILLS_DESIGN = [
  { name: 'Figma / Prototyping', level: 'Production' },
  { name: 'User Research', level: 'Production' },
  { name: 'Design Systems', level: 'Production' },
  { name: 'Wireframing', level: 'Production' },
  { name: 'React / Vite', level: 'Building' },
  { name: 'HTML and CSS', level: 'Building' },
]

const SKILLS_CLOUD = [
  { name: 'AWS S3 (Simple Storage Service)', level: 'Deployed' },
  { name: 'AWS CloudFront (CDN)', level: 'Deployed' },
  { name: 'AWS Lambda (Serverless Compute)', level: 'Deployed' },
  { name: 'AWS IAM (Identity and Access Management)', level: 'Deployed' },
  { name: 'Terraform (Infrastructure as Code)', level: 'Deployed' },
  { name: 'Docker and AWS ECS Fargate (Containers)', level: 'Deployed' },
  { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Deployed' },
]

/* THEME TOKENS  */

const LEVEL_STYLE = {
  Deployed:   { bg: '#0F2A1A', color: '#4ADE80', border: '#166534' },
  Production: { bg: '#0F2A1A', color: '#4ADE80', border: '#166534' },
  Building:   { bg: '#1C1A0F', color: '#FACC15', border: '#854D0E' },
  Learning:   { bg: '#1A1A2E', color: '#818CF8', border: '#3730A3' },
}

const LEVEL_STYLE_LIGHT = {
  Deployed:   { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
  Production: { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
  Building:   { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
  Learning:   { bg: '#EEF2FF', color: '#3730A3', border: '#A5B4FC' },
}

const PROVIDER = {
  MULTI: { bg: '#1A0F2E', color: '#A78BFA', border: '#6D28D9', label: 'MULTI-CLOUD' },
  GCP:   { bg: '#0C1A2E', color: '#60A5FA', border: '#1D4ED8', label: 'GCP' },
  AZURE: { bg: '#0D1B30', color: '#7DD3FC', border: '#0369A1', label: 'AZURE' },
  AWS:   { bg: '#1A0F0A', color: '#FB923C', border: '#9A3412', label: 'AWS' },
}

/* PROJECTS: correct links, correct image size */

const PROJECTS = [
  {
    num: '01',
    title: 'Multi-Cloud Security Audit Bridge',
    desc: 'An automated serverless pipeline streaming AWS audit logs to Google Cloud Storage. I engineered a custom REST API integration for GCP OAuth 2.0 authentication to avoid heavy SDK bloat, prioritising a lightweight and maintainable system architecture.',
    outcome: 'Secure cross-cloud streaming · Principle of Least Privilege · SDK-less auth',
    tags: ['AWS Lambda', 'GCP Storage', 'Secrets Manager', 'OAuth 2.0', 'REST API'],
    github: 'https://github.com/obooks29/cross-cloud-bridge',
    provider: 'MULTI',
  },
  {
    num: '02',
    title: 'GCP Static Site with Cloud CDN',
    desc: 'React site deployed to Google Cloud Storage with Cloud CDN for global delivery. Cloud Build pipeline triggers on every GitHub push, runs the production build, and syncs output to the bucket automatically. GCP IAM and bucket ACLs documented alongside AWS equivalents.',
    outcome: 'Cloud Build pipeline live · Global CDN active · Provider patterns documented',
    tags: ['GCP Cloud Storage', 'Cloud CDN', 'Cloud Build', 'GCP IAM'],
    github: 'https://github.com/obooks29/vela-site',
    provider: 'GCP',
  },
  {
    num: '03',
    title: 'Azure Static Web App with OIDC',
    desc: 'React site on Azure Static Web Apps with built-in global CDN and HTTPS enforcement. Authentication uses OIDC federated identity via Azure Entra ID with zero long-lived secrets. RBAC service principal scoped to the resource group only.',
    outcome: 'Passwordless OIDC auth · RBAC service principal · SPA routing via config',
    tags: ['Azure SWA', 'Azure RBAC', 'OIDC', 'GitHub Actions'],
    github: 'https://github.com/obooks29/meridian-site',
    provider: 'AZURE',
  },
  {
    num: '04',
    title: 'Infrastructure as Code (Terraform)',
    desc: 'Defined a comprehensive AWS stack in HCL featuring S3 remote state and DynamoDB locking. This modular architecture allows for full environment provisioning or destruction in under 3 minutes, ensuring a 100% reproducible developer experience.',
    outcome: '100% reproducible · Zero manual config · State-lock protected',
    tags: ['Terraform', 'AWS S3 Backend', 'DynamoDB', 'HCL', 'IaC'],
    github: 'https://github.com/obooks29/terraform-portfolio',
    provider: 'AWS',
  },
  {
    num: '05',
    title: 'Containerised ECS Deployment',
    desc: 'Orchestrated production traffic via ECS Fargate. I applied a focus on efficiency by using multi-stage Docker builds to shrink images from 1.2GB to 26.89MB, stripping away all unnecessary dependencies for a hardened production surface.',
    outcome: '26.89MB image · Serverless containers · No EC2 to manage',
    tags: ['Docker', 'AWS ECS Fargate', 'ECR', 'Multi-stage builds'],
    github: 'https://github.com/obooks29/portfolio',
    provider: 'AWS',
  },
  {
    num: '06',
    title: 'Multi-Environment CI/CD Pipeline',
    desc: 'Engineered a professional release workflow with isolated Dev, Staging, and Production environments. I integrated manual approval gates to protect the production branch, bridging the gap between rapid iteration and production-grade stability.',
    outcome: 'Isolated environments · Human-in-the-loop approval · 0-downtime deploys',
    tags: ['GitHub Actions', 'AWS S3', 'CloudFront', 'CI/CD', 'Branch Protection'],
    github: 'https://github.com/obooks29/portfolio',
    provider: 'AWS',
  },
  {
    num: '07',
    title: 'Observability and Incident Response',
    desc: 'Built a health-tracking stack using CloudWatch and SNS. I configured automated alerts for CPU and memory thresholds with sub-90s delivery latency, providing full visibility into system performance and incident response.',
    outcome: 'Real-time monitoring · Automated alerting · Metric visibility',
    tags: ['CloudWatch', 'AWS SNS', 'EC2', 'Monitoring', 'Incident Response'],
    github: 'https://github.com/obooks29/portfolio',
    provider: 'AWS',
  },
  {
    num: '08',
    title: 'Serverless Contact Form API',
    desc: 'An event-driven inquiry pipeline using API Gateway to trigger Lambda and SES. This architecture scales to zero when idle, creating a maintenance-free, cost-effective backend that prioritises both scalability and fiscal efficiency.',
    outcome: 'Scale to zero · Zero idle cost · Automated SES delivery',
    tags: ['AWS Lambda', 'API Gateway', 'AWS SES', 'Python', 'Serverless'],
    github: 'https://github.com/obooks29/portfolio',
    provider: 'AWS',
  },
  {
    num: '09',
    title: 'Automated Global Web Hosting',
    desc: 'Secured global site delivery via CloudFront with Origin Access Control enforcing zero-public S3 access. GitHub Actions handles build, sync to S3, and CloudFront cache invalidation on every push. Cost reduced by 97% versus EC2 hosting.',
    outcome: '97% cost saving · Global low latency · HTTPS enforced',
    tags: ['CloudFront', 'AWS S3', 'OAC', 'GitHub Actions'],
    github: 'https://github.com/obooks29/portfolio',
    provider: 'AWS',
  },
]

/* CONTACT FORM COMPONENT */

const API_URL = 'https://wfpo6fiwy1.execute-api.us-east-1.amazonaws.com/contact'

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="form-label">Send a message directly</p>
      <input
        type="text" placeholder="Your name" value={form.name} required
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email" placeholder="Your email" value={form.email} required
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Your message" rows={4} value={form.message} required
        onChange={e => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && (
        <p className="form-success">Message sent. I will be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="form-error">Something went wrong. Please email me directly.</p>
      )}
    </form>
  )
}

/* MAIN APP */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

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
          <li>
            <a href="/Bukola_Jimoh_CV.pdf" target="_blank" rel="noreferrer" className="nav-cv">
              CV
            </a>
          </li>
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
            <span className="bar"/><span className="bar"/><span className="bar"/>
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
            <span className="status-dot-anim"/>
            AWS Cloud Practitioner (CLF-C02): In Progress · Target June 2026
          </div>
          <p className="hero-eyebrow">Cloud and DevOps Engineer · AWS · GCP · Azure · UI/UX Background</p>
          <h1 className="hero-name">
            BUKOLA<br/>
            <span className="accent">JIMOH</span>
          </h1>
          <p className="hero-tagline">
            I architect resilient multi-cloud environments across AWS, GCP, and Azure
            with a designer's eye for system clarity. From building serverless bridges to
            scaling container orchestration, I don't just configure tools. I engineer systems
            that are secure by default and automated through code.
          </p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">Get in Touch</a>
            <a href="/Bukola_Jimoh_CV.pdf" className="btn-secondary" target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-avatar" aria-hidden="true">
          <img src="/avatar.png" alt="" />
        </div>
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line"/>
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <span className="section-num" aria-hidden="true">01</span>
        <p className="section-label">About me</p>
        <h2 className="section-title">WHO<br/>I AM</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a <strong>Cloud and DevOps Engineer</strong> with a unique foundation
              in Product Design and UI/UX. My 4+ years of design experience affords me a
              strategic advantage: I view technical complexity through the lens of systems
              thinking rather than isolated implementation.
            </p>
            <p>
              I don't just deploy code. I engineer environments that prioritise security,
              maintainability, and developer experience. My expertise spans across{' '}
              <strong>AWS, Azure, and GCP</strong>, where I specialise in automating
              infrastructure through Terraform and securing cross-cloud communication.
            </p>
            <p>
              Whether I'm shrinking Docker images by 97% or building serverless audit
              bridges, I bridge the gap between design-stage logic and production-grade
              reliability. I'm not just making sure a system works. I'm ensuring it's
              secure, scalable, and transparent for the humans who build upon it.
            </p>
            <div className="badge">
              <span className="dot"/>
              Open to Cloud and DevOps roles · Junior to Mid level · Open to Relocation
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-num">3</div>
              <div className="stat-label">Cloud Providers (AWS, GCP, Azure)</div>
            </div>
            <div className="stat">
              <div className="stat-num">9</div>
              <div className="stat-label">Production Cloud Projects</div>
            </div>
            <div className="stat">
              <div className="stat-num">4+</div>
              <div className="stat-label">Years in UI/UX Design</div>
            </div>
          </div>
        </div>

        <div className="arch-callout">
          <p className="section-label" style={{marginBottom: '0.5rem'}}>
            System Architecture and Design Decisions
          </p>
          <p className="arch-intro">
            Cloud engineering is not just about assembly. It's about the strategic
            decisions that prioritise one path over another. This portfolio is a direct
            reflection of that approach: a look into the <em>architectural logic</em> and
            the <em>design-stage reasoning</em> that drives every component. This level of{' '}
            <em>intentionality and systems thinking</em> is exactly what I bring to every
            project I engineer.
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
              <small>Locked down</small>
            </div>
            <div className="arch-arrow">←<span>Auto-deploys on push</span></div>
            <div className="arch-node cicd">
              <span className="arch-icon">⚙️</span>
              <strong>GitHub Actions</strong>
              <small>CI/CD Pipeline</small>
            </div>
          </div>
          <div className="arch-decisions">
            <div className="arch-decision">
              <span className="arch-decision-label">Why S3 over a web server?</span>
              <span className="arch-decision-val">
                S3 is serverless: no server to patch, reboot, or pay for when idle.
                Hosting cost drops from ~$20 per month on EC2 to ~$0.50 per month.
              </span>
            </div>
            <div className="arch-decision">
              <span className="arch-decision-label">Why CloudFront?</span>
              <span className="arch-decision-val">
                CloudFront caches the site at 400+ edge locations worldwide, so visitors
                in Lagos, London, or Los Angeles all load in under 200ms.
              </span>
            </div>
            <div className="arch-decision">
              <span className="arch-decision-label">Why Origin Access Control?</span>
              <span className="arch-decision-val">
                OAC keeps the S3 bucket completely private. Only CloudFront can read it.
                Even if someone finds the bucket URL, they get Access Denied.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <span className="section-num" aria-hidden="true">02</span>
        <p className="section-label">What I bring</p>
        <h2 className="section-title">SKILLS AND<br/>TOOLS</h2>
        <div className="skills-grid">
          <div className="skill-col">
            <p className="skill-col-title">Design</p>
            {SKILLS_DESIGN.map(s => (
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
            <p className="skill-col-title">Cloud and DevOps</p>
            {SKILLS_CLOUD.map(s => (
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
        <div className="provider-legend">
          {Object.entries(PROVIDER).map(([key, p]) => (
            <span key={key} className="provider-pill"
              style={{background: p.bg, color: p.color, border: `1px solid ${p.border}`}}>
              {p.label}
            </span>
          ))}
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => {
            const prov = PROVIDER[p.provider]
            return (
              <div className="proj-card" key={p.num}>
                <div className="proj-top-row">
                  <div className="proj-num">{p.num}</div>
                  <span className="proj-provider-badge"
                    style={{background: prov.bg, color: prov.color, border: `1px solid ${prov.border}`}}>
                    {prov.label}
                  </span>
                </div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-outcome">{p.outcome}</div>
                <div className="tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-github">
                    View on GitHub
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <span className="section-num" aria-hidden="true">04</span>
        <p className="section-label">Let's connect</p>
        <div className="contact-grid">
          <h2 className="contact-big">LET'S<br/>WORK<br/><span>TOGETHER</span></h2>
          <div className="contact-right">
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
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>2026 Bukola Jimoh · <span className="orange">Cloud and DevOps Engineer</span></p>
        <p>Deployed on <span className="orange">AWS</span> · S3 + CloudFront + GitHub Actions</p>
      </footer>
    </>
  )
}
