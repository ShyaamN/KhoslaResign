'use client'

import { ROLE_LABELS, type Role, type Signature } from '@/data/content'
import { countByRole } from '@/lib/signatures-client'
import { useAnimatedCount } from '@/hooks/useAnimatedCount'

const ORDER: Role[] = ['student', 'staff']

function HeroStat({ label, value }: { label: string; value: number }) {
  const n = useAnimatedCount(value)
  return (
    <div className="hero__stat">
      <p className="hero__stat-value">{n.toLocaleString()}</p>
      <p className="hero__stat-label">{label}</p>
    </div>
  )
}

export function Hero({ signatures }: { signatures: Signature[] }) {
  const counts = countByRole(signatures)
  const total = signatures.length

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
          An open letter from current UC San Diego students and faculty/staff demanding that
          the UC Regents remove Chancellor Pradeep K. Khosla — or that he resign.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#sign">
            Sign the letter
          </a>
          <a className="btn btn--ghost" href="#letter">
            Read the letter
          </a>
        </div>

        <div className="hero__stats" aria-label="Signature counts">
          <HeroStat label="Names on the letter" value={total} />
          {ORDER.map((role) => (
            <HeroStat key={role} label={ROLE_LABELS[role]} value={counts[role]} />
          ))}
        </div>
        <p className="hero__stats-note">
          Confirmed @ucsd.edu signatures, plus a small seeded demo set marked in the feed.
        </p>
      </div>
    </header>
  )
}
