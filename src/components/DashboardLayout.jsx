import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/dashboard-layout.css'

export function DashboardLayout({ children }) {
  const { user } = useAuth()

  const workerNav = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Task List', path: '/dashboard/tasks' },
    { label: 'My Submissions', path: '/dashboard/submissions' },
    { label: 'Withdrawals', path: '/dashboard/withdrawals' }
  ]

  const buyerNav = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Add Task', path: '/dashboard/add-task' },
    { label: 'My Tasks', path: '/dashboard/my-tasks' },
    { label: 'Task Reviews', path: '/dashboard/reviews' },
    { label: 'Purchase Coin', path: '/dashboard/purchase-coin' },
    { label: 'Payment History', path: '/dashboard/payments' }
  ]

  const adminNav = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Manage Users', path: '/dashboard/users' },
    { label: 'Manage Tasks', path: '/dashboard/manage-tasks' },
    { label: 'Withdrawal Requests', path: '/dashboard/withdrawals' }
  ]

  let nav = []
  if (user?.role === 'worker') nav = workerNav
  else if (user?.role === 'buyer') nav = buyerNav
  else if (user?.role === 'admin') nav = adminNav

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <div className="dashboard-logo">💼 MicroTask</div>
        <div className="dashboard-user-info">
          <span className="user-coin">💰 {user?.coin || 0}</span>
          <span className="user-role">{user?.role}</span>
          <span className="user-name">{user?.name}</span>
        </div>
      </div>

      <div className="dashboard-container">
        <nav className="dashboard-sidebar">
          {nav.map((item) => (
            <Link key={item.path} to={item.path} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="dashboard-content">
          {children}
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2026 MicroTask Platform</p>
      </footer>
    </div>
  )
}
