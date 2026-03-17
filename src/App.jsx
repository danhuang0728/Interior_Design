import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Inquiry from './pages/Inquiry'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inquiry" element={<Inquiry />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
