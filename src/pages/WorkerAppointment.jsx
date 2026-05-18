import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import SharedFooter from '../components/SharedFooter';
import './WorkerAppointment.css';

export const WorkerAppointment = () => {
  const [formData, setFormData] = useState({
    workerTypes: [],
    location: '',
    areaSize: '',
    hasDesignDrawings: '',
    expectedTime: '',
    contactName: '',
    contactPhone: '',
    email: '',
    remarks: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const workerOptions = [
    '木工工班',
    '系統櫃工班',
    '拆除清運工班',
    '水電工班',
    '設計圖施做'
  ];

  const locationOptions = ['竹南', '台中', '彰化', '南投'];

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const current = prev.workerTypes;
      if (current.includes(option)) {
        return { ...prev, workerTypes: current.filter((item) => item !== option) };
      } else {
        return { ...prev, workerTypes: [...current, option] };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // 發給用戶的範本
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID; // 發給開發/管理端的範本
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // 若未設定環境變數，直接預覽成功畫面（前端展示模式）
      console.log('未偵測到 EmailJS 金鑰，切換為展示模式。表單提交資料：', formData);
      setIsSending(false);
      setIsSubmitted(true);
      return;
    }

    // 將 formData 轉換為符合 EmailJS template 預期的格式
    const templateParams = {
      workerTypes: formData.workerTypes.join('、'),
      location: formData.location,
      areaSize: formData.areaSize,
      hasDesignDrawings: formData.hasDesignDrawings,
      expectedTime: formData.expectedTime,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      email: formData.email,
      remarks: formData.remarks || '無',
      reply_to: formData.email, // 可以將回信地址設為使用者的 email
      admin_email: import.meta.env.VITE_EMAILJS_ADMIN_EMAIL // 給管理端範本的收件信箱
    };

    // 準備要發送的 Promise 陣列
    const sendPromises = [
      // 第一封：發給使用者的通知信
      emailjs.send(serviceId, templateId, templateParams, { publicKey })
    ];

    // 如果有設定管理端範本 ID，則加入第二封信：發給我方（管理端）的通知信
    if (adminTemplateId) {
      sendPromises.push(
        emailjs.send(serviceId, adminTemplateId, templateParams, { publicKey })
      );
    }

    Promise.all(sendPromises)
      .then(
        (responses) => {
          console.log('SUCCESS! 所有信件發送完成。', responses);
          setIsSending(false);
          setIsSubmitted(true);
        },
        (error) => {
          console.log('FAILED...', error);
          alert('發送失敗，請稍後再試！');
          setIsSending(false);
        }
      );
  };

  return (
    <>
      <Navbar />
      <main className="worker-appointment-main">
        <div className="wa-hero">
          <div className="wa-hero-content">
            <h1 className="wa-title">工班預約</h1>
            <p className="wa-subtitle">專業工班為您服務，請填寫需求表單，我們將盡快與您聯繫。</p>
          </div>
        </div>

        <section className="wa-form-section">
          {isSubmitted ? (
            <div className="wa-success-message">
              <h2>預約成功！</h2>
              <p>我們已收到您的需求，將盡快安排專人與您聯繫。</p>
              
              <div className="wa-summary">
                <h3>您提交的內容：</h3>
                <ul>
                  <li><strong>需求工班：</strong> {formData.workerTypes.join('、')}</li>
                  <li><strong>案場地點：</strong> {formData.location}</li>
                  <li><strong>案場坪數：</strong> {formData.areaSize} 坪</li>
                  <li><strong>是否有設計圖：</strong> {formData.hasDesignDrawings}</li>
                  <li><strong>預計施工時間：</strong> {formData.expectedTime}</li>
                  <li><strong>聯絡人：</strong> {formData.contactName}</li>
                  <li><strong>聯絡電話：</strong> {formData.contactPhone}</li>
                  <li><strong>聯絡信箱：</strong> {formData.email}</li>
                  <li><strong>備註說明：</strong> {formData.remarks || '無'}</li>
                </ul>
              </div>

              <button className="wa-btn" onClick={() => setIsSubmitted(false)}>
                重新填寫
              </button>
            </div>
          ) : (
            <form className="wa-form" onSubmit={handleSubmit}>
              <div className="wa-form-group">
                <label className="wa-label">需要預約的工班 (可複選) <span className="required">*</span></label>
                <div className="wa-checkbox-group">
                  {workerOptions.map((option) => (
                    <label key={option} className="wa-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.workerTypes.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="wa-form-row">
                <div className="wa-form-group">
                  <label className="wa-label">案場地點 <span className="required">*</span></label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="wa-input"
                  >
                    <option value="" disabled>請選擇案場地點</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="wa-form-group">
                  <label className="wa-label">案場坪數 (坪) <span className="required">*</span></label>
                  <input
                    type="number"
                    name="areaSize"
                    value={formData.areaSize}
                    onChange={handleChange}
                    required
                    placeholder="請輸入坪數"
                    className="wa-input"
                    min="1"
                  />
                </div>
              </div>

              <div className="wa-form-row">
                <div className="wa-form-group">
                  <label className="wa-label">是否有設計圖？ <span className="required">*</span></label>
                  <div className="wa-radio-group">
                    <label className="wa-radio-label">
                      <input
                        type="radio"
                        name="hasDesignDrawings"
                        value="是"
                        checked={formData.hasDesignDrawings === '是'}
                        onChange={handleChange}
                        required
                      />
                      <span>是</span>
                    </label>
                    <label className="wa-radio-label">
                      <input
                        type="radio"
                        name="hasDesignDrawings"
                        value="否"
                        checked={formData.hasDesignDrawings === '否'}
                        onChange={handleChange}
                        required
                      />
                      <span>否</span>
                    </label>
                  </div>
                </div>

                <div className="wa-form-group">
                  <label className="wa-label">預計施工時間 <span className="required">*</span></label>
                  <input
                    type="date"
                    name="expectedTime"
                    value={formData.expectedTime}
                    onChange={handleChange}
                    required
                    className="wa-input"
                  />
                </div>
              </div>

              <div className="wa-form-row">
                <div className="wa-form-group">
                  <label className="wa-label">聯絡人姓名 <span className="required">*</span></label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="請輸入姓名"
                    className="wa-input"
                  />
                </div>
                <div className="wa-form-group">
                  <label className="wa-label">聯絡電話 <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    placeholder="請輸入電話號碼"
                    className="wa-input"
                  />
                </div>
              </div>

              <div className="wa-form-row">
                <div className="wa-form-group">
                  <label className="wa-label">聯絡信箱 (Email) <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="請輸入 Email，發送成功會以此為準"
                    className="wa-input"
                  />
                </div>
                {/* 保持長度一致的佔位空間 */}
                <div className="wa-form-group"></div>
              </div>

              <div className="wa-form-group">
                <label className="wa-label">備註說明</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="請輸入任何其他需求或補充說明..."
                  className="wa-textarea"
                  rows="4"
                ></textarea>
              </div>

              <div className="wa-form-actions">
                <button type="submit" className="wa-btn wa-submit-btn" disabled={isSending}>
                  {isSending ? '發送中...' : '送出預約表單'}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="wa-info-section">
          <div className="wa-info-container">
            <h2 className="wa-info-title">工班預約說明</h2>
            <div className="wa-info-grid">
              <div className="wa-info-item">
                <h3>專業工班團隊</h3>
                <p>我們擁有多年經驗的專業木工、水電、系統櫃及拆除工班，確保每一項工程都能達到最高品質標準。</p>
              </div>
              <div className="wa-info-item">
                <h3>透明化流程</h3>
                <p>從預約、現場丈量、報價到施工，所有流程公開透明。我們會針對您的需求提供最合適的工法建議與精確預算。</p>
              </div>
              <div className="wa-info-item">
                <h3>品質與保固</h3>
                <p>所有施工項目均提供售後服務與保固，讓您在入住後也能享有最安心的居家保障。</p>
              </div>
              <div className="wa-info-item">
                <h3>服務範圍</h3>
                <p>目前主要服務地區涵蓋竹南、台中、彰化及南投等中部地區，若有其他地區需求亦歡迎填表詢問。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
};

export default WorkerAppointment;
