import { useCallback, useState } from 'react'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { LiveFeed } from './components/LiveFeed'
import { OpenLetter } from './components/OpenLetter'
import { Reasons } from './components/Reasons'
import { SignForm } from './components/SignForm'
import { Footer } from './components/Footer'
import type { Signature } from './data/content'
import { loadSignatures } from './lib/signatures'
import './App.css'

export default function App() {
  const [signatures, setSignatures] = useState<Signature[]>(() => loadSignatures())
  const [highlightId, setHighlightId] = useState<string | null>(null)

  const onSigned = useCallback((sig: Signature) => {
    setSignatures(loadSignatures())
    setHighlightId(sig.id)
    window.setTimeout(() => setHighlightId(null), 2400)
  }, [])

  return (
    <div className="page">
      <Hero />
      <Stats signatures={signatures} />
      <LiveFeed signatures={signatures} highlightId={highlightId} />
      <OpenLetter />
      <Reasons />
      <SignForm onSigned={onSigned} />
      <Footer />
    </div>
  )
}
