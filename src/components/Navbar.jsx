import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/navbar.css'

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💼 MicroTask
        </Link>

        <div className="navbar-menu">
          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span className="nav-coin">💰 {user?.coin || 0} coins</span>
              <div className="nav-profile-dropdown">
                <button className="nav-profile-btn">{user?.name}</button>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                Join as Developer
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
