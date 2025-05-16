---
title: Canny Edge Detector
date: 2020-12-15 21:33:00 +0800
tags: [edge]
---

## Canny edge檢測流程

1. 使用高斯濾波器
2. 使用Sobel濾波器取出x,y方向梯度
3. 對梯度進行非極大值抑制
4. 使用滯後閾值

## 高斯濾波

平滑影像，濾除雜訊

## 滯後閾值

設定高閾值與低閾值  
<img src="https://yanzzzzzzzzz.github.io/img/Hysteresis-2.png" width="400"/>
