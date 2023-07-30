# Two Sum II - Input Array is Sorted (Medium)

## [Pronblem Link on LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

## Question

Given a **1-indexed** array of integers `numbers` that is already **_sorted in non-decreasing order_**, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 < numbers.length`.

Return the indices of the two numbers, index1 and index2, **_added by one_** as an integer array [index1, index2] of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

---

## Solution

Since the array is sorted, we can use 2 pointers. One at the beginning and one at the end. We find `nums[begin] + nums[end]` if they are > target => decrement the ending pointer to decrease the sum, if they < target, increment the starting pointer to increase the result. If they are equal to the target, return true.

1. Define a starting pointer `pS = 0` and an ending pointer `pE`
2. While ending pointer is less than the starting pointer, do:
   1. If the sum of numbers at both pointers = target, return true
   2. Otherwise, if the sum > target, decrement the ending pointer
   3. Otherwise, increment the starting pointer

### LeetCode Score: Beats 91.39% Time, Beats 91.79% Memory
