export default function LoadingState() {
  return (
    <div className="loading-wrap">
      <p className="loading-title">Agents at work…</p>

      <div className="agent-sequence">
        <div className="seq-agent">
          <div className="agent-box active">🔎</div>
          <span className="agent-name">Finder</span>
        </div>
        <div className="seq-connector" />

        <div className="seq-agent">
          <div className="agent-box">⚖️</div>
          <span className="agent-name">Compare</span>
        </div>
        <div className="seq-connector" />

        <div className="seq-agent">
          <div className="agent-box">⭐</div>
          <span className="agent-name">Reviews</span>
        </div>
        <div className="seq-connector" />

        <div className="seq-agent">
          <div className="agent-box">🏆</div>
          <span className="agent-name">Advisor</span>
        </div>
      </div>

      <p className="loading-sub">
        Four specialist agents are searching, comparing, analysing reviews,
        and crafting your personalised recommendation.
      </p>

      <div className="loading-progress">
        <div className="loading-progress-bar" />
      </div>
    </div>
  )
}
