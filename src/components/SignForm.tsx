import { useState, type FormEvent } from 'react'
import { ROLE_LABELS, type Role, type Signature } from '../data/content'
import { addSignature } from '../lib/signatures'

const ROLES = Object.keys(ROLE_LABELS) as Role[]

export function SignForm({ onSigned }: { onSigned: (sig: Signature) => void }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [affiliation, setAffiliation] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    const sig = addSignature({ name, role, affiliation, message })
    onSigned(sig)
    setDone(true)
    setMessage('')
  }

  return (
    <section className="sign" id="sign" aria-labelledby="sign-heading">
      <div className="section-head">
        <p className="eyebrow">Add your name</p>
        <h2 id="sign-heading">Sign the letter</h2>
        <p className="section-support">
          Your name appears in the live feed on this device. Affiliations are self-reported
          and not verified.
        </p>
      </div>

      {done ? (
        <div className="sign__success" role="status">
          <p>Thank you. Your signature is on the letter.</p>
          <div className="sign__success-actions">
            <a className="btn btn--primary" href="#live">
              View live signatures
            </a>
            <button type="button" className="btn btn--ghost" onClick={() => setDone(false)}>
              Sign another name
            </button>
          </div>
        </div>
      ) : (
        <form className="sign__form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
            />
          </label>

          <label className="field">
            <span>Role</span>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>
              Affiliation <em>(optional)</em>
            </span>
            <input
              type="text"
              name="affiliation"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="College, department, class year…"
              maxLength={120}
            />
          </label>

          <label className="field">
            <span>
              Public message <em>(optional)</em>
            </span>
            <textarea
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Why you’re signing…"
              maxLength={280}
            />
          </label>

          {error ? <p className="sign__error">{error}</p> : null}

          <button type="submit" className="btn btn--primary">
            Sign the letter
          </button>
        </form>
      )}
    </section>
  )
}
