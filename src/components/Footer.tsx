export function Footer() {
  return (
    <footer className="footer" id="share">
      <div className="footer__share">
        <p className="eyebrow">Share</p>
        <h2>Pass it on</h2>
        <p className="section-support">
          Send this page to classmates, colleagues, and alumni who want the Regents to act.
        </p>
        <div className="footer__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              const url = window.location.href
              if (navigator.share) {
                void navigator.share({
                  title: 'KhoslaResign',
                  text: 'UCSD deserves better. Sign the letter.',
                  url,
                })
              } else {
                void navigator.clipboard.writeText(url)
              }
            }}
          >
            Share this page
          </button>
          <a className="btn btn--ghost" href="#sign">
            Sign again
          </a>
        </div>
      </div>
      <p className="footer__disclaimer">
        KhoslaResign is an independent student and community campaign. It is not affiliated
        with, endorsed by, or acting on behalf of the University of California, UC San Diego,
        the UC Board of Regents, or Chancellor Pradeep K. Khosla. Signatures and statements
        are the views of the individuals who submit them.
      </p>
    </footer>
  )
}
