import React from 'react'
import './Inquiry.css'

export default function Inquiry() {
  return (
    <div className="inq-page">
      {/* ── Hero Section ── */}
      <section className="inq-hero">
        <div className="inq-hero-content">
          <span className="inq-eyebrow">CONSULTATION</span>
          <h1 className="inq-title">準備好開啟您的<br />專屬設計旅程了嗎？</h1>
          <p className="inq-subtitle">
            無論是老屋翻新、智能全屋訂製，或是局部裝修，<br />
            東泰金閣設計團隊都在這裡傾聽您的需求。
          </p>
        </div>
      </section>

      {/* ── Core Values Section ── */}
      <section className="inq-features">
        <div className="inq-features-inner">
          <div className="inq-feature-card">
            <div className="inq-feature-icon">✨</div>
            <h3>免費初步諮詢</h3>
            <p>了解您的生活習慣與風格偏好，為您提供最適合的初步空間動線建議，讓設計更貼近生活。</p>
          </div>
          <div className="inq-feature-card">
            <div className="inq-feature-icon">📋</div>
            <h3>透明化初步報價</h3>
            <p>透過 LINE 傳送現場照片與坪數資訊，我們能為您快速評估並提供初步預算範圍，避免後續超支。</p>
          </div>
          <div className="inq-feature-card">
            <div className="inq-feature-icon">🤝</div>
            <h3>專屬一對一服務</h3>
            <p>由專業設計師親自與您對接討論，從初步概念到後續施工細節，解決所有關於裝修的疑難雜症。</p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="inq-cta">
        <div className="inq-cta-content">
          <h2>現在就與我們聊聊！</h2>
          <p>
            點擊下方按鈕加入我們的官方 LINE 帳號，<br />
            發送一則貼圖或您的初步需求，設計師將會盡快親自回覆您！
          </p>
          {/* 填寫 line帳號連結 */}
          <a
            href="https://line.me/ti/p/"
            target="_blank"
            rel="noopener noreferrer"
            className="inq-line-btn"
          >
            <span className="inq-line-icon">💬</span>
            前往 LINE 線上諮詢
          </a>
        </div>
      </section>
    </div>
  )
}
