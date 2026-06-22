import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/04_comandos_vilari.md?raw'

export default function Comandos() {
  return (
    <article className="md-content">
      <div className="severity-badge critical">CVSS 10.0 — CRÍTICA</div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
