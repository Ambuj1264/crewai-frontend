import React from 'react'
import SearchBox from './components/SearchBox'
import LoadingState from './components/LoadingState'
import ProductCards from './components/ProductCards'
import ComparisonTable from './components/ComparisonTable'
import ReviewInsights from './components/ReviewInsights'
import RecommendationCard from './components/RecommendationCard'
import { getRecommendations } from './api/shopping'

const TABS = [
  { id: 'products',       label: '01 / Products' },
  { id: 'comparison',     label: '02 / Matrix' },
  { id: 'reviews',        label: '03 / Reviews' },
  { id: 'recommendation', label: '04 / Output' },
]

export default function App() {
  const [page, setPage] = React.useState('home') // 'home', 'search', 'results'
  const [loading, setLoading] = React.useState(false)
  const [error,   setError]   = React.useState(null)
  const [data,    setData]    = React.useState(null)
  const [tab,     setTab]     = React.useState('products')
  const resultsRef = React.useRef(null)

  async function handleSearch(query) {
    setPage('results')
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await getRecommendations(query)
      setData(result)
      setTab('products')
    } catch (e) {
      setError(e.message || 'System error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isIdle = !loading && !data && !error;

  return (
    <div className="app-container">
      <div className="main-content">
      {/* ── NAV ── */}
      <nav className="nav reveal">
        <div className="c nav-inner">
          <div 
            className="nav-logo" 
            style={{ cursor: 'pointer' }}
            onClick={() => setPage('home')}
          >
            ShopMind<span>.ai</span>
          </div>
          <div className="nav-status">
            <div className="nav-dot" />
            Agents Online
          </div>
        </div>
      </nav>

      {/* ── PAGE 1: HERO (HOME) ── */}
      {page === 'home' && (
        <header className="hero">
          <div className="c">
            
            <h1 className="hero-h1 reveal d1">
              <span className="line1">Your autonomous</span>
              <span className="line2">shopping pipeline.</span>
            </h1>

            <div className="hero-body reveal d2">
              <p className="hero-desc">
                Define your parameters. A specialized crew of four AI agents will sequentially search, compare, analyze sentiment, and synthesize the optimal recommendation.
                
                <br /><br />
                <button 
                  className="search-btn" 
                  style={{ display: 'inline-block', borderRadius: 'var(--radius-md)' }}
                  onClick={() => setPage('search')}
                >
                  Configure Agents
                </button>
              </p>

              <div className="hero-stats">
                <div className="stat-cell">
                  <p className="stat-n">04</p>
                  <p className="stat-l">Active Agents</p>
                </div>
                <div className="stat-cell" style={{ background: 'var(--cyan-ghost)'}}>
                  <p className="stat-n" style={{ color: 'var(--white)'}}>~12</p>
                  <p className="stat-l">Sec Latency</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ── PAGE 2: SEARCH ── */}
      {page === 'search' && (
        <div className="reveal">
          <SearchBox onSearch={handleSearch} isLoading={false} compact={false} />
        </div>
      )}

      {/* ── PAGE 3: RESULTS / LOADING ── */}
      {page === 'results' && (
        <>
          {/* Persist the search box at the top in compact mode so they remember their query */}
          <div className="reveal">
            <SearchBox onSearch={handleSearch} isLoading={loading} compact={true} />
          </div>

          {/* ── LOADING ── */}
          {loading && <LoadingState />}

          {/* ── ERROR ── */}
          {error && !loading && (
            <div className="c reveal" style={{ marginTop: 'var(--space-group)'}}>
              <div className="error-box">
                <p className="error-title">SYSTEM FAILURE</p>
                <p className="error-msg">{error}</p>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {data && !loading && (
            <section className="results-section" ref={resultsRef}>
              <div className="c">
                
                <div className="meta-bar reveal">
                  <span className="meta-query">
                    Target: <strong>"{data.query}"</strong>
                  </span>
                  {data.elapsed_seconds && (
                    <span className="meta-time">Processed in {data.elapsed_seconds}s</span>
                  )}
                </div>

                <nav className="tabs reveal d1">
                  {TABS.map(t => {
                    const count = t.id === 'products' ? data.products?.length :
                                  t.id === 'reviews'  ? data.reviews?.length : null;
                    return (
                      <button
                        key={t.id}
                        className={`tab-btn ${tab === t.id ? 'active' : ''}`}
                        onClick={() => setTab(t.id)}
                      >
                        {t.label}
                        {count > 0 && <span className="tab-count">{count}</span>}
                      </button>
                    )
                  })}
                </nav>

                <div className="reveal d2">
                  {tab === 'products' && (
                    <div>
                      <div className="sec-header">
                        <span className="sec-n">01</span>
                        <div>
                          <p className="sec-t">Initial Cohort</p>
                          <p className="sec-s">Identified by the Product Finder agent</p>
                        </div>
                      </div>
                      <ProductCards products={data.products} />
                    </div>
                  )}

                  {tab === 'comparison' && (
                    <div>
                      <div className="sec-header">
                        <span className="sec-n">02</span>
                        <div>
                          <p className="sec-t">Comparison Matrix</p>
                          <p className="sec-s">Processed attributes scored out of 10</p>
                        </div>
                      </div>
                      <ComparisonTable comparison={data.comparison} />
                    </div>
                  )}

                  {tab === 'reviews' && (
                    <div>
                      <div className="sec-header">
                        <span className="sec-n">03</span>
                        <div>
                          <p className="sec-t">Sentiment Analysis</p>
                          <p className="sec-s">Distilled from human feedback datasets</p>
                        </div>
                      </div>
                      <ReviewInsights reviews={data.reviews} />
                    </div>
                  )}

                  {tab === 'recommendation' && (
                    <div>
                      <div className="sec-header">
                        <span className="sec-n">04</span>
                        <div>
                          <p className="sec-t">Synthesis</p>
                          <p className="sec-s">The final judgment</p>
                        </div>
                      </div>
                      <RecommendationCard recommendation={data.recommendation} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer reveal">
        <div className="c footer-inner">
          <span className="footer-brand">ShopMind<span>.ai</span></span>
          <span className="footer-stack">
            <span>FastAPI</span>
            <span>React</span>
            <span>Agentic Orchestration</span>
          </span>
          <span className="footer-copy">
            Engineered by <a href="https://www.linkedin.com/in/heyambujsingh/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>Ambuj Singh</a>
            <span style={{ margin: '0 10px', opacity: 0.3 }}>|</span>
            V1.0 // {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  )
}
