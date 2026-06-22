import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'
import Activos from './components/Activos'
import Matriz from './components/Matriz'
import Controles from './components/Controles'
import Recuperacion from './components/Recuperacion'
import Prompts from './components/Prompts'
import './App.css'

const navSections = [
  {
    group: 'Informe A — Vulnerabilidades',
    icon: '🔍',
    links: [
      { to: '/',          label: 'Resumen Ejecutivo',    num: '01', badge: null },
      { to: '/sqli',      label: 'Inyección SQL',        num: '02', badge: { text: '10.0', cls: 'critical' } },
      { to: '/xss',       label: 'XSS Reflejado',        num: '03', badge: { text: '6.1',  cls: 'medium'   } },
      { to: '/comandos',  label: 'Iny. de Comandos',     num: '04', badge: { text: '10.0', cls: 'critical' } },
    ],
  },
  {
    group: 'Informe B — Matriz de Riesgo',
    icon: '📊',
    links: [
      { to: '/activos',      label: 'Activos e Industria', num: '05', badge: null },
      { to: '/matriz',       label: 'Matriz de Riesgo',    num: '06', badge: null },
      { to: '/controles',    label: 'Políticas y Controles',num: '07', badge: null },
      { to: '/recuperacion', label: 'Plan de Recuperación', num: '08', badge: null },
    ],
  },
  {
    group: 'Transversal',
    icon: '🤖',
    links: [
      { to: '/prompts', label: 'Uso de IA', num: '09', badge: null },
    ],
  },
]

const routeTitles: Record<string, string> = {
  '/':           '01 — Resumen Ejecutivo',
  '/sqli':       '02 — Inyección SQL',
  '/xss':        '03 — XSS Reflejado',
  '/comandos':   '04 — Inyección de Comandos',
  '/activos':    '05 — Activos e Industria',
  '/matriz':     '06 — Matriz de Riesgo',
  '/controles':  '07 — Políticas y Controles',
  '/recuperacion': '08 — Plan de Recuperación',
  '/prompts':    '09 — Uso de IA',
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3L4 8v8c0 7.18 5.17 13.9 12 15.5C23.83 29.9 28 23.18 28 16V8L16 3z"
        fill="url(#sg)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <path d="M12 16.5l2.8 2.8 5.2-5.3" stroke="#fff" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="sg" x1="4" y1="3" x2="28" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6"/>
          <stop offset="1" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <nav className={`sidebar${open ? ' sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <ShieldIcon />
            <div>
              <div className="sidebar-title">Auditoría Web</div>
              <div className="sidebar-empresa">SaludOnline · E26</div>
            </div>
          </div>
          <div className="sidebar-meta">
            <span className="sidebar-tag">Telemedicina</span>
            <span className="sidebar-tag">INACAP 2026</span>
          </div>
          <div className="sidebar-dvwa">
            <span className="dvwa-dot" />
            DVWA · Seguridad Low
          </div>
        </div>

        {navSections.map((section) => (
          <div key={section.group} className="nav-group">
            <span className="nav-group-label">
              <span>{section.icon}</span> {section.group}
            </span>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                onClick={onClose}
              >
                <span className="nav-num">{link.num}</span>
                <span className="nav-label">{link.label}</span>
                {link.badge && (
                  <span className={`nav-badge ${link.badge.cls}`}>{link.badge.text}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}

        <div className="sidebar-footer">
          <span>sufijo: <code>vilari</code></span>
        </div>
      </nav>
    </>
  )
}

function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation()
  const title = routeTitles[pathname] ?? 'Auditoría'

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Menú">
        <span /><span /><span />
      </button>
      <div className="topbar-breadcrumb">
        <span className="topbar-root">auditoria_vilari</span>
        <span className="topbar-sep">›</span>
        <span className="topbar-page">{title}</span>
      </div>
    </header>
  )
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-right">
        <Topbar onMenuClick={() => setSidebarOpen(v => !v)} />
        <main className="main-content">
          <Routes>
            <Route path="/"            element={<Resumen />} />
            <Route path="/sqli"        element={<InyeccionSQL />} />
            <Route path="/xss"         element={<XSS />} />
            <Route path="/comandos"    element={<Comandos />} />
            <Route path="/activos"     element={<Activos />} />
            <Route path="/matriz"      element={<Matriz />} />
            <Route path="/controles"   element={<Controles />} />
            <Route path="/recuperacion" element={<Recuperacion />} />
            <Route path="/prompts"     element={<Prompts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
