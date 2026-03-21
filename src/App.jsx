import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmartCustomization from './components/SmartCustomization'
import SmartCustomizationDetail from './pages/SmartCustomizationDetail'
import Refurbishment from './components/Refurbishment'
import RefurbishmentDetail from './pages/RefurbishmentDetail'
import Inquiry from './pages/Inquiry'
import PresaleList from './pages/PresaleList'
import PresaleDetail from './pages/PresaleDetail'
import Home from './pages/Home'
import './App.css'
import './mainDesign.css'

function InquiryView() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Inquiry />
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
      <Route path="/inquiry" element={<InquiryView />} />
      <Route path="/smart-customization" element={<SmartCustomization />} />
      <Route path="/presale" element={<PresaleList />} />
      <Route path="/presale/:id" element={<PresaleDetail />} />
      <Route path="/smart-customization/:id" element={<SmartCustomizationDetail />} />
      <Route path="/refurbishment" element={<Refurbishment />} />
      <Route path="/refurbishment/:id" element={<RefurbishmentDetail />} />
    </Routes>
  )
}

export default App
