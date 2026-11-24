export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__atmosphere" aria-hidden="true" />
      <nav className="hero__nav">
        <a className="hero__nav-brand" href="#top">
          KhoslaResign
        </a>
        <div className="hero__nav-links">
          <a href="#letter">Letter</a>
          <a href="#reasons">Why</a>
          <a href="#sign">Sign</a>
        </div>
      </nav>
      <div className="hero__content">
        <p className="hero__brand">KhoslaResign</p>
        <h1 className="hero__headline">UCSD deserves better.</h1>
        <p className="hero__support">
          Demand that the UC Regents remove Chancellor Pradeep K. Khosla — or that he resign.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#sign">
            Sign the letter
          </a>
          <a className="btn btn--ghost" href="#letter">
            Read the letter
          </a>
        </div>
      </div>
    </header>
  )
}
