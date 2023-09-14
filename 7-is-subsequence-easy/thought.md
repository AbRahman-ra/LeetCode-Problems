# Is Subsequence (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/is-subsequence)

## Question

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

---

## Examples

### Example 1

```{JS}
Input: s = "abc", t = "ahbgdc"
Output: true
```

### Example 2

```{JS}
Input: s = "axc", t = "ahbgdc"
Output: false
```

---

## Constrains

- `0 <= s.length <= 100`
- `0 <= t.length <= 10e4`
- `s` and `t` consist only of lowercase English letters.

### Follow Up

Suppose there are lots of incoming s, say `s1, s2, ..., sk` where `k >= 10e9`, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?

---

## Solution

### Insights

- This is easy I guess 😁, I am thinking of setting 2 pointers at both strings, and if both letters are the same. Increment both pointers, else increment the bigger one
- If we reach to s end so we are done and return true, while if we reached to t end and s is not ended yet we'll return false
- Edge Case: If t length is less than s length

### Possible Approach: Two Pointers

Let's test the logic in insights section

```js
let s = "abc",
  t = "ahbgdc";
let ps = 0,
  pt = 0;

/*
ps: 0, pt: 0, s[0] === t[0] ? YES => ps++, pt++
ps: 1, pt: 1, s[1] === t[1] ? NO => pt++
ps: 1, pt: 2, s[1] === t[2] ? YES => ps++, pt++
ps: 2, pt: 3, s[2] === t[3] ? NO => pt++
ps: 2, pt: 4, s[2] === t[4] ? NO => pt++
ps: 2, pt: 5, s[2] === t[5] ? YES => ps++, pt++
ps: 3, pt: 6, end loop
if ps === s.length return true, otherwise return false
*/
```

The logic is successful, and since we'll increment `pt` in all cases, we can have only 1 condition for `ps`

---

### Possible Approach (Refined): Two Pointers

Let's organize our approach in a good pseudo code

1. Define 2 pointers `ps` & `pt` for `s` & `t` respectively, both initialized with 0
2. While `pt` doesn't reach to `t` end, do:
   1. If both pointers are referring to the same letter, increment ps
   2. Increment pt
3. If ps is at `s` end, return true, otherwise return false

In worst case (return false), s will not end. In the best case (return true), s will end before or with t. So, we might adjust our loop to end as s or ends first (take the fastest one to end => reduces time complexity). If `t` ends before `s` return false, otherwise return true, this can be checked by asking about `ps` value, if it equals `s` length, this means `t` ended first and vice versa, so we may adjust the above pseudo code to be:

1. Define 2 pointers `ps` & `pt` for `s` & `t` respectively, both initialized with 0
2. While `s` and `t` (both) don't end, do:
   1. If both pointers are referring to the same letter, increment ps
   2. Increment pt
3. If `s` ends before `t` return true, otherwise return false (return ps === s.length)

---

### Analyzing my Code

- Time Complexity: O(n)
- Space Complexity: O(1)

### LeetCode Score: Beats 95.58% Time, Beats 81.97% Memory
