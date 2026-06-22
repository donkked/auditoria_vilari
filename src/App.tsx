import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
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

const navItems = [
  {
    group: 'Informe A — Vulnerabilidades',
    links: [
      { to: '/', label: '01 — Resumen Ejecutivo' },
      { to: '/sqli', label: '02 — Inyección SQL' },
      { to: '/xss', label: '03 — XSS Reflejado' },
      { to: '/comandos', label: '04 — Iny. Comandos' },
    ],
  },
  {
    group: 'Informe B — Matriz de Riesgo',
    links: [
      { to: '/activos', label: '05 — Activos e Industria' },
      { to: '/matriz', label: '06 — Matriz de Riesgo' },
      { to: '/controles', label: '07 — Políticas y Controles' },
      { to: '/recuperacion', label: '08 — Plan de Recuperación' },
    ],
  },
  {
    group: 'Transversal',
    links: [{ to: '/prompts', label: '09 — Uso de IA' }],
  },
]

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🔐</div>
        <h2>Auditoría de Seguridad</h2>
        <p className="sidebar-empresa">SaludOnline — E26</p>
        <p className="sidebar-sub">Telemedicina · INACAP 2026</p>
      </div>
      {navItems.map((section) => (
        <div key={section.group} className="nav-group">
          <span className="nav-group-label">{section.group}</span>
          {section.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Resumen />} />
            <Route path="/sqli" element={<InyeccionSQL />} />
            <Route path="/xss" element={<XSS />} />
            <Route path="/comandos" element={<Comandos />} />
            <Route path="/activos" element={<Activos />} />
            <Route path="/matriz" element={<Matriz />} />
            <Route path="/controles" element={<Controles />} />
            <Route path="/recuperacion" element={<Recuperacion />} />
            <Route path="/prompts" element={<Prompts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
