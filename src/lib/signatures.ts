import { DEMO_SIGNATURES, type Role, type Signature } from '../data/content'

const STORAGE_KEY = 'khosla-resign-signatures-v1'

function readStored(): Signature[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Signature[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (s) =>
        s &&
        typeof s.id === 'string' &&
        typeof s.name === 'string' &&
        typeof s.role === 'string' &&
        typeof s.createdAt === 'string',
    )
  } catch {
    return []
  }
}

function writeStored(sigs: Signature[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sigs))
}

export function loadSignatures(): Signature[] {
  const user = readStored()
  const byId = new Map<string, Signature>()
  for (const s of DEMO_SIGNATURES) byId.set(s.id, s)
  for (const s of user) byId.set(s.id, s)
  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function addSignature(input: {
  name: string
  role: Role
  affiliation?: string
  message?: string
}): Signature {
  const sig: Signature = {
    id: `user-${crypto.randomUUID()}`,
    name: input.name.trim(),
    role: input.role,
    affiliation: input.affiliation?.trim() || undefined,
    message: input.message?.trim() || undefined,
    createdAt: new Date().toISOString(),
  }
  const existing = readStored()
  writeStored([sig, ...existing])
  return sig
}

export function countByRole(sigs: Signature[]): Record<Role, number> {
  const counts: Record<Role, number> = {
    student: 0,
    alumni: 0,
    faculty: 0,
    community: 0,
  }
  for (const s of sigs) {
    if (s.role in counts) counts[s.role] += 1
  }
  return counts
}
