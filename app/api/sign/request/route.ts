import { randomUUID } from 'node:crypto'
import { sql } from '@/lib/db'
import { generateCode, hashCode, hashEmail } from '@/lib/crypto'
import { sendConfirmationEmail } from '@/lib/email'
import { normalizeUcsdEmail } from '@/lib/ucsd'
import type { Role } from '@/data/content'

const ROLES = new Set<Role>(['student', 'staff'])

export async function POST(request: Request) {
  let body: {
    name?: string
    email?: string
    role?: string
    affiliation?: string
    message?: string
  }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const name = body.name?.trim() ?? ''
  const email = normalizeUcsdEmail(body.email ?? '')
  const role = body.role as Role
  const affiliation = body.affiliation?.trim() || null
  const message = body.message?.trim() || null

  if (!name || name.length > 80) {
    return Response.json({ error: 'Enter your name (max 80 characters).' }, { status: 400 })
  }
  if (!email) {
    return Response.json(
      { error: 'Use your @ucsd.edu email. Other domains are not accepted.' },
      { status: 400 },
    )
  }
  if (!ROLES.has(role)) {
    return Response.json(
      { error: 'Only current UCSD students and faculty/staff may sign.' },
      { status: 400 },
    )
  }
  if (affiliation && affiliation.length > 120) {
    return Response.json({ error: 'Affiliation is too long.' }, { status: 400 })
  }
  if (message && message.length > 280) {
    return Response.json({ error: 'Message is too long.' }, { status: 400 })
  }

  const emailHash = hashEmail(email)
  const existing = await sql<{ id: string }>(
    'select id from signatures where email_hash = $1 limit 1',
    [emailHash],
  )
  if (existing.length > 0) {
    return Response.json(
      { error: 'This @ucsd.edu address has already signed.' },
      { status: 409 },
    )
  }

  const code = generateCode()
  const codeHash = hashCode(email, code)
  const id = randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  await sql('delete from pending_signatories where email_normalized = $1', [email])
  await sql(
    `insert into pending_signatories
      (id, email, email_normalized, name, role, affiliation, message, code_hash, expires_at)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id, email, email, name, role, affiliation, message, codeHash, expiresAt],
  )

  const sent = await sendConfirmationEmail({ to: email, name, code })
  if (!sent.ok) {
    return Response.json(
      { error: `Could not send confirmation email: ${sent.error}` },
      { status: 502 },
    )
  }

  return Response.json({
    ok: true,
    email,
    mode: sent.mode,
    ...(sent.mode === 'sample' ? { sampleCode: code } : {}),
    message:
      sent.mode === 'sample'
        ? 'Sample mode: email is not configured. Use the on-screen code to confirm.'
        : 'Check your @ucsd.edu inbox for a six-digit confirmation code.',
  })
}
