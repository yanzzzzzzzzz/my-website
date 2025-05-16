---
title: cs131 lecture 1 Introduction
author: yanz
date: 2021-02-08 23:06:00 +0800
categories: [course]
tags: [cs131]
mathjax: true
toc: true
---

## 課程介紹

CS131 是史丹佛大學所開設的電腦視覺課程
主要預備技能與知識有

- Python 應用
- 線性代數
- 微積分
- 機率與統計

有了以上的基礎知識，在接下來的課程會比較得心應手

而除了 CS131 在史丹佛有電腦視覺課程外，另外還有進階課程 CS231a、到 DNN 領域的 CS231n
讓想更進一步學習的人有更多選擇

## Introduction to Computer Vision

人之所以看得到影像，是由於光線照到物體，經由眼睛接收到影像，再傳送到大腦做對應的舉動
ex:騎車看到紅燈會停車、看到貓咪會想用手去摸...
而電腦視覺所做的事也是如此，用一個攝影機接收影像資訊，傳送到電腦，經過計算後進行相應的舉動

`電腦視覺與人眼的動作流程差異：`
`打光到物體成像 -> 接受影像(人眼\sensor) -> 理解(大腦\電腦) 並做出動作`

而人眼的視覺感知是非常強的，對物體分析、幾何認知能力在電腦視覺上都很難去做
但偶爾也有出錯(被騙)的時候，人眼視覺錯覺：
[棋盤陰影錯覺](https://zh.wikipedia.org/wiki/%E6%A3%8B%E7%9B%A4%E9%99%B0%E5%BD%B1%E9%8C%AF%E8%A6%BA)

電腦視覺的挑戰：將數位影像像素值轉換成有用的訊息
人眼看到的與電腦視覺看到的東西是截然不同的
如何建構一個方法(演算法)可以像人眼一樣識別幾何、分析物體、由影像取出我們想知道的資訊。

<img src="https://yanzzzzzzzzz.github.io/img/computer-see.png"  width="400"/>

## 電腦視覺應用

- 3D 建模
- 臉部辨識：臉部偵測、笑臉檢測
- 生物辨識：指紋辨識、虹膜辨識、人臉解鎖
- 文字辨識 OCR
- 影像分類：[手機上執行物品搜尋器-Google Googles](https://www.wordstream.com/google-goggles-app-for-mobile)、[商品搜尋功能 app-snapTell](https://www.youtube.com/watch?v=5f_eSU9UYHA&ab_channel=SnazzyLabs)
- 自駕車
- 智慧超市
