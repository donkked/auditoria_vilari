import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/09_prompts_vilari.md?raw'

export default function Prompts() {
  return (
    <article className="md-content">
      <MarkdownRenderer content={content} />
    </article>
  )
}
