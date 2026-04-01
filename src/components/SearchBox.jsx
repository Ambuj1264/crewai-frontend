import React from 'react'

const QUICK = [
  'Best laptop under ₹1 lakh for coding',
  'Gaming laptop ₹80K budget',
  'MacBook alternative for devs',
  'Budget gaming laptop ₹60K',
]

export default function SearchBox({ onSearch, isLoading }) {
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
    <section className="search-section">
      <div className="container">
        <div className="search-label-row">
          <span className="search-label-number">01</span>
          <span className="search-label-text">Describe what you need</span>
        </div>

        <form className="search-form" onSubmit={submit} id="search-form">
          <input
            id="query-input"
            className="search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='"Best laptop under ₹1 lakh for coding and gaming"'
            disabled={isLoading}
            autoFocus
            autoComplete="off"
          />
          <button
            id="search-submit-btn"
            type="submit"
            className="search-btn"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Analyzing…' : (
              <> Analyse <span className="arrow">→</span> </>
            )}
          </button>
        </form>

        <div className="quick-row">
          <span className="quick-prefix">Try —</span>
          {QUICK.map(q => (
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
      </div>
    </section>
  )
}
