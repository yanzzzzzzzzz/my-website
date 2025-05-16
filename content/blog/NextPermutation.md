---
title: 31. Next Permutation
date: 2023-05-29 12:36:57
tags:
---


## 題目

[https://leetcode.com/problems/next-permutation/description/](https://leetcode.com/problems/next-permutation/description/)

A `permutation` of an array of integers is an arrangement of its members into a sequence or linear order.

* For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].

The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

* For example, the next permutation of arr = [1,2,3] is [1,3,2].
* Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
* While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.

Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.
<!--more-->
## Solution

<img src="https://yanzzzzzzzzz.github.io/img//Nextpermutation.png"  width="800"/>

1. 從數列尾端開始向前檢查，直到找到不符合由小到大排列的數字，記錄該數字的索引。在這個例子中，找到數字1，位於第2個索引位置。
2. 如果都符合由小到大, 直接反轉
3. 從數列尾端中找到比1大的最小數字，這裡是5。
4. 將數字1與5交換位置。
5. 對於索引位置由小到大排列的數字(第3個索引位置開始)進行反轉，710反轉為017。最終得到的排列是245017。

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), k, l;
        for (k = n - 2; k >= 0; k--)
        {
            if (nums[k] < nums[k + 1])
            {
                break;
            }
        }
        if (k == -1){
            reverse(nums.begin(), nums.end());
            return;
        }
        reverse(nums.begin() + k + 1, nums.end());
        for (l = k + 1; l < n; l++)
        {
            if (nums[l] > nums[k])
            {
                break;
            }
        }
        swap(nums[k], nums[l]);
    }
};
```  

## Ref

[geeksforgeeks-Next Permutation](https://www.geeksforgeeks.org/next-permutation/)