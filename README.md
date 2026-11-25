# KhoslaResign

Independent campaign site for current UC San Diego students and faculty/staff calling on the UC Board of Regents to remove Chancellor Pradeep K. Khosla — or for him to resign.

Signatures require a confirmed **@ucsd.edu** email (six-digit code via Resend when configured).

## Stack

- Next.js (App Router) + TypeScript
- Postgres when published (`cursor-app.json`); local PGlite fallback
- Resend for confirmation email (`RESEND_API_KEY`)

## Develop

```bash
npm install
npm run dev
```

Without `RESEND_API_KEY`, the request API returns a **sample code** on-screen so you can still test the confirm flow locally.

## Build

```bash
npm run build
npm start
```

## Secrets (published app)

Bind in Cursor Apps:

- `RESEND_API_KEY` — required to send real confirmation emails
- `RESEND_FROM` — optional; defaults to `KhoslaResign <onboarding@resend.dev>`
- `SIGNING_PEPPER` — optional pepper for hashing confirmation codes

## Note

Not affiliated with UC San Diego or the UC Regents.
