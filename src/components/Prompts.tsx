import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/09_prompts_vilari.md?raw'

export default function Prompts() {
  return (
    <>
      <PageHero
        title="Uso de IA"
        subtitle="Registro de prompts utilizados con Claude para desarrollar y fundamentar esta auditoría de seguridad"
        icon="🤖"
        theme="ai"
      />
      <article className="md-content">
        <MarkdownRenderer content={content} />
      </article>
    </>
  )
}
