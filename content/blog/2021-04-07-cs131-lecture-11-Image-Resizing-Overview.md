---
title: cs131 lecture 11 Image Resizing-Image Retargeting Overview
author: yanz
date: 2021-04-07 23:02:00 +0800
categories: [course]
tags: [cs131]
mathjax: true
toc : true
---

影像調整大小在生活上隨處可見，如在不同的螢幕解析度下就必須對輸入的影像進行變化

但改變的同時常常造成比較重要的影像位置失去原先的樣貌特性

該節就開始探討在Resize的同時又可以保持重要的影像訊息

## Content-aware Retargeting
<img src='https://yanzzzzzzzzz.github.io/img/content-aware-retargeting.png'  width='400'/>

上圖可以看到紅區域處是重要的資訊，若直接改變影像尺寸會造成人物的變形

若僅延展在影像中間處的雪地與天空區塊，就可以保留重要資訊

## 問題定義
輸入影像尺寸$n \times m$與新的尺寸$n' \times m'$

輸出影像$n' \times m'$並保有與原影像一樣好的影像細節

但所謂好的影像縮放結果沒辦法用量化的方式來定義

我們也不知道甚麼叫做重要的影像資訊，也許每個人對重要的影像區塊看法都不同

## 影像重要性(顯著性) 量測

定義一個function來找出影像"重要"的地方

重要指的可以是人眼經常會去特別關注的地方

## 相關論文與應用

<img src='https://yanzzzzzzzzz.github.io/img/General-Retargeting-Framework.png'  width='400'/>

[Setlur, Vidya, et al. "Automatic image retargeting." Proceedings of the 4th international conference on Mobile and ubiquitous multimedia. 2005.](https://dl.acm.org/doi/pdf/10.1145/1149488.1149499?casa_token=SjSfZM8ymrMAAAAA:HJhocyAvFY9Mthl1o32OI5gdJyl4BjWHLy72l-O6sTilK2dZAMwgIodXDLBXlanRQYKgxbr8-LCnUQ)

[Gal, Ran, Olga Sorkine, and Daniel Cohen-Or. "Feature-Aware Texturing." Rendering Techniques 2006.17th (2006): 2.](https://www.cs.tau.ac.il/~dcor/articles/2006/Feature-aware-texturing.pdf)
