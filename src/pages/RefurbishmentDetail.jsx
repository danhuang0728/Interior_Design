import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function RefurbishmentDetail() {
  const { id } = useParams()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa', fontFamily: "'Noto Sans TC', sans-serif" }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        {/* 介紹頁面先空著 — Detail page placeholder */}
        <p style={{ color: '#bbb', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          案例 #{id}
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 700, color: '#222', marginBottom: 20 }}>
          介紹頁面
        </h1>
        <p style={{ color: '#999', fontSize: '0.95rem', marginBottom: 40 }}>
          詳細介紹
        </p>
        <Link
          to="/refurbishment"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', background: '#e74c3c', color: '#fff',
            borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#c0392b'}
          onMouseLeave={e => e.currentTarget.style.background = '#e74c3c'}
        >
          ← 返回舊屋翻新列表
        </Link>
      </main>
    </div>
  )
}
