import { Link } from 'react-router-dom'
import NetworkBackground from './NetworkBackground'

interface SectionBtn {
  to: string
  num: string
  title: string
  icon: string
  badge?: { text: string; cls: string }
}

interface Group {
  label: string
  tag?: string
  single?: boolean
  items: SectionBtn[]
}

const groups: Group[] = [
  {
    label: 'Informe A · Análisis de Vulnerabilidades',
    tag: '30%',
    items: [
      { to: '/resumen',  num: '01', title: 'Resumen Ejecutivo', icon: '🩺' },
      { to: '/sqli',     num: '02', title: 'Inyección SQL',      icon: '🗄️', badge: { text: '10.0', cls: 'critical' } },
      { to: '/xss',      num: '03', title: 'XSS Reflejado',      icon: '🔗', badge: { text: '6.1',  cls: 'medium' } },
      { to: '/comandos', num: '04', title: 'Inyección de Comandos', icon: '💻', badge: { text: '10.0', cls: 'critical' } },
    ],
  },
  {
    label: 'Informe B · Matriz de Riesgo',
    tag: '30%',
    items: [
      { to: '/activos',      num: '05', title: 'Activos e Industria',   icon: '🏢' },
      { to: '/matriz',       num: '06', title: 'Matriz de Riesgo',      icon: '📊' },
      { to: '/controles',    num: '07', title: 'Políticas y Controles', icon: '🛡️' },
      { to: '/recuperacion', num: '08', title: 'Plan de Recuperación',  icon: '🔄' },
    ],
  },
  {
    label: 'Transversal',
    single: true,
    items: [
      { to: '/prompts', num: '09', title: 'Bitácora de Uso de IA', icon: '🤖' },
    ],
  },
]

function scrollToSections() {
  document.getElementById('secciones')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  let idx = 0
  return (
    <div className="home">
      {/* ── HERO (pantalla completa, solo título) ── */}
      <section className="home-hero">
        <div className="home-bg" />
        <NetworkBackground />
        <div className="home-grid-overlay" />
        <div className="home-glow" />
        <div className="home-glow home-glow-2" />
        <div className="home-scanline" />
        <span className="home-particle p1" />
        <span className="home-particle p2" />
        <span className="home-particle p3" />
        <span className="home-particle p4" />

        <div className="home-hero-inner">
          <span className="home-eyebrow anim" style={{ animationDelay: '0s' }}>
            <span className="home-eyebrow-dot" /> EVALUACIÓN SUMATIVA N°3 · INACAP 2026
          </span>
          <h1 className="home-title anim" style={{ animationDelay: '0.1s' }}>
            Auditoría de Seguridad<br />
            <span className="home-title-accent">SaludOnline</span>
          </h1>
          <p className="home-lead anim" style={{ animationDelay: '0.2s' }}>
            Plataforma de telemedicina · Análisis de vulnerabilidades, evaluación de
            riesgos y controles bajo estándares internacionales.
          </p>

          <div className="home-meta anim" style={{ animationDelay: '0.3s' }}>
            <span><span className="home-meta-dot" /> EMPRESA E26 · TELEMEDICINA</span>
            <span className="home-meta-sep" />
            <span>DVWA · SEGURIDAD LOW</span>
            <span className="home-meta-sep" />
            <span>SUFIJO · VILARI</span>
          </div>
        </div>

        <button
          className="home-scroll anim"
          style={{ animationDelay: '0.5s' }}
          onClick={scrollToSections}
          aria-label="Ver secciones del informe"
        >
          <span>Explorar el informe</span>
          <span className="home-scroll-chevron" aria-hidden="true">⌄</span>
        </button>
      </section>

      {/* ── SECCIONES (organizadas, debajo) ── */}
      <section className="home-sections" id="secciones">
        <div className="home-sections-inner">
          <header className="home-sections-head">
            <span className="home-sections-kicker">CONTENIDO DEL INFORME</span>
            <h2 className="home-sections-title">9 secciones de la auditoría</h2>
          </header>

          <div className="home-groups">
            {groups.map((g, gi) => (
              <div
                className={`home-group${g.single ? ' home-group-single' : ''}`}
                key={g.label}
              >
                <div className="home-group-head" style={{ animationDelay: `${gi * 0.06}s` }}>
                  <span className="home-group-label">{g.label}</span>
                  {g.tag && <span className="home-group-tag">{g.tag}</span>}
                </div>
                <nav className="home-buttons" aria-label={g.label}>
                  {g.items.map((s) => {
                    const delay = idx++ * 0.04
                    return (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="home-btn"
                        style={{ animationDelay: `${delay}s` }}
                      >
                        <span className="home-btn-icon">{s.icon}</span>
                        <span className="home-btn-text">
                          <span className="home-btn-num">{s.num}</span>
                          <span className="home-btn-title">{s.title}</span>
                        </span>
                        {s.badge && (
                          <span className={`home-btn-badge ${s.badge.cls}`}>{s.badge.text}</span>
                        )}
                        <span className="home-btn-arrow" aria-hidden="true">→</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
