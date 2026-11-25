import { randomUUID } from 'node:crypto'
import { sql } from '@/lib/db'
import { hashCode, hashEmail, safeEqualHex } from '@/lib/crypto'
import { normalizeUcsdEmail } from '@/lib/ucsd'
import type { Role, Signature } from '@/data/content'

type PendingRow = {
  id: string
  email_normalized: string
  name: string
  role: Role
  affiliation: string | null
  message: string | null
  code_hash: string
  expires_at: string | Date
}

export async function POST(request: Request) {
  let body: { email?: string; code?: string }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = normalizeUcsdEmail(body.email ?? '')
  const code = (body.code ?? '').replace(/\s/g, '')
  if (!email) {
    return Response.json({ error: 'Use your @ucsd.edu email.' }, { status: 400 })
  }
  if (!/^\d{6}$/.test(code)) {
    return Response.json({ error: 'Enter the six-digit confirmation code.' }, { status: 400 })
  }

  const rows = await sql<PendingRow>(
    `select id, email_normalized, name, role, affiliation, message, code_hash, expires_at
     from pending_signatories
     where email_normalized = $1
     order by created_at desc
     limit 1`,
    [email],
  )
  const pending = rows[0]
  if (!pending) {
    return Response.json(
      { error: 'No pending confirmation for this email. Request a new code.' },
      { status: 404 },
    )
  }

  const expires =
    pending.expires_at instanceof Date
      ? pending.expires_at.getTime()
      : new Date(pending.expires_at).getTime()
  if (Number.isNaN(expires) || expires < Date.now()) {
    await sql('delete from pending_signatories where id = $1', [pending.id])
    return Response.json(
      { error: 'That code expired. Request a new one.' },
      { status: 410 },
    )
  }

  const expected = hashCode(email, code)
  if (!safeEqualHex(expected, pending.code_hash)) {
    return Response.json({ error: 'Incorrect confirmation code.' }, { status: 401 })
  }

  const emailHash = hashEmail(email)
  const duplicate = await sql<{ id: string }>(
    'select id from signatures where email_hash = $1 limit 1',
    [emailHash],
  )
  if (duplicate.length > 0) {
    await sql('delete from pending_signatories where email_normalized = $1', [email])
    return Response.json(
      { error: 'This @ucsd.edu address has already signed.' },
      { status: 409 },
    )
  }

  const id = randomUUID()
  const createdAt = new Date().toISOString()
  await sql(
    `insert into signatures (id, name, role, affiliation, message, email_hash, created_at)
     values ($1, $2, $3, $4, $5, $6, $7)`,
    [
      id,
      pending.name,
      pending.role,
      pending.affiliation,
      pending.message,
      emailHash,
      createdAt,
    ],
  )
  await sql('delete from pending_signatories where email_normalized = $1', [email])

  const signature: Signature = {
    id,
    name: pending.name,
    role: pending.role,
    affiliation: pending.affiliation ?? undefined,
    message: pending.message ?? undefined,
    createdAt,
  }

  return Response.json({ ok: true, signature })
}
