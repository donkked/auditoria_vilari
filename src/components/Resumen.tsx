import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/01_resumen_vilari.md?raw'

export default function Resumen() {
  return (
    <>
      <PageHero
        title="Resumen Ejecutivo"
        subtitle="Auditoría de seguridad web sobre la plataforma de telemedicina SaludOnline · Empresa E26 · DVWA Low Security"
        icon="🩺"
        theme="overview"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
