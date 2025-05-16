---
title: cs131 lecture 6 Feature Descriptors-SIFT
author: yanz
date: 2021-03-15 22:30:00 +0800
categories: [course]
tags: [cs131]
mathjax: true
toc: true
---

我們在上一回找到了角點，但如何利用關鍵點的周圍資訊，來讓彼此匹配，也許可以把角點周圍的像素區塊取出來匹配，但如果遇到兩張影像角度不同時如何匹配?

# SIFT descriptor(SIFT=Scale-Invariant Feature Transform)

建構一個旋轉不變性描述子

- 從 DoG 得到一個帶有尺度不變性的關鍵點
- 從關鍵點周圍資訊找出特徵角度(不直接旋轉個別影像區塊進行匹配，因為很慢)
  <img src="https://yanzzzzzzzzz.github.io/img/keypoint-neightborhood.png"  width="400"/>

## SIFT 流程

<img src="https://yanzzzzzzzzz.github.io/img/gradient-direction.png"  width="400"/>

使用影像梯度計算關鍵點周圍的角度直方圖，並把角度切成八等分
<img src="https://yanzzzzzzzzz.github.io/img/gradient-direction-1.png"  width="400"/>

把關鍵點周圍梯度值每 4x4 為一群，個別計算旋轉過的梯度方向直方圖
梯度的貢獻程度取決於距離，如果它在兩個直方圖位置的中間，它給兩個直方圖一半的貢獻
<img src="https://yanzzzzzzzzz.github.io/img/descriptor-parameter.png"  width="400"/>

梯度直方圖的方向分為 8 份與每個區塊為 4x4 是由作者選出最佳的參數結果

- 8 方向的直方圖，4x4 個直方圖陣列，會有 8x4x4=128 個向量
- SIFT 描述子是一個長度為 128 的向量，並有帶有旋轉不變性與尺度不變性
- 可以比較影像 A 與影像 B 的各自的向量來尋找配對的關鍵點
- 很大的影像梯度通常來自 3D 照明效果(如：眩光)，將 128 維向量最大數值限制在 0.2 內，計算完後再進行正規化(乘上 256)

## SIFT 測試結果

<img src="https://yanzzzzzzzzz.github.io/img/noise.png"  width="400"/>

在隨機改變影像尺度、角度，再加上一定的 noise 的 dataset 下的特徵比對結果
<img src="https://yanzzzzzzzzz.github.io/img/stability.png"  width="400"/>

在隨機改變影像尺度、角度、仿射變換並加入 2%的 noise 的 dataset，對 30000 個特徵進行最鄰近點搜尋的結果，測試穩定性
<img src="https://yanzzzzzzzzz.github.io/img/Distinctiveness.png"  width="400"/>

對測試資料進行 30 度的仿射變換與 2%的 noise 後提取特徵點，計算單點最鄰近搜尋的準確率

## SIFT 結論

- SIFT 是一個具有尺度不變性、旋轉不變性，並具有獨特性的關鍵點提取方法
- 有效率的計算速度，可以在一般的 PC 上做到接近即時處理的效果
- 論文中也展示使用關鍵點加上最鄰近搜尋來進行物件檢測

## 參考

- [David G. Lowe,"Distinctive Image Features from Scale-Invariant Keypoints"," International Journal of Computer Vision, 60, 2 (2004), pp. 91-110](https://people.eecs.berkeley.edu/~malik/cs294/lowe-ijcv04.pdf)
- [wiki-尺度不變特徵轉換](https://zh.wikipedia.org/wiki/%E5%B0%BA%E5%BA%A6%E4%B8%8D%E8%AE%8A%E7%89%B9%E5%BE%B5%E8%BD%89%E6%8F%9B)
