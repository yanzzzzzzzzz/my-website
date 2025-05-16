---
title: Canny Edge Detector
date: 2020-12-15 21:33:00 +0800
tags: [edge]
mathjax: true
toc : true
---

## Canny edge檢測流程

1. 使用高斯濾波器
1. 使用Sobel濾波器取出x,y方向梯度
1. 對梯度進行非極大值抑制
1. 使用滯後閾值

## 高斯濾波

平滑影像，濾除雜訊

## 滯後閾值

設定高閾值與低閾值
<img src="https://yanzzzzzzzzz.github.io/img/Hysteresis-2.png"  width="400"/>

低於低閾值的不是edge，如線段(D)
高於高閾值的是強edge，如線段(A)、(B)
介於高低閾值之間的edge，需檢查他的線段是否有與強edge連接
若有連接到，如線段(C)，就視為edge，沒連接到的就非edge(E)
