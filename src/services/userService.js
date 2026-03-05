const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getCurrentUser(token) {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function getAllUsers(token) {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function updateUserRole(userId, role, token) {
  const res = await fetch(`${API_URL}/users/role/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ role })
  })
  if (!res.ok) throw new Error('Failed to update user role')
  return res.json()
}

export async function deleteUser(userId, token) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete user')
  return res.json()
}
