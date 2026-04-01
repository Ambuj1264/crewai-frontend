function sentCls(s) {
  if (!s) return 's-neutral'
  const l = s.toLowerCase()
  if (l === 'positive') return 's-positive'
  if (l === 'negative') return 's-negative'
  if (l === 'mixed')    return 's-mixed'
  return 's-neutral'
}

export default function ReviewInsights({ reviews }) {
  if (!reviews?.length) return (
    <div className="no-data">
      <div className="no-data-icon">⭐</div>
      <p>No review insights available.</p>
    </div>
  )

  return (
    <div className="reviews-grid" id="reviews-grid">
      {reviews.map((r, i) => (
        <div className="rev-card" key={r.product_id || i}>
          <p className="rev-product-name">{r.product_name || `Product ${i + 1}`}</p>

          <span className={`sentiment-tag ${sentCls(r.sentiment)}`}>
            {r.sentiment || 'Neutral'}
            {r.sentiment_score != null && (
              <span style={{ opacity: 0.65 }}>
                {' '}({(Number(r.sentiment_score) * 100).toFixed(0)}%)
              </span>
            )}
          </span>

          <div className="rev-two-col">
            <div>
              <p className="rev-col-title rt-pos">Positives</p>
              <ul className="rev-list">
                {(r.positives || []).slice(0, 4).map((p, pi) => <li key={pi}>{p}</li>)}
                {!r.positives?.length && <li>No highlights found</li>}
              </ul>
            </div>
            <div>
              <p className="rev-col-title rt-neg">Negatives</p>
              <ul className="rev-list">
                {(r.negatives || []).slice(0, 4).map((n, ni) => <li key={ni}>{n}</li>)}
                {!r.negatives?.length && <li>None reported</li>}
              </ul>
            </div>
          </div>

          {r.verdict && <p className="rev-verdict">{r.verdict}</p>}
        </div>
      ))}
    </div>
  )
}
