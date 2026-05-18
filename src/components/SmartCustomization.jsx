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
  { label: '小坪數', count: 19 },
  { label: '1–2房', count: 18 },
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
  },
  {
    id: 2,
    image: roomNordic,
    title: '',
    style: '北歐風',
    tag: '3房',
    brand: '智能訂製',
  },
  {
    id: 3,
    image: roomAmerican,
    title: '',
    style: '美式風',
    tag: '1–2房',
    brand: '智能訂製',
  },
  {
    id: 4,
    image: roomOffice,
    title: '',
    style: '商辦空間',
    tag: '1–2房',
    brand: '智能訂製',
  },
]

// ── Component ────────────────────────────────────────────────
export default function SmartCustomization() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const [selectedDropdowns, setSelectedDropdowns] = useState({})
  const [selectedTag, setSelectedTag] = useState(null)

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label))
  }

  const selectOption = (filterLabel, option) => {
    setSelectedDropdowns((prev) => ({ ...prev, [filterLabel]: option }))
    setActiveDropdown(null)
  }

  const toggleTag = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag))
  }

  // Filtered gallery
  const filteredDesigns = designs.filter((d) => {
    const styleMatch =
      !selectedDropdowns['需家偏好'] ||
      selectedDropdowns['需家偏好'] === '全部風格' ||
      d.style === selectedDropdowns['需家偏好']
    const tagMatch = !selectedTag || d.tag === selectedTag
    return styleMatch && tagMatch
  })

  return (
    <div className="sc-page">
      <Navbar />

      {/* ── Filter Bar ── */}
      <div className="sc-filter-bar">
        <div className="sc-filter-inner">
          {/* Dropdown filters */}
          <div className="sc-dropdowns">
            {dropdownFilters.map((f) => (
              <div key={f.label} className="sc-dropdown-wrap">
                <button
                  className={`sc-dropdown-btn ${activeDropdown === f.label ? 'active' : ''}`}
                  onClick={() => toggleDropdown(f.label)}
                >
                  {selectedDropdowns[f.label] || f.label}
                  <svg
                    className={`sc-chevron ${activeDropdown === f.label ? 'open' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {activeDropdown === f.label && (
                  <ul className="sc-dropdown-menu">
                    {f.options.map((opt) => (
                      <li
                        key={opt}
                        className={`sc-dropdown-item ${selectedDropdowns[f.label] === opt ? 'selected' : ''
                          }`}
                        onClick={() => selectOption(f.label, opt)}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Tag filters */}
          <div className="sc-tags">
            {tagFilters.map((t) => (
              <button
                key={t.label}
                className={`sc-tag ${selectedTag === t.label ? 'active' : ''}`}
                onClick={() => toggleTag(t.label)}
              >
                {t.label}
                <span className="sc-tag-count">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Search row */}
          <div className="sc-search-row">
            <span className="sc-search-label">已選類別</span>
            <button
              className="sc-search-btn"
              onClick={() => {
                setSelectedDropdowns({})
                setSelectedTag(null)
              }}
            >
              CLEAR ALL
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="sc-main">
        {/* Hero text */}
        <div className="sc-hero-text">
          <br />
          <br />
          <br />
          <h1>2026 室內裝潢設計推薦案例</h1>
          <p>
            泰金閣家居，旗下室內設計以及系統櫃知名品牌，以『智能訂製、全屋裝修』為理念，設計每個家庭專屬舒適空間，
            了解您的房型、重點空間到需求偏好，讓你更快速找到適合自己的理想居家空間。
          </p>
        </div>

        {/* Gallery grid */}
        <div className="sc-gallery">
          {filteredDesigns.length > 0 ? (
            filteredDesigns.map((d) => (
              <div key={d.id} className="sc-card" onClick={() => navigate(`/smart-customization/${d.id}`)}>
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
