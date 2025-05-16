---
title: Image Classification
date: 2020-11-15 23:33:00 +0800
tags: [cs231n]
mathjax: true
toc : true
---

website:[CS231n: Convolutional Neural Networks for Visual Recognition](http://cs231n.stanford.edu/)

影像分類是電腦視覺的核心任務，但其中有許多障礙要克服

## 遇到的問題

### Semantic Gap 語義鴻溝

* Semantic Gap指的是在不同系統中形成的結構造成差異
* 人眼傳送到大腦所看到的物體形成的過程!=攝影機傳送到電腦看到物體形成的過程
* 人眼看到的是物體是光線照射到物體，經過反射後部份光線射入我們的眼睛。人腦所想的通常是高階特徵ex:飛機、汽車、室內空間
* 在電腦中看到的數位影像是個三維tensor(R, G, B channel)。電腦主要觀察低階特徵ex:顏色分布、紋理(texture)

### Viewpoint variation 視野角度變化

* 攝影機視野改變造成觀測結果產生變化

<img src="https://yanzzzzzzzzz.github.io/img/d3418806.jpg"  width="400"/>

### Background Clutter 非均值的背景

* 背景可能非常雜亂

<img src="https://yanzzzzzzzzz.github.io/img/cat-in-background.jpg"  width="400"/>

### Illumination 亮度的變化

* 不同的燈源，打光方式造成同一個物體不同成像結果

<img src="https://yanzzzzzzzzz.github.io/img/Black_cat_in_the_dark.jpg"  width="400"/>

### Occlusion 被遮蔽的物體

* 物體被遮擋一部分，但還是可以透過特徵來辨認出來

<img src="https://yanzzzzzzzzz.github.io/img/cat-hidden.jpg"  width="400"/>

### Deformation 物體形狀的變化

<img src="https://yanzzzzzzzzz.github.io/img/liquid-cat.png"  width="400"/>

<img src="https://yanzzzzzzzzz.github.io/img/sleeping-cat.png"  width="400"/>

### Intraclass variation 同類型的不同變化

<img src="https://yanzzzzzzzzz.github.io/img/Black_white_cats.jpg"  width="400"/>

沒辦法透過[硬編碼](https://zh.wikipedia.org/wiki/%E5%AF%AB%E6%AD%BB)的方式在這些問題下輕易的分類出貓咪

## 機器學習: 數據驅動方法

寫一個影像分類演算法與排序演算法非常不同，假設今天是要辨識一隻貓咪，我們必須考慮到貓咪的各種形狀、顏色等變化。
因此，與其透過硬編碼方式定義出複雜的經驗法則，不如透過給予很多數據來建立一個學習演算法。
流程：

1. 收集數據集(影像與對應的類別標記)
1. 機器學習演算法訓練分類器
1. 使用分類器預測新讀進來的影像

## Nearest Neighbor Classifier

### Nearest Neighbor

* 比較兩影像之間的距離
L1距離公式:$d_1(I_1, I_2) = \sum_{p} |I^P_1 - I^P_2|$

$其中I_1, I_2 是影像,P是I_1, I_2像素點的索引$

這個距離公式就是`逐點計算兩影像像素值差異的總和`，加絕對值是為了避免正負號誤差加總後造成抵銷

[實作KNN測試cifar10 in github](https://github.com/yanzzzzzzzzz/K-Nearest-Neighbor-Classifier)

## 參考

* [跟着cs231n学英语（Module 1)](https://zhuanlan.zhihu.com/p/51979923)