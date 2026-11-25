import type { Role, Signature } from '@/data/content'

/** Client-safe counters (no Node DB imports). */
export function countByRole(sigs: Signature[]): Record<Role, number> {
  const counts: Record<Role, number> = { student: 0, staff: 0 }
  for (const s of sigs) {
    if (s.role in counts) counts[s.role] += 1
  }
  return counts
}
