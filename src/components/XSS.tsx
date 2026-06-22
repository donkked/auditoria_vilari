import PageHero from './PageHero'
import MarkdownRenderer from './MarkdownRenderer'
import content from '../../docs_vilari/03_xss_vilari.md?raw'

export default function XSS() {
  return (
    <>
      <PageHero
        title="XSS Reflejado"
        subtitle="Inyección &lt;script&gt;alert('XSS')&lt;/script&gt; — Robo de sesiones de médicos y pacientes"
        icon="🔗"
        theme="medium"
        badge={{ text: '6.1', cls: 'medium' }}
        vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
      />
      <div className="content-body">
        <article className="md-content">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  )
}
