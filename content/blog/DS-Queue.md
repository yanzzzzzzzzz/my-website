+++
date = '2026-02-05T21:00:00+08:00'
title = '深入淺出談 Queue：順序很重要'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/DS-Queue/header.jpg" alt="深入淺出談 Queue" caption="photo by John Cameron" class="text-center" >}}

剛好昨天看了[小Lin老師的影片](https://youtu.be/Hbu1xkXcPNU?si=eTJq_ULEc15UM-05)，提到委內瑞拉這個國家，天天都在排隊

加油排隊、去超市也排隊

排隊這件事，其實跟系統處理工作的順序一樣

順序一亂，待季就大條了，這時候使用Queue來管理執行順序，是一個很好的方法

## 什麼是 Queue

Queue 是一種 **先進先出 (First-In，First-Out，FIFO)** 的資料結構

Queue跟Stack一樣，定義了使用者只能用那些操作

換來一致性的時間複雜度

---

## Queue的時間複雜度

| 操作 |  Queue | 時間複雜度 |
| :---: | :---: | :---: |
| push | 插入資料到最後位置 | O(1) |
| pop | 刪除最前面的資料 | O(1) |
| front | 取得最前面的資料 | O(1) | 

---

## 使用Queue最佳場景

假設現在有三個Job依序執行，而執行中很可能因為系統當機導致需要重做

這時候應該把Job放在哪種資料結構中：

A：List搭配index

B：Queue

看起來A、B都可以，實際上會造成很大的落差

### 情境A List搭配index

```Cpp
list = [A, B, C]
i = load_index()          // 持久化的進度

while i < list.length:
    job = list[i]

    do_side_effect(job)   // 例如：寄信 / 扣款 / 發送檔案
                           // 這裡可能成功、也可能一半成功、也可能成功但你還沒來得及記錄

    i = i + 1
    save_index(i)         // 持久化進度

```
crash可能發生在：

假設執行到job B，do_side_effect(job)執行了，但還沒save_index(i)，造成

* 外部世界：job B已經寄信/扣款等行為
* 你的系統：i還停留在執行完job A的狀態
* 重啟後：B會再做一次，例如再扣一次錢

save_index(i)成功了，但do_side_effect(job)實際上沒完成，例如API timeout，DB transaction rollback，結果：

* 你的系統：以為job B已經做完了
* 重啟後：B不會再做，漏執行

### 使用Queue

```Cpp
queue = [A, B, C]

while queue is not empty:
    job = queue.front()     // 先看，不移除

    do_side_effect(job)

    queue.dequeue()         // 成功後才移除

```

crash在dequeue()之前
* queue裡仍然有job B
* 重啟後：B會再做一次，例如再扣一次錢

crash在dequeue()之後
* queue裡沒有job B
* 重啟後：B不會再做，因為已經完成

簡單總結：

* List + index 把「改變到下一個狀態」這件事拆分成兩個步驟，造成crash時可能的風險
* Queue 把「改變到下一個狀態」這件事包裝成一個步驟

在實際系統中，Queue通常會搭配：

* ack / commit 機制：告訴系統這個job已經做完
* at-least-once 處理策略：不要漏做，寧願多做，漏做通常比重做更嚴重
* idempotent：同一個工作被重複執行多次，系統最終狀態仍然正確，不會有副作用