---
title: Advanced Color to Gray Conversion
author: yanz
date: 2024-06-14 00:00:00 +0800
tags: [image processing, SIGGRAPH]
toc: true
---

近年來，將彩色影像轉換為灰階的需求不僅侷限於單純去色，如何在灰階影像中保留色彩的對比與細節，
是影像處理領域相當重要的課題。本專案實作了 SIGGRAPH 論文 *Color2Gray* 的方法，
透過梯度分析與色彩差異衡量，在灰階影像中重現原圖的視覺層次。

## 研究背景

一般的 RGB 轉灰階公式 (如加權平均) 往往忽略不同色相之間的對比，
造成灰階結果缺乏層次。Color2Gray 透過計算像素間的色差，
再以最佳化方式尋找灰階值，能較好地保留色彩帶來的視覺區分。

## 演算法流程

1. **色彩梯度計算**：將影像轉至 RGB 色彩空間，計算鄰近像素的色差以及亮度差。
2. **局部對比調整**：根據色差調整灰階梯度，避免不同色彩被映射至相同灰階而失去細節。
3. **全域最佳化**：以最小化能量函式的方式求得最終灰階值，使結果同時維持亮度一致與色彩對比。

## 實作與結果

專案以 Python 搭配 OpenCV 完成主要流程，
並提供範例程式執行展示。在測試影像上，相較於傳統灰階轉換，
此方法能更清楚地呈現色彩原本帶來的形狀與區域差異。

![Result](/images/Advanced-Color-to-Gray-Conversion.png)

## 參考資料

- [原始論文](https://github.com/yanzzzzzzzzz/Advanced-Color-to-Gray-Conversion/blob/master/Report.pdf)
- [GitHub 專案](https://github.com/yanzzzzzzzzz/Advanced-Color-to-Gray-Conversion)
