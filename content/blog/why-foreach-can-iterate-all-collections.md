---
title: 為什麼 foreach 可以遍歷所有 Collection？從設計角度理解 IEnumerable
description: List、Dictionary、Queue、Stack 的底層結構完全不同，為什麼 foreach 卻能遍歷所有 Collection？本文從問題出發，一步步推導 IEnumerable 與 IEnumerator 的設計原因。
slug: why-foreach-can-iterate-all-collections
date: 2026-07-23T16:35:59+08:00
draft: false
toc: true

categories:
  - C#
  - .NET
  - Learning Notes

tags:
  - C#
  - IEnumerable
  - IEnumerator
  - foreach
  - Collection

keywords:
  - IEnumerable
  - IEnumerator
  - foreach
  - Collection
  - C#
---

## 前言

上一篇文章，我開始理解不同 Collection 存在的原因。

Array、List、Dictionary、Queue、Stack，各自解決不同的資料管理問題，因此它們的底層實作也完全不同。

就在這時，我突然想到另一個問題。

> **如果每一種 Collection 都長得不一樣，為什麼 `foreach` 卻能遍歷所有 Collection？**

例如：

```csharp
List<int> list = new() { 1, 2, 3 };

foreach (var item in list)
{
    Console.WriteLine(item);
}
```

可以正常運作。

換成 Dictionary。

```csharp
Dictionary<int, string> dictionary = new()
{
    { 1, "Jack" },
    { 2, "Amy" }
};

foreach (var item in dictionary)
{
    Console.WriteLine(item);
}
```

也完全沒問題。

甚至 Queue、Stack、HashSet 都能使用 `foreach`。

它們明明是不同的資料結構，`foreach` 又是怎麼做到的？

---

## 如果沒有共同規範

我試著站在 .NET Framework 設計者的角度思考。

假設沒有任何共同規範，那 `foreach` 要怎麼設計？

最直接的方法，大概會變成：

```text
如果是 List
    就用 List 的方式遍歷

如果是 Dictionary
    就用 Dictionary 的方式遍歷

如果是 Queue
    就用 Queue 的方式遍歷

...
```

問題很快就出現了。

每新增一種 Collection，`foreach` 就必須修改一次。

如果未來有人自己寫了一個新的 Collection，`foreach` 根本不知道怎麼遍歷它。

很明顯，這不是一個容易擴充的設計。

---

## 換個角度思考

既然 `foreach` 不可能認識每一種 Collection，那它真正需要知道的是什麼？

我發現，`foreach` 其實不需要知道：

- 資料怎麼存
- 底層是不是 Array
- 有沒有使用 Hash Table
- 是 Queue 還是 Stack

它真正需要的資訊只有一件事。

> **下一個元素在哪裡？**

只要有人能回答這個問題，`foreach` 就可以一直工作。

這也是我第一次開始理解 `IEnumerable` 的設計目的。

---

## IEnumerable 解決了什麼問題？

`IEnumerable` 並沒有規定 Collection 必須使用什麼資料結構。

List 可以用動態陣列。

Dictionary 可以使用 Hash Table。

Queue 可以維護 FIFO。

Stack 可以維護 LIFO。

這些都沒有關係。

`IEnumerable` 只要求一件事情。

> **提供一種可以逐一取得元素的方法。**

換句話說，每一種 Collection 都可以保留自己的實作方式，同時又能讓 `foreach` 用相同的方式遍歷。

---

## foreach 真正合作的對象

以前我一直以為，`foreach` 很厲害，它知道每一種 Collection 的走法。

後來才發現，它根本不知道。

真正的流程比較像這樣：

```text
List
Dictionary
Queue
Stack
HashSet
        │
        ▼
  IEnumerable
        │
        ▼
  IEnumerator
        │
        ▼
 foreach
```

Collection 自己決定如何取得下一個元素。

`foreach` 則一直透過 Enumerator 取得目前的元素，再移動到下一個位置。

因此，不管底層如何實作，`foreach` 的程式碼都完全不用修改。

---

## IEnumerator 到底做了什麼？

如果把 Enumerator 想像成一個游標，整件事情就容易理解很多。

假設目前有一組資料。

```text
10 → 20 → 30 → 40
```

Enumerator 會記住目前的位置。

一開始還沒有指向任何元素。

```text
^
```

第一次呼叫：

```csharp
MoveNext();
```

游標移到第一個元素。

```text
10 → 20 → 30 → 40
^
```

這時可以透過：

```csharp
Current
```

取得目前的值。

第二次呼叫：

```csharp
MoveNext();
```

游標往後移。

```text
10 → 20 → 30 → 40
     ^
```

一直重複，直到沒有下一個元素。

這時 `MoveNext()` 回傳 `false`，`foreach` 便知道遍歷結束。

---

## 原來 foreach 背後一直在做這件事

平常我們只會寫：

```csharp
foreach (var item in list)
{
    Console.WriteLine(item);
}
```

但編譯器真正做的事情，其實很接近下面這段程式碼。

```csharp
using var enumerator = list.GetEnumerator();

while (enumerator.MoveNext())
{
    var item = enumerator.Current;

    Console.WriteLine(item);
}
```

`foreach` 只是把這些細節包裝起來，讓程式碼更容易閱讀。

---

## 這樣的設計帶來什麼好處？

假設今天我要自己設計一個 Collection。

```csharp
public class StudentCollection
{
    ...
}
```

只要它遵守 `IEnumerable` 的規範。

```csharp
foreach (var student in studentCollection)
{
    ...
}
```

就可以直接使用。

.NET Framework 不需要修改。

`foreach` 也不用知道 `StudentCollection` 的內部實作。

Framework 與 Collection 之間，透過共同的介面完成合作。

這也是物件導向設計中很重要的一個概念。

**面向介面設計，而不是依賴具體實作。**

---

## 我最大的收穫

以前我學 `IEnumerable`，只記住一句話。

> 可以讓 `foreach` 使用。

但一直不知道原因。

直到我開始從 Framework 設計者的角度思考，整件事情才串起來。

`foreach` 並不需要了解每一種 Collection。

Collection 也不需要配合 `foreach` 寫不同版本。

雙方只要遵守同一個規範，就能自然合作。

這就是 `IEnumerable` 存在的價值。

---

## 快速複習

```text
不同 Collection
        │
        ▼
底層實作完全不同
        │
        ▼
foreach 不可能認識所有 Collection
        │
        ▼
建立共同規範
        │
        ▼
IEnumerable
        │
        ▼
取得 Enumerator
        │
        ▼
MoveNext() + Current
        │
        ▼
完成遍歷
```

---

## 結語

以前我會問：

> `IEnumerable` 是什麼？

現在我比較常問另一個問題。

> **如果沒有 `IEnumerable`，`foreach` 要怎麼遍歷所有 Collection？**

當我從這個角度思考時，`IEnumerable` 不再只是一個介面，而是 Framework 用來統一遍歷方式的設計。

理解這一點之後，下一篇要探討的 `yield return` 就變得自然許多。

因為我開始好奇另一件事情。

> **Enumerator 到底是誰建立的？Compiler 又偷偷幫我們做了哪些事情？**
