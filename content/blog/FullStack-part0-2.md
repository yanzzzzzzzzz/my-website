---
title: FullStack part0 筆記 - Traditional web applications vs Single-page application
date: 2023-05-02 17:50:23
tags:
---


## Traditional web applications

> 傳統的 Web 應用程式是指一個使用多個頁面的應用程式，每次使用者在網頁上進行操作時，都需要重新載入整個頁面或者轉到另一個頁面，從而刷新網頁的內容。每次發送請求時，伺服器都會重新生成一個 HTML 頁面，並將其傳送給客戶端。

[Example page](https://studies.cs.helsinki.fi/exampleapp/notes)
<!--more-->
### Example page 解析

demo 的 UI畫面:

![UI 畫面](https://i.imgur.com/4yQzkQO.png)

可以在textbox輸入值並按下button把他更新到list中

![前端程式碼](https://i.imgur.com/ntdQHsx.png)

以上是前端的程式碼, 更新的方式是當按下button時, 透過POST請求的方式將資料傳送到後端

![onreadystatechange事件](https://i.imgur.com/obrapUa.png)

以上的程式碼管理當網頁伺服器回應請求，在這段程式碼中，先定義onreadystatechange事件的event handler，當 readyState狀態發生變化時就會觸發

readyState的值為 4 且 status 的值為 200 時，表示請求已經成功完成，並且伺服器已經正常地回應了所需的資料。這時，程式才會繼續執行，並把回應的資料轉換成JSON格式，使用list的顯示方式在網頁上

## Single-page application

> 最近幾年，出現了單頁應用（Single Page Application，SPA）的開發風格，這種風格的網路應用不像傳統應用那樣從伺服器上單獨獲取所有的頁面，而是由一個從伺服器上獲取的HTML頁面和在瀏覽器中執行的JavaScript構成。使用者在使用SPA網站時，只需要從伺服器端載入一次HTML頁面，之後的所有操作都是通過JavaScript與API接口進行交互，動態更新當前頁面的內容，並實現快速響應和更流暢的用戶體驗。SPA應用程序可以實現許多不同的功能，例如社交媒體、電子商務平台和在線文檔編輯器等。

[Example page in SPA](https://studies.cs.helsinki.fi/exampleapp/spa)

### SPA example page 解析

![SPA frontend](https://fullstackopen.com/static/cb1893b2f18168168b3337ef994f0347/5a190/25e.png)

前端程式中沒有使用action或method屬性來定義怎麼傳送資料

![Network](https://fullstackopen.com/static/07beb53097a520517c1c28ff17fc907a/5a190/26e.png)

在網頁上創建新的筆記時，會發現瀏覽器向伺服器端發送一個new_mote/spa POST的請求，並帶有新筆記的JSON資料

![Network](https://fullstackopen.com/static/5819436c98e4cce143fce3fe9bc534b9/5a190/27e.png)

伺服器以狀態代碼201創建進行響應。這一次伺服器沒有要求重定向，瀏覽器停留在同一個頁面上，並且沒有再發送HTTP請求

接下來看怎麼把前端的資料傳送到後端

```javascript
window.onload = function (e) {
  var form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()

    var note = {
      content: e.target.elements[0].value,
      date: new Date()
    }

    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    sendToServer(note)
  }
}
```

在頁面載入後, 對form元件新增submit時的動作:

1. preventDefault, 停止事件的默認動作, 默認方法會將數據送到伺服器並造成頁面更新
2. 新建一個note object, 把填寫的資料放入object中
3. 新增到notes array中
4. 清除填寫的欄位資料
5. 更新note list
6. 傳送新的note到server

傳送到server的function

```javascript
var sendToServer = function (note) {
  var xhttpForPost = new XMLHttpRequest()
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText)
    }
  }

  xhttpForPost.open("POST", '/exampleapp/new_note_spa', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}
```

以HTTP POST請求發送資料型態為JSON, 設定請求的標頭"Content-type", 表示要傳送的內容是 JSON 格式的資料

最後，函式呼叫 xhttpForPost.send() 方法，該方法將以字串形式傳送序列化後的note到伺服器

## Ref

[Deep Dive Into Modern Web Development](https://fullstackopen.com/en/)
