+++
date = '2026-01-27T21:00:00+08:00'
title = '深入淺出談 Stack：為什麼「後進先出」不是限制，而是力量'
tags = ["Data Structure"]
+++

{{< figure src="/images/blog/ds-stack/header.png" alt="深入淺出談 Stack" caption="photo by Reed Mok" class="text-center" >}}

玩過河內塔嗎?

這是是一個只能從一個桿子中拿最上面圓盤的遊戲, 然後再把圓盤放到另一個桿子的最上方

看到Stack的結構馬上就想到這個例子

## 什麼是 Stack

一個定義好`行為`的資料結構

* 使用者只能把資料一層一層疊在最上方
* 使用者一次只能取最上方的資料

## 為什麼要定義行為

先看看Array跟Stack的差異

| 操作 | Array | Stack |
| :--- | :--- | :--- |
| Search | 可以查詢指定index | 只能看最上方資料 |
| Insert | 可以Insert指定index | 只能push資料到最上方 |
| Remove | 可以Remove指定index | 只能pop最上方資料 |

可以看到Array跟Stack的差異在於限制了行為:新增、刪除、查詢的位置, 為的是換來操作的一致性, 跟較好的時間複雜度

## Stack 的時間複雜度

| 操作 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **讀取 (Seek)** | **O(1)** | 讀取最上方資料 |
| **插入 (Push)** | **O(1)** | 插入資料到最上方 |
| **刪除 (Pop)** | **O(1)** | 刪除最上方資料 |

## 使用 Stack 的最佳場景

* 後進先出的場景
* 剪貼簿的Undo, Redo功能
* Rollback

## 實作Undo, Redo功能

```cpp
#include <iostream>
#include <stack>
#include <string>

using namespace std;

int main() {
    stack<string> undoStack;
    stack<string> redoStack;

    while (true) {
        cout
            << "\nChoose:\n"
            << "1) Add data\n"
            << "2) Undo\n"
            << "3) Redo\n"
            << "4) Exit\n"
            << ">> ";

        int choice = 0;
        if (!(cin >> choice)) break;

        if (choice == 1) {
            cout << "Enter data (one word): ";
            string x;
            cin >> x;

            undoStack.push(x);
            while (!redoStack.empty()) redoStack.pop(); // 清空 redo
            cout << "Added: " << x << endl;
        }
        else if (choice == 2) {
            if (undoStack.empty()) {
                cout << "Nothing to undo." << endl;
            } else {
                string x = undoStack.top();
                undoStack.pop();
                redoStack.push(x);
                cout << "Undo: " << x << endl;
            }
        }
        else if (choice == 3) {
            if (redoStack.empty()) {
                cout << "Nothing to redo." << endl;
            } else {
                string x = redoStack.top();
                redoStack.pop();
                undoStack.push(x);
                cout << "Redo: " << x << endl;
            }
        }
        else if (choice == 4) {
            cout << "Bye." << endl;
            break;
        }
        else {
            cout << "Invalid choice." << endl;
        }

        cout << "Undo size: " << undoStack.size()
             << ", Redo size: " << redoStack.size() << endl;

        if (!undoStack.empty())
            cout << "Undo top: " << undoStack.top() << endl;
        if (!redoStack.empty())
            cout << "Redo top: " << redoStack.top() << endl;
    }

    return 0;
}

```

程式碼說明:

* 共有兩個stack, 分別為undo stack, redo stack
* 當執行新增資料操作時, 將資料push到undo stack中
* 當執行uodo操作時, undo stack pop資料, 並push到redo stack
* 當執行redo操作時, redo stack pop資料, 並push到undo stack

範例output:

```md
Choose:(1) Add data (2) Undo (3) Redo (4) Exit
1
Enter data (one word): 123
Added: 123
Undo size: 1, Redo size: 0
Undo top: 123
1
Enter data (one word): 456
Added: 456
Undo size: 2, Redo size: 0
Undo top: 456
2
Undo: 456
Undo size: 1, Redo size: 1
Undo top: 123
Redo top: 456
3
Redo: 456
Undo size: 2, Redo size: 0
Undo top: 456
```
