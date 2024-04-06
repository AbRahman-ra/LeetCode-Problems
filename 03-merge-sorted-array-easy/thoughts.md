# Merge Sorted Array (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/merge-sorted-array)

## Question

You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers m and n, representing the number of elements in `nums1` and `nums2` respectively.

Merge `nums1` and `nums2` into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. `nums2` has a length of n.

---

## Examples

### Example 1

```{JS}
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is ["1","2",2,"3",5,6] with the quoted elements coming from nums1.
```

### Example 2

```{JS}
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

### Example 3

```{JS}
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
```

---

## Constrains

```{JS}
nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-10e9 <= nums1[i], nums2[j] <= 10e9
```

**Follow up:** Can you come up with an algorithm that runs in O(m + n) time?

---

## Solution

### Insights

- If m or n is 0, just return the other array (edge case)
- We may use the ES6 swapping: `[a, b] = [b, a]`
  - We need to question the time complexity for this algorithm (Edit: After asking, it's O(1))
  - We can even use a normal swap function, it still has an easy implementation
- I guess this can be done by 2 pointers, let's explore!

### Possible Approach: Two Pointers

- Set 2 pointers, `p1` for `nums1` & `p2` for `nums2`
- Apply on example 1

```js
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
let p1 = 0 => m;
let p2 = 0 => n;

// m = 0, n = 0
nums1[m] < nums2[n] ? yes => no swap, m++
// [1, 2, 3, 0, 0, 0]

// m = 1, n = 0
nums1[m] < nums2[n] ? no => swap, n++
// [1, 2[nums2], 3, 2[nums1], 0, 0]
```

**WRONG APPROACH!!! RETHINK**

**Let's imagine we are allowed to create a new array, what would we do?**

- This is simple (I guess)

```js
let nums1 = [1, 2, 3, 0, 0, 0]; m
let nums2 = [2, 5, 6]; n
let result = [];
let p1 = 0 => m;
let p2 = 0 => n;

// As long as both array don't end
while (p1 < m && p2 < n) {
  if (nums1[p1] < nums2[p2]) {
    result.push(nums1[p1]);
    p1++;
    }
  else {
    result.push(nums2[p2]);
    p2++;
    }
  // This will quit once any of the arrays ends
}

// As long as array 1 don't end (i.e: if array 2 ended first)
while (p1 < m) {result.push(nums1[p1]); p1++;}

// As long as array 2 don't end (i.e: if array 1 ended first)
while (p2 < n) {result.push(nums2[p2]); p2++;}
```

- What if we replaced result by nums1? since it will be returned at the end?
- What is actually pushing to the array?
  - It's technically setting the last current index to a specific value
  - In other words: `result[p1+p2] = ourValue` => `nums1[p1+p2] = ourValue`
- Let's check that out again:

```js
 let nums1 = [1, 2, 3, 0, 0, 0];
 let nums2 = [2, 5, 6];
 let p1 = 0 => m;
 let p2 = 0 => n;

 while (p1 < m && p2 < n) {
  if (nums1[p1] < nums2[p2]) {
    nums1[p1+p2] = nums1[p1];
    p1++;
    }
  else {
    nums1[p1+p2] = nums2[p2];
    p2++;
    }

  // p1: 0, p2: 0 => 1 < 2 => nums1[0] = 1 => p1 = 1 => [1,2,3,0,0,0]
  // p1: 1, p2: 0 => 2 !< 2 => nums1[1] = 2[from nums2] => p2 = 1 [1,2,3,0,0,0]
  note that 2[from  nums 1] is gone!
}
```

The problem here is: if you pushed a value to nums1, it will be lost forever. And I am thinking, since these last indeces are causing us troubles, why don't we use the pointers backwards? (From last to first, push the larger number)

---

### Possible Approach 2: Two Pointers (Reversed)

- So, we know length of nums1 = m, length of nums2 = n => last index in nums1 = m + n - 1
- Let's test our logic

```js
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
let p1 = m - 1 => 0;
let p2 = n - 1 => 0;

// If nums1[p1] > nums2[p2] => insert nums1[p1], decrement p1
// Otherwise, insert nums2[p2] => decrement p2

p1: 2, p2: 2, 3 > 6 ? NO => [1, 2, 3, 0, 0, 6] => p2--
p1: 2, p2: 1, 3 > 5 ? NO => [1, 2, 3, 0, 5, 6] => p2--
p1: 2, p2: 0, 3 > 2 ? YES => [1, 2, 3, 3, 5, 6] => p1--
p1: 1, p2: 0, 2[nums1] > 2[nums2] ? NO => [1, 2[nums2], 2[nums1], 3, 5, 6], p2--;
No need to continue iterating since nums1 is already sorted (Not sure) => return nums1
```

#### **CONGRATULATIONS, OUR LOGIC IS VALID ✅**

- We need to take another example to make sure we're correct

```js
let nums1 = [7, 8, 9, 0, 0, 0];
let nums2 = [2, 5, 6];
let p1 = m - 1 => 0;
let p2 = n - 1 => 0;

// If nums1[p1] > nums2[p2] => insert nums1[p1], decrement p1
// Otherwise, insert nums2[p2] => decrement p2

p1: 2, p2: 2, 9 > 6 ? YES => [7, 8, 9, 0, 0, 9], p1--
p1: 1, p2: 2, 8 > 6 ? YES => [7, 8, 9, 0, 8, 9] => p1--
p1: 0, p2: 2, 7 > 6 ? YES => [7, 8, 9, 7, 8, 9] => p1--
p1: -1, p2: 2, we need to exit the loop and fill the remaining elements of nums2 in nums1
```

#### Note

Note that we need to make another loop for **ONLY** `nums2`, because `nums1` will never be affected

- One More Complicated Example

```js
let nums1 = [2, 8, 0, 0, 0, 0];
let nums2 = [4, 5, 11, 69];
let p1 = m - 1 => 0;
let p2 = n - 1 => 0;

// If nums1[p1] > nums2[p2] => insert nums1[p1], decrement p1
// Otherwise, insert nums2[p2] => decrement p2

p1: 1, p2: 3, 8 > 69 ? NO => [2, 8, 0, 0, 0, 69], p2--
p1: 1, p2: 2, 8 > 11 ? NO => [2, 8, 0, 0, 11, 69] => p2--
p1: 1, p2: 1, 8 > 5 ? YES => [2, 8, 0, 8, 11, 69] => p1--
p1: 0, p2: 1, 2 > 5 ? NO => [2, 8, 5, 8, 11, 69] => p2--
p1: 0, p2: 0, 2 > 4 ? NO => [2, 4, 5, 8, 11, 69] => p2--
p1: 0, p2: -1, exit the loop
```

Passed ✅

---

### Possible Approach: Refined

1. Set two pointers `p1 = nums1.length - 1` & `p2 = nums2.length - 1`
2. While both array don't end
   1. If nums1[p1] > nums2[p2] => nums1[p1+p2+1] = nums1[p1], decrement p1
   2. Otherwise nums1[p1+p2+1] = nums2[p2], decrement p2
3. While there are still elements in nums2
   1. nums1[p2] = nums2[p2], decrement p2
      - Why nums1[p2]? because this while loop will operate only when p1 ends before p2 (p1 = 0)
4. Return nums1

---

### Analyzing my Code

- Time Complexity: O(n+m)
- Space Complexity: O(1)

### LeetCode Score: Beats 96.45% Time, Beats 98.51% Memory
