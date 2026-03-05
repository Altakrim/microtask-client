const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function fetchTasks(token) {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function fetchTaskById(id, token) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch task')
  return res.json()
}

export async function createTask(task, token) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to create task')
  }
  return res.json()
}

export async function updateTask(id, task, token) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function deleteTask(id, token) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete task')
  return res.json()
}

export async function getMyTasks(token) {
  const res = await fetch(`${API_URL}/tasks/my-tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}
