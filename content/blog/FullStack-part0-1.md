---
title: FullStack part0 筆記 - Web基本觀念
date: 2023-05-02 17:49:53
tags:
---


## 了解Web 開發原則

Web 開發的第一原則: 第一步就是在瀏覽器上使用`F12`開啟開發者控制台，Network標籤可以看到Web與伺服器使用HTTP的所有通信, Console標籤可以看到所有在程式內Deubug用的訊息

## HTTP GET

> HTTP GET 是一種 HTTP 請求方法，通常用於獲取網頁上的資源。在進行網路傳輸時，HTTP GET 方法可以向伺服器發送請求，以獲取伺服器上的資源。這些資源可以是網頁、影像、檔案等，而 HTTP GET 方法獲取資源的方式是透過 URL（Uniform Resource Locator，統一資源定位符）進行定位。
HTTP GET 方法是一種安全且幾乎無副作用的請求方法。使用 HTTP GET 方法，客戶端可以向伺服器發送請求，要求伺服器回應一個資源。當伺服器接收到 HTTP GET 請求後，會查找對應的資源，然後將其返回給客戶端。
HTTP GET 方法的請求是無副作用的，即不會對伺服器上的資源進行任何更改。這意味著使用 HTTP GET 方法，客戶端只能獲取伺服器上的資源，而不能修改或刪除它們。

HTTP GET 特色
<!--more-->
* 透過URL進行定位
* 可以傳輸網頁、影像、檔案
* 對伺服器上資源不會做更改

### HTTP GET Example

網址輸入[Google首頁](https://www.google.com/)後開啟開發者控制台

![google首頁 F12](https://i.imgur.com/6NuSBMg.png)

可以看到使用多個HTTP GET方法從伺服器取得:

* 前端的內容
* 個人帳戶的頭貼
* 歷史搜尋紀錄
* ...

每一個GET到的東西可以分成:

![httpHeader](https://i.imgur.com/1NPK1cq.png)

### HTTP Headers

每一個請求都有[Headers](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers)，分為:

* 通用標頭（General header）：這些標頭包含與請求和回應有關的元資訊，如 Cache-Control、Connection、Date、Pragma 等。這些標頭對於整個消息的控制和定義是通用的。
* 請求標頭（Request header）：這些標頭包含有關請求的詳細資訊，如 Accept、Accept-Encoding、Authorization、Cookie、User-Agent 等。這些標頭允許客戶端提供關於請求的額外資訊，從而影響伺服器的回應。
* 響應標頭（Response header）：這些標頭包含有關回應的詳細資訊，如 Cache-Control、Content-Encoding、Content-Length、Content-Type、Server 等。這些標頭允許伺服器提供關於回應的額外資訊，從而影響客戶端的處理和呈現。
* 實體標頭（Entity header）：這些標頭包含有關 HTTP 實體主體的詳細資訊，如 Content-Encoding、Content-Language、Content-Length、Content-Type 等。這些標頭允許用戶端和伺服器提供有關實體主體的額外資訊，從而影響消息的處理和解析

### HTTP Body

* HTTP Body用於傳輸實際的資料內容
* HTTP Body 的內容可以是各種不同的格式，例如:
  * 純文本
  * HTML
  * JSON
  * XML
  * 二進位數據
* HTTP 協定本身不關心 HTTP Body 的格式，因此可以使用不同的編碼方式來將資料傳輸到伺服器或從伺服器接收資料。
* HTTP Header的資訊會協助接收方了解HTTP Body的內容是甚麼類型

## Ref

[Deep Dive Into Modern Web Development](https://fullstackopen.com/en/)
