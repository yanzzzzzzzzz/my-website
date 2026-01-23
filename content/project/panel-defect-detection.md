---
title: 面板瑕疵檢測系統
year: 2019
skills: ["MATLAB", "Image Processing", "Template Matching", "Computer Vision"]
summary: 建立一個利用影像比對與特徵提取技術的面板瑕疵分類系統。
images: ["/images/panel-defect-detection/1.png"]
github: ""
demo: ""
---

## 專案概覽

一個針對平面顯示器 (FPD) 的自動化瑕疵檢測系統，利用先進的影像處理技術來偵測並分類各種製程瑕疵。

## 功能特色

- **瑕疵偵測**：識別刮痕、斑點、線條與其他異常
- **分類功能**：依據類型與嚴重程度進行分類
- **範本比對**：基於參考影像的比對技術
- **特徵提取**：進階圖樣識別
- **統計分析**：瑕疵分佈報表

## 技術堆疊

- **平台**：MATLAB
- **影像處理**：MATLAB Image Processing Toolbox
- **電腦視覺**：範本比對演算法 (Template matching algorithms)
- **資料分析**：統計分析工具

## 檢測方法

### 範本比對 (Template Matching)

- 參考影像比對
- 正規化交互相關 (Normalized cross-correlation)
- 多尺度比對
- 旋轉不變性偵測

### 特徵提取

- 邊緣偵測 (Canny, Sobel)
- 形態學運算
- 紋理分析
- 對比度增強

### 分類演算法

- 閾值分類
- 基於特徵的分類
- 大小與形狀分析
- 瑕疵嚴重度分級

## 可檢測瑕疵類型

1. **刮痕 (Scratches)**：線狀表面損傷
2. **斑點 (Spots)**：點狀瑕疵與污染
3. **線條 (Lines)**：Mura 線條與條紋
4. **污漬 (Stains)**：不規則污染圖樣
5. **氣泡 (Bubbles)**：氣泡瑕疵

## 技術方法

### 前處理

- 影像對齊與配準
- 雜訊抑制
- 對比度調整
- 興趣區域 (ROI) 提取

### 檢測流程

1. 載入參考影像與測試影像
2. 前處理與增強
3. 範本比對 / 特徵提取
4. 瑕疵候選識別
5. 分類與分級
6. 報表生成

