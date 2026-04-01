import React from 'react'

export default function LoadingState() {
  const [step, setStep] = React.useState(0)

  // Fake pipeline progression for UI feedback
  React.useEffect(() => {
    const sequence = [
      { t: 0, s: 0 },
      { t: 800, s: 1 },
      { t: 2200, s: 2 },
      { t: 3500, s: 3 }
    ]
    const triggers = sequence.map(item => 
      setTimeout(() => setStep(item.s), item.t)
    )
    return () => triggers.forEach(clearTimeout)
  }, [])

  return (
    <div className="loading-wrap">
      <div className="c">
        <div className="loading-pipeline reveal">
          <div className={`pipeline-step ${step >= 0 ? 'active' : ''}`}>
            <p className="step-num">Agent 01</p>
            <p className="step-name">Product Finder</p>
            <p className="step-desc">Scanning the catalog for exact matches.</p>
          </div>
          
          <div className={`pipeline-step ${step >= 1 ? 'active' : ''}`}>
             <p className="step-num">Agent 02</p>
             <p className="step-name">Compare</p>
             <p className="step-desc">Normalizing specs and scoring candidates.</p>
          </div>

          <div className={`pipeline-step ${step >= 2 ? 'active' : ''}`}>
             <p className="step-num">Agent 03</p>
             <p className="step-name">Reviews</p>
             <p className="step-desc">Running sentiment analysis on feedback.</p>
          </div>

          <div className={`pipeline-step ${step >= 3 ? 'active' : ''}`}>
             <p className="step-num">Agent 04</p>
             <p className="step-name">Advisor</p>
             <p className="step-desc">Synthesizing final recommendation.</p>
          </div>
        </div>

        <div className="loading-text-area reveal d2">
          <span className="loading-prefix">System</span>
          <span className="loading-msg">Executing sequential multi-agent pipeline<span className="cursor-blink"></span></span>
        </div>
        
        <div className="progress-track reveal d3">
          <div className="progress-fill" />
        </div>
      </div>
    </div>
  )
}
