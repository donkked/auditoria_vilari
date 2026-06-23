import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Home from './components/Home'
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

const GITHUB_URL = 'https://github.com/donkked/auditoria_vilari'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="footer-col">
          <h4>Institución</h4>
          <span>INACAP Valparaíso</span>
          <span>TI3034 — Fundamentos de Seguridad de la Información</span>
          <span>Docente: Rubén Schnettler</span>
        </div>

        <div className="footer-col">
          <h4>Caso de Estudio</h4>
          <span>SaludOnline · Telemedicina (E26)</span>
          <span>Auditoría de seguridad web sobre DVWA</span>
          <span>SQL Injection · XSS · Command Injection</span>
        </div>

        <div className="footer-col footer-col-right">
          <h4>Autor</h4>
          <span>Ariel Villarroel</span>
          <span>Auditor de seguridad</span>
          <a
            className="footer-github"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
            </svg>
            Ver repositorio en GitHub
          </a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 · Evaluación Sumativa N°3 · Uso de IA documentado</span>
        <span>
          auditoria<span className="footer-accent">_vilari</span> · Auditoría de Seguridad Web
        </span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/resumen"      element={<Resumen />} />
          <Route path="/sqli"         element={<InyeccionSQL />} />
          <Route path="/xss"          element={<XSS />} />
          <Route path="/comandos"     element={<Comandos />} />
          <Route path="/activos"      element={<Activos />} />
          <Route path="/matriz"       element={<Matriz />} />
          <Route path="/controles"    element={<Controles />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/prompts"      element={<Prompts />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
