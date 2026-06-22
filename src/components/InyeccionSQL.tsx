import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/02_sqli_vilari.md?raw'

export default function InyeccionSQL() {
  return (
    <article className="md-content">
      <div className="severity-banner critical">
        <span className="severity-icon">🔴</span>
        <div className="severity-info">
          <div className="severity-title">Severidad — Inyección SQL</div>
          <div>
            <span className="severity-score">10.0</span>
            <span className="severity-label">CRÍTICA</span>
          </div>
        </div>
        <code className="severity-vector">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H</code>
      </div>
      <MarkdownRenderer content={content} />
    </article>
  )
}
