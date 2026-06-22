import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/07_controles_vilari.md?raw'

export default function Controles() {
  return (
    <article className="md-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
