import React from 'react'
import { Link } from 'react-router-dom'
import './SharedFooter.css'

export default function SharedFooter() {
  return (
    <footer className="shared-footer">
      <div className="shared-footer-inner">
        <div className="shared-footer-brand">
          <span className="shared-footer-logo">泰金閣設計裝修工作室</span>
          <p>以智能訂製、全屋裝修為理念，打造每個家庭的專屬空間</p>
        </div>
        <div className="shared-footer-links">
          <Link to="/">關於我們</Link>
          <Link to="/smart-customization">智能訂製全屋裝修</Link>
          <Link to="/refurbishment">老屋翻新</Link>
          <Link to="/worker-appointment">工班預約</Link>
          <Link to="/inquiry">線上詢問</Link>
        </div>
      </div>
      <div className="shared-footer-copy">
        Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.
      </div>
    </footer>
  )
}
