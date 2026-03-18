import { Link } from 'react-router-dom'

const highlights = [
  {
    title: '智能訂製全屋裝修',
    description: '依照居住習慣與空間條件整合動線、收納與材質規劃。',
  },
  {
    title: '舊屋翻新與設計',
    description: '從老屋現況評估到風格更新，兼顧美感與生活機能。',
  },
  {
    title: '預售屋客變規劃',
    description: '提早整理需求與配置方向，減少交屋後再次修改的成本。',
  },
]

function Home() {
  return (
    <section className="home-page">
      <div className="hero-placeholder">
        <span className="hero-eyebrow">Interior Design Studio</span>
        <h1>泰金閣設計裝修工作室</h1>
        <p>從丈量、規劃到裝修落地，陪你把理想居家一步一步實現。</p>
        <div className="hero-actions">
          <Link to="/inquiry" className="hero-primary">
            前往線上詢問
          </Link>
          <a href="#service-highlights" className="hero-secondary">
            查看服務內容
          </a>
        </div>
      </div>

      <section id="service-highlights" className="home-section">
        <div className="section-heading">
          <span className="section-kicker">Services</span>
          <h2>服務方向</h2>
          <p>先把品牌首頁整理成清楚的服務入口，之後再逐步補作品與實際案例。</p>
        </div>

        <div className="highlight-grid">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Home
