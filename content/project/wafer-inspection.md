---
title: 晶圓檢測系統
year: 2020
skills: ["C#", "WinForm", "Motion Control", "SECS/GEM", "Machine Vision"]
summary: 開發一個結合運動控制與 SECS/GEM 協議的半導體晶圓瑕疵檢測系統。
images: ["/images/wafer-inspection/1.png"]
github: ""
demo: ""
---

## 專案概覽

一個適用於半導體晶圓瑕疵檢測的自動光學檢測 (AOI) 系統，整合同步高精度運動控制與業界標準 SECS/GEM 通訊協定。

## 功能特色

- **高精度檢測**：微米級瑕疵檢測
- **運動控制**：同步多軸運動系統
- **SECS/GEM 協定**：業界標準設備通訊
- **即時處理**：快速瑕疵分類與報告
- **配方 (Recipe) 管理**：靈活的檢測參數設定

## 技術堆疊

- **框架**：C# WPF (.NET Framework)
- **運動控制**：PCI 運動控制卡驅動程式
- **機器視覺**：工業相機與影像處理
- **通訊**：SECS/GEM (SEMI Equipment Communication Standard)
- **資料庫**：SQL Server 用於瑕疵資料庫

## 關鍵組件

### 運動控制系統

- 多軸伺服馬達控制
- 精密定位 (<1μm 精度)
- 協調運動規劃
- 緊急停止與安全機制

### 視覺系統

- 高解析度工業相機
- LED 環形光源控制
- 影像擷取與預處理
- 瑕疵偵測演算法

### SECS/GEM 整合

- 設備狀態管理
- 配方 (Recipe) 管理
- 資料收集與報告
- 警報處理
- 遠端控制功能


