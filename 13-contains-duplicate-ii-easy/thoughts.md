# Contains Duplicate II (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/contains-duplicate-ii/)

## Question

Given an integer array `nums` and an integer `k`, return true if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.

## Examples

### Example 1

```ts
Input: (nums = [1, 2, 3, 1]), (k = 3);
Output: true;
```

### Example 2

```ts
Input: (nums = [1, 0, 1, 1]), (k = 1);
Output: true;
```

### Example 3

```ts
Input: (nums = [1, 2, 3, 1, 2, 3]), (k = 2);
Output: false;
```

## Constraints

- `1 <= nums.length <= 1e5`
- `-1e9 <= nums[i] <= 1e9`
- `0 <= k <= 1e5`

---

## Solution

### Insights

- We might use a map

Storing the number as a key and its index as a value while looping around the array, then if we found the number again in the array, we subtract the current index from the stored index and take the absolute. If it's <= k, return true. Otherwise skip and return false in the end.

It's a space costing approach, can we find a better solution?

And what if we found number 3 times, with `i2 - i1 > k`, but `i3 - i2 <= k`. How can we manage that? We already replaced the value by the indexes difference. We can resolve this by a condition. If the indexes difference is less than k => return true. Otherwise replace the old index with the new one.

### Possible Approach: Reference Object

Let's test our logic

```js
[1, 0, 1, 1], (k = 1);
ref = {};
/*
i: 0, {1: 0}
i: 1, {1: 0, 0: 1}
i: 2, abs(2 - 1) <= k ? NO => replace => {1: 2, 0: 1}
i: 3, abs(3 - 2) <= k ? YES => return true
*/
```

The logic seems to be correct. But we're thinking if we can save more space

After long time, I can't think of any solution. I will see the solutions section if there is any and update this doc

### Possible Approach (Refined): Reference Object

We will not need the absolute since we will be subtracting the later (greater) index by the earlier (smaller) index. So, we can rewrite the pseudo code as:

1. Define a reference object `ref`
2. While `nums` doesn't end, do:
   1. If the current number is not in `ref`, store it as a key in `ref` with a value of its corresponding index
   2. Otherwise: if the current index - the stored index <= k, return true
   3. Otherwise store the new index
3. Return false if you haven't returned true

We notice that in steps 2.1 & 2.3, we store the current index at the end. Thus, we can update the pseudo code to be:

1. Define a reference object `ref`
2. While `nums` doesn't end, do:
   1. If the current current number exists in `refs` and current index - the stored index <= k, return true
   2. Otherwise (current number doesn't exist or current index - the stored index > k), store the new index
3. Return false if you haven't returned true

### Analyzing my code

Well, it seems this is the way I guess 🤔. I got high rank in terms of time complexity but a bit poor rank in space complexity. After a thorough reading to solutions, they use hash maps as well, what's the difference then? IDK

- Time Complexity: **O(n)**
- Space Complexity: **O(n)**

### LeetCode Score: Beats 100.00% Time 🤩🤩, Beats 33.80% Space

### EDIT

I found another solution, that uses a set instead of a map. A set is a collection of unique values. And If the set has the number, return true and at the same time keep the set size less than or equal to k (sliding window over the set). This is done by deleting the first item in the set.

So, instead of replacing / updating the index in the hash map. We can simply rephrase our statement as:

- If the difference of `i - i stored > k`, then this means that the current i is ahead of the stored i by more than k steps (indexes). Thus, we can delete old i (we'll call it `i stored`) safely from the set.
- We know that `i - i stored > k => i - k > i stored`. The minimum value for `i - k` is `i stored + 1`
  - Because let `i - k = x` => x > i stored => this means x is at least `i stored + 1` => and also means `i stored = x - 1` => the minimum safe value of `i stored` is `x - 1` which is `i - k - 1`
- We can safely delete i stored => we can safely delete the number at index [i current - k - 1]

If the set size is greater than k => there are more than k unique values in between of 2 repeated numbers => remove the i stored. If the size is less than or equal k and the current number exists in the set => the repeated number indexes are <= k, return true

### LeetCode Score Second Time: Beats 99.13% Time 🤩🤩, Beats 75.80% Space
