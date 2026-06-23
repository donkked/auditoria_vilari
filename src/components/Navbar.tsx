import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3L4 8v8c0 7.18 5.17 13.9 12 15.5C23.83 29.9 28 23.18 28 16V8L16 3z"
        fill="url(#nsg)" stroke="rgba(34,211,238,0.3)" strokeWidth="1"/>
      <path d="M12 16.5l2.8 2.8 5.2-5.3" stroke="#04070e" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="nsg" x1="4" y1="3" x2="28" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee"/>
          <stop offset="1" stopColor="#0e7490"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

const navLinks = [
  { to: '/sqli', label: 'Vulnerabilidades' },
  { to: '/matriz', label: 'Matriz de Riesgo' },
  { to: '/controles', label: 'Controles' },
  { to: '/prompts', label: 'Uso de IA' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <header className={`navbar${onHome ? ' navbar-home' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-brand-badge">
            <ShieldIcon />
          </span>
          <span className="navbar-brand-text">
            <span className="navbar-logo">
              auditoria<span className="navbar-logo-accent">_vilari</span>
            </span>
            <span className="navbar-tagline">Auditoría de Seguridad Web</span>
          </span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setOpen(v => !v)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <nav className={`navbar-links${open ? ' open' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/resumen" className="navbar-cta" onClick={() => setOpen(false)}>
            Resumen ejecutivo
          </Link>
        </nav>
      </div>
    </header>
  )
}
