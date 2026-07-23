---
title: 為什麼 Array 無法解決所有問題？我是如何理解 .NET Collection 設計的
description: 一開始我以為 Array 就足夠了，直到開始思考不同資料操作需求，才理解為什麼 .NET 還需要 List、Dictionary、Queue、Stack 與 HashSet。
slug: why-array-is-not-enough
date: 2026-07-23 15:00:00+0800
draft: false
toc: true

categories:
  - C#
  - .NET
  - Learning Notes

tags:
  - Array
  - Collection
  - List
  - Dictionary
  - Queue
  - Stack
  - HashSet

keywords:
  - Array
  - Collection
  - List
  - Dictionary
  - Queue
  - Stack
  - HashSet
---

## 前言

以前我學 Collection 的方式，就是背：

- List 是動態陣列
- Dictionary 是 Hash Table
- Queue 是 FIFO
- Stack 是 LIFO

但一直有一個問題沒有答案。

> **既然 Array 已經可以存很多資料了，為什麼 .NET 還要設計這麼多 Collection？**

---

## 如果世界只有 Array

假設 .NET 只有 Array。

```csharp
Student[] students = new Student[100];
```

其實很多事情都能做，例如：

- 存放資料
- 修改資料
- 使用索引快速取得資料

Array 還有一個非常大的優點。取出指定Array元素

```csharp
students[50]
```

時間複雜度是

```text
O(1)
```

但是Array當然會有缺點。

---

## 資料量變多

假設：

```csharp
Student[] students = new Student[100];
```

突然第 101 個學生來了。

Array 並不能自己變大，只能：

```text
建立新的 Array
↓
Copy 所有資料
↓
丟掉舊的 Array
```

這時我開始思考。

> **如果有一個容器可以自己長大，不就好了？**

於是就有了`List<T>`

這也是我現在對 List 最簡單的理解。

> **List = 會自己擴容的 Array。**

---

## 查詢資料

假設有一百萬個學生。

我要找：

```text
Tony
```

如果只有 Array。

只能：

```text
Jack？
↓
不是
↓
Amy？
↓
不是
↓
Bob？
↓
...
```

運氣不好。

可能要找一百萬次。

因此我開始想：

> **有沒有辦法不要從第一筆開始找？**

於是就有了`Dictionary<TKey, TValue>`

它利用 Hash，先找到 Bucket，再找到真正的資料。

因此平均查找速度變成`O(1)`

所以我現在的理解是：

> **Dictionary = 用空間換取搜尋速度。**

---

## 排隊情境

假設我要做：

- 超商叫號
- 印表機
- 訊息佇列

資料一定是：

```text
先進先出
```

如果使用 Array

1. 刪掉第一個元素
2. 後面的資料都要往前搬

Array 做得到沒錯，但是效率很差。

所以.NET 才提供`Queue<T>`專門處理 FIFO。

---

## 回到上一個狀態

例如：

- Undo
- Browser Back
- Function Call

這些都有一個共同特性。

```text
最後放進去的
↓
最先拿出來
```

這就是：

```text
LIFO
```

因此.NET 才提供`Stack<T>`專門處理 LIFO。

---

## 如果資料不能重複

例如：

```text
Jack
Amy
Jack
```

Array 並不會阻止重複。

如果我要知道Jack 有沒有存在，還是只能自己搜尋。

因此.NET 又提供`HashSet<T>`專門處理不允許重複的資料。

---

## 我後來才理解

以前我的腦中是：

```text
Collection
↓
List
Dictionary
Queue
Stack
HashSet
```

全部都是不同的資料結構，現在我的理解變成：

```text
Array
│
├── 大小不固定
│      ↓
│    List
│
├── 搜尋太慢
│      ↓
│   Dictionary
│
├── FIFO
│      ↓
│    Queue
│
├── LIFO
│      ↓
│    Stack
│
├── 不允許重複
│      ↓
└── HashSet
```

Collection 並不只是很多資料結構，是為了針對解決某一種資料管理問題而產生的設計選擇。

---

## 我的心法

不要先背 Collection。

先問自己：

> **我現在遇到的是什麼問題？**

因為：

> **問題，決定了該使用哪一種 Collection。**

而不是：

> **哪一種 Collection 比較厲害。**

---

## 快速複習

| 遇到的問題 | 解決方式 |
|------------|----------|
| Array 大小固定 | List |
| 搜尋效率太差 | Dictionary |
| 先進先出 | Queue |
| 後進先出 | Stack |
| 不允許重複 | HashSet |
