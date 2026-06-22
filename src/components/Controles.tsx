import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/07_controles_vilari.md?raw'

export default function Controles() {
  return (
    <>
      <PageHero
        title="Políticas y Controles"
        subtitle="ISO/IEC 27001:2022 · NIST CSF 2.0 · Ley 19.628 · Ley 20.584 — Marco normativo aplicado a SaludOnline"
        icon="🛡️"
        theme="policy"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
