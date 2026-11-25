/** Strict UCSD campus email gate — @ucsd.edu only. */
export function normalizeUcsdEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase()
  if (!/^[^\s@]+@ucsd\.edu$/.test(email)) return null
  return email
}

export function isUcsdEmail(raw: string): boolean {
  return normalizeUcsdEmail(raw) !== null
}
