import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/02_sqli_vilari.md?raw'

export default function InyeccionSQL() {
  return (
    <>
      <PageHero
        title="Inyección SQL"
        subtitle="Ataque ' OR '1'='1 — Exposición completa de la base de datos de pacientes de SaludOnline"
        icon="🗄️"
        theme="critical"
        badge={{ text: '10.0', cls: 'critical' }}
        vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
