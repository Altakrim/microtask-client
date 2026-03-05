const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function createSubmission(taskId, details, token) {
  const res = await fetch(`${API_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ task_id: taskId, submission_details: details })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to submit task')
  }
  return res.json()
}

export async function getMySubmissions(page = 1, token) {
  const res = await fetch(`${API_URL}/submissions/worker/my-submissions?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch submissions')
  return res.json()
}

export async function getBuyerSubmissionsToReview(token) {
  const res = await fetch(`${API_URL}/submissions/buyer/to-review`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch submissions')
  return res.json()
}

export async function approveSubmission(submissionId, token) {
  const res = await fetch(`${API_URL}/submissions/${submissionId}/approve`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to approve submission')
  return res.json()
}

export async function rejectSubmission(submissionId, token) {
  const res = await fetch(`${API_URL}/submissions/${submissionId}/reject`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to reject submission')
  return res.json()
}
