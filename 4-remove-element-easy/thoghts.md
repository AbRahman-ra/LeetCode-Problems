# Remove Element (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/remove-element)

## Question

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to val.

Consider the number of elements in `nums` which are not equal to `val` be `k`, to get accepted, you need to do the following things:

1. Change the array `nums` such that the first `k` elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
2. Return k.

Custom Judge:

The judge will test your solution with the following code:

```cpp
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be accepted.

---

## Examples

### Example 1

```cpp
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

### Example 2

```cpp
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

## Constraints

```py
0 <= nums.length <= 100
0 <= nums[i] <= 50
0 <= val <= 100
```

---

## Solution

### Insights

- We need to reorder values after removal such that first k values doesn't contain val
- We return k, which is: non removed values' length
  - I guess this is easy!
  - Simple approach => loop over `nums`, count removed => `k = nums.length - removed.count`, will test later
- But how can we make 1st k elements in nums = non-removed values? Let's try to solve this manually...

```js
[3, 2, 2, 3], (val = 3);
/*
 [_, 2, 2, _]
 [2, 2, _, _]
 */
```

This can be achieved by 2 loops, can we enhance it and achieve it by 1 loop only?

- We need to take some action (we don't know it still) once we hit a value in `nums` that equals `val`
  - We'll definitely remove it (make it = null)
  - Maybe swap it with the last value in nums?
    - Maybe this work, but we need more considerations

### Possible Approach: Two Pointers

**Motivation**: We need to take some action (we don't know it still) once we hit a value in `nums` that equals `val`

- We'll definitely remove it (make it = null)
- Maybe swap it with the last value in nums?
  - Maybe this work, but we need more considerations

Let's make a test

```js
nums = [3, 2, 2, 3];
val = 3;

// Iterations (underscored value is current value)
/*
0: [_3, 2, 2, 3] => 3 === val => nums[0] = null => swap with last value
1: [_3, 2, 2, null] => 3 === val => nums[0] = null => HUH!!! Swap with NEXT last value
2: [_2, 2, null, null] => 2 !== val => skip
3: [2, _2, null, null] => 2 !== val => skip
*/
```

- So, we can swap but decrement after each swap to make sure the next swap still has the probability of validity
- If the condition applies (`nums[i] === val`)
  - Set it to null
  - Swap with last
  - Increment right pointer backwards
- Else => increment left pointer forward

Test Again

```js
let nums = [0, 1, 2, 2, 3, 0, 4, 2],
  val = 2;
let pL = 0,
  pR = nums.length - 1; // 7

// Iterations Interface
// nums[i] === val ? YES => nums[i] = null, swap with last, decrement pR
// nums[i] === val ? NO => increment pL

/*
pL: 0, pR: 7 => 0 === 2 ? NO => pL++
pL: 1, pR: 7 => 1 === 2 ? NO => pL++
pL: 2, pR: 7 => 2 === 2 ? YES => nums[2] = null => swap(nums[2], nums[7]) => pR--
  [0, 1, 2, 2, 3, 0, 4, null]
pL: 2, pR: 6 => 2 === 2 ? YES => nums[2] = null => swap(nums[2], nums[6]) => pR--
  [0, 1, 4, 2, 3, 0, null, null]
pL: 2, pR: 5 => 4 === 2 ? NO => pL++
pL: 3, pR: 5 => 2 === 2 ? YES => nums[3] = null => swap(nums[3], nums[5]) => pR--
  [0, 1, 4, 0, 3, null, null, null]
pL: 3, pR: 4 => 0 === 2 ? NO => pL++
pL: 4, pR: 4 => 3 === 2 ? No => pL++

All next values are nulls => we should exit the loop
*/
```

Very acceptable logic, but we need to think a step further. What if the last value (where `pL === pR`) meets the condition `nums[pL] === val`? We know we should stop in either case

- It will be `null`, swapped by itself (since `pL` & `pR` are equal) and the pR will be less than pL
- But We need to question k
  - If the last value doesn't meet the condition (not `null`) => `k = pL + 1`
  - Otherwise `k = pL`

We must note that we didn't manage any edge cases yet

### Possible Approach (Refined): Two Pointers

1. Define left pointer pL = 0, right pointer pR = nums.length - 1.
2. While pL <= pR do:
   1. If `nums[pL] === val`
      - Set it to null
      - Swap with last
      - Decrement right pointer backwards
   2. Else
      - increment left pointer forward
3. If `nums[pL] === nums[pR] === null` => return pL, else return pL + 1

- For performance, instead of setting nums[pL] to null then swap it, we can directly swap it without nulling
- Also, we can refine the if statement in step 3 to be: (if `nums[pL] !== null` => pL++) => return pL
  - To be more accurate if `nums[pL] !== val` since we didn't null it

### Analyzing my Code

Assuming that c is the number of repetitions of `val` in `nums`, and k is number of all values in `nums.length` that doesn't equal k, so: `c + k = nums.length = n`

- Time Complexity: O(c+k) = O(n)
  - Explanation: assume you want to remove a unique val that equals to the index at the last element, you'll have to loop through all values of nums until you reach to the last value.
- Space Complexity: O(1)

### LeetCode Score: Beats 94.17% Time, Beats 76.14% Memory
