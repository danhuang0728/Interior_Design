import { useState } from 'react'
import Navbar from './Navbar'
import './SmartCustomization.css'

import roomModern from '../img/room_modern.png'
import roomNordic from '../img/room_nordic.png'
import roomJapan from '../img/room_japan.png'
import roomLuxury from '../img/room_luxury.png'
import roomSmall from '../img/room_small.png'
import roomIndustrial from '../img/room_industrial.png'

// ── Filter Data ──────────────────────────────────────────────
const dropdownFilters = [
  {
    label: '房型配置',
    options: ['全部房型', '套房', '一房一廳', '兩房兩廳', '三房兩廳', '四房以上'],
  },
  {
    label: '需家偏好',
    options: ['全部風格', '現代簡約', '北歐風', '日式和風', '輕奢風格', '工業風'],
  },
  {
    label: '重點空間',
    options: ['全部空間', '客廳', '臥室', '廚房', '衛浴', '書房', '陽台'],
  },
]

const tagFilters = [
  { label: '小坪數', count: 19 },
  { label: '孝親房', count: 3 },
  { label: '透天',   count: 12 },
  { label: '1–2房',  count: 18 },
  { label: '3房',    count: 24 },
  { label: '4房以上', count: 10 },
  { label: '樓中樓', count: 0 },
]

// ── Gallery Data ─────────────────────────────────────────────
const designs = [
  {
    id: 1,
    image: roomModern,
    title: '石材與光影共舞，譜寫現代極簡品味居',
    location: '台中龍井 德光大智',
    style: '現代簡約',
    tag: '小坪數',
    brand: '親子世界',
  },
  {
    id: 2,
    image: roomNordic,
    title: '暖光築起成長樂園，譜出北歐木質詩篇',
    location: '台中龍井 德光大智',
    style: '北歐風',
    tag: '3房',
    brand: '親子世界',
  },
  {
    id: 3,
    image: roomJapan,
    title: '首購減法生活，暖木無印風親子宅',
    location: '高雄鼓山 滙堤',
    style: '日式和風',
    tag: '1–2房',
    brand: '親子世界',
  },
  {
    id: 4,
    image: roomLuxury,
    title: '大理石輕奢廚房，展現精緻生活美學',
    location: '台北大安 文心苑',
    style: '輕奢風格',
    tag: '4房以上',
    brand: '泰金閣',
  },
  {
    id: 5,
    image: roomSmall,
    title: '聰明收納小宅，讓空間放大兩倍',
    location: '新北永和 新月廣場',
    style: '現代簡約',
    tag: '小坪數',
    brand: '泰金閣',
  },
  {
    id: 6,
    image: roomIndustrial,
    title: '工業風閣樓，原始與現代的完美融合',
    location: '台中西屯 七期',
    style: '工業風',
    tag: '樓中樓',
    brand: '泰金閣',
  },
]

// ── Component ────────────────────────────────────────────────
export default function SmartCustomization() {
  const [activeDropdown, setActiveDropdown] = useState(null)
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
                        className={`sc-dropdown-item ${
                          selectedDropdowns[f.label] === opt ? 'selected' : ''
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
              <div key={d.id} className="sc-card">
                <div className="sc-card-img-wrap">
                  <img src={d.image} alt={d.title} className="sc-card-img" />
                  <span className="sc-card-style-badge">{d.style}</span>
                </div>
                <div className="sc-card-info">
                  <h2 className="sc-card-title">{d.title}</h2>
                  <p className="sc-card-location">– {d.location}</p>
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
      <footer className="sc-footer">
        <div className="sc-footer-inner">
          <div className="sc-footer-brand">
            <span className="sc-footer-logo">泰金閣設計裝修工作室</span>
            <p>以智能訂製、全屋裝修為理念，打造每個家庭的專屬空間</p>
          </div>
          <div className="sc-footer-links">
            <a href="#">關於我們</a>
            <a href="#">智能訂製全屋裝修</a>
            <a href="#">舊屋翻新與設計</a>
            <a href="#">預售屋設計</a>
            <a href="#">線上詢問</a>
          </div>
        </div>
        <div className="sc-footer-copy">
          Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
