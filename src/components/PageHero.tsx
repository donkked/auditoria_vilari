interface PageHeroProps {
  title: string
  subtitle: string
  icon: string
  theme: string
  badge?: { text: string; cls: string }
  vector?: string
}

export default function PageHero({ title, subtitle, icon, theme, badge, vector }: Readonly<PageHeroProps>) {
  return (
    <div className={`page-hero theme-${theme}`}>
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="hero-body">
        <span className="hero-icon">{icon}</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {vector && <code className="hero-vector">{vector}</code>}
      </div>
      {badge && (
        <span className={`hero-cvss ${badge.cls}`}>CVSS {badge.text}</span>
      )}
    </div>
  )
}
