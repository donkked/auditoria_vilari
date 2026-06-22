import { Link } from 'react-router-dom'

interface SectionBtn {
  to: string
  num: string
  title: string
  icon: string
  badge?: { text: string; cls: string }
}

const sections: SectionBtn[] = [
  { to: '/resumen',      num: '01', title: 'Resumen Ejecutivo',    icon: '🩺' },
  { to: '/sqli',         num: '02', title: 'Inyección SQL',        icon: '🗄️', badge: { text: '10.0', cls: 'critical' } },
  { to: '/xss',          num: '03', title: 'XSS Reflejado',        icon: '🔗', badge: { text: '6.1',  cls: 'medium' } },
  { to: '/comandos',     num: '04', title: 'Iny. de Comandos',     icon: '💻', badge: { text: '10.0', cls: 'critical' } },
  { to: '/activos',      num: '05', title: 'Activos e Industria',  icon: '🏢' },
  { to: '/matriz',       num: '06', title: 'Matriz de Riesgo',     icon: '📊' },
  { to: '/controles',    num: '07', title: 'Políticas y Controles', icon: '🛡️' },
  { to: '/recuperacion', num: '08', title: 'Plan de Recuperación', icon: '🔄' },
  { to: '/prompts',      num: '09', title: 'Uso de IA',            icon: '🤖' },
]

export default function Home() {
  return (
    <section className="home">
      <div className="home-bg" />
      <div className="home-glow" />
      <div className="home-scanline" />
      <div className="home-content">
        <span className="home-eyebrow anim" style={{ animationDelay: '0s' }}>
          <span className="home-eyebrow-dot" /> EVALUACIÓN SUMATIVA N°3 · INACAP 2026
        </span>
        <h1 className="home-title anim" style={{ animationDelay: '0.08s' }}>
          Auditoría de Seguridad<br />
          <span className="home-title-accent">SaludOnline</span>
        </h1>
        <p className="home-lead anim" style={{ animationDelay: '0.16s' }}>
          Plataforma de telemedicina · Análisis de vulnerabilidades, evaluación de
          riesgos y controles bajo estándares internacionales.
        </p>

        <nav className="home-buttons" aria-label="Secciones del informe">
          {sections.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="home-btn anim"
              style={{ animationDelay: `${0.24 + i * 0.05}s` }}
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
          ))}
        </nav>

        <div className="home-meta anim" style={{ animationDelay: '0.8s' }}>
          <span><span className="home-meta-dot" /> EMPRESA E26 · TELEMEDICINA</span>
          <span className="home-meta-sep" />
          <span>DVWA · SEGURIDAD LOW</span>
          <span className="home-meta-sep" />
          <span>sufijo · vilari</span>
        </div>
      </div>
    </section>
  )
}
