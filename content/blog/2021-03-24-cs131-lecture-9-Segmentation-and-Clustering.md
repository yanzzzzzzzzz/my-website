---
title: cs131 lecture 9 Segmentation and Clustering-Agglomerative Clustering
author: yanz
date: 2021-03-24 21:50:00 +0800
categories: [course]
tags: [cs131]
mathjax: true
toc: true
---

## 影像分割目的

- 把屬於同一群的像素集合在一起
- 將想要做進一步分析的物件與背景分割出來，概念跟框選 ROI 相似，但是更精細的 ROI，把非物件的不相干雜訊濾除

# 視覺上分群的範例

依照格式塔原則進行分類，以 Gestalt 為名的完形心理學，概念#是人類對於任何視覺圖像的認知，是一種經過知覺系統組織後的形態與輪廓，而並非所有各自獨立部份的集合。
其中格式塔原則的一些特點：

- Similarity 相似性
- Symmetry 對稱性
- Common Fate 共同命運，同群在影像中表現出相同的移動方向性、趨勢
- Proximity 相近性，物體距離相近時視為一群

<img src="https://yanzzzzzzzzz.github.io/img/Gestalt-Factors.png"  width="400"/>

## clustering method

分群的概念是把一組資料依照距離或相似程度分成不同的群集
分群法是一種非監督式分群方法

### 相似度比對

常見的相似度比對方法有：

- Euclidean distance
- Cosine similarity

歐式距離：
<img src="https://yanzzzzzzzzz.github.io/img/Euclidean-distance.png"  width="400"/>

餘弦相似性，概念是比對兩向量的夾角角度：
<img src="https://yanzzzzzzzzz.github.io/img/cosin-similarity.png"  width="400"/>

### 分群演算法理想特性

- [可擴縮性（Scalability）](https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7)
- 可以處理不同的資料型態
- 簡單的參數調整與設定
- 可說明性，呈現的結果是可解釋的
- 約束性，演算法可由使用者預先設定的限制下動作

## Agglomerative clustering

1. 將每個資料點都視為一獨立的群
1. 找出最相近的群集點對
1. 將點對合併成一群
1. 重複上述步驟直到合併結束

### 定義群集之間的相似性

- 點到點之間的平均距離
- 最小點距離
- 最大點距離
  <img src="https://yanzzzzzzzzz.github.io/img/clustering-simmilarity.png"  width="400"/>

## 優缺點

- 好實現且應用廣泛
- 集群具有自適應形狀
- 提供階層式的集群
- 不需預設群數
- 可能會出現不均勻的群集結果
- 還是需要定義群集相似度閾值
- 時間複雜度 $O(n^3)$
- 可能陷入局部最佳解

## 參考

[視覺法則 – 格式塔原則](https://uiclub.tw/2015/09/05/visual-principles-gestalt-principles/)
