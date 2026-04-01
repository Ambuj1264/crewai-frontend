function fmt(price) {
  if (price == null) return '—'
  return '₹' + Number(price).toLocaleString('en-IN')
}

export default function ProductCards({ products }) {
  if (!products?.length) return (
    <div className="no-data">
      <div className="no-data-icon">📦</div>
      <p>No products found. Try refining your query.</p>
    </div>
  )

  return (
    <div className="products-grid">
      {products.map((p, i) => (
        <div className="product-card" key={p.id || i} id={`product-${i}`}>
          <div className="card-meta">
            <span className="brand-tag">{p.brand || 'Brand'}</span>
            {p.rating != null && (
              <span className="rating-tag">★ {Number(p.rating).toFixed(1)}</span>
            )}
          </div>

          <p className="card-name">{p.name}</p>
          <p className="card-price">{fmt(p.price)}</p>

          {p.features?.length > 0 && (
            <div className="card-features">
              {p.features.slice(0, 5).map((f, fi) => (
                <div className="feat-row" key={fi}>
                  <span className="feat-dash">—</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}

          {p.use_cases?.length > 0 && (
            <div className="card-tags">
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
