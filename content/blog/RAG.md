+++
date = '2026-05-20T10:00:00+08:00'
title = '理解RAG在幹嘛'
tags = ["AI", "LLM", "RAG"]
+++

{{< figure src="/images/blog/RAG/header.jpg" alt="RAG" caption="photo by Reed Mok" class="text-center" >}}

LLM有時會產生看似合理、但其實不正確的回答，這種不懂裝懂的答案會讓使用者得到錯誤的資訊，還毫不自覺。

這種情況常發生在模型缺乏最新的資訊，像是詢問公司內部的東西，如果是沒有公開的事情，LLM根本不會知道，但是他仍然會亂回答一通。

RAG (Retrieval-Augmented Generation)就是為了解決這類問題而誕生的技術。它的核心概念是: 在LLM回答問題之前，先從指定的資料庫中看一次有沒有相關的文件能參考，讓模型根據可參考內容產生回答。

我自己最近也開始學習RAG，並且實作了一個小專案：MediVector-Chat。

會想做這個專案，其實跟我自己的經驗有關。之前我有腳痛的問題，在查資料或問GPT的時候，我會希望能夠參考更多相關資料，例如衛教資訊或最新論文，再根據這些內容回答我的問題。

這也是我覺得RAG很有價值的地方。一般聊天型LLM雖然很方便，但很多時候它其實只是根據訓練資料去生成看起來合理的文字。如果問題涉及特定領域知識、內部文件或最新資訊，模型未必真的知道答案。

所以我想做一個能夠「先查資料，再回答問題」的AI chatbot。

## RAG的流程

1. 文件準備：收集文件、網頁、FAQ、內部知識庫等資料。
2. 切分資料：將長文件切成較小的 chunk，方便後續檢索。
3. 建立索引：使用 embedding model 將 chunk 轉成向量，存入 vector database。
4. 查詢檢索：使用者提問後，系統將問題轉成向量，找出最相關的資料片段。
5. 生成回答：把檢索到的資料片段放進 prompt，讓 LLM 根據參考內容回答。

簡單來說，流程大概像這樣：

```text
文件 / PDF
→ Chunking
→ Embedding
→ 存入 Weaviate
→ 使用者提問
→ Vector Search
→ Top-K Retrieval
→ Prompt 組合
→ LLM 回答
→ 顯示來源段落
```

在我自己的 MediVector-Chat 專案中，也有實際把這些流程做出來。目前有做到：

- 文件 chunking
- embedding
- vector search
- Top-K retrieval
- prompt 組合
- 顯示來源段落
- 前後端分離
- Docker 啟動本機環境

使用技術主要是：

```text
Frontend: Vue
Backend: Python
Vector Database: Weaviate
Deployment: Docker
```

## RAG 如何檢索資料

在建立索引時, 使用embedding model將文字轉成向量, 可以想像成就是好多個陣列裡面放著數字, 這些數字代表這段文字的特徵。

當使用者要查詢最"相似"文字資料時, 系統也把使用者的問題轉成向量, 然後一個一個去比對相似度。

常見的比對方式有: cosine similarity, dot product, euclidean distance等, 這些方法會給出一個分數, 分數越高代表越相似。

不過實際做RAG後，我覺得真正困難的地方不是在「把資料存進向量資料庫」。

比較重要的是：

- chunk 要切多大
- Top-K 要抓多少
- retrieval quality 好不好
- embedding model 適不適合
- prompt 怎麼組

這些都會直接影響最後回答品質。

例如如果chunk太大，搜尋可能不夠精準；但如果chunk太小，又可能缺少上下文資訊。另外，如果retrieval沒有找對內容，就算後面的LLM很強，最後回答還是可能會偏掉。

所以我覺得：

> RAG 的重點其實不只是 generation，而是 retrieval。

## RAG的限制

雖然RAG可以改善LLM hallucination的問題，但它也不是完全沒有限制。

例如：

- retrieval 不一定找得到真正相關內容
- embedding 不一定能理解所有語意
- chunking 方式會影響搜尋品質
- context window 有大小限制
- prompt 組不好可能會影響回答
- 文件內容本身如果錯誤，LLM還是可能回答錯

另外，RAG其實也很依賴資料品質。

如果資料來源本身不完整、不正確，或chunk切得不好，就算retrieval有成功，也不一定能得到理想答案。

我覺得RAG很適合用在：

- 衛教資訊
- 公司內部知識庫
- FAQ系統
- 技術文件搜尋
- SOP文件查詢
- 論文問答

透過 MediVector-Chat 這個專案，整合了RAG變成一個可實際操作的系統，也算是把我原本的後端開發、前後端開發與系統整合經驗，跟AI/RAG技術做結合。因為實務上要做出一個AI功能，不只是會呼叫模型API就好，還需要處理資料來源、檢索流程、API串接、前端呈現與部署方式。

[GitHub Repo](https://github.com/yanzzzzzzzzz/MediVector-Chat)
