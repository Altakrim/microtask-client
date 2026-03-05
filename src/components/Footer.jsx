import React from 'react'
import '../styles/footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>💼 MicroTask</h3>
          <p>Earn money by completing micro tasks</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
              GitHub
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 MicroTask Platform. All rights reserved.</p>
      </div>
    </footer>
  )
}
