import React from 'react'

function ScoreCell({ score }) {
  const n = Number(score)
  const cls = n >= 7.5 ? 's-hi' : n >= 5 ? 's-md' : 's-lo'
  return <span className={`score-pill ${cls}`}>{n.toFixed(1)}</span>
}

export default function ComparisonTable({ comparison }) {
  if (!comparison || !Object.keys(comparison).length) return (
    <div className="no-data">
      <p>Comparison data unavailable.</p>
    </div>
  )

  const criteria = comparison.criteria || ['Value for Money', 'Performance', 'Features', 'Brand']
  const scores   = comparison.scores  || {}
  const products = Object.keys(scores)

  if (!products.length) return (
    <div className="no-data">
      <p>No comparison scores generated.</p>
    </div>
  )

  return (
    <div className="reveal">
      <div className="table-wrap">
        <table className="comp-table">
          <thead>
            <tr>
              <th>Index / Name</th>
              {criteria.map(c => <th key={c}>{c}</th>)}
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {products.map(name => {
              const row = scores[name] || {}
              return (
                <tr key={name}>
                  <td className="td-name">{name}</td>
                  {criteria.map(c => (
                    <td key={c}><ScoreCell score={row[c] ?? 0} /></td>
                  ))}
                  <td className="td-overall">
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
    </div>
  )
}
