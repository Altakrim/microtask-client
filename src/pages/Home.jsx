import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import '../styles/home.css'

export function Home() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="home-container">
        {/* Hero Section with Banner Slider */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to MicroTask Earning Platform</h1>
            <p>Complete small tasks and earn real money instantly</p>
            <button onClick={() => navigate('/register')} className="cta-btn">
              Get Started
            </button>
          </div>
        </section>

        {/* Best Workers Section */}
        <section className="best-workers">
          <h2>Top Workers</h2>
          <div className="workers-grid">
            {/* Placeholder - will be populated from API */}
            <div className="worker-card">
              <div className="worker-avatar">👤</div>
              <h3>Worker Name</h3>
              <p>💰 1000 coins</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Great platform to earn some extra money"</p>
              <span>- Happy Worker</span>
            </div>
          </div>
        </section>

        {/* Extra Sections */}
        <section className="extra-section-1">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Register</h3>
              <p>Create an account as a Worker or Buyer</p>
            </div>
            <div className="step">
              <h3>2. Start Earning</h3>
              <p>Complete tasks or post tasks to earn coins</p>
            </div>
            <div className="step">
              <h3>3. Withdraw</h3>
              <p>Withdraw your earnings to your account</p>
            </div>
          </div>
        </section>

        <section className="extra-section-2">
          <h2>Features</h2>
          <ul>
            <li>✅ Easy task completion</li>
            <li>✅ Fast payments</li>
            <li>✅ Secure platform</li>
            <li>✅ 24/7 support</li>
          </ul>
        </section>

        <section className="extra-section-3">
          <h2>Why Choose Us?</h2>
          <p>We offer the most transparent and fair microtasking platform with instant payouts and genuine opportunities.</p>
        </section>
      </div>
    </Layout>
  )
}
