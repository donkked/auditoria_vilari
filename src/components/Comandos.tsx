import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/04_comandos_vilari.md?raw'

export default function Comandos() {
  return (
    <>
      <PageHero
        title="Inyección de Comandos"
        subtitle="Comando 127.0.0.1; cat /etc/passwd — Control total del servidor web de SaludOnline"
        icon="💻"
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
