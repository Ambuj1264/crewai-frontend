import React from 'react'

const QUICK_QUERIES = [
  'Developer laptop under ₹1L',
  'Gaming PC components',
  'Noise cancelling headphones',
  'Mechanical keyboard for typing'
]

export default function SearchBox({ onSearch, isLoading, compact = false }) {
  const [query, setQuery] = React.useState('')

  function submit(e) {
    e.preventDefault()
    if (query.trim() && !isLoading) onSearch(query.trim())
  }

  function useQuick(q) {
    setQuery(q)
    if (!isLoading) onSearch(q)
  }

  return (
    <section className={compact ? "search-wrap-compact" : "search-wrap"}>
      <div className="c reveal">
        {!compact && (
          <label htmlFor="search" className="search-label">Describe your requirement</label>
        )}

        <form className="search-form" onSubmit={submit}>
          <input
            id="search"
            type="text"
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='"Best laptop under ₹1 lakh for coding and gaming"'
            disabled={isLoading}
            autoFocus
            autoComplete="off"
          />
          <button type="submit" className="search-btn" disabled={isLoading || !query.trim()}>
            {isLoading ? 'Processing' : 'Analyse'}
          </button>
        </form>

        {!compact && (
          <div className="quick-row">
            <span className="quick-label-txt">Try —</span>
            {QUICK_QUERIES.map(q => (
              <button
                key={q}
                className="chip"
                onClick={() => useQuick(q)}
                disabled={isLoading}
                type="button"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
