import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function Home(){
  return <div className="page"><h1>Micro Task & Earning Platform</h1><p>Welcome — scaffolded app.</p></div>
}
function Login(){
  return <div className="page"><h2>Login</h2></div>
}
function Register(){
  return <div className="page"><h2>Register</h2></div>
}

export default function App(){
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  )
}
