---
trigger: always_on
---

# AI 協作開發規範 (React 18 + Vite)

## ## 目的
確保 AI 產出的程式碼可維護、可測試、可擴充；符合團隊既有架構與授權限制；避免洩漏商業授權或 secrets、臆測 API/權限/資料結構，並降低難以維護的技術債。

## ## 技術棧背景
- **前端框架**：React 18 (Vite 建置)
- **UI 套件**：React Bootstrap、Kendo UI (商業授權，切勿分享授權金鑰或註冊檔)
- **路由**：`react-router-dom`
- **典型頁框**：`Layout` 包裹路由內容，進入頁面前需經過 SSO/權限檢核 (參考 `src/Router/index.tsx`)
- **首頁與路由配置**：通常首頁採用 `src/Page/Home/index.tsx` 的模式 (使用 NavTabs 與 Tab 切換不同列表)，但路由配置應已在 `src/Router/index.tsx` 中完成設定，新增頁面時僅需在 Router 中新增對應的 Route 即可。
- **API**：`axios`；**資料存取/快取**：`@tanstack/react-query` (`useQuery` / `useMutation`)
- **對話框**：`AlertDialog`、`ConfirmDialog` (`src/common/CoreLibrary/Dialogs/`)
- **登入資訊**：可透過 `src/common/CoreLibrary/Auth/authUtil.ts` 取得登入後使用者資料
- **內部人員選取元件**：`src/common/OaLibrary/UserInfo/UserInfoInput/`
- **專案結構**：頁面由 `Layout` 包裹；路由進入前需完成 SSO/權限檢核 (參考 `src/Router/index.tsx`)；共用元件置於 `common/` 或 `components/`。
- **API 模組**：遵循 `src/api/` 現有子目錄分層 (如 `takeApi/`、`userApi/` 等) 定義 URL 與請求/回應型別，勿打散或另起不一致路徑。
- **頁面設計規範**：
  - 頁面檔案一律放在 `src/Page` 資料夾下，以頁面名稱命名資料夾 (例如：`HomePage`、`UserManagementPage`)。

---
## ## 任務追蹤與 TODO 規範

### 狀態標記格式 (GFM Syntax)
- [ ] **待處理 (Todo)**：尚未開始的任務。
- [/] **進行中 (In Progress)**：目前正在撰寫或除錯的項目。
- [x] **已完成 (Done)**：代碼已寫入、通過型別檢查且符合行為準則。
- [!] **阻塞 (Blocked)**：因資訊不足、技術瓶頸或與現有架構衝突而停擺，需後方註記原因。

### AI 自動更新規則
1. **主動更新**：每當完成一個子項目（Sub-task），AI 必須主動編輯 `TODO.md` (或本文件任務區)，將狀態由 `[ ]` 更新為 `[x]`。
2. **對話初始化**：每次新對話開始時，AI 應先讀取任務清單，確認當前「進行中」或下一個「待處理」的項目，並主動詢問是否繼續。
3. **拒絕虛假勾選**：嚴禁在未實際產生正確程式碼前標記為完成。若程式碼編譯失敗或有 Linter 錯誤，該項狀態必須維持 `[/]` 或 `[!]`。

### 任務拆解要求
- 禁止建立過於籠統的任務（例如：`- [ ] 寫完後端`）。
- 必須拆解為可驗證的原子任務（例如：`- [ ] 實作 User 登入 API 型別定義`）。

---

## ## 行為準則

### 安全與授權 (最高優先)
- **❌ 禁止外傳**：Kendo UI 授權金鑰、`.npmrc`、`lock` 檔內授權資訊、任何 API Key / Token / Secret。
- **環境變數**：一律使用 `.env` 並以 `import.meta.env` 讀取；嚴禁硬編碼或示範 secrets，也不得在回覆中回傳 secrets。
- **套件管理**：新增依賴前需說明用途、授權類型、對專案的影響，並確認未違反授權與安全規範。

### 程式風格
- **使用 JavaScript**：型別盡量明確，不要用 `any`；必要時以註解解釋權宜之計。
- **React 組件**：以函式元件 + hooks；狀態邏輯封裝於 custom hooks 或 service。
- **頁面元件**：一律使用 `const` 定義 (例如：`const HomePage = (): JSX.Element => { ... }`)，禁止使用 `function` 宣告；禁止使用 `export default`，改為直接 `export const`。
- **元件使用**：盡量使用 React Bootstrap / Kendo UI 現有元件；新增樣式時優先使用現有設計系統的變數與 utility class。
- **按鈕優先使用共用元件**：`ButtonModel` (`src/common/UILibrary/ButtonModel/index.tsx`)。
- **路由與頁面**：須考量 SSO 驗證流程，避免在未驗證狀態下渲染敏感內容。
- **API 呼叫**：使用 `axios` 並包 `try/catch`；資料抓取/操作以 `useQuery` / `useMutation` 包裝。
- **成功/失敗訊息**：一律以 `AlertDialog` 提示；需要使用者確認的操作 (例：刪除) 以 `ConfirmDialog` 先確認再執行 mutation。

### API 與型別
- 新增 API 檔案時，依 `src/api/` 既有目錄建立；Request/Response 必須定義 interface，非必要禁止使用 `any`。
- 單檔內若 interface/型別過多，於同目錄新增 `type.ts` 或 `interface.ts` 集中管理，並由元件/服務檔引入。

### 錯誤處理
- `useQuery` / `useMutation` 的 `onError`：統一轉換錯誤訊息，使用 `AlertDialog` 顯示；避免直接把 console/error 資訊拋給使用者。

### Dialog 與使用者互動
- **成功 / 失敗**：一律使用 `AlertDialog`。
- **破壞性操作 (刪除 / 提交)**：必須先以 `ConfirmDialog` 取得確認再執行。
- **❌ 禁止使用 `window.alert`**：不可直接將 console error 顯示給使用者。

### 可維護性
- 拆分可重用元件，避免重複邏輯；共用方法放於 `common` 或 `hooks` 目錄。
- 關鍵邏輯添加輕量註解，描述設計意圖或邊界情境 (避免流水帳式註解)。
- 若修改行為需同步更新測試 (若專案已有測試框架) 與說明文件。


### 效能與可用性
- 優先考慮在「確實有需要」時使用懶載入 (`React.lazy` / `Suspense`)，例如大型或次要路由，避免為了套用技術而過度拆分造成額外資源開銷。
- 避免不必要的 re-render；善用 `useMemo` / `useCallback` / `React.memo`，但僅在量測或邏輯複雜度確實有助於效能時使用。

---

## ## AI 助理使用須知

- **回覆一律使用繁體中文。**
- 當有不確定需求或缺失資訊時，先提問再行實作；避免臆測。
- 若涉及授權檔或內部 API，僅能引用已存在的代碼與文件，不得虛構。
- 需新增依賴或重大架構調整時，先產生設計方案與影響分析，經確認後再實作。

### AI Anti-Pattern (禁止事項)
- **❌ 在 component 內直接呼叫 axios** (應封裝至 API 模組或 Hooks)。
- **❌ 使用 `any` 只為了通過編譯。**
- **❌ 腦補 API response 欄位。**
- **❌ 複製貼上相似邏輯而不抽共用。**
- **❌ 關閉 ESLint / TypeScript 檢查。**
- **❌ 硬編碼角色、系統代碼。**