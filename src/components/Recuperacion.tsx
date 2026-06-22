import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/08_recuperacion_vilari.md?raw'

export default function Recuperacion() {
  return (
    <>
      <PageHero
        title="Plan de Recuperación"
        subtitle="Procedimientos de respuesta ante incidentes, restauración de servicios clínicos y lecciones aprendidas"
        icon="🔄"
        theme="recovery"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
