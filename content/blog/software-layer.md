---
title: 分層架構模式
date: 2022-11-28 16:49:39
tags:
---

## 分層架構

大多為以下四層:

* Presentation Layer 表現層: 該層關注的是用戶看到或可以互動的任何內容，包含UI、圖形、表單、影像
* Business Layer 業務層: 軟體本身特定的業務邏輯，blog網站會有發布文章、留言功能
* Persistence Layer 持久層: 資料存取
* Database Layer 資料層: 資料來源 ex:本地DB，雲端DB
<!--more-->
層與層之前的關係
Presentation Layer⇆Business Layer⇆Persistence Layer⇆Database Layer

為何不能直接從表現層訪問資料存取層?

分層目的為了降低程式之間的依賴性，這架構提出一個層與層之間隔離的概念，如果允許表現層直接訪問持久層，那在持久層的改動會同時影響表現層與業務層。

層與層之間使用interface定義接口，當需要重構某一層時也可以不用改動其他層。

雖然隔離層之間的訪問可以降低耦合性，但在某些常用功能(log紀錄，數學運算..)下可以新增一個共用層並調整層的封閉性。

## 軟體分層設計優缺點

### 優點

* 框架簡單好學，跟MVC的概念雷同
* 減少了依賴性
* 好測試

### 缺點

* 可擴展性低
* 層越多trace code越麻煩
