+++
date = '2026-01-26T21:30:00+08:00'
title = '深入淺出談 Linked List'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/ds-linked-list/image.png" alt="深入淺出談 Linked List" caption="photo by Shubham Dhage" class="text-center" >}}

你玩過心理測驗嗎?

有些心理測驗的題目是這樣的

你是男生, 請跳到第 8 題, 妳是女生請跳到第 3 題...

這樣照著前一個指令跳到下一個指定位置的遊戲真的很像 Linked List 的結構

## 什麼是 Linked List

一個資料結構, 每一筆資料除了自己的值外, 還知道下一筆資料是誰, 因此所有操作都必須照順序進行

## Linked List 的時間複雜度

| 操作              | 複雜度   | 說明                                 |
| :---------------- | :------- | :----------------------------------- |
| **讀取 (Read)**   | **O(n)** | 必須從頭開始遍歷資料                 |
| **插入 (Insert)** | **O(1)** | 在已知插入的位置時, 只需調整前後關係 |
| **刪除 (Delete)** | **O(1)** | 在已知刪除的位置時, 只需修改前後關係 |

## 使用 Linked List 的最佳場景

- 已知要在某個元素的位置, 並且在元素前後頻繁操作插入刪除
- 這也是 LRU Cache 常使用 Linked List 的原因之一
