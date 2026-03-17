import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmartCustomization from './components/SmartCustomization'
import logo from './img/logo.jpg'
import './App.css'

function Home() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="hero-placeholder">
          <h1>泰金閣設計裝修工作室</h1>
          <p>探索專屬您的居家美學</p>
          <img src={logo} alt="泰金閣設計裝修工作室" className="hero-img" />
        </div>
      </main>
      <footer className='footer' style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/smart-customization" element={<SmartCustomization />} />
    </Routes>
  )
}

export default App
