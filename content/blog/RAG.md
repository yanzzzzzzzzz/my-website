+++
date = '2026-05-20T10:00:00+08:00'
title = '理解RAG在幹嘛'
tags = ["AI", "LLM", "RAG"]
+++

{{< figure src="/images/blog/RAG/header.jpg" alt="RAG" caption="photo by Reed Mok" class="text-center" >}}

LLM有時會產生看似合理、但其實不正確的回答，這種不懂裝懂的答案會讓使用者得到錯誤的資訊，還毫不自覺。

這種情況常發生在模型缺乏最新的資訊，像是詢問公司內部的東西，如果是沒有公開的事情，LLM根本不會知道，但是他仍然會亂回答一通。

RAG (Retrieval-Augmented Generation)就是為了解決這類問題而誕生的技術。它的核心概念是: 在LLM回答問題之前，先從指定的資料庫中看一次有沒有相關的文件能參考，讓模型根據可參考內容產生回答。

## RAG的流程

1. 文件準備：收集文件、網頁、FAQ、內部知識庫等資料。
2. 切分資料：將長文件切成較小的 chunk，方便後續檢索。
3. 建立索引：使用 embedding model 將 chunk 轉成向量，存入 vector database。
4. 查詢檢索：使用者提問後，系統將問題轉成向量，找出最相關的資料片段。
5. 生成回答：把檢索到的資料片段放進 prompt，讓 LLM 根據參考內容回答。

## RAG 如何檢索資料

在建立索引時, 使用embedding model將文字轉成向量, 可以想像成就是好多個陣列裡面放著數字, 這些數字代表這段文字的特徵

當使用者要查詢最"相似"文字資料時, 系統也把使用者的問題轉成向量, 然後一個一個去比對相似度

常見的比對方式有:cosine similarity, dot product, euclidean distance等, 這些方法會給出一個分數, 分數越高代表越相似
