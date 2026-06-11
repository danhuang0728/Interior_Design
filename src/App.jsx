import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmartCustomization from './components/SmartCustomization'
import SmartCustomizationModern from './pages/SmartCustomizationModern'
import SmartCustomizationNordic from './pages/SmartCustomizationNordic'
import SmartCustomizationAmerican from './pages/SmartCustomizationAmerican'
import SmartCustomizationOffice from './pages/SmartCustomizationOffice'
import Refurbishment from './components/Refurbishment'
import RefurbishmentDetail from './pages/RefurbishmentDetail'
import Inquiry from './pages/Inquiry'
import WorkerAppointment from './pages/WorkerAppointment'
import Home from './pages/Home'
import SharedFooter from './components/SharedFooter'
import './App.css'
import './mainDesign.css'

function InquiryView() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Inquiry />
      </main>
      <SharedFooter />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inquiry" element={<InquiryView />} />
      <Route path="/smart-customization" element={<SmartCustomization />} />
      <Route path="/smart-customization/modern" element={<SmartCustomizationModern />} />
      <Route path="/smart-customization/nordic" element={<SmartCustomizationNordic />} />
      <Route path="/smart-customization/american" element={<SmartCustomizationAmerican />} />
      <Route path="/smart-customization/office" element={<SmartCustomizationOffice />} />
      <Route path="/worker-appointment" element={<WorkerAppointment />} />
      <Route path="/refurbishment" element={<Refurbishment />} />
      <Route path="/refurbishment/:id" element={<RefurbishmentDetail />} />
    </Routes>
  )
}

export default App
