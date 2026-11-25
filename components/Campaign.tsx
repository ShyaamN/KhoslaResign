'use client'

import { useCallback, useEffect, useState } from 'react'
import { Hero } from '@/components/Hero'
import { LiveFeed } from '@/components/LiveFeed'
import { OpenLetter } from '@/components/OpenLetter'
import { Reasons } from '@/components/Reasons'
import { SignForm } from '@/components/SignForm'
import { Footer } from '@/components/Footer'
import type { Signature } from '@/data/content'
import { DEMO_SIGNATURES } from '@/data/content'

export function Campaign() {
  const [signatures, setSignatures] = useState<Signature[]>(DEMO_SIGNATURES)
  const [highlightId, setHighlightId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/signatures')
      if (!res.ok) return
      const data = (await res.json()) as { signatures?: Signature[] }
      if (data.signatures) setSignatures(data.signatures)
    } catch {
      /* keep current */
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const onSigned = useCallback(
    (sig: Signature) => {
      void refresh()
      setHighlightId(sig.id)
      window.setTimeout(() => setHighlightId(null), 2400)
    },
    [refresh],
  )

  return (
    <div className="page">
      <Hero signatures={signatures} />
      <LiveFeed signatures={signatures} highlightId={highlightId} />
      <OpenLetter />
      <Reasons />
      <SignForm onSigned={onSigned} />
      <Footer />
    </div>
  )
}
