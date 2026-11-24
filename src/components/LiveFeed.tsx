import { ROLE_LABELS, type Signature } from '../data/content'

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/Los_Angeles',
    }).format(new Date(iso))
  } catch {
    return iso.slice(0, 10)
  }
}

export function LiveFeed({
  signatures,
  highlightId,
}: {
  signatures: Signature[]
  highlightId?: string | null
}) {
  const visible = signatures.slice(0, 12)

  return (
    <section className="feed" id="live" aria-labelledby="feed-heading">
      <div className="section-head">
        <p className="eyebrow">Live signatures</p>
        <h2 id="feed-heading">People adding their names</h2>
        <p className="section-support">
          Newest first. Demo entries are marked; your signature stays in this browser.
        </p>
      </div>
      <ul className="feed__list">
        {visible.map((s) => (
          <li
            key={s.id}
            className={`feed__item${highlightId === s.id ? ' feed__item--new' : ''}`}
          >
            <div className="feed__meta">
              <strong>{s.name}</strong>
              <span>{ROLE_LABELS[s.role]}</span>
              {s.affiliation ? <span className="feed__affil">{s.affiliation}</span> : null}
              <time dateTime={s.createdAt}>{formatWhen(s.createdAt)}</time>
              {s.demo ? <span className="feed__demo">Demo</span> : null}
            </div>
            {s.message ? <blockquote className="feed__msg">“{s.message}”</blockquote> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
