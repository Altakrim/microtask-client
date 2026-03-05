import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import * as userService from '../services/userService'
import '../styles/home.css'

export function Home() {
  const [topWorkers, setTopWorkers] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const slides = [
    {
      title: 'Earn Money Online',
      description: 'Complete easy micro-tasks and earn coins',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Post Tasks Instantly',
      description: 'Create tasks and get workers to complete them',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Withdraw Your Earnings',
      description: 'Convert coins to cash and withdraw anytime',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ]

  const features = [
    '✅ Easy micro-tasks that anyone can complete',
    '✅ Instant coin rewards for completed work',
    '✅ Post unlimited tasks and find workers',
    '✅ Secure payment system with real withdrawals',
    '✅ 24/7 platform access from anywhere',
    '✅ Real-time notifications and updates',
    '✅ No hidden fees or charges',
    '✅ Fast withdrawal processing',
    '✅ Community of verified workers',
    '✅ Mobile-friendly responsive design'
  ]

  useEffect(() => {
    fetchTopWorkers()
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [])

  const fetchTopWorkers = async () => {
    try {
      setLoading(true)
      const workers = await userService.getTopWorkers()
      setTopWorkers(workers || [])
    } catch (err) {
      console.error('Failed to fetch top workers:', err)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <Layout>
      <div className="home-container">
        {/* Hero Slider */}
        <section className="hero-slider">
          <div className="slides-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ background: slide.gradient }}
              >
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <Link to="/register" className="cta-btn">
                    Get Started Today
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav prev" onClick={prevSlide}>❮</button>
          <button className="slider-nav next" onClick={nextSlide}>❯</button>

          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Top Workers Section */}
        <section className="best-workers">
          <h2>Top 6 Workers - Our Best Performers</h2>
          <p className="section-subtitle">Meet our most successful earners</p>

          {loading ? (
            <div className="loading">Loading top workers...</div>
          ) : topWorkers.length > 0 ? (
            <div className="workers-grid">
              {topWorkers.map((worker) => (
                <div key={worker._id} className="worker-card">
                  <div className="worker-avatar">
                    {worker.photoURL ? (
                      <img src={worker.photoURL} alt={worker.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {worker.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h3>{worker.name}</h3>
                  <p className="worker-coins">💰 {worker.coin.toLocaleString()} coins</p>
                  <p className="worker-email">{worker.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>Check back soon for top performers!</p>
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How It Works - Simple 3 Steps</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register & Verify</h3>
              <p>Sign up with your email and verify your account in seconds</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Find Tasks or Post Work</h3>
              <p>Browse available tasks or create your own for others to complete</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Earn & Withdraw</h3>
              <p>Complete work, earn coins, and withdraw to your payment method</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Choose Our Platform?</h2>
          <p className="section-subtitle">10+ reasons to join our community</p>
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "I've earned $500 in just 2 months! The tasks are easy and payments are always on time."
              </p>
              <p className="testimonial-author">- Sarah Ahmed, Worker</p>
            </div>

            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Great platform to outsource tasks. Found reliable workers quickly and saved time on my business."
              </p>
              <p className="testimonial-author">- Mark Johnson, Buyer</p>
            </div>

            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Super easy to use! Completed my first task in 10 minutes and got paid instantly."
              </p>
              <p className="testimonial-author">- Emma Wilson, New User</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Start Earning?</h2>
            <p>Join thousands of workers and buyers on our platform today</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                Create Free Account
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
