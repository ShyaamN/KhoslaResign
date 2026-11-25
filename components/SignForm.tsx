'use client'

import { useState, type FormEvent } from 'react'
import { ROLE_LABELS, type Role, type Signature } from '@/data/content'

const ROLES = Object.keys(ROLE_LABELS) as Role[]

type Step = 'form' | 'code' | 'done'

export function SignForm({ onSigned }: { onSigned: (sig: Signature) => void }) {
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [affiliation, setAffiliation] = useState('')
  const [message, setMessage] = useState('')
  const [code, setCode] = useState('')
  const [sampleCode, setSampleCode] = useState<string | null>(null)
  const [pendingEmail, setPendingEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function requestCode(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await fetch('/api/sign/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, affiliation, message }),
      })
      const data = (await res.json()) as {
        error?: string
        email?: string
        sampleCode?: string
        message?: string
      }
      if (!res.ok) {
        setError(data.error || 'Could not start confirmation.')
        return
      }
      setPendingEmail(data.email || email.trim().toLowerCase())
      setSampleCode(data.sampleCode ?? null)
      setStep('code')
    } catch {
      setError('Network error. Try again.')
    } finally {
      setBusy(false)
    }
  }

  async function confirmCode(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await fetch('/api/sign/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code }),
      })
      const data = (await res.json()) as { error?: string; signature?: Signature }
      if (!res.ok || !data.signature) {
        setError(data.error || 'Could not confirm signature.')
        return
      }
      onSigned(data.signature)
      setStep('done')
      setCode('')
      setMessage('')
    } catch {
      setError('Network error. Try again.')
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setStep('form')
    setError(null)
    setSampleCode(null)
    setCode('')
  }

  return (
    <section className="sign" id="sign" aria-labelledby="sign-heading">
      <div className="section-head">
        <p className="eyebrow">Add your name</p>
        <h2 id="sign-heading">Sign the letter</h2>
        <p className="section-support">
          Open to current UC San Diego students and faculty/staff only. Confirm with your{' '}
          <strong>@ucsd.edu</strong> email — other domains are rejected.
        </p>
      </div>

      {step === 'done' ? (
        <div className="sign__success" role="status">
          <p>Thank you. Your confirmed signature is on the letter.</p>
          <div className="sign__success-actions">
            <a className="btn btn--primary" href="#live">
              View live signatures
            </a>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              Sign another name
            </button>
          </div>
        </div>
      ) : null}

      {step === 'code' ? (
        <form className="sign__form" onSubmit={confirmCode} noValidate>
          <p className="sign__hint">
            We sent a six-digit code to <strong>{pendingEmail}</strong>. Enter it below to
            count your signature.
          </p>
          {sampleCode ? (
            <p className="sign__sample" role="status">
              Sample mode (email API not configured): use code <strong>{sampleCode}</strong>
            </p>
          ) : null}
          <label className="field">
            <span>Confirmation code</span>
            <input
              type="text"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              placeholder="······"
            />
          </label>
          {error ? <p className="sign__error">{error}</p> : null}
          <div className="sign__success-actions">
            <button type="submit" className="btn btn--primary" disabled={busy}>
              {busy ? 'Confirming…' : 'Confirm signature'}
            </button>
            <button type="button" className="btn btn--ghost" onClick={reset} disabled={busy}>
              Start over
            </button>
          </div>
        </form>
      ) : null}

      {step === 'form' ? (
        <form className="sign__form" onSubmit={requestCode} noValidate>
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
            <span>UCSD email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@ucsd.edu"
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
              placeholder="College, department…"
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

          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Sending code…' : 'Email me a confirmation code'}
          </button>
        </form>
      ) : null}
    </section>
  )
}
