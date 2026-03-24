import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const SERVICES = [
  {
    num: '01',
    title: '智能訂製全屋裝修',
    desc: '結合美學與智能科技，為現代人打造前衛且便利的居家生活。',
    to: '/smart-customization',
  },
  {
    num: '02',
    title: '預售屋客變與設計',
    desc: '把握建商黃金修改期，為您省下不必要的拆除費用與時間。',
    to: '/presale',
  },
  {
    num: '03',
    title: '舊屋翻新與設計',
    desc: '重塑老屋生命力，基礎工程升級與外觀煥然一新。',
    to: '/refurbishment',
  },
];

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ─── Mouse Follower Logic ───
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current || !cursorRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* ── Hero: Abstract Geometric Design ── */}
      <section 
        className="home-hero" 
        ref={heroRef} 
        onMouseMove={handleMouseMove}
      >
        <div className="cursor-ring" ref={cursorRef} />

        <div className="hero-geometry">
          <div className="hero-glow" />
          <div className="hero-noise" />
          <div className="geo-circle geo-circle-1" />
          <div className="geo-circle geo-circle-2" />
          <div className="geo-line geo-line-h1" />
          <div className="geo-line geo-line-v1" />
          <div className="geo-line geo-line-v2" />
        </div>

        <div className="hero-content">
          <span className="hero-line-label reveal">TAIJIANGE STUDIO</span>
          <div className="hero-rule reveal" />
          <h1 className="hero-title reveal">智能訂製<br />全屋裝修</h1>
          <div className="hero-rule reveal" />
          <p className="hero-subtitle reveal">SMART CUSTOMIZATION &amp; DESIGN</p>
        </div>

        <div className="scroll-cue">
          <span className="scroll-cue-line" />
          <span className="scroll-cue-text">SCROLL</span>
        </div>
      </section>

      <main className="home-main">

        {/* ── Philosophy ── */}
        <section className="wb-section wb-philosophy reveal">
          <div className="wb-section-label">PHILOSOPHY</div>
          <div className="wb-philosophy-inner">
            <div className="wb-philosophy-kanji reveal-left">
              智<br />能
            </div>
            <div className="wb-philosophy-text reveal-right">
              <h2 className="wb-section-title">品牌理念</h2>
              <blockquote className="wb-quote">
                「將前衛科技融入居家美學，<br />打造最懂您的智慧空間」
              </blockquote>
              <p className="wb-body">
                我們深信，好的設計不只是視覺的堆疊，更是對生活細節的深刻理解。<br /><br />
                泰金閣團隊致力於將您的居家想像化為現實，以『智能訂製、全屋裝修』為核心，
                從格局動線的雕琢到智能系統的整合，為您打造極具質感且充滿溫度的現代空間。
                我們保留了純粹的極簡美學與寂靜的色彩搭配，將空間的主導權交還給生活本身。
              </p>
            </div>
          </div>
          <div className="wb-vline wb-vline-right" />
        </section>

        {/* ── Services ── */}
        <section className="wb-section wb-services">
          <div className="wb-section-label">SERVICES</div>
          <h2 className="wb-section-title text-center reveal">核心服務</h2>
          <div className="wb-services-list">
            {SERVICES.map((s, i) => (
              <Link
                key={i}
                to={s.to}
                className="wb-service-row reveal-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="wb-service-num">{s.num}</span>
                <div className="wb-service-divider" />
                <div className="wb-service-info">
                  <h3 className="wb-service-title">{s.title}</h3>
                  <p className="wb-service-desc">{s.desc}</p>
                </div>
                <span className="wb-service-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Hexagon Grid Showcase ── */}
        <section className="hexagon-section reveal">
          <h2 className="hexagon-section-title text-center">我們的團隊</h2>
          <div className="hexagon-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) =>   (
              <div className="hexagon" key={i}>
                <img src={`/presale/p${num}_cover.png`} alt={`案例 ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="wb-section wb-cta reveal">
          <div className="wb-cta-inner">
            <div className="wb-cta-deco-line" />
            <p className="wb-cta-eyebrow">CONSULTATION</p>
            <h2 className="wb-cta-title">準備好開啟您的<br />專屬設計旅程了嗎？</h2>
            <p className="wb-cta-sub">與我們的設計團隊預約免費初步諮詢，討論您的居家夢想。</p>
            <Link to="/inquiry" className="wb-cta-btn">
              <span>立即線上諮詢</span>
              <span className="wb-cta-btn-arrow">→</span>
            </Link>
            <div className="wb-cta-deco-line" />
          </div>
        </section>

      </main>

      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <span className="home-footer-logo">泰金閣設計裝修工作室</span>
            <p>以智能訂製、全屋裝修為理念，打造每個家庭的專屬空間。</p>
          </div>
          <div className="home-footer-links">
            <Link to="/smart-customization">智能訂製全屋裝修</Link>
            <Link to="/presale">預售屋客變與設計</Link>
            <Link to="/refurbishment">舊屋翻新與設計</Link>
            <Link to="/inquiry">線上詢問</Link>
          </div>
        </div>
        <div className="home-footer-copy">
          Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
