import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/07_controles_vilari.md?raw'

export default function Controles() {
  return (
    <article className="md-content">
      <MarkdownRenderer content={content} />
    </article>
  )
}
