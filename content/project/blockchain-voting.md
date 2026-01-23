---
title: 區塊鏈投票系統
year: 2025
skills: ["Vue", "Web3.js", "Solidity", "Ethereum", "Smart Contracts"]
summary: 建構於以太坊區塊鏈的去中心化投票應用程式，具備防篡改的投票記錄與多選項支援。
images: ["/images/blockchain-voting/1.png"]
github: "https://github.com/yanzzzzzzzzz/blockchain-voting-system"
demo: ""
---

## 專案概覽

一個建構在以太坊區塊鏈上的去中心化投票平台，確保投票過程透明、安全且不可篡改。

## 功能特色

- **去中心化**：無中心化機構控制投票
- **不可篡改**：投票一旦記錄便無法更改
- **透明公開**：所有投票皆可在區塊鏈上公開驗證
- **多選項支援**：支援多種投票選擇
- **安全可靠**：以太坊區塊鏈的密碼學安全保障

## 技術堆疊

- **前端**：Vue 3 (搭配 PrimeVue UI)
- **區塊鏈**：Ethereum (以太坊)
- **智能合約**：Solidity (v0.8.20)
- **Web3 整合**：Ethers.js
- **錢包**：Metamask 整合

## 開發期間

2025 年 2 月

## 智能合約功能

```solidity
- 建立新投票
- 進行投票
- 查看結果
- 防止重複投票
- 具備時效性的投票期間
```

## 學習成果

本專案是在完成 Educative 課程「Building a Blockchain from Scratch Using Solidity and Ethereum」後開發的。

主要學習重點：

- 撰寫與部署 Solidity 智能合約
- 從前端與以太坊區塊鏈進行互動
- 管理錢包連線
- Gas 手續費最佳化技巧
- 智能合約的安全性最佳實踐

## 安全性考量

- **重入攻擊 (Reentrancy) 防護**：採用 Check-Effects-Interactions 模式
- **輸入驗證**：嚴格檢查投票時效與參數正確性
- **溢位/下溢位 (Overflow/Underflow) 防護**：基於 Solidity 0.8+ 編譯器原生支援
