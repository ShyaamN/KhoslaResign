import { createHash, randomInt, timingSafeEqual } from 'node:crypto'

export function hashEmail(email: string): string {
  return createHash('sha256').update(`email:${email}`).digest('hex')
}

export function hashCode(email: string, code: string): string {
  const pepper = process.env.SIGNING_PEPPER?.trim() || 'khosla-resign-dev-pepper'
  return createHash('sha256').update(`${pepper}:${email}:${code}`).digest('hex')
}

export function generateCode(): string {
  return String(randomInt(100000, 999999))
}

export function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, 'hex')
    const bb = Buffer.from(b, 'hex')
    if (ba.length !== bb.length) return false
    return timingSafeEqual(ba, bb)
  } catch {
    return false
  }
}
