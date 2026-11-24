import { ROLE_LABELS, type Role, type Signature } from '../data/content'
import { countByRole } from '../lib/signatures'
import { useAnimatedCount } from '../hooks/useAnimatedCount'

const ORDER: Role[] = ['student', 'alumni', 'faculty', 'community']

function Stat({ label, value }: { label: string; value: number }) {
  const n = useAnimatedCount(value)
  return (
    <div className="stats__item">
      <p className="stats__value">{n.toLocaleString()}</p>
      <p className="stats__label">{label}</p>
    </div>
  )
}

export function Stats({ signatures }: { signatures: Signature[] }) {
  const counts = countByRole(signatures)
  const total = signatures.length

  return (
    <section className="stats" aria-label="Signature counts">
      <div className="stats__inner">
        <Stat label="Names on the letter" value={total} />
        <div className="stats__divider" aria-hidden="true" />
        {ORDER.map((role) => (
          <Stat key={role} label={ROLE_LABELS[role]} value={counts[role]} />
        ))}
      </div>
      <p className="stats__note">
        Counts include your browser’s saved signatures plus a small seeded demo set for
        layout. No invented mass totals.
      </p>
    </section>
  )
}
