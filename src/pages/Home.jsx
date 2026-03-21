import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const HERO_IMAGES = [
  '/home/home_hero.png',
  '/home/home_hero_2.png',
  '/home/home_hero_3.png'
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    // Auto-slide every 6 seconds
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simple scroll reveal
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
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero slider-container">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img}
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        <div className="hero-overlay"></div>

        {/* Slider Controls */}
        <button className="slider-btn prev-btn" onClick={prevSlide}>&#10094;</button>
        <button className="slider-btn next-btn" onClick={nextSlide}>&#10095;</button>

        <div className="slider-dots">
          {HERO_IMAGES.map((_, idx) => (
            <span
              key={idx}
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            ></span>
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title" style={{ color: "#eeeeeed3" }}>泰金閣設計裝修工作室</h1>
          <p className="hero-subtitle">REDEFINING SPACE & AESTHETICS</p>
        </div>
      </section>

      <main className="home-main">
        {/* Brand Philosophy */}
        <section className="brand-philosophy">
          <div className="philosophy-text reveal-left">
            <h2 className="section-title">品牌理念</h2>
            <h3>「每個空間，都有屬於自己的呼吸與故事」</h3>
            <p>
              我們深信，好的設計不只是視覺的堆疊，更是對生活細節的深刻理解。
              <br /><br />
              泰金閣團隊致力於將您的居家想像化為現實，從格局動線的雕琢到材質光影的演繹，為您打造極具質感且充滿溫度的專屬空間。
            </p>
          </div>
          <div className="philosophy-image reveal-right">
            <img src="/home/home_about.png" alt="Interior Details" loading="lazy" />
          </div>
        </section>

        {/* Core Services */}
        <section className="core-services reveal">
          <h2 className="section-title text-center">核心服務</h2>
          <div className="services-grid">
            <Link to="/smart-customization" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: 'url(/presale/p2_cover.png)' }}></div>
              <div className="service-card-content">
                <h3>智能訂製全屋裝修</h3>
                <p>結合美學與智能科技，為現代人打造前衛且便利的居家生活。</p>
                <span className="learn-more">了解更多 &rarr;</span>
              </div>
            </Link>
            <Link to="/presale" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: 'url(/presale/p1_cover.png)' }}></div>
              <div className="service-card-content">
                <h3>預售屋客變與設計</h3>
                <p>把握建商黃金修改期，為您省下不必要的拆除費用與時間。</p>
                <span className="learn-more">了解更多 &rarr;</span>
              </div>
            </Link>
            <Link to="/refurbishment" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: 'url(/presale/p5_cover.png)' }}></div>
              <div className="service-card-content">
                <h3>舊屋翻新與設計</h3>
                <p>重塑老屋生命力，基礎工程升級與外觀煥然一新。</p>
                <span className="learn-more">了解更多 &rarr;</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Hexagon Grid Showcase */}
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

        {/* CTA */}
        <section className="cta-section reveal">
          <div className="cta-content">
            <h2>準備好開啟您的專屬設計旅程了嗎？</h2>
            <p>與我們的設計團隊預約免費初步諮詢，討論您的居家夢想。</p>
            <Link to="/inquiry" className="btn-cta">
              立即線上諮詢
            </Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
