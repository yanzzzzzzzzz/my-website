+++
date = '2026-01-23T14:00:00+08:00'
title = '深入淺出談 Array：從記憶體配置看時間複雜度'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/ds-array/header.png" alt="深入淺出談 Array" caption="photo by Reed Mok" class="text-center" >}}

想像你是一位老師，要管理一個新班級的學生名單

人數少的時候，你可以直接用名字來記住每一位學生，但當學生人數一多，要快速找到某一位學生就變得困難

### 情境 A：變數分散管理

如果我們像這樣單獨宣告變數來存學生名字：

```cpp
string student1 = "Alice";
string student2 = "Bob";
string student3 = "Charlie";
// ... 如果有 50 個學生，變數會多到無法管理
```

這種方式的問題在於：
* **沒有順序性**：變數之間沒有邏輯上的關聯
* **無法索引**：不能用「第 3 個學生」這種方式來存取
* **難以自動化**：無法用迴圈（Loop）來批次處理這群資料

---

### 情境 B：使用 Array 統一管理

這時候，如果替每位學生分配一個固定的「座號」，並依照座號的順序將學生資料排排站（存放起來），只要知道座號，就能直接找到對應的學生

```cpp
struct Student {
    string name;
};

// 學生名單 (Array)
Student students[] = {
    {"Alice"},   // index 0 (座號 1)
    {"Bob"},     // index 1 (座號 2)
    {"Charlie"}  // index 2 (座號 3)
};

const int numStudents = 3;

Student* findStudentBySeatNumber(int seatNumber) {
    // 檢查座號是否合法
    if (seatNumber < 1 || seatNumber > numStudents) {
        return nullptr;
    }
    // 透過索引直接取得資料 (Array Index 從 0 開始)
    return &students[seatNumber - 1]; 
}
```

這就是 **Array** 的核心精神

## 什麼是 Array？

> **定義**：Array（陣列）是一種將「同類型」的資料，存放在「連續」記憶體空間的資料結構

這個定義有兩個重點：
1.  **同類型 (Homogeneous)**：每個元素需要的記憶體大小固定且相同
2.  **連續記憶體 (Contiguous Memory)**：資料在記憶體中是緊密排列的，中間沒有空隙

## 為什麼要用 Array？

當我們將資料整理成 Array 結構後，獲得了以下優勢：

*   **有順序性**：資料依然保持排列順序
*   **支援隨機存取 (Random Access)**：這是 Array 最強大的特性，可以透過 Index 瞬間找到資料
*   **適合批次操作**：可以用迴圈輕鬆遍歷所有資料

## Array 的記憶體原理

為什麼 Array 可以快速 (O(1)) 找到第 `i` 個資料？因為資料是**連續**存放的

電腦只需要知道：
1.  **起始位址 (Base Address)**
2.  **索引 (Index)**
3.  **單一資料大小 (Data Size)**

就能算出目標位址：

$$ \text{Address}(i) = \text{Base\\_Address} + (i \times \text{Data\\_Size}) $$


### 程式碼驗證

讓我們實際用 C++ 觀察記憶體位址：

```cpp
#include <iostream>

int main() {
    // 定義一個整數陣列
    int arr[5] = {10, 20, 30, 40, 50};

    std::cout << "觀察陣列在記憶體中的分佈：" << std::endl;
    // int 通常佔 4 bytes
    for (int i = 0; i < 5; i++) {
        std::cout << "arr[" << i << "] 的位址: " << &arr[i] << std::endl;
    }

    return 0;
}
```

**輸出：**
```text
觀察陣列在記憶體中的分佈：
arr[0] 的位址: 0x7ffe6b849e60
arr[1] 的位址: 0x7ffe6b849e64  <-- +4 bytes
arr[2] 的位址: 0x7ffe6b849e68  <-- +4 bytes
arr[3] 的位址: 0x7ffe6b849e6c  <-- +4 bytes
arr[4] 的位址: 0x7ffe6b849e70  <-- +4 bytes
```

你會發現，記憶體位址是連續的，每個間隔剛好是 4 bytes

這就是為什麼電腦不需要從頭數，直接用算的就能跳到目標位置

## Array 的時間複雜度

| 操作 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **讀取 (Read)** | **O(1)** | 透過公式直接計算位址，速度最快 |
| **插入 (Insert)** | **O(n)** | 因為記憶體是連續的，若在中間插入一個新元素，後面的所有元素都要往後搬移一格，騰出空間 |
| **刪除 (Delete)** | **O(n)** | 若刪除中間的元素，後面的所有元素都要往前補齊空缺，保持連續性 |

## 使用 Array 的最佳場景

1.  **資料量已知或固定**：不需要頻繁擴展大小
2.  **讀多寫少**：頻繁查詢某個位置的資料，但很少在中間插入或刪除
3.  **需要快速存取**：依賴 Index 快速取得內容
