import { LETTER_SECTIONS } from '../data/content'

export function OpenLetter() {
  return (
    <section className="letter" id="letter" aria-labelledby="letter-heading">
      <div className="section-head">
        <p className="eyebrow">Open letter</p>
        <h2 id="letter-heading">To the UC Board of Regents and the UC San Diego community</h2>
        <p className="section-support">
          Fourteen years. One demand: remove Chancellor Pradeep K. Khosla — or accept his
          resignation.
        </p>
      </div>

      <ol className="letter__toc">
        {LETTER_SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#letter-${s.id}`}>
              <span>{s.number}</span> {s.title}
            </a>
          </li>
        ))}
      </ol>

      <div className="letter__body">
        <p className="letter__salute">To the members of the UC Board of Regents,</p>
        <p className="letter__lede">
          We are current and former UC San Diego students, faculty, staff, alumni, and
          community supporters. We write with a clear demand: that Chancellor Pradeep K.
          Khosla resign or be removed, that the May 6, 2024 police action face independent
          review, and that this campus recommit to student welfare over force-first
          governance and expansion-first optics.
        </p>

        {LETTER_SECTIONS.map((s) => (
          <article key={s.id} className="letter__section" id={`letter-${s.id}`}>
            <h3>
              <span className="letter__num">{s.number}</span>
              {s.title}
            </h3>
            {s.body.split('\n\n').map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </article>
        ))}

        <p className="letter__close">
          Signed by the students, alumni, faculty, staff, and community members listed on
          this page — each speaking for themselves.
        </p>
      </div>
    </section>
  )
}
