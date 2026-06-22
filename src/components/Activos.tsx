import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/05_activos_vilari.md?raw'

export default function Activos() {
  return (
    <>
      <PageHero
        title="Activos e Industria"
        subtitle="Inventario de activos críticos de SaludOnline y contexto regulatorio del sector telemedicina en Chile"
        icon="🏢"
        theme="assets"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
