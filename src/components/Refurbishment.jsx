import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from './Navbar'
import SharedFooter from './SharedFooter'
import './Refurbishment.css'

// ── 工班配置資料 ──────────────────────────────────────────────
const crewTeams = [
  {
    id: 'carpenter',
    icon: '🪚',
    name: '木工工班',
    desc: '客製木作、天花板、隔間、門框，精工細作每一道工序。',
  },
  {
    id: 'system-cabinet',
    icon: '🗄️',
    name: '系統櫃工班',
    desc: '德國五金搭配台灣製系統板材，收納規劃量身訂製。',
  },
  {
    id: 'demolition',
    icon: '🏗️',
    name: '拆除清運工班',
    desc: '老屋拆除、廢棄物清運，依現場坪數與材質專業評估報價。',
  },
  {
    id: 'electrical',
    icon: '⚡',
    name: '水電工班',
    desc: '水電設備、排水系統、電路全面評估，確保用電與管線安全。',
  },
  {
    id: 'paint',
    icon: '🎨',
    name: '油漆工班',
    desc: '全室批土油漆、特殊漆面處理，為空間點綴專屬色彩。',
  },
]

// ── 服務說明資料 ──────────────────────────────────────────────
const services = [
  {
    id: 'demolition-quote',
    icon: '🏚️',
    title: '舊屋拆除與清運報價',
    highlight: '依現場的坪數、材質評估報價',
    points: [
      '老舊磁磚、木作、牆面全面拆除',
      '廢棄物合法清運，場地還原乾淨',
      '現場丈量後提供詳細書面報價',
    ],
  },
  {
    id: 'base-engineering',
    icon: '🔧',
    title: '基礎工程評估',
    highlight: '水電設備、排水、電路評估',
    points: [
      '老屋管線老化全面檢查',
      '衛浴排水系統重新規劃',
      '電路容量升級，符合現代用電需求',
    ],
  },
]

// ── 報價清單資料 ──────────────────────────────────────────────
const pricingData = [
  { item: '保護工程', price: 'NT$300起/坪' },
  { item: '天花板拆除', price: 'NT$800起/坪' },
  { item: '磁磚拆除', price: 'NT$1,000起/坪(去皮) / NT$1,400起/坪(見底)' },
  { item: '隔間牆拆除', price: 'NT$1,000起/坪' },
  { item: '系統櫃、木作櫃拆除', price: 'NT$400起/坪' },
  { item: '廚具拆除', price: 'NT$5,000起/套' },
  { item: '衛浴設備拆除', price: 'NT$5,000起/套' },
  { item: '廢棄物清運', price: 'NT$10,000起/車' },
]

// ── 地點選項 ──────────────────────────────────────────────────
const locationOptions = ['竹南', '台中', '彰化', '南投']

// ── 初始表單狀態 ──────────────────────────────────────────────
const initialForm = {
  project_location: '',
  project_size_ping: '',
  has_design_blueprint: '',
  expected_start_date: '',
  client_name: '',
  client_phone: '',
  client_email: '',
}

// ── Component ─────────────────────────────────────────────────
export default function Refurbishment() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})
  const [expandedCrew, setExpandedCrew] = useState(null)

  // ── 表單輸入處理 ──
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 清除該欄位錯誤
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ── 表單驗證 ──
  const validate = () => {
    const newErrors = {}
    if (!formData.project_location) newErrors.project_location = '請選擇案場地點'
    if (!formData.project_size_ping || Number(formData.project_size_ping) <= 0)
      newErrors.project_size_ping = '請輸入有效坪數'
    if (!formData.has_design_blueprint) newErrors.has_design_blueprint = '請選擇是否有設計圖'
    if (!formData.expected_start_date) newErrors.expected_start_date = '請選擇預計施工時間'
    if (!formData.client_name.trim()) newErrors.client_name = '請輸入姓名'
    if (!formData.client_phone.trim()) newErrors.client_phone = '請輸入聯絡電話'
    if (!formData.client_email.trim()) newErrors.client_email = '請輸入 Email'
    return newErrors
  }

  // ── 送出表單 ──
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSending(true)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_RENOVATION_TEMPLATE_ID
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // 若未設定 EmailJS 環境變數，切換為展示模式
    if (!serviceId || !templateId || !publicKey) {
      console.log('未偵測到 EmailJS 金鑰，切換為展示模式。表單提交資料：', formData)
      setIsSending(false)
      setIsSubmitted(true)
      return
    }

    const templateParams = {
      project_location: formData.project_location,
      project_size_ping: formData.project_size_ping,
      has_design_blueprint: formData.has_design_blueprint,
      expected_start_date: formData.expected_start_date,
      client_name: formData.client_name,
      client_phone: formData.client_phone,
      client_email: formData.client_email,
      reply_to: formData.client_email,
      admin_email: import.meta.env.VITE_EMAILJS_ADMIN_EMAIL,
    }

    const sendPromises = [
      emailjs.send(serviceId, templateId, templateParams, { publicKey }),
    ]

    if (adminTemplateId) {
      sendPromises.push(
        emailjs.send(serviceId, adminTemplateId, templateParams, { publicKey })
      )
    }

    Promise.all(sendPromises)
      .then(() => {
        setIsSending(false)
        setIsSubmitted(true)
      })
      .catch((error) => {
        console.log('EmailJS 發送失敗：', error)
        alert('發送失敗，請稍後再試！')
        setIsSending(false)
      })
  }

  return (
    <div className="rf-page">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="rf-hero">
        <div className="rf-hero-overlay" />
        <div className="rf-hero-content">
          <p className="rf-hero-subtitle">OLD HOUSE RENOVATION</p>
          <h1 className="rf-hero-title">老屋翻新專業服務</h1>
          <p className="rf-hero-desc">
            從拆除清運到基礎工程，泰金閣四大專業工班全程把關，<br />
            讓您的老屋煥然一新，重獲安全與美感。
          </p>
        </div>
      </section>

      {/* ── 前期宣導 Banner ── */}
      <section className="rf-notice-bar">
        <div className="rf-notice-inner">
          <span className="rf-notice-icon">⚠️</span>
          <p>
            老屋翻新施工前必須先完成&nbsp;
            <strong>舊屋拆除清運</strong>&nbsp;與&nbsp;
            <strong>基礎結構（水電、排水、電路）評估</strong>，
            確保工程安全與後續品質。
          </p>
        </div>
      </section>

      {/* ── 服務說明區塊 ── */}
      <section className="rf-services">
        <div className="rf-section-inner">
          <div className="rf-section-header">
            <span className="rf-section-tag">SERVICE</span>
            <h2 className="rf-section-title">核心服務項目</h2>
            <p className="rf-section-sub">老屋翻新的兩大必要評估，我們為您專業把關</p>
          </div>

          <div className="rf-service-cards">
            {services.map((svc) => (
              <div key={svc.id} className="rf-service-card">
                <div className="rf-service-icon">{svc.icon}</div>
                <h3 className="rf-service-title">{svc.title}</h3>
                <div className="rf-service-highlight">📌 {svc.highlight}</div>
                <ul className="rf-service-points">
                  {svc.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 工班配置 ── */}
      <section className="rf-crews">
        <div className="rf-section-inner">
          <div className="rf-section-header">
            <span className="rf-section-tag">OUR TEAM</span>
            <h2 className="rf-section-title">五大工班專業配置</h2>
            <p className="rf-section-sub">完整工班陣容，老屋翻新一站搞定</p>
          </div>

          <div className="rf-crew-grid">
            {crewTeams.map((team) => (
              <div 
                key={team.id} 
                className={`rf-crew-card ${expandedCrew === team.id ? 'active' : ''}`}
                onClick={() => {
                  if (team.id === 'paint') {
                    setExpandedCrew(expandedCrew === 'paint' ? null : 'paint')
                  }
                }}
                style={{ cursor: team.id === 'paint' ? 'pointer' : 'default' }}
              >
                <div className="rf-crew-icon">{team.icon}</div>
                <h3 className="rf-crew-name">{team.name}</h3>
                <p className="rf-crew-desc">{team.desc}</p>
                {team.id === 'paint' && (
                  <div className="rf-crew-action">
                    {expandedCrew === 'paint' ? '收起展示 ▴' : '點擊查看展示 ▾'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 油漆展示區塊 (展開時顯示) */}
          {expandedCrew === 'paint' && (
            <div className="rf-paint-gallery">
              <h3 className="rf-paint-gallery-title">油漆工班 - 作品展示</h3>
              <div className="rf-paint-gallery-grid">
                <div className="rf-paint-placeholder">
                  <span>展示圖 1 (預留)</span>
                </div>
                <div className="rf-paint-placeholder">
                  <span>展示圖 2 (預留)</span>
                </div>
                <div className="rf-paint-placeholder">
                  <span>展示圖 3 (預留)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 拆除工程報價表 ── */}
      <section className="rf-pricing">
        <div className="rf-section-inner">
          <div className="rf-section-header">
            <span className="rf-section-tag">PRICING</span>
            <h2 className="rf-section-title">拆除清運工程參考報價</h2>
            <p className="rf-section-sub">透明化收費標準，實際報價依現場評估為主</p>
          </div>

          <div className="rf-pricing-table-wrapper">
            <table className="rf-pricing-table">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>價格 / 計算單位</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.item}</td>
                    <td>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="rf-pricing-note">
              * 備註：實際價格會依照區域、天氣狀況、人力、物價、樓層與拆除易難度等情況有所不同，價格僅供參考，依實際報價為主。
            </p>
          </div>
        </div>
      </section>

      {/* ── 互動預約表單 ── */}
      <section className="rf-form-section" id="estimation-form">
        <div className="rf-section-inner">
          <div className="rf-section-header">
            <span className="rf-section-tag">CONTACT US</span>
            <h2 className="rf-section-title">老屋翻新免費評估預約</h2>
            <p className="rf-section-sub">填寫以下資訊，我們將於近期主動回覆，為您安排現場評估</p>
          </div>

          {isSubmitted ? (
            /* ── 送出成功畫面 ── */
            <div className="rf-success-card">
              <div className="rf-success-icon">✅</div>
              <h3>預約成功！</h3>
              <p>我們已收到您的評估需求，將盡快安排專人與您聯繫。</p>
              <div className="rf-success-summary">
                <div className="rf-summary-row">
                  <span className="rf-summary-label">案場地點</span>
                  <span className="rf-summary-value">{formData.project_location}</span>
                </div>
                <div className="rf-summary-row">
                  <span className="rf-summary-label">案場坪數</span>
                  <span className="rf-summary-value">{formData.project_size_ping} 坪</span>
                </div>
                <div className="rf-summary-row">
                  <span className="rf-summary-label">是否有設計圖</span>
                  <span className="rf-summary-value">{formData.has_design_blueprint}</span>
                </div>
                <div className="rf-summary-row">
                  <span className="rf-summary-label">預計施工時間</span>
                  <span className="rf-summary-value">{formData.expected_start_date}</span>
                </div>
                <div className="rf-summary-row">
                  <span className="rf-summary-label">聯絡人</span>
                  <span className="rf-summary-value">{formData.client_name}</span>
                </div>
              </div>
              <button
                className="rf-submit-btn"
                onClick={() => {
                  setFormData(initialForm)
                  setIsSubmitted(false)
                }}
              >
                重新填寫
              </button>
            </div>
          ) : (
            /* ── 預約表單 ── */
            <form className="rf-form" onSubmit={handleSubmit} noValidate>
              {/* 案場地點 */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-location">
                  案場的地點 <span className="rf-required">*</span>
                </label>
                <select
                  id="rf-location"
                  name="project_location"
                  value={formData.project_location}
                  onChange={handleChange}
                  className={`rf-select ${errors.project_location ? 'rf-input-error' : ''}`}
                >
                  <option value="" disabled>請選擇案場地點</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.project_location && (
                  <span className="rf-error-msg">{errors.project_location}</span>
                )}
              </div>

              {/* 案場坪數 */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-size">
                  案場坪數（坪） <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-size"
                  type="number"
                  name="project_size_ping"
                  value={formData.project_size_ping}
                  onChange={handleChange}
                  placeholder="請輸入坪數，例：35"
                  min="1"
                  className={`rf-input ${errors.project_size_ping ? 'rf-input-error' : ''}`}
                />
                {errors.project_size_ping && (
                  <span className="rf-error-msg">{errors.project_size_ping}</span>
                )}
              </div>

              {/* 是否有設計圖 */}
              <div className="rf-form-group">
                <label className="rf-label">
                  是否有設計圖 <span className="rf-required">*</span>
                </label>
                <div className={`rf-radio-group ${errors.has_design_blueprint ? 'rf-radio-error' : ''}`}>
                  {['是', '否'].map((opt) => (
                    <label key={opt} className="rf-radio-label">
                      <input
                        type="radio"
                        name="has_design_blueprint"
                        value={opt}
                        checked={formData.has_design_blueprint === opt}
                        onChange={handleChange}
                      />
                      <span className="rf-radio-custom" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.has_design_blueprint && (
                  <span className="rf-error-msg">{errors.has_design_blueprint}</span>
                )}
              </div>

              {/* 預計施工時間 */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-date">
                  預計施工時間 <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-date"
                  type="date"
                  name="expected_start_date"
                  value={formData.expected_start_date}
                  onChange={handleChange}
                  className={`rf-input ${errors.expected_start_date ? 'rf-input-error' : ''}`}
                />
                {errors.expected_start_date && (
                  <span className="rf-error-msg">{errors.expected_start_date}</span>
                )}
              </div>

              {/* 分隔線 */}
              <div className="rf-form-divider">
                <span>聯絡資訊</span>
              </div>

              {/* 客戶姓名 */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-name">
                  姓名 <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-name"
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  placeholder="請輸入您的姓名"
                  className={`rf-input ${errors.client_name ? 'rf-input-error' : ''}`}
                />
                {errors.client_name && (
                  <span className="rf-error-msg">{errors.client_name}</span>
                )}
              </div>

              {/* 客戶電話 */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-phone">
                  聯絡電話 <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-phone"
                  type="tel"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleChange}
                  placeholder="例：0912-345-678"
                  className={`rf-input ${errors.client_phone ? 'rf-input-error' : ''}`}
                />
                {errors.client_phone && (
                  <span className="rf-error-msg">{errors.client_phone}</span>
                )}
              </div>

              {/* 客戶 Email */}
              <div className="rf-form-group">
                <label className="rf-label" htmlFor="rf-email">
                  Email <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-email"
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  placeholder="回覆確認信將寄至此信箱"
                  className={`rf-input ${errors.client_email ? 'rf-input-error' : ''}`}
                />
                {errors.client_email && (
                  <span className="rf-error-msg">{errors.client_email}</span>
                )}
              </div>

              {/* 送出按鈕 */}
              <div className="rf-form-actions">
                <button
                  type="submit"
                  className="rf-submit-btn"
                  disabled={isSending}
                >
                  {isSending ? (
                    <span className="rf-sending">
                      <span className="rf-spinner" />
                      發送中…
                    </span>
                  ) : (
                    '送出免費評估申請 →'
                  )}
                </button>
                <p className="rf-form-note">
                  * 我們將於收到申請後的 3 個工作天內主動回覆
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <SharedFooter />
    </div>
  )
}
