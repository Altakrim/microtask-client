import React from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { useAuth } from '../hooks/useAuth'

export function Dashboard() {
  const { user } = useAuth()

  if (user?.role === 'worker') {
    return (
      <DashboardLayout>
        <div className="dashboard-home">
          <h2>Worker Dashboard</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Submissions</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Pending Submissions</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Total Earnings</h3>
              <p className="stat-number">${(user?.coin / 20).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (user?.role === 'buyer') {
    return (
      <DashboardLayout>
        <div className="dashboard-home">
          <h2>Buyer Dashboard</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Pending Tasks</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Total Spent</h3>
              <p className="stat-number">${((1000 - user?.coin) / 50).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (user?.role === 'admin') {
    return (
      <DashboardLayout>
        <div className="dashboard-home">
          <h2>Admin Dashboard</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h3>Platform Coins</h3>
              <p className="stat-number">0</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return <DashboardLayout><p>Dashboard</p></DashboardLayout>
}
