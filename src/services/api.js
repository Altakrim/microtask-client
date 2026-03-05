const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function register(name, email, password, role, photoURL) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, photoURL })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Registration failed')
  }
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Login failed')
  }
  return res.json()
}

export function getAuthHeader(token) {
  return { Authorization: `Bearer ${token}` }
}
