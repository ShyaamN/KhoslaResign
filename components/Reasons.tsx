'use client'

import { useState } from 'react'
import { REASON_GROUPS } from '@/data/content'

export function Reasons() {
  const [openId, setOpenId] = useState<string | null>(REASON_GROUPS[0]?.id ?? null)

  return (
    <section className="reasons" id="reasons" aria-labelledby="reasons-heading">
      <div className="section-head">
        <p className="eyebrow">The case</p>
        <h2 id="reasons-heading">Why he is unfavored</h2>
        <p className="section-support">
          Documented grievances from campus reporting and organizing — not invented claims.
          Expand a group to read each point.
        </p>
      </div>

      <div className="reasons__list">
        {REASON_GROUPS.map((group) => {
          const open = openId === group.id
          return (
            <div key={group.id} className={`reasons__group${open ? ' is-open' : ''}`}>
              <button
                type="button"
                className="reasons__toggle"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : group.id)}
              >
                <span className="reasons__title-block">
                  <span className="reasons__group-title">{group.title}</span>
                  <span className="reasons__group-intro">{group.intro}</span>
                </span>
                <span className="reasons__count">{group.items.length}</span>
              </button>
              {open ? (
                <ol className="reasons__items">
                  {group.items.map((item) => (
                    <li key={item.text}>
                      <span>{item.text}</span>
                      {item.source ? (
                        <>
                          {' '}
                          <a
                            href={item.source.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.source.label}
                          </a>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
