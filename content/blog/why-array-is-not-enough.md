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

以前我學 Collection，就是背：

- List 是動態陣列
- Dictionary 是 Hash Table
- Queue 是 FIFO
- Stack 是 LIFO

但我一直沒有想通一個問題。

> **既然 Array 已經可以存很多資料了，為什麼 .NET 還要設計這麼多 Collection？**

---

## 如果世界只有 Array

假設 .NET 只有 Array。

```csharp
Student[] students = new Student[100];
```

其實很多事情都做得到，例如：

- 存放資料
- 修改資料
- 使用索引快速取得資料

Array 還有一個很大的優點：透過索引取出指定元素。

```csharp
students[50]
```

時間複雜度是：

```text
O(1)
```

但當需求開始改變，Array 的限制也會慢慢出現。

---

## 當資料超出原本預留的空間

假設：

```csharp
Student[] students = new Student[100];
```

突然第 101 個學生來了。

Array 的長度建立後就固定了。要放進第 101 筆資料，只能：

```text
建立新的 Array
↓
Copy 所有資料
↓
丟掉舊的 Array
```

這時我開始思考。

> **如果有一個容器可以自己長大，不就好了？**

這正是 `List<T>` 想解決的問題。它的內部仍然使用 Array，但容量不足時，會建立更大的 Array，再把原有元素複製過去。

所以我現在對 List 最簡單的理解是：

> **List = 幫我處理擴容細節的 Array。**

---

## 當我想透過 Key 找到資料

假設有一百萬個學生，每個人都有唯一的學號，而我要透過學號找到：

```text
Tony
```

如果只有 Array，通常只能從頭逐一比對：

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

運氣不好，可能要比對一百萬次。

因此我開始想：

> **有沒有辦法不要從第一筆開始找？**

這時可以使用 `Dictionary<TKey, TValue>`，把學號當成 Key、學生資料當成 Value。

它利用 Key 的 Hash Code 找到對應的 Bucket，再從中找到真正的資料。理想情況下，不需要從第一筆一路比對到最後一筆。

因此，透過 Key 查找資料的平均時間複雜度是 `O(1)`。

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

如果直接使用 Array，最直覺的做法是：

1. 刪掉第一個元素
2. 後面的資料都要往前搬

Array 當然做得到，但每次都搬動後面的資料，不只麻煩，也浪費效能。

`Queue<T>` 把「從尾端加入、從前端取出」包成明確的操作，專門處理 FIFO。呼叫端不用自己管理索引或搬動元素，程式碼也更能表達排隊的意圖。

---

## 當最新的資料要最先取出

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

`Stack<T>` 就是專門處理 LIFO 的 Collection。看到 `Push` 和 `Pop`，也能直接理解這段程式正在操作一疊資料。

---

## 如果資料不能重複

例如：

```text
Jack
Amy
Jack
```

Array 不會阻止重複。

如果我要知道 `Jack` 是否已經存在，仍然得自己搜尋。

`HashSet<T>` 則把「集合中的元素必須唯一」這項規則包起來。加入已存在的元素時，不會再新增一份；檢查元素是否存在的平均時間複雜度也是 `O(1)`。

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

它們看起來只是一組需要分別記住的資料結構。現在我的理解變成：

```text
Array
│
├── 資料量會改變
│      ↓
│    List
│
├── 需要透過 Key 查找
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

每一種 Collection 都在處理不同的資料管理問題。它們的差別不只在 API 或名稱，更在於各自選擇優化哪些操作。

---

## 我現在怎麼選 Collection？

不要先背 Collection。

先問自己：

> **我現在遇到的是什麼問題？**

> **問題，決定了該使用哪一種 Collection。**

我不再先問：

> **哪一種 Collection 比較厲害。**

而是先看哪些操作最常發生、哪些規則必須由資料結構保證，再做選擇。

---

## 快速複習

| 遇到的需求 | 適合的 Collection |
|------------|-------------------|
| 資料數量會改變，需要自動處理容量 | List |
| 需要透過 Key 快速查找資料 | Dictionary |
| 先進先出 | Queue |
| 後進先出 | Stack |
| 元素必須唯一 | HashSet |
