+++
date = '2026-02-06T21:00:00+08:00'
title = '深入淺出談 Queue：順序很重要'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/DS-Queue/header.jpg" alt="深入淺出談 Queue" caption="photo by Jessica Johnston" class="text-center" >}}

剛好昨天看了小Lin老師的影片, 提到委內瑞拉這個國家, 天天都在排隊
加油排隊、去超市也排隊
委內瑞拉一堆Queue

## 什麼是 Queue

Queue 是一種 **先進先出 (First-In, First-Out, FIFO)** 的資料結構
Queue跟Stack一樣, 定義了使用者只能用那些操作
換來一致性的時間複雜度

---

## Queue的時間複雜度

| 操作 |  Queue | 時間複雜度 |
| :--- | :--- | :--- |
| push | 插入資料到最後位置 | O(1) |
| pop | 刪除最前面的資料 | O(1) |
| front | 取得最前面的資料 | O(1) | 



