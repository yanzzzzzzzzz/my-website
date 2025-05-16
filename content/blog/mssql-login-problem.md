---
title: MSSQL 無法連線至XXX 問題
date: 2023-09-01 10:57:00 +0800
tags: 
mathjax: true
toc : true
---

<img src="https://yanzzzzzzzzz.github.io/img/mssql-login-fail.png" />

以下可能原因:
<!--more-->
## 伺服器僅設定為Windows驗證模式

物件總管->伺服器右鍵選擇屬性->安全性->變更伺服器驗證為SQL Server及Windows驗證模式

<img src="https://yanzzzzzzzzz.github.io/img/mssql-setting-login-mode.png" />

需要重新啟動SQL SERVER

<img src="https://yanzzzzzzzzz.github.io/img/mssql-reboot.png" />

## 不存在的user

新建一個跟登入名稱相同的user

<img src="https://yanzzzzzzzzz.github.io/img/mssql-create-new-user.png" />

設定讀取資料庫權限

<img src="https://yanzzzzzzzzz.github.io/img/mssql-user-db-permit-setting.png" />

## 未啟用的user

如果是已經創建的user, 檢查是否被設置為停用user

<img src="https://yanzzzzzzzzz.github.io/img/mssql-login-type-enable.png" />

物件總管->伺服器->安全性->登入->找到指定user名稱右鍵->屬性->狀態

登入的地方把`已停用`改為`已啟用`

## REF

[[研究] SQL Server 2019 - 與伺服器的連線已建立成功，但在登入程序時發生錯誤。](https://shaurong.blogspot.com/2021/06/sql-server-2019.html)

[[Database][SQL Server] 使用者 的登入失敗。 Microsoft SQL Server, 錯誤: 18456](https://dog0416.blogspot.com/2015/04/databasesql-server-microsoft-sql-server.html)
