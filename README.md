# 泰金閣設計裝修工作室 (Interior Design Studio)

本專案為「泰金閣設計裝修工作室」的官方網站前端程式碼。專案採用 React 18 搭配 Vite 建置，提供快速的開發與建置體驗。網站主要提供工作室的服務展示、老屋翻新與智能訂製全屋裝修的介紹，並整合了線上詢問與工班預約功能。

## 技術棧 (Tech Stack)

*   **前端框架**: React 18
*   **建置工具**: Vite
*   **路由管理**: React Router DOM (v7)
*   **表單與郵件服務**: EmailJS (`@emailjs/browser`)
*   **樣式**: 原生 CSS (純手工打造，支援 RWD)

## 專案核心功能

1.  **服務展示**: 介紹智能訂製全屋裝修與老屋改造等服務。
2.  **工班預約 (`/worker-appointment`)**: 讓客戶能線上預約四大專業工班（木工、系統櫃、拆除清運、水電），並透過 EmailJS 發送通知。
3.  **老屋翻新 (`/refurbishment`)**: 展示老屋翻新的服務項目、工班配置，並提供線上免費評估預約表單。
4.  **線上詢問 (`/inquiry`)**: 一般客戶的線上諮詢管道。

---

## 🚀 快速開始 (Getting Started)

請依照以下步驟在本地端啟動開發環境：

### 1. 安裝依賴套件

確保您的電腦已安裝 [Node.js](https://nodejs.org/) (建議 v18 以上版本)。

```bash
npm install
```

### 2. 環境變數設定

本專案使用 EmailJS 來處理前端表單的信件發送，啟動前需要設定相關的金鑰與範本 ID。

1.  複製專案根目錄下的 `.env.example` 檔案，並將其重新命名為 `.env`。
2.  開啟 `.env` 檔案，填入您在 [EmailJS](https://www.emailjs.com/) 申請的實際金鑰與範本 ID：

```env
# EmailJS 帳號通用設定
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# 各模組專用的範本 ID
VITE_EMAILJS_TEMPLATE_ID=your_worker_appointment_template_id
VITE_EMAILJS_RENOVATION_TEMPLATE_ID=your_renovation_template_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_EMAILJS_ADMIN_EMAIL=admin@example.com
```

> **注意**：若未設定環境變數，表單送出時會自動進入「展示模式」，僅會在前端顯示成功畫面而不會實際發送信件。這方便開發者在沒有金鑰的情況下測試 UI 流程。

### 3. 啟動開發伺服器

```bash
npm run dev
```

啟動後，請在瀏覽器開啟 `http://localhost:5173/` 預覽網站。

---

## 🛠 可用腳本 (Available Scripts)

在專案目錄中，您可以執行以下指令：

### `npm run dev`
啟動具有 HMR (Hot Module Replacement) 功能的本地開發伺服器。

### `npm run build`
將應用程式打包，準備部署到正式環境。打包後的檔案會存放在 `dist/` 資料夾中。

### `npm run lint`
執行 ESLint 檢查程式碼風格與潛在錯誤。

### `npm run preview`
在本地端預覽 `npm run build` 打包後的正式版本應用程式。

---

## 📁 專案架構 (Project Structure)

```text
src/
├── assets/         # 靜態資源 (Icon 等)
├── components/     # 共用與獨立 UI 組件 (Navbar, Refurbishment 等)
├── data/           # 靜態資料或 Mock Data
├── img/            # 圖片資源
├── pages/          # 路由頁面 (Home, Inquiry, WorkerAppointment 等)
├── App.jsx         # 主應用程式與路由設定 (React Router)
├── App.css         # 全域基礎樣式
├── index.css       # 全域 CSS 變數與重置 (Reset)
└── mainDesign.css  # 共同版面與設計系統樣式
```
