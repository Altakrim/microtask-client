const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getCoinPackages() {
  const res = await fetch(`${API_URL}/payments/packages`)
  if (!res.ok) throw new Error('Failed to fetch packages')
  return res.json()
}

export async function purchaseCoins(coins, amount, token) {
  const res = await fetch(`${API_URL}/payments/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ coins, amount })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to purchase coins')
  }
  return res.json()
}

export async function getPaymentHistory(token) {
  const res = await fetch(`${API_URL}/payments/history`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch payment history')
  return res.json()
}
