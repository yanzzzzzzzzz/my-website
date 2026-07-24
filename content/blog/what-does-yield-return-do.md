---
title: yield return 到底幫我們做了什麼？我是怎麼一路理解到它其實在產生 Enumerator 的
description: 原本我把 yield return 當成比較特別的回傳值，直到一路拆開 foreach、IEnumerator 和 MoveNext() 之後，才慢慢看懂它其實在背後產生 Enumerator。
slug: what-does-yield-return-do
date: 2026-07-23T17:29:02+08:00
draft: false
toc: true

categories:
  - C#
  - .NET
  - Learning Notes

tags:
  - yield return
  - IEnumerable
  - IEnumerator
  - foreach

keywords:
  - yield return
  - IEnumerator
  - IEnumerable
  - foreach
---

## 前言

上一篇文章，我理解了 `foreach` 的運作方式。原來 `foreach` 並不知道 List、Dictionary 或 Queue 的內部實作，它只會透過 `IEnumerator` 一次取得一個元素。理解這件事情後，我又開始好奇另一件事。

> **Enumerator 到底是誰寫的？**

如果每一個 Collection 都要自己實作 `IEnumerator`，不是很麻煩嗎？

---

## 如果沒有 yield return

假設今天我要建立一個可以被 `foreach` 遍歷的物件：

```csharp
public class NumberCollection
{
}
```

如果沒有 `yield return`，那我就必須自己建立一個 Enumerator。

```csharp
public class NumberEnumerator : IEnumerator<int>
{
    public int Current => ...

    object IEnumerator.Current => Current;

    public bool MoveNext()
    {
        ...
    }

    public void Reset()
    {
        ...
    }

    public void Dispose()
    {
    }
}
```

還要讓 Collection 回傳這個 Enumerator。

```csharp
public IEnumerator<int> GetEnumerator()
{
    return new NumberEnumerator();
}
```

只是想讓 `foreach` 可以運作，居然就要寫這麼多程式。

---

## 這些重複工作，Compiler 不能代勞嗎？

看到這裡，我腦中冒出一個問題：如果每個開發者都要重複寫這些程式，Compiler 不能幫忙處理嗎？接著我才注意到，C# 早就提供了這個功能。

```csharp
public IEnumerable<int> GetNumbers()
{
    yield return 10;
    yield return 20;
    yield return 30;
}
```

短短幾行，就能直接交給 `foreach` 使用。

```csharp
foreach (var number in GetNumbers())
{
    Console.WriteLine(number);
}
```

---

## 資料不是一次全部產生

一開始我看這段程式時，直覺會把它想成：

```csharp
yield return 10;
yield return 20;
yield return 30;
```

它會先建立所有資料，再整包交給 `foreach`。但順著 `MoveNext()` 去想，就會發現實際執行方式並非如此。

第一次呼叫 `MoveNext()`，產生 `10`：

```text
10
```

第二次產生 `20`：

```text
20
```

第三次產生 `30`：

```text
30
```

直到第四次呼叫 `MoveNext()`，沒有更多資料，才回傳 `false`。每當 `foreach` 需要下一個元素，iterator 才會繼續往下執行。

---

## 我開始把 yield 理解成「暫停」

我原本很自然地把它翻譯成：

```text
回傳
```

但看到前面的執行方式後，我現在比較會把它理解成：

```text
先把目前這個值交出去。

等下次需要時。

再從這裡繼續。
```

下一次執行時不會從頭開始，而是：

> **從剛剛停下來的位置繼續執行。**

---

## Compiler 在背後建立了什麼？

接著我往下追了一步，去看 Compiler 產生的程式。這時我才具體看到，`yield return` 不只是換個寫法。Compiler 會建立一個隱藏的狀態機類別，大概像這樣：

```text
GetNumbers()
    ↓ Compiler
<GetNumbers>d__0
    ↓
IEnumerable<int> + IEnumerator<int>
```

這個類別會處理原本需要自己寫的：

- Current
- MoveNext()
- 狀態管理

呼叫 `GetNumbers()` 時，方法本身不會立刻跑完整段程式，而是先回傳這個可列舉物件。等到 `foreach` 取得 Enumerator 並呼叫 `MoveNext()`，程式才真正開始往下一個 `yield return` 執行。

---

## 為什麼需要保存狀態？

假設目前執行到：

```csharp
yield return 20;
```

如果沒有保存狀態，下一次 `MoveNext()` 時，程式就不知道該從哪裡繼續。因此，背後需要一個 State 記錄目前進度，例如：

```text
State = 0

↓

yield 10

↓

State = 1

↓

yield 20

↓

State = 2

↓

yield 30

↓

結束
```

每次停下來，狀態機都會記住目前位置，下次再從這裡繼續。如果 iterator 裡還有區域變數，後續執行需要用到的值也會一起被保存。

---

## 我原本把它想成了特殊的 return

前面一直卡住的原因，其實是我一直把：

```csharp
yield return
```

想成：

```text
比較特別的 return
```

但一路看到 `MoveNext()`、狀態保存和 Compiler 產生的隱藏類別後，整件事就清楚多了。`yield return` 交出目前的值時，方法不會就此結束。Compiler 會把這個 iterator method 轉換成狀態機，讓它可以暫停、保存進度，再於下一次 `MoveNext()` 時繼續執行。

---

## yield return 真正替我省下了什麼？

如果只停在語法層，我大概只會記得：

```csharp
yield return
```

可以用來撰寫回傳 `IEnumerable` 的方法。

但順著整個流程拆下來後，我才理解它真正解決的問題。Compiler 會把 iterator method 轉換成可逐步執行的狀態機，並產生列舉所需的物件。開發者不用手動處理 `Current`、`MoveNext()` 和狀態保存，而能把注意力放回「下一個元素要怎麼產生」這件事上。

---

## 下一篇

理解 `yield return` 後，我又開始好奇：既然資料是一筆一筆產生，LINQ 為什麼可以一直串接：

```csharp
.Where(...)
.Select(...)
.Take(...)
```

而且直到 `foreach` 才真正開始執行？原來，這背後就是 **Deferred Execution（延遲執行）**。
