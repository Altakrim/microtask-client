import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { useAuth } from '../hooks/useAuth'
import * as taskService from '../services/taskService'
import * as submissionService from '../services/submissionService'
import * as paymentService from '../services/paymentService'
import * as withdrawalService from '../services/withdrawalService'
import * as userService from '../services/userService'
import '../styles/dashboard-pages.css'

export function TaskList() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await taskService.fetchTasks(token)
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <DashboardLayout><div>Loading tasks...</div></DashboardLayout>
  if (error) return <DashboardLayout><div className="error-message">{error}</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Available Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div className="tasks-grid">
            {tasks.map(task => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.detail}</p>
                <div className="task-info">
                  <span>💰 {task.payable_amount} coins</span>
                  <span>👥 {task.required_workers} workers needed</span>
                </div>
                <button className="btn-primary" onClick={() => window.location.href = `/task/${task._id}`}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export function MySubmissions() {
  const { token } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [page])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const data = await submissionService.getMySubmissions(page, token)
      setSubmissions(data.submissions)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>My Submissions</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s._id}>
                    <td>{s.task_title}</td>
                    <td>{s.payable_amount} coins</td>
                    <td><span className={`status ${s.status}`}>{s.status}</span></td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {total > 10 && (
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>Page {page}</span>
                <button disabled={page * 10 >= total} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export function Withdrawals() {
  const { user, token } = useAuth()
  const [coins, setCoins] = useState('')
  const [paymentSystem, setPaymentSystem] = useState('Stripe')
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const data = await withdrawalService.getWithdrawalHistory(token)
      setHistory(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await withdrawalService.requestWithdrawal(parseInt(coins), paymentSystem, accountNumber, token)
      setMessage('Withdrawal request submitted successfully!')
      setCoins('')
      setAccountNumber('')
      fetchHistory()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const withdrawAmount = coins ? (parseInt(coins) / 20).toFixed(2) : '0.00'
  const canWithdraw = user && user.coin >= 200

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Withdrawals</h2>
        <div className="withdrawal-section">
          <div className="stats">
            <p>Available Coins: <strong>{user?.coin || 0}</strong></p>
            <p>Withdrawal Rate: <strong>20 coins = $1</strong></p>
            <p>Available to Withdraw: <strong>${(user?.coin / 20).toFixed(2)}</strong></p>
          </div>

          {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

          <form onSubmit={handleSubmit} className="withdrawal-form">
            <div className="form-group">
              <label>Coins to Withdraw</label>
              <input
                type="number"
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                min="200"
                max={user?.coin || 0}
                required
              />
              <small>Minimum: 200 coins ($10)</small>
            </div>

            <div className="form-group">
              <label>Withdrawal Amount</label>
              <input type="text" value={`$${withdrawAmount}`} disabled />
            </div>

            <div className="form-group">
              <label>Payment System</label>
              <select value={paymentSystem} onChange={(e) => setPaymentSystem(e.target.value)}>
                <option>Stripe</option>
                <option>Bkash</option>
                <option>Rocket</option>
                <option>Nagad</option>
              </select>
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>

            {!canWithdraw ? (
              <p className="insufficient">Insufficient coins. Minimum 200 coins required.</p>
            ) : (
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Processing...' : 'Request Withdrawal'}
              </button>
            )}
          </form>

          {history.length > 0 && (
            <>
              <h3>Withdrawal History</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Coins</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(w => (
                    <tr key={w._id}>
                      <td>${w.amount}</td>
                      <td>{w.coins}</td>
                      <td><span className={`status ${w.status}`}>{w.status}</span></td>
                      <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export function AddTask() {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    required_workers: '',
    payable_amount: '',
    completion_date: '',
    submission_info: '',
    task_image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await taskService.createTask(formData, token)
      setMessage('Task created successfully!')
      setFormData({
        title: '', detail: '', required_workers: '', payable_amount: '',
        completion_date: '', submission_info: '', task_image_url: ''
      })
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Add New Task</h2>
        {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Task Description</label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Workers Needed</label>
              <input
                type="number"
                name="required_workers"
                value={formData.required_workers}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Payment per Worker (coins)</label>
              <input
                type="number"
                name="payable_amount"
                value={formData.payable_amount}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Completion Date</label>
            <input
              type="date"
              name="completion_date"
              value={formData.completion_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>What to Submit</label>
            <input
              type="text"
              name="submission_info"
              value={formData.submission_info}
              onChange={handleChange}
              placeholder="e.g., Screenshot, Link, Text"
              required
            />
          </div>

          <div className="form-group">
            <label>Task Image URL</label>
            <input
              type="text"
              name="task_image_url"
              value={formData.task_image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export function MyTasks() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const data = await taskService.getMyTasks(token)
      setTasks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task and refund coins?')) {
      try {
        await taskService.deleteTask(id, token)
        fetchTasks()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks created</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Workers</th>
                <th>Payment</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.required_workers}</td>
                  <td>{t.payable_amount} coins</td>
                  <td>{new Date(t.completion_date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(t._id)} className="btn-danger btn-small">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export function TaskReviews() {
  const { token } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const data = await submissionService.getBuyerSubmissionsToReview(token)
      setSubmissions(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await submissionService.approveSubmission(id, token)
      setMessage('Submission approved!')
      fetchSubmissions()
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleReject = async (id) => {
    try {
      await submissionService.rejectSubmission(id, token)
      setMessage('Submission rejected!')
      fetchSubmissions()
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Task Reviews</h2>
        {message && <div className="message">{message}</div>}
        {submissions.length === 0 ? (
          <p>No submissions to review</p>
        ) : (
          <div className="reviews-list">
            {submissions.map(s => (
              <div key={s._id} className="review-card">
                <h3>{s.task_title}</h3>
                <p><strong>Worker:</strong> {s.worker_name}</p>
                <p><strong>Submission:</strong> {s.submission_details}</p>
                <p><strong>Payment:</strong> {s.payable_amount} coins</p>
                <div className="action-buttons">
                  <button onClick={() => handleApprove(s._id)} className="btn-success btn-small">Approve</button>
                  <button onClick={() => handleReject(s._id)} className="btn-danger btn-small">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export function PurchaseCoin() {
  const { token } = useAuth()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await paymentService.getCoinPackages()
      setPackages(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handlePurchase = async (coins, amount) => {
    setLoading(true)
    try {
      const result = await paymentService.purchaseCoins(coins, amount, token)
      setMessage(result.message)
      setTimeout(() => window.location.reload(), 2000)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Purchase Coins</h2>
        {message && <div className="message">{message}</div>}

        <div className="packages-grid">
          {packages.map(p => (
            <div key={p.id} className="package-card">
              <h3>{p.coins} Coins</h3>
              <p className="price">${p.amount}</p>
              <button
                onClick={() => handlePurchase(p.coins, p.amount)}
                disabled={loading}
                className="btn-primary"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export function PaymentHistory() {
  const { token } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const data = await paymentService.getPaymentHistory(token)
      setPayments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Payment History</h2>
        {payments.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Coins</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id}>
                  <td>{p.coins}</td>
                  <td>${p.amount}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export function ManageUsers() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers(token)
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      await userService.updateUserRole(id, newRole, token)
      fetchUsers()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await userService.deleteUser(id, token)
        fetchUsers()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Manage Users</h2>
        {users.length === 0 ? (
          <p>No users</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Coins</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    >
                      <option>worker</option>
                      <option>buyer</option>
                      <option>admin</option>
                    </select>
                  </td>
                  <td>{u.coin}</td>
                  <td>
                    <button onClick={() => handleDelete(u._id)} className="btn-danger btn-small">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export function ManageTasks() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllTasks()
  }, [])

  const fetchAllTasks = async () => {
    try {
      const data = await taskService.fetchTasks(token)
      setTasks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskService.deleteTask(id, token)
        fetchAllTasks()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>Manage Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Workers</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.required_workers}</td>
                  <td>{t.payable_amount} coins</td>
                  <td>
                    <button onClick={() => handleDelete(t._id)} className="btn-danger btn-small">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export function Profile() {
  const { user, token } = useAuth()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setUserDetails(user)
      setLoading(false)
    }
  }, [user])

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2>User Profile</h2>
        {userDetails && (
          <div className="profile-card">
            <div className="profile-info">
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Role:</strong> {userDetails.role}</p>
              <p><strong>Available Coins:</strong> {userDetails.coin}</p>
              <p><strong>Member Since:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
