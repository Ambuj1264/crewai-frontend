import React from 'react'
import SearchBox from './components/SearchBox'
import LoadingState from './components/LoadingState'
import ProductCards from './components/ProductCards'
import ComparisonTable from './components/ComparisonTable'
import ReviewInsights from './components/ReviewInsights'
import RecommendationCard from './components/RecommendationCard'
import { getRecommendations } from './api/shopping'

const TABS = [
  { id: 'products',       label: 'Products',       icon: '—', count: d => d?.products?.length },
  { id: 'comparison',     label: 'Comparison',     icon: '—', count: null },
  { id: 'reviews',        label: 'Reviews',        icon: '—', count: d => d?.reviews?.length },
  { id: 'recommendation', label: 'Recommendation', icon: '—', count: null },
]

export default function App() {
  const [loading, setLoading] = React.useState(false)
  const [error,   setError]   = React.useState(null)
  const [data,    setData]    = React.useState(null)
  const [tab,     setTab]     = React.useState('products')
  const resultsRef = React.useRef(null)

  async function handleSearch(query) {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await getRecommendations(query)
      setData(result)
      setTab('products')
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-corner" />
        <div className="hero-corner-bl" />
        <div className="hero-inner">
          <div className="container">
            {/* Rule + issue tag */}
            <div className="hero-rule">
              <div className="hero-rule-line" />
              <span className="hero-issue">ShopMind AI · Multi-Agent Edition</span>
              <div className="hero-rule-line" />
            </div>

            {/* Split headline */}
            <div className="hero-headline">
              <h1 className="hero-h1">
                Your intelligent<br />
                <em>shopping</em><br />
                companion.
              </h1>

              <div className="hero-right-col">
                <p className="hero-sub">
                  Ask in plain language. Four specialist AI agents search, compare,
                  analyse reviews, and recommend — in one shot.
                </p>
                <div className="agent-pills">
                  <span className="agent-pill">Finder</span>
                  <span className="agent-pill">Compare</span>
                  <span className="agent-pill">Review</span>
                  <span className="agent-pill">Advisor</span>
                </div>
              </div>
            </div>

            <div className="hero-bottom">
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">4</span>
                  <span className="stat-lbl">AI Agents</span>
                </div>
                <div className="stat">
                  <span className="stat-num">7+</span>
                  <span className="stat-lbl">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-num">∞</span>
                  <span className="stat-lbl">Queries</span>
                </div>
              </div>
              <p className="hero-tagline">
                "The right choice, reasoned for you."
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── SEARCH ── */}
      <SearchBox onSearch={handleSearch} isLoading={loading} />

      {/* ── LOADING ── */}
      {loading && <LoadingState />}

      {/* ── ERROR ── */}
      {error && !loading && (
        <div className="container">
          <div className="error-box">
            <span className="error-icon">⚠</span>
            <div>
              <p className="error-title">Analysis failed</p>
              <p className="error-detail">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {data && !loading && (
        <section className="results-section" ref={resultsRef}>
          <div className="container">
            {/* Meta */}
            <div className="meta-bar">
              <span className="query-display">
                Results for <strong>"{data.query}"</strong>
              </span>
              {data.elapsed_seconds && (
                <span className="time-badge">⏱ {data.elapsed_seconds}s</span>
              )}
            </div>

            {/* Tabs */}
            <nav className="tabs" role="tablist">
              {TABS.map(t => {
                const count = t.count ? t.count(data) : null
                return (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={tab === t.id}
                    className={`tab${tab === t.id ? ' active' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                    {count > 0 && <span className="tab-count">{count}</span>}
                  </button>
                )
              })}
            </nav>

            {/* Products */}
            {tab === 'products' && (
              <div role="tabpanel">
                <div className="sec-head">
                  <span className="sec-num">01</span>
                  <div className="sec-copy">
                    <p className="sec-title">Matching Products</p>
                    <p className="sec-sub">{data.products?.length || 0} selections for your query</p>
                  </div>
                </div>
                <ProductCards products={data.products} />
              </div>
            )}

            {/* Comparison */}
            {tab === 'comparison' && (
              <div role="tabpanel">
                <div className="sec-head">
                  <span className="sec-num">02</span>
                  <div className="sec-copy">
                    <p className="sec-title">Side-by-Side Comparison</p>
                    <p className="sec-sub">Scored across key criteria by the Compare Agent</p>
                  </div>
                </div>
                <ComparisonTable comparison={data.comparison} />
              </div>
            )}

            {/* Reviews */}
            {tab === 'reviews' && (
              <div role="tabpanel">
                <div className="sec-head">
                  <span className="sec-num">03</span>
                  <div className="sec-copy">
                    <p className="sec-title">Review Insights</p>
                    <p className="sec-sub">Customer sentiment decoded by the Review Agent</p>
                  </div>
                </div>
                <ReviewInsights reviews={data.reviews} />
              </div>
            )}

            {/* Recommendation */}
            {tab === 'recommendation' && (
              <div role="tabpanel">
                <div className="sec-head">
                  <span className="sec-num">04</span>
                  <div className="sec-copy">
                    <p className="sec-title">AI Recommendation</p>
                    <p className="sec-sub">Your personalised best pick with full reasoning</p>
                  </div>
                </div>
                <RecommendationCard recommendation={data.recommendation} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-brand">ShopMind AI</span>
            <span className="footer-note">© {new Date().getFullYear()} · All results are AI-generated</span>
            <div className="footer-stack">
              <span>CrewAI</span> · <span>FastAPI</span> · <span>React</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
