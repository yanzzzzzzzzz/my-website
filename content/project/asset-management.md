---
title: 個人資產管理系統 (Personal Asset Management System)
year: 2025
skills: ["Vue 3", "TypeScript", "Supabase", "PostgreSQL", "RLS Security", "Chart.js"]
summary: 全方位的投資組合追蹤平台，整合台美股即時數據，採用 Serverless 架構與嚴格的資料安全策略。
images: ["/images/asset-management/1.png"]
github: ""
demo: "https://personal-asset-management-system.pages.dev/"
---

## 專案概覽

這是一款專為現代投資者打造的單頁應用程式 (SPA)，旨在解決分散於不同券商與銀行的資產難以統一追蹤的痛點。系統支援即時匯率換算，能將台股、美股、加密貨幣及銀行存款統一以基準貨幣計算淨值，並提供視覺化的歷史趨勢分析。

## 核心技術亮點

在這個專案中，我不僅實作了功能，更專注於效能優化與架構設計：

- **高效能數據處理**：實作了智慧型快取機制 (Smart Caching)，在前端與 Supabase Database 間建立快取層，大幅減少 Finnhub 與 FinMind 的外部 API 呼叫次數，提升載入速度並節省 API Quota。
- **強健的批次匯入系統**：設計了 `Parse -> Validate -> Prepare -> Batch Insert` 的資料管線模式。支援從 CSV/Excel 匯入數百筆交易紀錄，包含自動錯誤偵測與資料清洗，確保資料庫的一致性。
- **企業級資料安全**：完全依賴 Supabase 的 **Row Level Security (RLS)** 政策。資料庫層級強制執行存取控制，確保使用者只能存取屬於自己的資產數據，即使 API 金鑰外洩也能保障資料安全。
- **即時互動介面**：使用 Vue 3 Composition API 搭配 Pinia 狀態管理，實現了 Excel 風格的直覺編輯介面，支援即時運算與響應式更新。

## 詳細功能特色

- **多市場即時追蹤**：
  - **美股**：整合 Finnhub API，支援美股盤後價格更新。
  - **台股**：整合 FinMind API，即時追蹤台灣上市櫃股票。
  - **加密貨幣**：透過 CoinGecko API 追蹤主流加密貨幣資產。
- **智慧匯率換算**：自動處理多幣別（USD, TWD, Crypto）之間的即時匯率轉換，提供統一的資產淨值視圖。
- **互動式儀表板**：
  - 資產配置圓餅圖
  - 淨值歷史趨勢圖 (Time-series Analysis)
  - 損益熱力圖
- **身份驗證**：整合 Google OAuth 2.0 與 Supabase Auth，支援無密碼登入體驗 (Magic Link)。

## 技術堆疊細節

- **Frontend**: Vue 3, TypeScript, Vite, Pinia
- **Visualization**: Chart.js, Vue-Chartjs
- **Backend (BaaS)**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Data Engineering**: Axios, date-fns, xlsx (用於資料 ETL)

## 開發心得與挑戰

- **挑戰：第三方 API 速率限制 (Rate Limiting)**
  - **解決方案**：在匯入模組中實作了 Promise 併發控制與指數退避 (Exponential Backoff) 策略，並在資料庫層建立價格快取表 (Stock Prices Engine)，有效解決了外匯與股價 API 的呼叫限制問題。
- **挑戰：複雜的資料驗證**
  - **解決方案**：建立了一套可擴充的驗證器 (Validator Pattern)，針對不同資產類型（股票、法幣、加密貨幣）定義獨立的驗證邏輯，確保匯入資料的準確性。
