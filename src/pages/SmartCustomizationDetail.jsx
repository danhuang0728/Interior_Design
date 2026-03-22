import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SmartCustomizationDetail.css';

function SmartCustomizationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── Configuration State ───
  const [config, setConfig] = useState({
    tvCabinet: '電視牆', 
    livingRoomSide: [], 
    masterBed: [],     
    secondBed: [],     
    kitchen: []        
  });

  // ─── Preview Images State ───
  // Each category has its own preview image on the left.
  const [previewImgs, setPreviewImgs] = useState({
    tvCabinet: '/presale/p2_cover.png',
    livingRoomSide: '/presale/p4_cover.png',
    masterBed: '/presale/p6_cover.png',
    secondBed: '/presale/p8_cover.png',
    kitchen: '/presale/p1_cover.png'
  });

  // Helpers to toggle arrays
  const toggleArrayOption = (category, option, imgPath) => {
    setConfig(prev => {
      const currentList = prev[category];
      if (currentList.includes(option)) {
        return { ...prev, [category]: currentList.filter(item => item !== option) };
      } else {
        return { ...prev, [category]: [...currentList, option] };
      }
    });
    setPreviewImgs(prev => ({ ...prev, [category]: imgPath }));
  };

  const setSingleOption = (category, option, imgPath) => {
    setConfig(prev => ({ ...prev, [category]: option }));
    setPreviewImgs(prev => ({ ...prev, [category]: imgPath }));
  };

  // ─── Options Data ───
  const tvCabinetOptions = [
    { label: '落地型', desc: '經典收納，適合多設備家庭', price: '+ NT$ 25,000', img: '/presale/p1_cover.png' },
    { label: '電視牆', desc: '極簡懸空設計，展現主牆大氣', price: '+ NT$ 38,000', img: '/presale/p2_cover.png' },
    { label: '無電視櫃', desc: '保留最大空間尺度，極致極簡', price: '+ NT$ 0', img: '/presale/p3_cover.png' }
  ];

  const livingSideOptions = [
    { label: '鞋櫃', desc: '玄關延伸收納，機能與美感兼具', price: '+ NT$ 18,000', img: '/presale/p4_cover.png' },
    { label: '側櫃', desc: '展示與收納結合，豐富端景', price: '+ NT$ 15,000', img: '/presale/p5_cover.png' }
  ];

  const masterBedOptions = [
    { label: '衣櫃', desc: '頂天立地系統衣櫃，最大化收納', price: '+ NT$ 45,000', img: '/presale/p6_cover.png' },
    { label: '化妝台', desc: '結合燈光與鏡面，專屬梳化空間', price: '+ NT$ 12,000', img: '/presale/p7_cover.png' }
  ];

  const secondBedOptions = [
    { label: '衣櫃', desc: '基礎衣物收納規劃', price: '+ NT$ 35,000', img: '/presale/p8_cover.png' },
    { label: '書櫃', desc: '閱讀與展示機能整合', price: '+ NT$ 18,000', img: '/presale/p9_cover.png' }
  ];

  const kitchenOptions = [
    { label: '吧檯桌', desc: '延伸輕食吧檯，凝聚家人情感', price: '+ NT$ 28,000', img: '/presale/p1_cover.png' },
    { label: '餐邊櫃', desc: '電器與備品收納，解放流理台', price: '+ NT$ 32,000', img: '/presale/p2_cover.png' }
  ];

  // Calculate estimated total based on selections
  const calculateTotal = () => {
    let total = 0; 
    
    // Add TV Cabinet
    const selectedTv = tvCabinetOptions.find(o => o.label === config.tvCabinet);
    if (selectedTv) total += parseInt(selectedTv.price.replace(/\D/g, ''));
    
    // Helper to calculate array totals
    const sumArray = (choices, optionsData) => {
      return choices.reduce((sum, choice) => {
        const option = optionsData.find(o => o.label === choice);
        return sum + (option ? parseInt(option.price.replace(/\D/g, '')) : 0);
      }, 0);
    };

    total += sumArray(config.livingRoomSide, livingSideOptions);
    total += sumArray(config.masterBed, masterBedOptions);
    total += sumArray(config.secondBed, secondBedOptions);
    total += sumArray(config.kitchen, kitchenOptions);

    return total;
  };

  return (
    <div className="configurator-wrapper">
      <Navbar />

      <div className="preview-header global-header">
        <button className="back-btn" onClick={() => navigate('/smart-customization')}>
          ← 返回智能訂製列表
        </button>
        <h1 className="preview-title">智能訂製 • 全屋裝修</h1>
        <p className="preview-subtitle">方案 #{id || 'A01'} - 現代簡約</p>
      </div>

      <main className="configurator-main vertical-layout">
        
        {/* Section 1: 客廳電視牆 */}
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box">
              <img 
                key={previewImgs.tvCabinet}
                src={previewImgs.tvCabinet} 
                alt="裝修預覽圖" 
                className="preview-img"
              />
              <div className="preview-badge">客廳空間</div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">電視櫃訂製 <span className="req">*單選</span></h2>
            <div className="options-grid">
              {tvCabinetOptions.map(opt => (
                <button 
                  key={opt.label}
                  className={`option-card ${config.tvCabinet === opt.label ? 'active' : ''}`}
                  onClick={() => setSingleOption('tvCabinet', opt.label, opt.img)}
                >
                  <div className="option-card-content">
                    <span className="option-label">{opt.label}</span>
                    <span className="option-desc">{opt.desc}</span>
                  </div>
                  <span className="option-price">{opt.price}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: 客廳旁櫃體 */}
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box">
              <img 
                key={previewImgs.livingRoomSide}
                src={previewImgs.livingRoomSide} 
                alt="裝修預覽圖" 
                className="preview-img"
              />
              <div className="preview-badge">客廳旁邊櫃體</div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">電視旁櫃體 <span className="opt">可複選</span></h2>
            <div className="options-grid">
              {livingSideOptions.map(opt => {
                const isActive = config.livingRoomSide.includes(opt.label);
                return (
                  <button 
                    key={opt.label}
                    className={`option-card ${isActive ? 'active' : ''}`}
                    onClick={() => toggleArrayOption('livingRoomSide', opt.label, opt.img)}
                  >
                    <div className="option-card-content">
                      <span className="option-label">{opt.label}</span>
                      <span className="option-desc">{opt.desc}</span>
                    </div>
                    <span className="option-price">{opt.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: 主臥 */}
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box">
              <img 
                key={previewImgs.masterBed}
                src={previewImgs.masterBed} 
                alt="裝修預覽圖" 
                className="preview-img"
              />
              <div className="preview-badge">主臥空間</div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">主臥空間機能 <span className="opt">可複選</span></h2>
            <div className="options-grid">
              {masterBedOptions.map(opt => {
                const isActive = config.masterBed.includes(opt.label);
                return (
                  <button 
                    key={opt.label}
                    className={`option-card ${isActive ? 'active' : ''}`}
                    onClick={() => toggleArrayOption('masterBed', opt.label, opt.img)}
                  >
                    <div className="option-card-content">
                      <span className="option-label">{opt.label}</span>
                      <span className="option-desc">{opt.desc}</span>
                    </div>
                    <span className="option-price">{opt.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: 次臥 */}
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box">
              <img 
                key={previewImgs.secondBed}
                src={previewImgs.secondBed} 
                alt="裝修預覽圖" 
                className="preview-img"
              />
              <div className="preview-badge">次臥空間</div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">次臥空間機能 <span className="opt">可複選</span></h2>
            <div className="options-grid">
              {secondBedOptions.map(opt => {
                const isActive = config.secondBed.includes(opt.label);
                return (
                  <button 
                    key={opt.label}
                    className={`option-card ${isActive ? 'active' : ''}`}
                    onClick={() => toggleArrayOption('secondBed', opt.label, opt.img)}
                  >
                    <div className="option-card-content">
                      <span className="option-label">{opt.label}</span>
                      <span className="option-desc">{opt.desc}</span>
                    </div>
                    <span className="option-price">{opt.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: 餐廚 */}
        <section className="config-row">
          <div className="config-row-left">
            <div className="preview-image-box">
              <img 
                key={previewImgs.kitchen}
                src={previewImgs.kitchen} 
                alt="裝修預覽圖" 
                className="preview-img"
              />
              <div className="preview-badge">餐廚空間</div>
            </div>
          </div>
          <div className="config-row-right">
            <h2 className="config-section-title">餐廚附加機能 <span className="opt">可複選</span></h2>
            <div className="options-grid">
              {kitchenOptions.map(opt => {
                const isActive = config.kitchen.includes(opt.label);
                return (
                  <button 
                    key={opt.label}
                    className={`option-card ${isActive ? 'active' : ''}`}
                    onClick={() => toggleArrayOption('kitchen', opt.label, opt.img)}
                  >
                    <div className="option-card-content">
                      <span className="option-label">{opt.label}</span>
                      <span className="option-desc">{opt.desc}</span>
                    </div>
                    <span className="option-price">{opt.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Spacer for bottom bar */}
        <div className="configurator-bottom-spacer" />

      </main>

      {/* FIXED BOTTOM SUMMARY BAR */}
      <div className="configurator-summary-bar">
        <div className="summary-left">
          <span className="summary-label">預估選配總計：</span>
          <span className="summary-price">NT$ {calculateTotal().toLocaleString()}</span>
        </div>
        <div className="summary-right">
          <button className="summary-btn outline">儲存配置清單</button>
          <button className="summary-btn primary">預約諮詢此方案</button>
        </div>
      </div>

    </div>
  );
}

export default SmartCustomizationDetail;
