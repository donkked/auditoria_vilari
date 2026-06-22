import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/03_xss_vilari.md?raw'

export default function XSS() {
  return (
    <article className="md-content">
      <div className="severity-banner medium">
        <span className="severity-icon">🟡</span>
        <div className="severity-info">
          <div className="severity-title">Severidad — XSS Reflejado</div>
          <div>
            <span className="severity-score">6.1</span>
            <span className="severity-label">MEDIA</span>
          </div>
        </div>
        <code className="severity-vector">CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</code>
      </div>
      <MarkdownRenderer content={content} />
    </article>
  )
}
