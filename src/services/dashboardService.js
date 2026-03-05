const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getDashboardStats(token) {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch dashboard stats')
  return res.json()
}
