import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/05_activos_vilari.md?raw'

export default function Activos() {
  return (
    <article className="md-content">
      <MarkdownRenderer content={content} />
    </article>
  )
}
