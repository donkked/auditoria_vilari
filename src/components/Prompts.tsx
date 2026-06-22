import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '../../docs_vilari/09_prompts_vilari.md?raw'

export default function Prompts() {
  return (
    <article className="md-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
