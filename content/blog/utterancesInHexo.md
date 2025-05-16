---
title: 在hexo新增留言板功能(utterances)
date: 2022-11-14 22:58:51
tags: [blog]
---

## 前言

過去對 blog 的留言板功能用過 [Disqus](https://disqus.com/)，用了之後會在留言處自動插入廣告
看到 utterances 使用 github issue 當作留言板的儲存位置覺得滿酷的，就來研究一下

## 安裝環境

- hexo 6.3.0
- Next theme
- npm 8.5.5
- Windows 10

## 流程

1. 到 GitHub 創建一個公開的儲存庫

2. 到[utterances app](https://github.com/apps/utterances)並在 GitHub 上啟用，選擇剛剛新增的儲存庫
   <img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration_1.png"  width="400"/>

3. 到[utterances](https://utteranc.es/)官網進行參數設定，下拉到 Repository 處 repo:填入留言板綁定的專案名，圖片中有提到要注意的事項:專案要是公開的、有授權[utterances app](https://github.com/apps/utterances)
   <img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration.png"  width="400"/>

4. 設定 issue 標題取名方式，有以下幾種:

   - Issue title contains page pathname
   - Issue title contains page URL
   - Issue title contains page title
   - Issue title contains page og:title
   - Specific issue number
   - Issue title contains specific term

5. 設定 issue 標記名稱(選填)

6. 設定留言板主題配色

   - GitHub Light
   - GitHub Dark
   - Preferred Color Scheme
   - GitHub Dark Orange
   - Icy Dark
   - Dark Blue
   - Photon Dark
   - Boxy Light
   - Gruvbox Dark

7. 建立好的儲存庫透過 hexo 建置好一個 blog，並修改成 Next 樣式
8. 複製自動產生的程式碼到 themes\next\layout_partials\comments.swig
   <img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration_2.png"  width="400"/>
   <img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration_3.png"  width="400"/>

9. 在 theme\next_config.yml 最下面加入啟用 utterances 語法

```js
utterances: enable: true;
```

## 我碰到的 bug

官方教學跟各種線上教學都非常多也非常詳細，但我竟然 Debug 了一小時...
在做完以上流程後出現了留言功能，但在按下登入時...

<img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration_4.png"  width="400"/>

網址觀察後發現是config的url + 當下文章的path

```=html
http://example.com/2022/11/14/post/?utterances=2ea222cae0003a078fc8aa047N244Fhi3TkHCsP8Hl%2F9pfC29qC7R2n1HjJm3apPbnWhu6UcHQz8c0ueHm%2FWRMWuA7WS2%2FFH1ykmbf2OxNakOqPEWQR4krMr7rU6vwG7gyd0lpDR1hf4r%2FuNirY%3D
```

因此將_config.yml url，改成設定的 repo 位置就可以了
<img src="https://yanzzzzzzzzz.github.io/img/utterances_configuration_5.png"  width="400"/>
