import { sql } from './db'
import type { Role, Signature } from '@/data/content'
import { DEMO_SIGNATURES } from '@/data/content'

type SignatureRow = {
  id: string
  name: string
  role: Role
  affiliation: string | null
  message: string | null
  created_at: string | Date
}

function rowToSignature(row: SignatureRow): Signature {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    affiliation: row.affiliation ?? undefined,
    message: row.message ?? undefined,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
  }
}

export async function listSignatures(): Promise<Signature[]> {
  const rows = await sql<SignatureRow>(
    `select id, name, role, affiliation, message, created_at
     from signatures
     order by created_at desc
     limit 200`,
  )
  const confirmed = rows.map(rowToSignature)
  const byId = new Map<string, Signature>()
  for (const s of DEMO_SIGNATURES) byId.set(s.id, s)
  for (const s of confirmed) byId.set(s.id, s)
  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function countByRole(sigs: Signature[]): Record<Role, number> {
  const counts: Record<Role, number> = { student: 0, staff: 0 }
  for (const s of sigs) {
    if (s.role in counts) counts[s.role] += 1
  }
  return counts
}
