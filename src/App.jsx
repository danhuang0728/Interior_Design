import Navbar from './components/Navbar'
import house1 from './img/house1.jpg'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      {/* 主內容區佔位 - 之後可以在這裡新增頁面內容 */}
      <main className="main-content">
        <div className="hero-placeholder">
          <h1>泰金閣設計裝修工作室</h1>
          <p>探索專屬您的居家美學</p>
          <img src={house1} alt="泰金閣設計裝修工作室" className="hero-img" />
        </div>
      </main>
      <footer className='footer' style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
