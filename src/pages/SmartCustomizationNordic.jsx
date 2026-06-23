import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SmartCustomizationDetail.css';

function SmartCustomizationNordic() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── Configuration State ───
  // 每個空間的選配品項（複選）
  const [config, setConfig] = useState({
    livingRoom: [],
    studyRoom: [],
    diningRoom: [],
    dressingRoom: []
  });

  // ─── Toggle 選項 ───
  const toggleOption = (category, label) => {
    setConfig(prev => {
      const currentList = prev[category];
      if (currentList.includes(label)) {
        return { ...prev, [category]: currentList.filter(item => item !== label) };
      } else {
        return { ...prev, [category]: [...currentList, label] };
      }
    });
  };

  // ─── 各空間選配品項資料 ───

  // Section 1: 客廳空間
  const livingRoomOptions = [
    {
      label: '電視櫃懸吊式',
      desc: '綠建材系統板，連供帶料含金屬滑軌零件',
      price: 30000
    },
    {
      label: '玄關展示櫃',
      desc: '綠建材系統板，連工帶料，內含伸縮滑軌金屬掛衣區',
      price: 37500
    }
  ];

  // Section 2: 書房 / 次臥空間
  const studyRoomOptions = [
    {
      label: '吊櫃含背板支撐',
      desc: '綠建材系統板，連供帶料含所有金屬內扣件',
      price: 18000
    },
    {
      label: '書桌',
      desc: '寬153cm × 深60cm，檯面加厚板25mm，連工帶料含下支撐背板18mm',
      price: 16000
    },
    {
      label: '衣櫃（吊衣＋抽屜）',
      desc: '綠建材系統板，連工帶料含內建金屬配件滑軌',
      price: 33000
    },
    {
      label: '衣櫃（純吊衣櫃）',
      desc: '綠建材系統板，連工帶料含內建金屬配件',
      price: 30000
    }
  ];

  // Section 3: 餐廳空間
  const diningRoomOptions = [
    {
      label: '餐邊櫃',
      desc: '綠建材系統板（詳細規格請洽詢）',
      price: null // 尚未報價
    },
    {
      label: '餐邊吊櫃＋開放吊櫃',
      desc: '綠建材系統板，連工帶料加背板支撐架',
      price: 15000
    }
  ];

  // Section 4: 更衣室
  const dressingRoomOptions = [
    {
      label: '4米8開放吊衣收納櫃',
      desc: '綠建材系統板，連工帶料，含所有金屬零件、滑軌、背板支撐架',
      price: 107500
    }
  ];

  // ─── 價格計算 ───
  const calculateTotal = () => {
    let total = 0;
    const allSections = [
      { choices: config.livingRoom, options: livingRoomOptions },
      { choices: config.studyRoom, options: studyRoomOptions },
      { choices: config.diningRoom, options: diningRoomOptions },
      { choices: config.dressingRoom, options: dressingRoomOptions }
    ];

    allSections.forEach(({ choices, options }) => {
      choices.forEach(choice => {
        const opt = options.find(o => o.label === choice);
        if (opt && opt.price !== null) {
          total += opt.price;
        }
      });
    });

    return total;
  };

  // 檢查是否有選到「洽詢報價」的項目
  const hasUnpricedItem = () => {
    const allSections = [
      { choices: config.livingRoom, options: livingRoomOptions },
      { choices: config.studyRoom, options: studyRoomOptions },
      { choices: config.diningRoom, options: diningRoomOptions },
      { choices: config.dressingRoom, options: dressingRoomOptions }
    ];
    return allSections.some(({ choices, options }) =>
      choices.some(choice => {
        const opt = options.find(o => o.label === choice);
        return opt && opt.price === null;
      })
    );
  };

  // ─── 格式化價格顯示 ───
  const formatPrice = (price) => {
    if (price === null) return '洽詢報價';
    return `+ NT$ ${price.toLocaleString()}`;
  };

  // ─── 渲染選項卡片 ───
  const renderOptionCards = (category, options) => (
    <div className="options-grid">
      {options.map(opt => {
        const isActive = config[category].includes(opt.label);
        return (
          <button
            key={opt.label}
            className={`option-card ${isActive ? 'active' : ''}`}
            onClick={() => toggleOption(category, opt.label)}
          >
            <div className="option-card-content">
              <span className="option-label">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </div>
            <span className={`option-price ${opt.price === null ? 'inquiry' : ''}`}>
              {formatPrice(opt.price)}
            </span>
          </button>
        );
      })}
    </div>
  );

  // ─── 空間 Section 資料 ───
  const sections = [
    {
      key: 'livingRoom',
      badge: '客廳空間',
      title: '客廳系統櫃訂製',
      img: '/customization/nordic/living-room.jpg',
      options: livingRoomOptions
    },
    {
      key: 'studyRoom',
      badge: '書房 / 次臥空間',
      title: '書房收納機能訂製',
      img: '/customization/nordic/study-room.png',
      options: studyRoomOptions
    },
    {
      key: 'diningRoom',
      badge: '餐廳空間',
      title: '餐廳櫃體訂製',
      img: '/customization/nordic/dining-room.jpg',
      options: diningRoomOptions
    },
    {
      key: 'dressingRoom',
      badge: '更衣室',
      title: '更衣室收納訂製',
      img: '/customization/nordic/dressing-room.jpg',
      options: dressingRoomOptions
    }
  ];

  return (
    <div className="configurator-wrapper">
      <Navbar />

      <div className="preview-header global-header">
        <button className="back-btn" onClick={() => navigate('/smart-customization')}>
          ← 返回智能訂製列表
        </button>
        <h1 className="preview-title">智能訂製 • 全屋裝修</h1>
        <p className="preview-subtitle">方案 #2 - 北歐風</p>
      </div>

      <main className="configurator-main vertical-layout">

        {sections.map((section) => (
          <section className="config-row" key={section.key}>
            <div className="config-row-left">
              <div className="preview-image-box">
                <img
                  src={section.img}
                  alt={section.badge}
                  className="preview-img"
                />
                <div className="preview-badge">{section.badge}</div>
              </div>
            </div>
            <div className="config-row-right">
              <h2 className="config-section-title">
                {section.title} <span className="opt">可複選</span>
              </h2>
              {renderOptionCards(section.key, section.options)}
            </div>
          </section>
        ))}

        {/* Spacer for bottom bar */}
        <div className="configurator-bottom-spacer" />

      </main>

      {/* FIXED BOTTOM SUMMARY BAR */}
      <div className="configurator-summary-bar">
        <div className="summary-left">
          <span className="summary-label">預估選配總計：</span>
          <span className="summary-price">NT$ {calculateTotal().toLocaleString()}</span>
          {hasUnpricedItem() && (
            <span className="summary-note">（含洽詢報價項目）</span>
          )}
        </div>
        <div className="summary-right">
          <button className="summary-btn primary">預約諮詢此方案</button>
        </div>
      </div>

    </div>
  );
}

export default SmartCustomizationNordic;
