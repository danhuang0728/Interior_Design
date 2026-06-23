import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import SharedFooter from './SharedFooter'
import './SmartCustomization.css'

import roomModern from '../img/room_modern.png'
import roomNordic from '../img/room_nordic.png'
import roomAmerican from '../img/room_american.png'
import roomOffice from '../img/room_office.png'

// ── Filter Data ──────────────────────────────────────────────
const dropdownFilters = [
  {
    label: '房型配置',
    options: ['全部房型', '套房', '一房一廳', '兩房兩廳', '三房兩廳'],
  },

]

const tagFilters = [
  //{ label: '3房', count: 24 },
  //{ label: '4房以上', count: 10 }
]

// ── Gallery Data ─────────────────────────────────────────────
const designs = [
  {
    id: 1,
    image: roomModern,
    title: '',
    style: '現代簡約',
    tag: '小坪數',
    brand: '智能訂製',
    path: 'modern',
  },
  {
    id: 2,
    image: roomNordic,
    title: '',
    style: '北歐風',
    tag: '3房',
    brand: '智能訂製',
    path: 'nordic',
  },
  {
    id: 3,
    image: roomAmerican,
    title: '',
    style: '美式風',
    tag: '1–2房',
    brand: '智能訂製',
    path: 'american',
  },
  {
    id: 4,
    image: roomOffice,
    title: '',
    style: '商辦空間',
    tag: '1–2房',
    brand: '智能訂製',
    path: 'office',
  },
]

// ── Component ────────────────────────────────────────────────
export default function SmartCustomization() {
  const navigate = useNavigate()

  return (
    <div className="sc-page">
      <Navbar />


      {/* ── Main Content ── */}
      <main className="sc-main">
        {/* Hero text */}
        <div className="sc-hero-text">
          <br />
          <br />
          <br />
          <h1>2026 室內裝潢設計推薦案例</h1>
          <p>
            東泰金閣家居，旗下室內設計以及系統櫃知名品牌，以『智能訂製、全屋裝修』為理念，設計每個家庭專屬舒適空間，
            了解您的房型、重點空間到需求偏好，讓你更快速找到適合自己的理想居家空間。
          </p>
        </div>

        {/* Gallery grid */}
        <div className="sc-gallery">
          {designs.length > 0 ? (
            designs.map((d) => (
              <div key={d.id} className="sc-card" onClick={() => navigate(`/smart-customization/${d.path}`)}>
                <div className="sc-card-img-wrap">
                  <img src={d.image} alt={d.title} className="sc-card-img" />
                  <span className="sc-card-style-badge">{d.style}</span>
                  <div className="sc-card-overlay">
                    <span className="sc-card-view-btn">查看詳情 →</span>
                  </div>
                </div>
                <div className="sc-card-info">
                  <h2 className="sc-card-title">{d.title}</h2>
                  <p className="sc-card-brand">{d.brand}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="sc-no-result">目前沒有符合條件的案例，請調整篩選條件。</p>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <SharedFooter />
    </div>
  )
}
