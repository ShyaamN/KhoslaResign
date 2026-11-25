import { listSignatures, countByRole } from '@/lib/signatures'

export async function GET() {
  const signatures = await listSignatures()
  const counts = countByRole(signatures)
  return Response.json({
    total: signatures.length,
    counts,
    signatures,
  })
}
