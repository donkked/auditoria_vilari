import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/05_activos_vilari.md?raw'

export default function Activos() {
  return (
    <article className="md-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
