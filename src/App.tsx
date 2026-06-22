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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span>auditoria<span className="footer-accent">_vilari</span></span>
        <span>SaludOnline · E26 · Telemedicina</span>
        <span>Evaluación Sumativa N°3 · INACAP 2026</span>
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
