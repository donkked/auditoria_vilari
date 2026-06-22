import { useState } from 'react'
import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/06_matriz_vilari.md?raw'

interface Riesgo {
  id: string
  nombre: string
  probabilidad: number
  impacto: number
  descripcion: string
}

const riesgos: Riesgo[] = [
  { id: 'R-01', nombre: 'Inyección SQL',        probabilidad: 3, impacto: 5, descripcion: 'Expone base de datos completa de pacientes' },
  { id: 'R-02', nombre: 'Iny. de Comandos',     probabilidad: 2, impacto: 5, descripcion: 'Control total del servidor web' },
  { id: 'R-03', nombre: 'XSS Reflejado',        probabilidad: 3, impacto: 3, descripcion: 'Robo de sesiones de médicos y pacientes' },
  { id: 'R-04', nombre: 'Ransomware',            probabilidad: 3, impacto: 5, descripcion: 'Cifrado de toda la infraestructura clínica' },
  { id: 'R-05', nombre: 'Phishing médicos',     probabilidad: 4, impacto: 3, descripcion: 'Robo de credenciales de acceso al sistema' },
  { id: 'R-06', nombre: 'Acceso a recetas',     probabilidad: 3, impacto: 4, descripcion: 'Acceso no autorizado a prescripciones médicas' },
  { id: 'R-07', nombre: 'Filtración financiera', probabilidad: 2, impacto: 4, descripcion: 'Exposición de datos de pago y seguros' },
  { id: 'R-08', nombre: 'Fallo de backup',      probabilidad: 2, impacto: 4, descripcion: 'Imposibilidad de recuperar datos clínicos' },
  { id: 'R-09', nombre: 'Fallo videoconsultas', probabilidad: 3, impacto: 3, descripcion: 'Interrupción de teleconsultas en curso' },
  { id: 'R-10', nombre: 'Insider malicioso',    probabilidad: 2, impacto: 5, descripcion: 'Empleado vende fichas clínicas a terceros' },
]

const labelsProb = ['1 — Rara', '2 — Improbable', '3 — Posible', '4 — Probable', '5 — Casi Seguro']
const labelsImp  = ['1\nInsignificante', '2\nMenor', '3\nModerado', '4\nMayor', '5\nCatastrófico']

function getColor(score: number) {
  if (score >= 15) return { bg: '#fca5a5', border: '#ef4444', label: 'Crítico',  text: '#7f1d1d' }
  if (score >= 10) return { bg: '#fdba74', border: '#f97316', label: 'Alto',     text: '#7c2d12' }
  if (score >= 5)  return { bg: '#fde68a', border: '#eab308', label: 'Medio',    text: '#713f12' }
  return              { bg: '#bbf7d0', border: '#22c55e', label: 'Bajo',      text: '#14532d' }
}

export default function Matriz() {
  const [hovered, setHovered] = useState<Riesgo | null>(null)

  return (
    <>
      <PageHero
        title="Matriz de Riesgo"
        subtitle="Evaluación de probabilidad × impacto para 10 amenazas identificadas en la plataforma SaludOnline"
        icon="📊"
        theme="matrix"
      />
      <div className="content-body">
      <article className="md-content">

      <div className="heatmap-section">
        <h2>Mapa de Calor — Probabilidad × Impacto</h2>
        <p>Pasa el cursor sobre los puntos de riesgo para ver el detalle de cada amenaza identificada para SaludOnline.</p>

        <div className="heatmap-wrapper">
          <div className="heatmap-y-label">PROBABILIDAD ↑</div>

          <div className="heatmap-container">
            <div className="heatmap-grid">
              {[5, 4, 3, 2, 1].map((prob) => (
                <div key={prob} className="heatmap-row">
                  <div className="heatmap-row-label">{labelsProb[prob - 1]}</div>
                  {[1, 2, 3, 4, 5].map((imp) => {
                    const score = prob * imp
                    const { bg, border } = getColor(score)
                    const here = riesgos.filter(r => r.probabilidad === prob && r.impacto === imp)
                    return (
                      <div
                        key={imp}
                        className="heatmap-cell"
                        style={{ background: bg, borderColor: border }}
                      >
                        <span className="cell-score">{score}</span>
                        {here.map((r) => (
                          <button
                            key={r.id}
                            className="risk-dot"
                            onMouseEnter={() => setHovered(r)}
                            onMouseLeave={() => setHovered(null)}
                            aria-label={`${r.id}: ${r.nombre}`}
                          >
                            {r.id.replace('R-0', '').replace('R-', '')}
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="heatmap-x-axis">
              <div className="heatmap-corner" />
              {labelsImp.map((label) => (
                <div key={label} className="heatmap-x-label">
                  {label.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
                </div>
              ))}
            </div>
            <div className="heatmap-x-title">IMPACTO →</div>
          </div>
        </div>

        {hovered ? (
          <div className="risk-tooltip">
            <span className="risk-tooltip-id">{hovered.id}</span>
            <span className="risk-tooltip-name">{hovered.nombre}</span>
            <span className="risk-tooltip-score">
              P: <strong>{hovered.probabilidad}</strong> × I: <strong>{hovered.impacto}</strong>
              {' = '}
              <strong style={{ color: hovered.probabilidad * hovered.impacto >= 15 ? '#f87171' : hovered.probabilidad * hovered.impacto >= 10 ? '#fb923c' : '#facc15' }}>
                {hovered.probabilidad * hovered.impacto} — {getColor(hovered.probabilidad * hovered.impacto).label}
              </strong>
            </span>
            <span className="risk-tooltip-desc">{hovered.descripcion}</span>
          </div>
        ) : (
          <div className="risk-tooltip-placeholder">
            Pasa el cursor sobre un punto para ver el detalle del riesgo
          </div>
        )}

        <div className="heatmap-legend">
          {[
            { score: 1,  label: 'Bajo (1–4)' },
            { score: 6,  label: 'Medio (5–9)' },
            { score: 10, label: 'Alto (10–14)' },
            { score: 15, label: 'Crítico (15–25)' },
          ].map(({ score, label }) => {
            const { bg, border } = getColor(score)
            return (
              <div key={label} className="legend-item">
                <span style={{ background: bg, border: `2px solid ${border}` }} />
                {label}
              </div>
            )
          })}
        </div>
      </div>

      <MarkdownRenderer content={content} />
    </article>
    </div>
    </>
  )
}
