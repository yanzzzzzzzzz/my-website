---
title: 養鵝場蛋產量分析系統
year: 2019
skills: ["C#", "Python", "YOLO", "Computer Vision", "Object Detection"]
summary: 使用 YOLO 物件偵測技術為養鵝場開發的自動化蛋產量分析系統。
images: ["/images/goose-farm/1.png"]
github: ""
demo: "https://ieeexplore.ieee.org/document/8644970"
---

## 專案概覽

一個養鵝場的自動化蛋產量監控系統，利用基於深度學習的物件偵測技術來追蹤與分析蛋的生產模式。

## 功能特色

- **即時偵測**：基於 YOLO 的蛋偵測與計數
- **產量分析**：日產量與週產量統計
- **自動化報表**：生成產量報告
- **歷史追蹤**：監控長期的生產趨勢

## 技術堆疊

- **後端**：C# (.NET Framework)
- **AI/機器學習**：Python, YOLO (You Only Look Once)
- **電腦視覺**：OpenCV
- **資料儲存**：SQL Server

## 論文發表

本成果已發表於 IEEE 會議：

- **標題**：Egg Production Analysis System for Goose Farms
- **會議**：IEEE International Conference on Applied System Innovation
- **年份**：2019
- [查看論文](https://ieeexplore.ieee.org/document/8644970)

## 技術實作

### 物件偵測流程

1. 從農場攝影機擷取影像串流
2. 畫面預處理與增強
3. 進行 YOLO 模型推論以偵測鵝蛋
4. 後處理與計數
5. 資料彙整與儲存

### 模型訓練

- 使用鵝蛋資料集訓練客製化 YOLO 模型
- 針對不同光照條件進行資料擴增 (Data Augmentation)
- 針對農場特定環境進行微調

## 成果與效益

- 偵測準確率達 95% 以上
- 具備即時處理能力
- 減少 80% 的人工計數人力
- 提升生產記錄的準確性
