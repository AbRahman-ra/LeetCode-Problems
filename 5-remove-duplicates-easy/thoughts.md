# Remove Duplicates From a Sorted Array (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

## Question

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in `nums`.

Consider the number of unique elements of `nums` to be k, to get accepted, you need to do the following things:

- Change the array `nums` such that the first k elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return k.

Custom Judge:

The judge will test your solution with the following code:

```java
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be accepted.

## Examples

### Example 1

```py
Input: `nums` = [1,1,2]
Output: 2, `nums` = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of `nums` being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

### Example 2

```py
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of `nums` being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

## Constraints

```py
1 <= nums.length <= 3 * 10e4
-100 <= nums[i] <= 100
nums is sorted in non-decreasing order.
```

---

## Solution

### Insights

- We might need a comparison object and count frequencies of a specific value in nums
- We might use a similar approach to the one in [problem 4](../4-remove-element-easy/)
  - The problem is this will mess up the order of values in nums, which we don't want
- Edge case: if length is 1 return 1;
- Let's try to test the logic anyway

```js
let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
/*
[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
[0, _, 1, _, _, 2, _, 3, _, 4]
Then bind => [0, 1, 2, 3, 4, _, _, _, _, _]
*/
```

what if we iterate from last value to first value and instead of replacing with last value, we replace with first one?

- Agh, seems a bad approach to me, because it will order the elements descendingly
  - But this is actually good enough that we're getting closer to the solution (I guess)

So, what about a 2 pointers approach? Such that we have a leading pointer iterating over nums, and follower one that stops at the next non-repeating value. Let me elaborate...

### Possible Approach: Two Pointers With a Frequency Counter

So, we have a comparison object `comp` along with 2 pointers `pL` (left pointer) & `pR` (right pointer), and let's draw the scenario (in non-edge cases):

1. Set pL = 0, pR = 1
2. Add nums[pL] to `comp` as a key with any value (true for example)
3. Walk through nums (pR < nums.length)
4. If nums[pR] is in `comp` as a key => skip & increment pR
5. Otherwise => add to comp, increment pL, swap(nums[pL], nums[pR]), increment pR
6. Return pL + 1

Let's test it out

```js
let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let pL = 0,
  pR = 1;
let comp = {};
/*
comp[pL] = true => {0: true}
pL: 0, pR: 1, nums[1] in comp ? YES => pR++
pL: 0, pR: 2, nums[2] in comp ? NO => comp[nums[2]] = true, pL++, swap(nums[pL], nums[pR]), pR++
  {0: true, 1: true} [0, 1, 0, 1, 1, 2, 2, 3, 3, 4]
pL: 1, pR: 3, nums[3] in comp ? YES => pR++
pL: 1, pR: 4, nums[4] in comp ? YES => pR++
pL: 1, pR: 5, nums[5] in comp ? NO => comp[nums[5]] = true, pL++, swap(nums[pL], nums[pR]), pR++
  {0: true, 1: true, 2: true} [0, 1, 2, 1, 1, 0, 2, 3, 3, 4]
pL: 2, pR: 6, nums[6] in comp ? YES => pR++
pL: 2, pR: 7, nums[7] in comp ? NO => comp[nums[7]] = true, pL++, swap(nums[pL], nums[pR]), pR++
  {0: true, 1: true, 2: true, 3: true} [0, 1, 2, 3, 1, 0, 2, 1, 3, 4]
pL: 3, pR: 8, nums[8] in comp ? YES => pR++
pL: 3, pR: 9, nums[9] in comp ? NO => comp[nums[9]] = true, pL++, swap(nums[pL], nums[pR]), pR++
  {0: true, 1: true, 2: true, 3: true, 4: true} [0, 1, 2, 3, 4, 0, 2, 1, 3, 1]
pL: 4, pR: 10, end loop
return pL + 1
*/
```

The logic is correct until now, but I worry about the space complexity because of `comp`. Is there a way to do it with less space ?

Why return pL + 1 ?

- Because pL is the index of the furthest non-repeated value, pL + 1 is to convert the index to length (index 4 = 5 elements)

- We know that the array is sorted, and we know that pR is always greater than pL, so...
- If `nums[pR] <= nums[pL]`, this means `nums[pR]` is repeated and we can skip it

Let's try again

```js
let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let pL = 0,
  pR = 1;

/*
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
pL: 0, pR: 1, nums[1] <= nums[0] ? YES => pR++
pL: 0, pR: 2, nums[2] <= nums[0] ? NO => pL++, swap(nums[pL], nums[pR]), pR++
  [0, 1, 0, 1, 1, 2, 2, 3, 3, 4]
pL: 1, pR: 3, nums[3] <= nums[1] ? YES => pR++
pL: 1, pR: 4, nums[4] <= nums[1] ? YES => pR++
pL: 1, pR: 5, nums[5] <= nums[1] ? NO => pL++, swap(nums[pL], nums[pR]), pR++
  [0, 1, 2, 1, 1, 0, 2, 3, 3, 4]
pL: 2, pR: 6, nums[6] <= nums[2] ? YES => pR++
pL: 2, pR: 7, nums[7] <= nums[2] ? NO => pL++, swap(nums[pL], nums[pR]), pR++
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 4]
pL: 3, pR: 8, nums[8] <= nums[3] ? YES => pR++
pL: 3, pR: 9, nums[9] <= nums[3] ? NO => pL++, swap(nums[pL], nums[pR]), pR++
  [0, 1, 2, 3, 4, 0, 2, 1, 3, 1]
pL: 4, pR: 10, end loop
return pL + 1
*/
```

The logic is still correct

### Possible Approach (Refined): Two Pointers (With NO Frequency Counter)

So, the solution until now is like this:

1. If the length of nums is 1, return 1
   - If the length is 0? No need because it's mentioned in the problem constraints the minimum length is 1
2. Define a left pointer `pL = 0` as well as a right pointer `pR = 1`
3. While pR < nums length, do:
   1. If `nums[pR] <= nums[pL]` => Increment pR
   2. Otherwise, increment pL, swap values in indices pL & pR, increment pR
4. Return pL + 1

Since we in both cases will increment pR, we can adjust this pseudo code (step 3) to be more compact, something like this:

1. If the length of nums is 1, return 1
   - If the length is 0? No need because it's mentioned in the problem constraints the minimum length is 1
2. Define a left pointer `pL = 0` as well as a right pointer `pR = 1`
3. While pR < nums length, do:
   1. If `nums[pR] > nums[pL]` => increment pL, swap values in indices pL & pR
   2. Increment pR
4. Return pL + 1

You know what? We don't even need the edge case, because if nums length is 1, pR will NOT less than nums length and so will not enter the loop => pL will remain 0 => return ++0 which is 1, we can refine it more still

1. Define a left pointer `pL = 0` as well as a right pointer `pR = 1`
2. While pR < nums length, do:
   1. If `nums[pR] > nums[pL]` => increment pL, swap values in indices pL & pR
   2. Increment pR
3. Return pL + 1

### Analyzing my Code

- Time Complexity: O(n)
- Space Complexity: O(1)

### LeetCode Score: Beats 98.70%% Time, Beats 81.54% Memory
