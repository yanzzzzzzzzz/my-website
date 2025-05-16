---
title: cs131 lecture 6 Feature Descriptors-HoG
author: yanz
date: 2021-03-16 21:50:00 +0800
categories: [course]
tags: [cs131]
mathjax: true
toc: true
---

另一種描述影像特徵的方法，HoG(Histogram of Oriented Gradients)，方向梯度直方圖
特徵描述子

## HoG 簡介

局部的物件外觀與形狀經常由局部亮度梯度或邊緣方向顯現出來，因此透過局部梯度資訊建立一個梯度角度直方圖的特徵

## HoG 流程

把影像切分成多個小區塊(稱為 cells)，cells 的形狀可以是矩形或圓形，每個 cell 累加梯度方向的局部直方圖
<img src="https://yanzzzzzzzzz.github.io/img/HoG-flow.png"  width="400"/>

<img src="https://yanzzzzzzzzz.github.io/img/HoG-flow-1.png"  width="400"/>

把 cell 合成多個格子成為一個 block，對 block 內的亮度區域進行正規化

結果：
<img src="https://yanzzzzzzzzz.github.io/img/visualizing-HoG.png"  width="400"/>

## 與 SIFT1 不同的地方

- HoG 通常用來描述更大的影像區域，SIFT 用關鍵點來進行匹配
- SIFT 是對整體梯度進行正規化，HoG 是使用周圍的 cell 區塊

## 參考

- [一文講解方向梯度直方圖（hog）](https://zhuanlan.zhihu.com/p/85829145)
- [A Gentle Introduction Into The Histogram Of Oriented Gradients](https://medium.com/analytics-vidhya/a-gentle-introduction-into-the-histogram-of-oriented-gradients-fdee9ed8f2aa)
