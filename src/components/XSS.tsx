import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/03_xss_vilari.md?raw'

export default function XSS() {
  return (
    <article className="md-content">
      <div className="severity-badge medium">CVSS 6.1 — MEDIA</div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
