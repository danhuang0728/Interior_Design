import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmartCustomization from './components/SmartCustomization'
import logo from './img/logo.jpg'
import './App.css'
import './mainDesign.css'

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

        <section className="hexagon-section">
          <h2 className="hexagon-section-title">設計師介紹</h2>
          <div className="hexagon-grid">
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=1" alt="案例 1" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=2" alt="案例 2" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=3" alt="案例 3" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=4" alt="案例 4" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=5" alt="案例 5" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=6" alt="案例 6" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=7" alt="案例 7" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=8" alt="案例 8" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=9" alt="案例 9" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=10" alt="案例 10" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=11" alt="案例 11" /></div>
            <div className="hexagon"><img src="https://picsum.photos/400/400?random=12" alt="案例 12" /></div>
          </div>
        </section>
      </main>
      <footer className="footer">
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
