import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import './Refurbishment.css'

// ── Design Categories ──────────────────────────────────────────
const categories = ['全部', '住宅翻新', '老屋改造', '商業空間', '輕裝修']

// ── Cases Data ────────────────────────────────────────────────
const cases = [
  {
    id: 1,
    title: '20 年老屋蛻變，溫潤木質現代宅',
    location: '台中南屯 大墩十街',
    category: '老屋改造',
    style: '現代簡約',
    area: '36 坪',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    id: 2,
    title: '光影交疊，打造北歐清新客廳',
    location: '台北信義 松智路',
    category: '住宅翻新',
    style: '北歐風',
    area: '28 坪',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  },
  {
    id: 3,
    title: '日式侘寂，沉靜禪意私人臥榻',
    location: '高雄苓雅 四維三路',
    category: '住宅翻新',
    style: '日式和風',
    area: '22 坪',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
  },
  {
    id: 4,
    title: '飯店級輕奢主臥，石材與金屬共舞',
    location: '台北大安 仁愛路四段',
    category: '老屋改造',
    style: '輕奢風格',
    area: '45 坪',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  },
  {
    id: 5,
    title: '小坪數收納術，讓 15 坪住出 30 坪感',
    location: '新北板橋 文化路',
    category: '輕裝修',
    style: '現代簡約',
    area: '15 坪',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 6,
    title: '工業風咖啡廳，磚牆與老件的對話',
    location: '台中西區 公益路',
    category: '商業空間',
    style: '工業風',
    area: '60 坪',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
  },
  {
    id: 7,
    title: '透天厝全室翻新，一家三代的溫暖記憶',
    location: '彰化鹿港 中山路',
    category: '住宅翻新',
    style: '傳統現代混搭',
    area: '80 坪',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 8,
    title: '清水模基調，極簡主義頂樓加蓋',
    location: '台北中山 民生東路',
    category: '輕裝修',
    style: '極簡風',
    area: '18 坪',
    image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
  },
  {
    id: 9,
    title: '美容沙龍輕奢改造，粉調玫瑰金空間',
    location: '台南東區 東門路',
    category: '商業空間',
    style: '輕奢風格',
    area: '32 坪',
    image: 'https://images.unsplash.com/photo-1570557652800-1f5b7c76775f?w=800&q=80',
  },
]

// ── Component ─────────────────────────────────────────────────
export default function Refurbishment() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const navigate = useNavigate()

  const filtered = activeCategory === '全部'
    ? cases
    : cases.filter((c) => c.category === activeCategory)

  return (
    <div className="rf-page">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="rf-hero">
        <div className="rf-hero-overlay" />
        <div className="rf-hero-content">
          <p className="rf-hero-subtitle">RENOVATION & DESIGN</p>
          <h1 className="rf-hero-title">舊屋翻新與設計</h1>
          <p className="rf-hero-desc">
            從老屋改造到全室翻新，泰金閣以細膩工藝與創新設計，<br />
            讓每一個空間重獲新生，煥發專屬生活美學。
          </p>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="rf-filter-bar">
        <div className="rf-filter-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rf-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Gallery ── */}
      <main className="rf-main">
        <div className="rf-count-row">
          <span className="rf-count">共 <strong>{filtered.length}</strong> 個案例</span>
        </div>

        <div className="rf-gallery">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rf-card"
              onClick={() => navigate(`/refurbishment/${item.id}`)}
            >
              <div className="rf-card-img-wrap">
                <img src={item.image} alt={item.title} className="rf-card-img" />
                <span className="rf-card-badge">{item.category}</span>
                <div className="rf-card-overlay">
                  <span className="rf-card-view-btn">查看詳情 →</span>
                </div>
              </div>
              <div className="rf-card-body">
                <h2 className="rf-card-title">{item.title}</h2>
                <div className="rf-card-meta">
                  <span className="rf-meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {item.location}
                  </span>
                  <span className="rf-meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                    </svg>
                    {item.area}
                  </span>
                </div>
                <div className="rf-card-style">{item.style}</div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="rf-footer">
        <div className="rf-footer-inner">
          <div className="rf-footer-brand">
            <span className="rf-footer-logo">泰金閣設計裝修工作室</span>
            <p>以智能訂製、全屋裝修為理念，打造每個家庭的專屬空間</p>
          </div>
          <div className="rf-footer-links">
            <a href="/">關於我們</a>
            <a href="/smart-customization">智能訂製全屋裝修</a>
            <a href="/refurbishment">舊屋翻新與設計</a>
            <a href="/inquiry">線上詢問</a>
          </div>
        </div>
        <div className="rf-footer-copy">
          Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
