function ScoreCell({ score }) {
  const n = Number(score)
  const cls = n >= 7.5 ? 'sc-hi' : n >= 5 ? 'sc-md' : 'sc-lo'
  return <span className={`score-cell ${cls}`}>{n.toFixed(1)}</span>
}

export default function ComparisonTable({ comparison }) {
  if (!comparison || !Object.keys(comparison).length) return (
    <div className="no-data">
      <div className="no-data-icon">⚖️</div>
      <p>Comparison unavailable for this query.</p>
    </div>
  )

  const criteria = comparison.criteria || ['Value for Money', 'Performance', 'Features', 'Brand']
  const scores   = comparison.scores  || {}
  const products = Object.keys(scores)

  if (!products.length) return (
    <div className="no-data">
      <div className="no-data-icon">⚖️</div>
      <p>No comparison scores returned.</p>
    </div>
  )

  return (
    <>
      <div className="table-scroll">
        <table className="comp-table" id="comparison-table">
          <thead>
            <tr>
              <th>Product</th>
              {criteria.map(c => <th key={c}>{c}</th>)}
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {products.map(name => {
              const row = scores[name] || {}
              return (
                <tr key={name}>
                  <td className="td-product">{name}</td>
                  {criteria.map(c => (
                    <td key={c}><ScoreCell score={row[c] ?? 0} /></td>
                  ))}
                  <td className="overall-cell">
                    {row.overall != null ? Number(row.overall).toFixed(1) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {comparison.summary && (
        <div className="comp-summary">
          <strong>Analysis — </strong>{comparison.summary}
        </div>
      )}
    </>
  )
}
