import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import '../styles/layout.css'

export function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
