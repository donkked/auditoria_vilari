import { Link } from 'react-router-dom'

interface CardLink {
  to: string
  num: string
  title: string
  desc: string
  icon: string
  badge?: { text: string; cls: string }
}

interface CardGroup {
  group: string
  tag: string
  links: CardLink[]
}

const groups: CardGroup[] = [
  {
    group: 'Informe A — Vulnerabilidades',
    tag: 'DVWA · Seguridad Low',
    links: [
      { to: '/sqli', num: '02', title: 'Inyección SQL', icon: '🗄️', desc: 'Exposición completa de la base de datos de pacientes con \' OR \'1\'=\'1.', badge: { text: '10.0', cls: 'critical' } },
      { to: '/xss', num: '03', title: 'XSS Reflejado', icon: '🔗', desc: 'Robo de sesiones de médicos y pacientes vía script inyectado.', badge: { text: '6.1', cls: 'medium' } },
      { to: '/comandos', num: '04', title: 'Inyección de Comandos', icon: '💻', desc: 'Control total del servidor web ejecutando comandos del sistema.', badge: { text: '10.0', cls: 'critical' } },
    ],
  },
  {
    group: 'Informe B — Gestión de Riesgo',
    tag: 'ISO 27001 · NIST CSF',
    links: [
      { to: '/activos', num: '05', title: 'Activos e Industria', icon: '🏢', desc: 'Inventario de activos críticos y contexto del sector telemedicina.' },
      { to: '/matriz', num: '06', title: 'Matriz de Riesgo', icon: '📊', desc: 'Mapa de calor probabilidad × impacto de 10 amenazas.' },
      { to: '/controles', num: '07', title: 'Políticas y Controles', icon: '🛡️', desc: 'Marco normativo: ISO 27001, NIST, Ley 19.628 y 20.584.' },
      { to: '/recuperacion', num: '08', title: 'Plan de Recuperación', icon: '🔄', desc: 'Respuesta ante incidentes y restauración de servicios clínicos.' },
    ],
  },
  {
    group: 'Transversal',
    tag: 'Metodología',
    links: [
      { to: '/prompts', num: '09', title: 'Uso de IA', icon: '🤖', desc: 'Registro de prompts utilizados para fundamentar la auditoría.' },
    ],
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-glow" />
        <div className="home-hero-glow-2" />
        <div className="home-hero-grid" />
        <div className="home-hero-content">
          <span className="home-eyebrow">
            <span className="home-eyebrow-line" /> EVALUACIÓN SUMATIVA N°3 · INACAP
          </span>
          <h1 className="home-title">SaludOnline</h1>
          <p className="home-lead">
            <span className="home-lead-line" />
            Auditoría de seguridad web sobre una plataforma de telemedicina.
          </p>
          <p className="home-desc">
            Análisis de vulnerabilidades reales explotadas en DVWA, evaluación de
            riesgos con matriz de calor y propuesta de controles bajo estándares
            internacionales y normativa chilena.
          </p>
          <div className="home-actions">
            <Link to="/sqli" className="btn btn-primary">
              Ver vulnerabilidades <span aria-hidden="true">→</span>
            </Link>
            <Link to="/resumen" className="btn btn-ghost">
              Resumen ejecutivo
            </Link>
          </div>
        </div>
        <div className="home-hero-meta">
          <span>🩺 TELEMEDICINA · EMPRESA E26</span>
          <span>DVWA · SEGURIDAD LOW</span>
        </div>
      </section>

      <section className="home-sections" id="secciones">
        <div className="home-sections-head">
          <h2>Contenido de la auditoría</h2>
          <p>Explora cada sección del informe técnico.</p>
        </div>

        {groups.map(group => (
          <div key={group.group} className="card-group">
            <div className="card-group-head">
              <h3>{group.group}</h3>
              <span className="card-group-tag">{group.tag}</span>
            </div>
            <div className="card-grid">
              {group.links.map(link => (
                <Link key={link.to} to={link.to} className="section-card">
                  <div className="section-card-top">
                    <span className="section-card-icon">{link.icon}</span>
                    {link.badge && (
                      <span className={`section-card-badge ${link.badge.cls}`}>
                        CVSS {link.badge.text}
                      </span>
                    )}
                  </div>
                  <span className="section-card-num">{link.num}</span>
                  <h4 className="section-card-title">{link.title}</h4>
                  <p className="section-card-desc">{link.desc}</p>
                  <span className="section-card-arrow">
                    Entrar <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
