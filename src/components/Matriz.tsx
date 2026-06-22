import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/06_matriz_vilari.md?raw'

interface Riesgo {
  id: string
  nombre: string
  probabilidad: number
  impacto: number
  descripcion: string
}

const riesgos: Riesgo[] = [
  { id: 'R-01', nombre: 'Inyección SQL', probabilidad: 3, impacto: 5, descripcion: 'Expone base de datos completa de pacientes' },
  { id: 'R-02', nombre: 'Inyección de Comandos', probabilidad: 2, impacto: 5, descripcion: 'Control total del servidor web' },
  { id: 'R-03', nombre: 'XSS Reflejado', probabilidad: 3, impacto: 3, descripcion: 'Robo de sesiones de médicos y pacientes' },
  { id: 'R-04', nombre: 'Ransomware', probabilidad: 3, impacto: 5, descripcion: 'Cifrado de toda la infraestructura clínica' },
  { id: 'R-05', nombre: 'Phishing a médicos', probabilidad: 4, impacto: 3, descripcion: 'Robo de credenciales de acceso al sistema' },
  { id: 'R-06', nombre: 'Acceso a recetas', probabilidad: 3, impacto: 4, descripcion: 'Acceso no autorizado a prescripciones médicas' },
  { id: 'R-07', nombre: 'Filtración financiera', probabilidad: 2, impacto: 4, descripcion: 'Exposición de datos de pago y seguros' },
  { id: 'R-08', nombre: 'Fallo de backup', probabilidad: 2, impacto: 4, descripcion: 'Imposibilidad de recuperar datos clínicos' },
  { id: 'R-09', nombre: 'Fallo videoconsultas', probabilidad: 3, impacto: 3, descripcion: 'Interrupción de teleconsultas en curso' },
  { id: 'R-10', nombre: 'Insider malicioso', probabilidad: 2, impacto: 5, descripcion: 'Empleado vende fichas clínicas a terceros' },
]

const etiquetasProbabilidad = ['1 — Rara', '2 — Improbable', '3 — Posible', '4 — Probable', '5 — Casi Seguro']
const etiquetasImpacto = ['1 — Insignificante', '2 — Menor', '3 — Moderado', '4 — Mayor', '5 — Catastrófico']

function getColor(score: number): string {
  if (score >= 15) return '#dc3545'
  if (score >= 10) return '#fd7e14'
  if (score >= 5) return '#ffc107'
  return '#28a745'
}

function getNivelLabel(score: number): string {
  if (score >= 15) return 'Crítico'
  if (score >= 10) return 'Alto'
  if (score >= 5) return 'Medio'
  return 'Bajo'
}

export default function Matriz() {
  const [tooltip, setTooltip] = useState<Riesgo | null>(null)

  return (
    <article className="md-content">
      <h1>Matriz de Riesgo — SaludOnline</h1>

      <section className="heatmap-section">
        <h2>Mapa de Calor Interactivo (Probabilidad × Impacto)</h2>
        <p>Pasa el cursor sobre los puntos de riesgo para ver el detalle de cada amenaza identificada.</p>

        <div className="heatmap-wrapper">
          <div className="heatmap-y-label">PROBABILIDAD →</div>

          <div className="heatmap-container">
            <div className="heatmap-grid">
              {/* Filas: probabilidad de 5 (arriba) a 1 (abajo) */}
              {[5, 4, 3, 2, 1].map((prob) => (
                <div key={prob} className="heatmap-row">
                  <div className="heatmap-row-label">{etiquetasProbabilidad[prob - 1]}</div>
                  {/* Columnas: impacto de 1 (izq) a 5 (der) */}
                  {[1, 2, 3, 4, 5].map((imp) => {
                    const score = prob * imp
                    const bg = getColor(score)
                    const risksHere = riesgos.filter(r => r.probabilidad === prob && r.impacto === imp)
                    return (
                      <div
                        key={imp}
                        className="heatmap-cell"
                        style={{ backgroundColor: bg }}
                      >
                        <span className="cell-score">{score}</span>
                        {risksHere.map((r) => (
                          <button
                            key={r.id}
                            className="risk-dot"
                            onMouseEnter={() => setTooltip(r)}
                            onMouseLeave={() => setTooltip(null)}
                            aria-label={`${r.id}: ${r.nombre}`}
                          >
                            {r.id.replace('R-', '')}
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Etiquetas eje X */}
            <div className="heatmap-x-axis">
              <div className="heatmap-corner" />
              {etiquetasImpacto.map((label) => (
                <div key={label} className="heatmap-x-label">{label}</div>
              ))}
            </div>
            <div className="heatmap-x-title">IMPACTO →</div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div className="risk-tooltip">
            <strong>{tooltip.id} — {tooltip.nombre}</strong>
            <span>P: {tooltip.probabilidad} × I: {tooltip.impacto} = <strong>{tooltip.probabilidad * tooltip.impacto}</strong> ({getNivelLabel(tooltip.probabilidad * tooltip.impacto)})</span>
            <span>{tooltip.descripcion}</span>
          </div>
        )}

        {/* Leyenda */}
        <div className="heatmap-legend">
          <div className="legend-item"><span style={{ background: '#28a745' }} />Bajo (1–4)</div>
          <div className="legend-item"><span style={{ background: '#ffc107' }} />Medio (5–9)</div>
          <div className="legend-item"><span style={{ background: '#fd7e14' }} />Alto (10–14)</div>
          <div className="legend-item"><span style={{ background: '#dc3545' }} />Crítico (15–25)</div>
        </div>
      </section>

      <section className="md-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </section>
    </article>
  )
}
