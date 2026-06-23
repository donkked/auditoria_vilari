import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

const components: Components = {
  img({ src, alt, ...props }) {
    // Los .md referencian las capturas de forma relativa (img_vilari/...) para
    // cumplir la nomenclatura de la rúbrica y verse en GitHub. En la web, las
    // imágenes se sirven desde public/, por lo que reescribimos a ruta absoluta.
    const resolved =
      typeof src === 'string' && src.startsWith('img_vilari/') ? `/${src}` : src
    return <img src={resolved} alt={alt} loading="lazy" {...props} />
  },
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className ?? '')
    const code = String(children).replace(/\n$/, '')
    if (match) {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: '10px',
            margin: '16px 0 24px',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {code}
        </SyntaxHighlighter>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
