import ChatWidget from '../components/ChatWidget'
import { chatBridgeConfig, lineContact } from '../data/inquiry-config'
import './Inquiry.css'

const infoCards = [
  {
    title: <strong> <span style={{ color: '#C0392B' }}>建議先提供</span> </strong>,
    description: '空間類型、坪數、需求重點、預算區間與預計入住時間。',
  },
  {
    title: <strong> <span style={{ color: '#C0392B' }}>回覆方式</span> </strong>,
    description: '第一版先展示網站端聊天介面，後續可延伸為 LINE 或客服後台。',
  },
  {
    title: <strong> <span style={{ color: '#C0392B' }}>適合用途</span> </strong>,
    description: '初步詢問流程、預約丈量、報價說明與案件篩選都很適合放在這裡。',
  },
]

function Inquiry() {
  return (
    <section className="inquiry-page">
      <div className="inquiry-hero">
        <div className="inquiry-copy">
          <span className="inquiry-kicker">Online Inquiry</span>
          <h1>
            <span style={{ color: '#C0392B' }}>線上詢問</span>
          </h1>
          <p>
            目前以網站前端展示為主，讓廠商能先看到實際客服互動流程。
          </p>
        </div>

        <div className="inquiry-meta">
          <p>目前模式</p>
          <strong>{chatBridgeConfig.mode === 'demo' ? '前端展示版' : '正式串接版'}</strong>
          <span>未來 API：{chatBridgeConfig.futureApiBase}</span>
          <span>目標通路：{chatBridgeConfig.futureProvider}</span>
        </div>
      </div>

      <div className="inquiry-info-grid">
        {infoCards.map((card) => (
          <article key={card.title} className="inquiry-info-card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </div>

      <div className="inquiry-layout">
        <ChatWidget />

        <aside className="inquiry-sidebar">
          <section className="line-card">
            <span className="line-card__label">LINE 規劃</span>
            <h2>{lineContact.title}</h2>
            <p>{lineContact.description}</p>
            <div className="line-card__friend-id">預計帳號：{lineContact.friendId}</div>
            <button type="button" className="line-card__button">
              LINE 加好友按鈕
            </button>
            
          </section>
        </aside>
      </div>
    </section>
  )
}

export default Inquiry
