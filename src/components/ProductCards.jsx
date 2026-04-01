import React from 'react'

function fmt(price) {
  if (price == null) return '—'
  return '₹' + Number(price).toLocaleString('en-IN')
}

export default function ProductCards({ products }) {
  if (!products?.length) return (
    <div className="no-data">
      <p>No products found matching these specific parameters.</p>
    </div>
  )

  return (
    <div className="products-grid">
      {products.map((p, i) => (
        <div className="pcard" key={p.id || i}>
          <div className="pcard-top">
            <span className="brand-tag">{p.brand || 'Brand'}</span>
            {p.rating != null && (
              <span className="rating-tag">★ {Number(p.rating).toFixed(1)}</span>
            )}
          </div>

          <p className="pcard-name">{p.name}</p>
          <p className="pcard-price"><sub>₹</sub>{fmt(p.price).replace('₹', '')}</p>

          <div className="pcard-divider" />

          {p.features?.length > 0 && (
            <div className="pcard-features">
              {p.features.slice(0, 4).map((f, fi) => (
                <div className="feat-line" key={fi}>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}

          {p.use_cases?.length > 0 && (
            <div className="pcard-tags">
              {p.use_cases.map((uc, ui) => (
                <span className="use-tag" key={ui}>{uc}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
