---
title: Efficient Graph-Based Image Segmentation
author: yanz
date: 2021-03-25 23:50:00 +0800
categories: [paper reading]
tags: [computer vision, image segmentation]
mathjax: true
toc : true
---

在stanford中的cs131課程提到的Graph-based segmentation，剛好介紹到這篇論文，就來研讀一下。

論文網址：[Felzenszwalb, Pedro F., and Daniel P. Huttenlocher. "Efficient graph-based image segmentation." International journal of computer vision 59.2 (2004): 167-181.](http://cs.brown.edu/people/pfelzens/papers/seg-ijcv.pdf)

本篇論文是基於圖的(Graph-Based)影像分割演算法，提出一個有效率的影像分割方式，並且影像分群的的結果是有意義的。

## 主要動機

過往的某些方法並沒有考慮到漸變的影像，使得分割結果不符合預期

<img src='https://yanzzzzzzzzz.github.io/img/invariance-img.png'  width='400'/>

## 問題描述
影像 $G$ 是由像素集合V與無向邊 $E$ 連接一組點對$(v_i, v_j)$，並且具有權重 $w(v_i, v_j)$，權重是由兩像素點之間的差異來產生

S是在影像G分割出來的一個區塊，並以 $G'=(V,E')$ 表示， 其中$ E'\in E$

## 斷定為分割公式定義
斷定兩區域$C_1,C2$是否存在邊界分割，是基於量測兩個區域$C_1,C2$之間的相異性，以及評估區塊內部各自元素的相異性程度

<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-formula-1.png'  width='400'/>

$Dif(C_1, C_2)是兩區域之間的差異，差異是指將組件C_1中的節點v_i連接到C_2中的節點v_j的最小權重邊$

<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-dif.png'  width='400'/>


<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-mint.png'  width='400'/>

$Int(C)$是計算同一區域內兩兩像素點之間的最大權重

<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-int.png'  width='400'/>

$MInt(C_1, C_2)$是個別區域內的內部差異

<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-mint_formula.png'  width='400'/>

$\tau(C)是一個閾值，由設定參數k來控制最後產生的群集大小$
<img src='https://yanzzzzzzzzz.github.io/img/Predicate-for-Segmentation-prarm-k.png'  width='400'/>

## 演算法流程
1. 計算每個像素8相連或4相連的不相似度
2. 將edge E按照不相似度non-decreasing排序edge權重得到$o_1,o_2,...,o_m$
3. 開始分割動作，初始分割區域為$S^0$, 其中每個像素點$v_i$是獨立的一個區域
4. 重複步驟並定義$q=1,...m$
5. $S^q$的初始區域是由$S^{q-1}$組成, 定義$v_i, v_j$ 是一組前q小的edge權重對應的點對$o_q = (v_i, v_j) $
檢查點對合成條件是否符合, 合成條件參考$D(C1, C2)$, 符合則合併, 否則維持分割結果S並繼續執行到結束

<img src='https://yanzzzzzzzzz.github.io/img/egbis-flow.png'  width='400'/>

## 測試結果
使用的測試資料是[COIL database](https://www.cs.columbia.edu/CAVE/software/softlib/coil-20.php)，
對不同的影像大小使用不同的參數k

結果圖：
<img src='https://yanzzzzzzzzz.github.io/img/egbis-result.png'  width='400'/>

除了上述的流程與演算法外，由於目前提到的演算方法只考慮到空間位置，及鄰近像素來建構圖的連接關係，假使色彩相同但距離有些許差異，也不會合併成相同區域。為了考慮更大範圍的鄰近空間，又不能考慮到過大的範圍，否則搜索範圍所消耗的時間會過大，論文作者使用一個歐式距離的範圍來取代前面提到的四相連\八相連，擴大搜索範圍。

<img src='https://yanzzzzzzzzz.github.io/img/egbis-result-ANN.png){: width="881" height="342"'  width='400'/>

經過擴大鄰近範圍的ANN，降低的分割結果的零散程度。
## 參考
[cs231b_spring ranjay Student presentation](http://vision.stanford.edu/teaching/cs231b_spring1415/slides/ranjay_pres.pdf)