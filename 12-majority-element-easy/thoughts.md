# Majority Element (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/majority-element/)

## Question

Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

## Examples

### Example 1

```ts
Input: nums = [3, 2, 3];
Output: 3;
```

### Example 2

```ts
Input: nums = [2, 2, 1, 1, 1, 2, 2];
Output: 2;
```

## Constraints

- `n == nums.length`
- `1 <= n <= 5 * 10e4`
- `-10e9 <= nums[i] <= 10e9`

### Follow-up: Could you solve the problem in linear time and in O(1) space?

---

## Solution

### Insights

- If the length is 1 or 2, return the first element inside directly
  - If the length is 2 & knowing that the majority element exists and appears more than `n / 2` times, so the majority element inside an array of length 2 appears more than `2 / 2` times => appears more than 1 time => appears 2 times => appears in all places of the array
- We might use a hashmap and keep all digits as keys with default values of 0 (default count)
  - Cancel the idea => it's array of numbers not digits
- We may use a hashmap and keep all array numbers as keys but I am wondering if there is less space costly solution
  - Well I tried to search about the question in the follow up, there is an algorithm called Moore's Voting Algorithm, let's have some research about it
  - I found this video [Moore voting algorithm](https://www.youtube.com/watch?v=n5QY3x_GNDg), I watched 6 mins only I swear 🙂. I understood the logic
  - Another useful video [Boyer Moore Majority Vote Algorithm](https://youtu.be/gY-I8uQrCkk) Watched first 4 mins without code

So, let's explain the logic difference

#### The old way

A frequency counter object, make a map whose keys are the array numbers, and its values are the count. Then after looping through the array, we loop over the object and extract the key with maximum value

- Time Complexity: `O(2n) = O(n)`
- Space Complexity: `O(n)`

#### Moore's Voting Algorithm

We set a counter `c` and a majority element candidate `candidate`. Then, we loop over the array, we set the first value to be our candidate by default with its counter = 1. If the next element is equal to the candidate, we increment the counter, otherwise, we decrement our counter. If the counter is 0 after decrement, we reset the candidate to be the current element with counter set to 1. I know this is too theoretical, let me elaborate...

```js
let nums = [3, 2, 2, 2, 3];

/*
Now, length is 5, majority element is 2 as it appears 3 times

// Iterate
nums[i] = 3. candidate: 3, c: 1
nums[i] = 2. candidate: 3, c: 1 => 2 === 3 ? NO => c-- => c === 0 ? YES => reset => candidate: 2, c: 1
nums[i] = 2. candidate: 2, c: 2 => 2 === 2 ? YES => c++
nums[i] = 2. candidate: 2, c: 3 => 2 === 2 ? YES => c++
nums[i] = 3. candidate: 2, c: 3 => 3 === 2 ? NO => c-- => c === 0 ? NO => continue
*/
```

Well, why this algorithm is working? Because, consider the worst case scenarios:

```js
[2, 3, 2, 3, 2, 3, 2];
```

One of the worst case scenarios is when you have an alternating pattern of numbers in the array. But to be the majority element this means the current number have to be repeated for more than `n / 2` times.

If the array length is even => to be the majority element you have to have 2 or more consecutive candidates, which will make counter never decrementing to 0.

Otherwise, if the array length is odd => to be the majority element you can have consecutive elements of course, but if you have a completely alternating pattern. Your last number will must be the majority element. Look at the example above, the length is odd, the majority element is 2. And it's the last element that will reset the candidate and the cou counter.

So, we can refine our thinking in the upcoming section as follows

### Possible Approach: Moore's Voting Algorithm

We can order the steps we did in a clearer manner to be:

1. If the length is less than or equals 2 => return the first array element
2. Define a candidate and initialize it to the first value in the array, and a counter set to 1.
3. For every element in the array (starting from the second element), do:
   1. If the current element equals the candidate, increment the counter
   2. Otherwise:
      1. Decrement the counter
      2. If the decremented counter is 0:
         1. Set the candidate to be the current array element
         2. Initialize the counter to 1
4. Return the candidate

Instead of this complex chaining, we can enhance this code with small edits

### Analyzing Our Code

Thanks Mr. Moore �.

- Time Complexity: **O(n)**
- Space Complexity: **O(1)**

### LeetCode Score: Beats 99.16% Time, Beats 71.04% Memory
