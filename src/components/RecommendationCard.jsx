function fmt(price) {
  if (price == null) return ''
  return '₹' + Number(price).toLocaleString('en-IN')
}

export default function RecommendationCard({ recommendation: r }) {
  if (!r || !Object.keys(r).length) return (
    <div className="no-data">
      <div className="no-data-icon">🏆</div>
      <p>Recommendation data unavailable.</p>
    </div>
  )

  return (
    <div id="recommendation-view">
      {/* ── Grand Finale card ── */}
      <div className="reco-stage">
        <p className="reco-eyebrow">AI Recommendation</p>

        <h2 className="reco-name">{r.recommended_product || 'Top Pick'}</h2>

        <div className="reco-meta">
          {r.brand     && <span className="reco-brand-badge">{r.brand}</span>}
          {r.price     && <span className="reco-price">{fmt(r.price)}</span>}
        </div>

        <div className="reco-divider" />

        {r.reasoning && <p className="reco-reasoning">{r.reasoning}</p>}

        {r.best_for && (
          <div className="reco-best-for">
            <span className="reco-best-label">Best for</span>
            <span className="reco-best-text">{r.best_for}</span>
          </div>
        )}

        {(r.pros?.length || r.cons?.length) && (
          <div className="reco-split">
            <div className="reco-box pros-b">
              <p className="reco-box-title" style={{ color: 'var(--accent-teal)' }}>Pros</p>
              <ul className="reco-list">
                {(r.pros || []).map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="reco-box cons-b">
              <p className="reco-box-title" style={{ color: '#d97b6f' }}>Cons</p>
              <ul className="reco-list">
                {(r.cons || []).map((c, i) => <li key={i}>{c}</li>)}
                {!r.cons?.length && <li>Minimal trade-offs</li>}
              </ul>
            </div>
          </div>
        )}

        {r.final_verdict && (
          <div className="reco-verdict">{r.final_verdict}</div>
        )}
      </div>

      {/* ── Alternatives ── */}
      {r.alternatives?.length > 0 && (
        <>
          <div className="sec-head" style={{ marginTop: 12 }}>
            <span className="sec-num">02</span>
            <div className="sec-copy">
              <p className="sec-title">Alternatives</p>
              <p className="sec-sub">Runner-ups worth considering</p>
            </div>
          </div>
          <div className="alt-grid">
            {r.alternatives.map((a, i) => (
              <div className="alt-card" key={i} id={`alt-${i}`}>
                <p className="alt-name">{a.name}</p>
                <p className="alt-reason">{a.reason}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
