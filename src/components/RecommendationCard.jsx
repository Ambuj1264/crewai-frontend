import React from 'react'

function fmt(price) {
  if (price == null) return ''
  return '₹' + Number(price).toLocaleString('en-IN')
}

export default function RecommendationCard({ recommendation: r }) {
  if (!r || !Object.keys(r).length) return (
    <div className="no-data">
      <p>Recommendation phase yielded no results.</p>
    </div>
  )

  return (
    <div>
      <div className="reco-block">
        <p className="reco-eyebrow">Final Output</p>
        <h2 className="reco-name">{r.recommended_product || 'Optimal Selection'}</h2>

        <div className="reco-meta">
          {r.brand && <span className="reco-brand-tag">{r.brand}</span>}
          {r.price && <span className="reco-price">{fmt(r.price)}</span>}
        </div>

        <div className="reco-hr" />

        {r.reasoning && <p className="reco-reasoning">{r.reasoning}</p>}

        {r.best_for && (
          <div className="reco-best">
            <span className="best-label">Ideal User</span>
            <span className="best-val">{r.best_for}</span>
          </div>
        )}

        {(r.pros?.length || r.cons?.length) && (
          <div className="reco-split">
            <div className="rbox rbox-pro">
              <p className="rbox-title">System Pros</p>
              <ul className="rbox-list">
                {(r.pros || []).map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="rbox rbox-con">
              <p className="rbox-title">System Cons</p>
              <ul className="rbox-list">
                {(r.cons || []).map((c, i) => <li key={i}>{c}</li>)}
                {!r.cons?.length && <li>No critical flaws detected</li>}
              </ul>
            </div>
          </div>
        )}

        {r.final_verdict && (
          <div className="reco-verdict">{r.final_verdict}</div>
        )}
      </div>

      {r.alternatives?.length > 0 && (
        <div className="reveal d2" style={{ marginTop: 'var(--space-group)'}}>
          <div className="sec-header">
            <span className="sec-n">05</span>
            <div>
              <p className="sec-t">Alternatives</p>
              <p className="sec-s">Secondary candidates meeting requirements</p>
            </div>
          </div>
          <div className="alt-grid">
            {r.alternatives.map((a, i) => (
              <div className="alt-card" key={i}>
                <p className="alt-name">{a.name}</p>
                <p className="alt-why">{a.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
