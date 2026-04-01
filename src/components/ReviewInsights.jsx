import React from 'react'

function sentCls(s) {
  if (!s) return 'st-neu'
  const l = s.toLowerCase()
  if (l === 'positive') return 'st-pos'
  if (l === 'negative') return 'st-neg'
  if (l === 'mixed')    return 'st-mix'
  return 'st-neu'
}

export default function ReviewInsights({ reviews }) {
  if (!reviews?.length) return (
    <div className="no-data">
      <p>No review insights processed.</p>
    </div>
  )

  return (
    <div className="reviews-grid">
      {reviews.map((r, i) => (
        <div className="rcard" key={r.product_id || i}>
          <p className="rcard-name">{r.product_name || `Product ${i + 1}`}</p>

          <span className={`sent-tag ${sentCls(r.sentiment)}`}>
            {r.sentiment || 'Neutral'}
            {r.sentiment_score != null && (
              <span style={{ opacity: 0.65 }}>
                {' '}[{(Number(r.sentiment_score) * 100).toFixed(0)}%]
              </span>
            )}
          </span>

          <div className="rcard-cols">
            <div>
              <p className="rcard-col-lbl lbl-pos">Highlights</p>
              <ul className="rcard-list">
                {(r.positives || []).slice(0, 3).map((p, pi) => <li key={pi}>{p}</li>)}
                {!r.positives?.length && <li>N/A</li>}
              </ul>
            </div>
            <div>
              <p className="rcard-col-lbl lbl-neg">Pain Points</p>
              <ul className="rcard-list">
                {(r.negatives || []).slice(0, 3).map((n, ni) => <li key={ni}>{n}</li>)}
                {!r.negatives?.length && <li>None detected</li>}
              </ul>
            </div>
          </div>

          {r.verdict && <p className="rcard-verdict">"{r.verdict}"</p>}
        </div>
      ))}
    </div>
  )
}
