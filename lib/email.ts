import { Resend } from 'resend'

export type SendResult =
  | { ok: true; mode: 'resend' | 'sample' }
  | { ok: false; error: string }

export async function sendConfirmationEmail(input: {
  to: string
  name: string
  code: string
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? ''
  if (!apiKey) {
    // Local / unpublished fallback — never pretend mail was sent.
    console.info(`[sample-email] UCSD confirm code for ${input.to}: ${input.code}`)
    return { ok: true, mode: 'sample' }
  }

  const from =
    process.env.RESEND_FROM?.trim() || 'KhoslaResign <onboarding@resend.dev>'
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: input.to,
    subject: 'Confirm your KhoslaResign signature',
    text: [
      `Hello ${input.name},`,
      '',
      `Your confirmation code is: ${input.code}`,
      '',
      'Enter this code on the KhoslaResign site to add your name.',
      'It expires in 30 minutes.',
      '',
      'If you did not request this, ignore this email.',
    ].join('\n'),
  })

  if (error) {
    return { ok: false, error: error.message }
  }
  return { ok: true, mode: 'resend' }
}
