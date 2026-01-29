+++
date = '2026-01-28T21:00:00+08:00'
title = '深入淺出談 Hash Table：從理論 O(1) 到實作中的 rehash 現實'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/DS-HashTable/header.jpg" alt="深入淺出談 Hash Table" caption="photo by Jessica Johnston" class="text-center" >}}


## 什麼是 Hash Table

Hash Table 是一種透過 **hash function 將 key 映射到 bucket**,
以達成 **平均 O(1) 查找效率** 的資料結構

資料通常以 **key–value** 的形式儲存,
使用者只需要提供 key,就能快速取得對應的 value

在實作上,Hash Table 內部會維護一組 **bucket array**,
每個 bucket 可以儲存一個或多個元素

當資料量持續增加、bucket 內元素變得過於擁擠時,
Hash Table 會透過 **resize / rehash** 重新分配資料,
以維持查找效能

---

## 為什麼 Hash Table 可以快速查詢資料？

Hash Table 能快速查詢資料的關鍵,在於 **hash function**

當一個 key 被插入或查詢時,
Hash Table 會先對 key 計算 hash 值,
再將 hash 值映射成一個 bucket index,
用來決定資料應該存放或查找的位置

在理想情況下,
不同的 key 會被均勻分散到不同的 bucket,
使得查找時只需要常數時間就能找到目標資料

需要注意的是,這裡的 O(1) 指的是 **平均時間複雜度**

而不是在所有情況下都成立



## Hash Table 查資料流程

查找資料的流程如下:

1. 輸入 key
2. 對 key 計算 hash 值
3. 由 hash 值計算 bucket index
4. 到指定的 bucket 中查找資料
5. 若 bucket 內有多個元素,逐一比對 key
6. 找到對應的 key 後,回傳 value

當 bucket 內只有一個或沒有元素時,
查找流程會非常快速

但當 bucket 內元素數量增加時,
查找成本也會隨之上升


## 資料碰撞（Collision）

由於 hash function 會將大量可能的 key
映射到有限數量的 bucket,
不同的 key 被分配到同一個 bucket 是無法避免的,
這種情況稱為 **collision**

當某個 bucket 內存放多個元素時,
Hash Table 在查找資料時,
必須在該 bucket 內 **逐一比對 key**,
因此查找時間不再是 O(1),
而會退化為O(k), 其中k是bucket的資料量



## Load Factor:衡量 Hash Table 的擁擠程度

為了評估 Hash Table 目前是否過於擁擠,
通常會使用 **load factor** 作為指標:

$$
\text{load\\_factor} = \frac{\text{size}}{\text{bucket\\_count}}
$$

- `size`:目前儲存的元素總數量  
- `bucket_count`:bucket 的總數量  

load factor 可以理解為:
> **平均每個 bucket 中有多少元素**

當 load factor 越高,
代表 bucket 內的元素越擁擠,
collision 發生的機率也越高,
查找效率就越容易從近似 O(1) 退化



## Resize 與 Rehash

當 load factor 超過預設的安全門檻時,
Hash Table 會進行 **resize**,
也就是增加 bucket 的數量

由於 bucket 數量改變後,
每個元素對應的 bucket index 可能不同,
因此 resize 一定會伴隨 **rehash**,
重新計算所有元素的 bucket 位置

典型的 resize / rehash 流程如下:

1. 配置一個更大的 bucket array
2. 對所有元素重新計算 bucket index
3. 將元素重新分配到新的 bucket 中

這個操作需要重新處理所有元素,
時間複雜度為 **O(n)**,
但由於 resize 並不會頻繁發生,
整體插入與查找的平均成本仍能維持在可接受範圍

## 實測Hash Table resize

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

void print_state(const unordered_map<int, int>& m) {
    cout << "size = " << m.size()
         << ", bucket_count = " << m.bucket_count()
         << ", load_factor = " << m.load_factor()
         << ", max_load_factor = " << m.max_load_factor()
         << "\n";

    for (size_t i = 0; i < m.bucket_count(); ++i) {
        cout << "  bucket " << i
             << " -> " << m.bucket_size(i) << " elements\n";
    }
    cout << "-----------------------------\n";
}

int main() {
    unordered_map<int, int> m;

    // 固定 bucket 數量
    m.rehash(10);

    // 設定 max_load_factor（可以改 0.5 / 1.0 / 2.0）
    m.max_load_factor(0.5);
    cout << "DEBUG max_load_factor now = " << m.max_load_factor() << "\n";
    cout << "After rehash & load factor setup\n";
    print_state(m);

    // 固定插入元素數量
    const int N = 4;
    for (int i = 1; i <= N; ++i) {
        m[i] = i;
    }

    cout << "After inserting " << N << " elements\n";
    print_state(m);

    return 0;
}
```

輸出:
```
DEBUG max_load_factor now = 0.5
After rehash & load factor setup
size = 0, bucket_count = 11, load_factor = 0, max_load_factor = 0.5
  bucket 0 -> 0 elements
  bucket 1 -> 0 elements
  bucket 2 -> 0 elements
  bucket 3 -> 0 elements
  bucket 4 -> 0 elements
  bucket 5 -> 0 elements
  bucket 6 -> 0 elements
  bucket 7 -> 0 elements
  bucket 8 -> 0 elements
  bucket 9 -> 0 elements
  bucket 10 -> 0 elements
-----------------------------
After inserting 4 elements
size = 4, bucket_count = 23, load_factor = 0.173913, max_load_factor = 0.5
  bucket 0 -> 0 elements
  bucket 1 -> 1 elements
  bucket 2 -> 1 elements
  bucket 3 -> 1 elements
  bucket 4 -> 1 elements
  bucket 5 -> 0 elements
  bucket 6 -> 0 elements
  bucket 7 -> 0 elements
  bucket 8 -> 0 elements
  bucket 9 -> 0 elements
  bucket 10 -> 0 elements
  bucket 11 -> 0 elements
  bucket 12 -> 0 elements
  bucket 13 -> 0 elements
  bucket 14 -> 0 elements
  bucket 15 -> 0 elements
  bucket 16 -> 0 elements
  bucket 17 -> 0 elements
  bucket 18 -> 0 elements
  bucket 19 -> 0 elements
  bucket 20 -> 0 elements
  bucket 21 -> 0 elements
  bucket 22 -> 0 elements
```

這段程式碼顯示, 在C++的unordered_map中,
rehash的發生不僅取決於load factor是否超過門檻,
實作能可能基於內部邏輯提前擴展bucket

## 時間複雜度

在load factor受控的情況下:

| 操作 | 複雜度 |
| :--- | :--- | 
| **讀取 (Read)** | 平均是**O(1)** | 
| **插入 (Insert)** | 平均是**O(1)** | 
| **刪除 (Delete)** | 平均是**O(1)** | 



## 使用情境

Hash Table 通常用於以下情境:

* 資料筆數不固定
* 插入與刪除頻繁
* 查詢操作多
* 查找效率要求高
* 不依賴資料的順序或範圍來查詢

常用在:

* 快取系統:Redis / Memcached、LLM 推論中的 KV Cache
* 資料重複性檢查: 用來判斷資料是否存在




