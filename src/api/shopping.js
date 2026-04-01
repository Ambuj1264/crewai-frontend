/**
 * API client for the AI Shopping Assistant backend.
 */

const API_BASE = '/recommend'

/**
 * Send a shopping query to the backend and return structured results.
 * @param {string} query - User's natural language query
 * @returns {Promise<object>} - { products, comparison, reviews, recommendation, elapsed_seconds }
 */
export async function getRecommendations(query) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    let errorMsg = `Server error: ${response.status}`
    try {
      const err = await response.json()
      errorMsg = err.detail || errorMsg
    } catch {}
    throw new Error(errorMsg)
  }

  return response.json()
}
