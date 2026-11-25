'use client'

export function Footer() {
  return (
    <footer className="footer" id="share">
      <div className="footer__share">
        <p className="eyebrow">Share</p>
        <h2>Pass it on</h2>
        <p className="section-support">
          Send this page to UCSD classmates and colleagues who can confirm with an
          @ucsd.edu address.
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
                  text: 'UCSD deserves better. Sign the letter with your @ucsd.edu email.',
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
            Sign the letter
          </a>
        </div>
      </div>
      <p className="footer__disclaimer">
        KhoslaResign is an independent student and staff campaign. It is not affiliated
        with, endorsed by, or acting on behalf of the University of California, UC San Diego,
        the UC Board of Regents, or Chancellor Pradeep K. Khosla. Signatures require a
        confirmed @ucsd.edu address and are the views of the individuals who submit them.
      </p>
    </footer>
  )
}
