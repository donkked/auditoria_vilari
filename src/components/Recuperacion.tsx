import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/08_recuperacion_vilari.md?raw'

export default function Recuperacion() {
  return (
    <article className="md-content">
      <MarkdownRenderer content={content} />
    </article>
  )
}
