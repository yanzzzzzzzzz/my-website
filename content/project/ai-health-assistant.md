---
title: AI 健康助手 (AI Health Assistant)
year: 2025
skills: ["ASP.NET Core", "Vue 3", "Computer Vision", "Hangfire"]
summary: 整合生成式 AI 與電腦視覺的 LINE Bot 平台，解決傳統飲食紀錄繁瑣痛點，提供即時熱量估算與個性化健康建議。
images: ["/images/ai-health-assistant/1.png"]
---

## 💡 專案背景與動機

在健康意識抬頭的現代，飲食紀錄是體態管理最重要的一環，但傳統 App 需要使用者手動搜尋食物、輸入克數，過程繁瑣導致放棄率極高。

**AI 健康助手** 旨在解決此痛點。透過最普及的 **LINE** 介面，結合 **多模態視覺 AI (Vision AI)**，使用者只需「拍一張照」，系統即可自動辨識食物種類、估算份量並計算營養素，將原本 3 分鐘的紀錄過程縮短至數秒鐘。

## 🛠️ 系統架構設計

本專案採用 **ASP.NET Core** 打造高擴充性後端，並結合 **Vue 3** 前端技術與 **LINE LIFF** 深度整合。

### 核心技術堆疊

- **Backend**：**ASP.NET Core 9**
- **Scheduling**：**Hangfire**
- **CV Process**：**SkiaSharp + OpenCvSharp**
- **Database**：**SQL Server + EF Core**
- **Frontend**：**Vue 3 + Vuetify**

### AI 整合策略

為了提升辨識準確度，設計了複合式的 AI 處理流程：

1.  **多模態視覺識別**：整合商用視覺模型進行物件偵測與營養成分估算。
2.  **混合式 Mask 生成策略**：實作模型 Fallback 機制，優先使用**主要生成式視覺模型**生成遮罩，若效果不佳或失敗則自動切換至**專用影像分割模型 (Segmentation Model)** 進行補強，確保標註精準度。
3.  **大型語言模型 (LLM) 諮詢**：透過 System Prompt Engineering，讓 AI 扮演專業營養師，根據識別結果提供建議。

## 🚀 工程難題與解決方案

### 1. 解決 LINE Webhook 的回應時限限制
**問題**：AI 影像分析與圖片後處理耗時較長，易超過 LINE Webhook 的回應時限導致錯誤。

**解決方案**：
採用 **非同步背景任務 (Asynchronous Background Task)** 模式。Controller 收到請求後立即啟動背景執行緒處理 AI 分析與繪圖，並快速回傳 200 OK，待處理完成後再主動推播結果，確保使用者體驗流暢。

### 2. 精準的影像視覺化標註
**問題**：僅有文字回覆不夠直觀，使用者難以確認 AI 是否正確辨識到盤中食物。

**解決方案**：
整合 **OpenCvSharp** 進行輪廓 (Contour) 運算，並使用 **SkiaSharp** 進行高效能繪圖，將 AI 辨識出的食物區塊精確繪製在原圖上回傳，實現「所見即所得」的互動體驗。

## 📊 成果與影響

*   **自動化流程**：大幅減少人工輸入營養成分的時間。
*   **高穩定性**：成功部署至正式環境，處理大量食物影像分析請求。
*   **深度整合**：結合 LINE LIFF 提供無縫的問卷填寫與衛教瀏覽體驗。
