import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/01_resumen_vilari.md?raw'

export default function Resumen() {
  return (
    <article className="md-content">
      <MarkdownRenderer content={content} />
    </article>
  )
}
