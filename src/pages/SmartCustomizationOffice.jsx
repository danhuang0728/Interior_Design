import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SmartCustomizationDetail.css';

function SmartCustomizationOffice() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="configurator-wrapper">
      <Navbar />

      <div className="preview-header global-header">
        <button className="back-btn" onClick={() => navigate('/smart-customization')}>
          ← 返回智能訂製列表
        </button>
        <h1 className="preview-title">智能訂製 • 全屋裝修</h1>
        <p className="preview-subtitle">方案 #4 - 商辦空間</p>
      </div>

      <main className="configurator-main vertical-layout">
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box placeholder-box">
              <div className="placeholder-content">
                <span className="placeholder-icon">🏢</span>
                <span className="placeholder-text">方案規劃中</span>
              </div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">商辦空間全屋裝修</h2>
            <div className="coming-soon-card">
              <div className="coming-soon-icon">✦</div>
              <h3>即將上線</h3>
              <p>商辦空間方案正在精心規劃中，包含高效收納、專業會議空間與現代化辦公環境的全屋訂製方案。</p>
              <p className="coming-soon-hint">如需提前了解，歡迎預約諮詢。</p>
            </div>
          </div>
        </section>

        <div className="configurator-bottom-spacer" />
      </main>

      {/* FIXED BOTTOM SUMMARY BAR */}
      <div className="configurator-summary-bar">
        <div className="summary-left">
          <span className="summary-label">此方案尚在規劃中</span>
        </div>
        <div className="summary-right">
          <button className="summary-btn primary" onClick={() => navigate('/inquiry')}>
            預約諮詢此方案
          </button>
        </div>
      </div>

    </div>
  );
}

export default SmartCustomizationOffice;
