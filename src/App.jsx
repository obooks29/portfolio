import { useEffect, useRef } from 'react'

const SKILLS_DESIGN = [
  { name: 'Figma / Prototyping', pct: 92 },
  { name: 'User Research', pct: 85 },
  { name: 'Design Systems', pct: 88 },
  { name: 'Wireframing', pct: 90 },
  { name: 'React / Vite', pct: 70 },
  { name: 'HTML & CSS', pct: 78 },
]

const SKILLS_CLOUD = [
  { name: 'AWS Core Services', pct: 75 },
  { name: 'S3 + CloudFront', pct: 80 },
  { name: 'Lambda + API Gateway', pct: 72 },
  { name: 'Terraform (IaC)', pct: 65 },
  { name: 'Docker + ECS', pct: 68 },
  { name: 'CI/CD Pipelines', pct: 74 },
]

const PROJECTS = [
  {
    num: '01',
    title: 'Static Site on AWS',
    desc: 'Portfolio site deployed to S3 + CloudFront with automated CI/CD via GitHub Actions. HTTPS, CDN, zero servers.',
    tags: ['S3', 'CloudFront', 'Route53', 'GitHub Actions'],
  },
  {
    num: '02',
    title: 'Serverless API',
    desc: 'Contact form backed by API Gateway → Lambda → SES. Fully serverless, scales to zero, costs pennies.',
    tags: ['Lambda', 'API Gateway', 'SES', 'IAM'],
  },
  {
    num: '03',
    title: 'Infrastructure as Code',
    desc: 'Entire AWS stack defined in Terraform. One command to provision or destroy all environments.',
    tags: ['Terraform', 'S3 Backend', 'HCL', 'IaC'],
  },
  {
    num: '04',
    title: 'Monitoring Dashboard',
    desc: 'CloudWatch dashboard tracking CPU, memory, errors. Alarms that fire SNS alerts within 90 seconds of breach.',
    tags: ['CloudWatch', 'SNS', 'EC2', 'Alarms'],
  },
  {
    num: '05',
    title: 'Docker + ECS Deploy',
    desc: 'React app containerised with Docker, pushed to ECR, deployed on ECS Fargate behind a load balancer.',
    tags: ['Docker', 'ECR', 'ECS Fargate', 'ALB'],
  },
  {
    num: '06',
    title: 'Multi-Env Pipeline',
    desc: 'Dev → Staging → Prod pipeline with Terraform workspaces, manual approval gates and branch protection.',
    tags: ['GitHub Actions', 'Terraform', 'DevOps', 'CI/CD'],
  },
]

export default function App() {
  const barsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.bar-fill')
            fills.forEach((f) => {
              f.style.width = f.dataset.pct + '%'
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    const skillsSection = document.getElementById('skills')
    if (skillsSection) observer.observe(skillsSection)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">PORT<span>.</span>FOLIO</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-text" aria-hidden="true">DESIGN<br/>CLOUD</div>
        <div className="hero-content">
          <p className="hero-eyebrow">UI/UX Designer × Cloud Engineer</p>
          <h1 className="hero-name">
            Bukola<br/>
            <span className="accent">Ayodele</span><br/>
            Jimoh
          </h1>
          <p className="hero-tagline">
            I design products people love - and build the cloud infrastructure that keeps them running.
            Currently transitioning from design to DevOps engineering.
          </p>
          <div className="hero-cta-row">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-ghost">Get in touch →</a>
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
              I'm a <strong>UI/UX designer</strong> with a passion for building things end-to-end.
              After years of designing digital products, I realised I wanted to understand - and own -
              the full stack: from the pixels users see to the infrastructure powering it all.
            </p>
            <p>
              That's why I'm transitioning into <strong>Cloud & DevOps Engineering</strong>.
              I'm working through AWS certifications and building real projects on AWS —
              the kind of hands-on experience that turns concepts into skills.
            </p>
            <p>
              My design background isn't a detour. It means I think about systems holistically,
              communicate clearly with product teams, and actually care about the developer experience
              of the infrastructure I build.
            </p>
            <div className="badge">
              <span className="dot" />
              Open to Cloud / DevOps roles
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-num">5+</div>
              <div className="stat-label">Years in UI/UX Design</div>
            </div>
            <div className="stat">
              <div className="stat-num">6</div>
              <div className="stat-label">AWS Projects Completed</div>
            </div>
            <div className="stat">
              <div className="stat-num">CLF</div>
              <div className="stat-label">AWS Cloud Practitioner</div>
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
            <p className="skill-col-title">— Design</p>
            {SKILLS_DESIGN.map((s) => (
              <div className="skill-row" key={s.name}>
                <span className="skill-name">{s.name}</span>
                <div className="bar">
                  <div className="bar-fill" data-pct={s.pct} style={{ width: 0, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="skill-col">
            <p className="skill-col-title">— Cloud / DevOps</p>
            {SKILLS_CLOUD.map((s) => (
              <div className="skill-row" key={s.name}>
                <span className="skill-name">{s.name}</span>
                <div className="bar">
                  <div className="bar-fill" data-pct={s.pct} style={{ width: 0, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
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
              <div className="tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
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
            <a href="mailto:your@email.com" className="clink">
              <span className="clink-type">Email</span>
              <span className="clink-val">bukolaayodelejimoh@gmail.com</span>
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="clink">
              <span className="clink-type">GitHub</span>
              <span className="clink-val">github.com/obooks29</span>
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="clink">
              <span className="clink-type">LinkedIn</span>
              <span className="clink-val">linkedin.com/in/bukolaayodelejimoh</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Bukola Ayodele Jimoh. Built on <span className="orange">AWS</span> · S3 + CloudFront</p>
        <p>Designed &amp; Deployed by me.</p>
      </footer>
    </>
  )
}
