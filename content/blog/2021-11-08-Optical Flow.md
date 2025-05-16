---
title: cs131 lecture 15 Optical flow
author: yanz
date: 2021-11-08 20:20:00 +0800
categories: [course]
mathjax: true
toc : true
--- 
## 簡介

光流是描述視覺運動的一個方法，透過具有時間序列的影像來得到影像中不同物件的運動速度與他們的運動角，有了運動光流資訊可以用來：

* 運動方向檢測
* 物件分割
* 立體視差測量等等

## 如何得到影像中的光流

舉例來說一個影片由多個連續影像組成，我們追蹤不同影像同一點P，第t個frame時位置是P(x1, y1)，在t+1時位置是P(x2, y2)，透過這兩點座標就可以算出運動方向與運動速度

<img src='https://yanzzzzzzzzz.github.io/img/optical_flow_example.png'  width='400'/>

要算出這兩點光流的前提：

### 亮度恆定

移動前後兩點的亮度應該是相等的

<img src='https://yanzzzzzzzzz.github.io/img/optical_flow_brightness_constancy.png'  width='400'/>

$ I(x, y, t) = I(x + u, y + v, t+1) $

### 微小的移動

<img src='https://yanzzzzzzzzz.github.io/img/optical_flow_small_motion.png'  width='400'/>

在以上條件約束的前提下，亮度恆定與微小移動下

$ I(x, y, t) = I(x + u{\delta}t, y + v{\delta}t, {\delta}t) $

對等號右邊的式子進行泰勒展開式,保留一階項

$ I(x + u, y + v, t+1) \approx I(x,y,t)+I_x∙u+I_y∙v+I_t$

假設亮度不變，下個時間同個點的亮度相等

$ I_x∙u+I_y∙v+I_t \approx 0$

$ \nabla I∙[u,v]^T + I_t = 0 $
不能透過等式 $ \nabla I∙[u,v]^T + I_t = 0 $ 解出u,v，因為只有一個等式內含有兩個未知數u,v

## 應用

用來預估車流移動方向的光流法:

<img src='https://yanzzzzzzzzz.github.io/img/optical_flow.png'  width='400'/>
