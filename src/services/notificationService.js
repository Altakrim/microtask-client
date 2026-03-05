const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getNotifications(token) {
  const res = await fetch(`${API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch notifications')
  return res.json()
}

export async function markAsRead(notificationId, token) {
  const res = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to mark notification')
  return res.json()
}

export async function deleteNotification(notificationId, token) {
  const res = await fetch(`${API_URL}/notifications/${notificationId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete notification')
  return res.json()
}
