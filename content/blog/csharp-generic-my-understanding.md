---
title: C# Generic（泛型）- 我真正理解 Generic 的方式
description: Generic 不只是為了重複利用程式碼，而是保留真正的型別，並在 Compile Time 提供型別安全。
slug: csharp-generic-my-understanding
date: 2026-07-23 00:00:00+0800
draft: false
toc: true

categories:
  - C#
  - .NET
  - Learning Notes

tags:
  - C#
  - Generic
  - Type Safety
  - Boxing
  - Unboxing
  - CLR

keywords:
  - C# Generic
  - 泛型
  - Generic 教學
  - Generic 為什麼存在
---

## 前言

以前學 Generic，我只記住一句話：

> **Generic 可以重複利用程式碼。**

這句話沒有錯，但一直讓我無法真正理解 Generic 的設計目的。

直到我開始站在 **Framework 設計者** 的角度思考，我才發現：

> **Generic 真正想解決的是「保留真正的型別」。**

---

## 如果沒有 Generic，我會怎麼設計？

假設今天要交換兩個變數。

第一個想到的方法就是每個型別都寫一份。

```csharp
void Swap(int a, int b)
{
}

void Swap(string a, string b)
{
}

void Swap(Student a, Student b)
{
}
```

問題就在，如果有 100 種型別，就要寫 100 個版本。

因此想要有個方法能夠**接受任意型別的參數。**

---

## 那全部改成 object 不就好了？

第二個想到的方法就是：

```csharp
void Swap(object a, object b)
{
}
```

這方法能夠接受所有型態，但是會有問題。

### Value Type 需要 Boxing

```csharp
int x = 10;

object obj = x;
```

CLR 必須建立一個新的 Heap Object，因此會產生 Boxing。

---

### 取出時需要 Unboxing

```csharp
int x = (int)obj;
```

而且還要自己強制轉型，如果轉錯型別，就會在 Runtime 發生例外。

---

### 沒有 Type Safety

例如：

```csharp
Swap(student, 10);
```

編譯器不知道這是不是合法，很多錯誤只能等到執行時才發現。

---

## Generic 到底解決了什麼？

這時我才理解 Generic 的真正目的。

它不只**讓程式碼比較少。**

而且還有以下特點：

- 保留真正的型別
- Compile Time 就能做型別檢查
- 避免 Boxing / Unboxing
- 一份程式碼可以支援多種型別

---

## T 到底是什麼？

以前一直把 `T` 看成一種特殊語法。

現在我的理解變成：

> **T 就是一個目前還不知道的型別。**

例如：

```csharp
void Swap<T>(ref T a, ref T b)
{
}
```

當呼叫：

```csharp
Swap<int>(ref x, ref y);
```

編譯器就知道：

```csharp
void Swap(ref int a, ref int b)
{
}
```

如果呼叫：

```csharp
Swap<Student>(ref student1, ref student2);
```

就等於：

```csharp
void Swap(ref Student student1, ref Student student2)
{
}
```

因此：**Generic 並不是 object。**它只是把真正的型別延後到使用時才決定。

---

## 我最大的誤解

以前我一直以為：

> Generic = 重複利用程式碼。

現在我的理解變成：

> **Generic = 不知道型別，但仍然保留真正的型別。**

這兩句話看起來很像。

但後者才是真正的設計理念。

---

## 我的學習心法

我現在遇到 Generic，都只會問自己一個問題：

> **如果不用 Generic，我會怎麼做？**

答案通常只有兩種。

### 方法一

每個型別都寫一次。

缺點：

- 程式碼大量重複

---

### 方法二

全部改成 object。

缺點：

- Boxing
- Unboxing
- Runtime Cast
- 沒有 Type Safety

---

## 一句話記住 Generic

> **不知道型別，但保留真正的型別。**

---

## 快速複習

### 沒有 Generic，我會怎麼做？

- 每個型別寫一份
- 全部改成 object

---

### object 有什麼問題？

- Boxing
- Unboxing
- Runtime Cast
- 沒有 Type Safety

---

### Generic 解決了什麼？

- 保留真正型別
- Compile Time 型別檢查
- 避免 Boxing / Unboxing
- 一份程式支援所有型別

---

### 一句話記住 Generic

> **不知道型別，但保留真正的型別。**

---
