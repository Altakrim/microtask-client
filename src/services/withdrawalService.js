const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function requestWithdrawal(coins, paymentSystem, accountNumber, token) {
  const res = await fetch(`${API_URL}/withdrawals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ coins, payment_system: paymentSystem, account_number: accountNumber })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to request withdrawal')
  }
  return res.json()
}

export async function getWithdrawalHistory(token) {
  const res = await fetch(`${API_URL}/withdrawals/worker/history`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch withdrawal history')
  return res.json()
}

export async function getPendingWithdrawals(token) {
  const res = await fetch(`${API_URL}/withdrawals/admin/pending`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch withdrawals')
  return res.json()
}

export async function approveWithdrawal(id, token) {
  const res = await fetch(`${API_URL}/withdrawals/${id}/approve`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to approve withdrawal')
  return res.json()
}

export async function rejectWithdrawal(id, token) {
  const res = await fetch(`${API_URL}/withdrawals/${id}/reject`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to reject withdrawal')
  return res.json()
}
