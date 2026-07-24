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

上一篇文章，我開始理解不同 Collection 存在的原因。Array、List、Dictionary、Queue、Stack 各自解決不同的資料管理問題，底層實作也不一樣。

理解這件事後，我突然想到另一個問題。

> **如果每一種 Collection 都長得不一樣，為什麼 `foreach` 卻能遍歷所有 Collection？**

例如：

```csharp
List<int> list = new() { 1, 2, 3 };

foreach (var item in list)
{
    Console.WriteLine(item);
}
```

可以正常運作。換成 Dictionary：

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

也完全沒問題，甚至 Queue、Stack、HashSet 都能使用 `foreach`。

它們明明是不同的資料結構，`foreach` 又是怎麼做到的？

---

## 如果 foreach 必須認識每一種 Collection

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

問題很快就出現了：每新增一種 Collection，`foreach` 就必須修改一次。如果有人自己寫了一個新的 Collection，`foreach` 也不知道該怎麼遍歷它。

這種設計很難擴充。

---

## foreach 真正需要知道什麼？

既然 `foreach` 不可能認識每一種 Collection，那它真正需要知道的是什麼？

我發現，`foreach` 其實不需要知道：

- 資料怎麼存
- 底層是不是 Array
- 有沒有使用 Hash Table
- 是 Queue 還是 Stack

它真正需要的只有一件事：

> **要怎麼逐一取得下一個元素？**

只要物件能回答這個問題，`foreach` 就能一直工作。這也是我第一次開始理解 `IEnumerable` 的設計目的。

---

## IEnumerable 解決了什麼問題？

`IEnumerable` 不在意 Collection 使用什麼資料結構。List 可以用動態陣列，Dictionary 可以使用 Hash Table，Queue 與 Stack 也能維持各自的順序規則。

它只要求一件事：

> **透過 `GetEnumerator()` 提供 Enumerator。**

Enumerator 再透過 `MoveNext()` 和 `Current` 提供逐一取得元素的方式。每一種 Collection 因此可以保留自己的內部實作，同時讓 `foreach` 用一致的流程遍歷。

嚴格來說，C# 的 `foreach` 也支援符合 `GetEnumerator()`、`MoveNext()` 和 `Current` 形式的型別，不一定非得宣告實作 `IEnumerable`。不過 .NET Collection 透過 `IEnumerable<T>` 建立共同介面，才能讓其他 API 也用一致的型別與它們合作。

---

## foreach 真正合作的對象

以前我一直以為，`foreach` 知道每一種 Collection 的走法。後來才發現，它只知道怎麼和 Enumerator 合作。

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

Collection 負責提供 Enumerator，而 Enumerator 知道如何走訪自己的資料。`foreach` 只要反覆呼叫 `MoveNext()`，並透過 `Current` 取得目前的元素。

因此，不管底層如何實作，`foreach` 的程式碼都完全不用修改。

---

## IEnumerator 到底做了什麼？

如果把 Enumerator 想像成一個游標，整件事情就容易理解很多。

假設目前有一組資料。

```text
10 → 20 → 30 → 40
```

Enumerator 會記住目前的位置。一開始，它還沒有指向任何元素。

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

這個過程會一直重複，直到沒有下一個元素。此時 `MoveNext()` 回傳 `false`，`foreach` 便知道遍歷結束。

---

## 原來 foreach 背後一直在做這件事

平常我們只會寫：

```csharp
foreach (var item in list)
{
    Console.WriteLine(item);
}
```

編譯器會把它轉換成接近下面的流程：

```csharp
using var enumerator = list.GetEnumerator();

while (enumerator.MoveNext())
{
    var item = enumerator.Current;

    Console.WriteLine(item);
}
```

實際展開方式會依 Enumerator 的型別而有些差異，包含如何處理 `Dispose()`；核心流程仍然是取得 Enumerator、呼叫 `MoveNext()`，再讀取 `Current`。`foreach` 把這些細節包裝起來，讓程式碼更容易閱讀。

---

## 新的 Collection 也能直接加入合作

假設今天我要自己設計一個 Collection。

```csharp
public class StudentCollection
{
    ...
}
```

只要它實作 `IEnumerable<T>`，提供對應的 Enumerator：

```csharp
foreach (var student in studentCollection)
{
    ...
}
```

就可以直接使用。.NET Framework 不需要修改，`foreach` 也不用知道 `StudentCollection` 的內部實作。雙方透過共同的介面完成合作。

這也讓我理解了物件導向設計中一個很重要的概念：

**面向介面設計，而不是依賴具體實作。**

---

## 我最大的收穫

以前我學 `IEnumerable`，只記住一句話：

> 可以讓 `foreach` 使用。

但我一直不知道原因。直到開始從 Framework 設計者的角度思考，整件事才串起來。

`foreach` 不需要了解每一種 Collection，Collection 也不必為 `foreach` 提供不同版本。雙方只要遵守同一套列舉規範，就能自然合作。這就是 `IEnumerable` 的價值。

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

當我從這個角度思考時，`IEnumerable` 不再只是「可以讓 `foreach` 使用」的介面，而是 .NET 用來統一列舉方式的設計。

理解這一點後，下一篇要探討的 `yield return` 就自然多了，因為我開始好奇另一件事。

> **Enumerator 到底是誰建立的？Compiler 又偷偷幫我們做了哪些事情？**
