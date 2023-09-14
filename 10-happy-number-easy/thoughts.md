# Happy Number (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/happy-number)

## Question

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.

---

## Examples

### Example 1

```js
Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

### Example 2

```js
Input: n = 2
Output: false
Explanation: 2 is not a happy number
```

---

## Constraints

- `1 <= n <= 2^31 - 1`

---

## Solution

### Insights

- If the number is less than 10 & greater than 1, return false (edge case)
- I guess we can solve it by recursion (not sure yet)

Let's try a number and test our understanding for the problem:

```ts
input: 2147483647(2 ** 31 - 1);

/*
2^2 + 1^2 + 4^2 + 7^2 + 4^2 + 8^2 + 3^2 + 6^2 + 4^2 + 7^2 =
4   +  1  + 16  + 49  + 16  + 64  +  9  + 36  + 16  + 49  =
260
2^2 + 6^2 = 4 + 36 = 40
false (short circuit)
4^2 = 16
1^2 + 6^2 = 37
3^2 + 7^2 = 58
5^2 + 8^2 = 89
8^2 + 9^2 = 145
1^2 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
false
*/
```

If the numbers are getting bigger, not a happy number (Not Necessarily, example 1 numbers are getting bigger at first but it's a happy number)

- **Hypothesis:** If the sum of all digits is 1e+t where t is an integer, the number is happy (test)

Test: n = 64, n = 46, n = 127, n = 12223

```ts
input: n = 64;

/*
6^2 + 4^2 = 36 + 16 = 52
5^2 + 2^2 = 25 + 4 = 29
2^2 + 9^2 = 4 + 81 = 85
8^2 + 5^2 = 64 + 25 = 89
8^2 + 9^2 = 64 + 81 = 145
1 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
false
*/
```

Failed from the first test.

Another Hypothesis: if the number's digits are all rootable (its square root is an integer), the number is likely to be happy. Test with n = 149, n = 44, n = 9914

```ts
input: n = 149;

/*
1^2 + 4^2 + 9^2 = 98
9^2 + 8^2 = 64 + 81 = 145
1 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
false
*/
```

Again failed from the first test

Let's try to track the happy numbers manually counting from 1 to 100 (click [here](#results) to skip):

- 1 ✅
- 2, 3 false
- 4 => 16 => 37 => 58 => 89 => ... => false
- 5 => 25 => 29 => false
- 6 => 36 => false
- 7 => 49 => 97 => 130 => true ✅
- 8 => 64 => 52 => false
- 9 => 81 => false
- 10, 13 ✅
- 14 => 17 => 50 => 25 => 29 => 85 => 89 => 145 => 42 => 20 false
- 15 => 26 => 40 => false
- 16 => 37 => 58 => 89 => ... => false
- 17 => 50 => false
- 18 => 65 => 61 (same as 16) => false
- 19 => 82 => 68 => 100 => true ✅
- 20, 21, 22 all false
- 23 => 13 => 10 => true ✅
- 24 => false
- 25 => 29 => 85 (same as 58) => false
- 26 => 40 => false
- 27 => 53 => 34 => 25 => false
- 28 => 68 => true ✅
- 29 => 85 => false
- 30 false
- 31, 32 true ✅
- 33 => 18 => false
- 34 => 25 => false
- 35 => 34 => false
- 36 => 45 => 41 => false
- 37 => 58 => false
- 38 => 73 => false
- 39 => 90 => 81 => 65 => false
- 40, 41, 42, 43 => all false
- 44 => 32 => true ✅
- 45 => 41 => false
- 46 => 52 => false
- 47 => 65 => 61 => false
- 48 => 80 => false
- 49 => 97 => 130 => true ✅
- 50 : 54 => false
- 55 => 50 => false
- 56 => false
- 57 => false
- 58 => 89 => false
- 59 => false
- 60 : 67 => false
- 68 true ✅
- 69 => false
- 70 => ✅
- 71 : 76 => false
- 77 => 98 => 145 => 42 => false
- 78 => 113 => 11 => false
- 79 ✅
- 80 : 81 false
- 82 true ✅
- 83 : 85 false
- 86 ✅
- 87 false
- 88 => 128 => 69 => false
- 89 => false
- 90 => false
- 91 => true ✅
- 92 : 93 => false
- 94 true ✅
- 95 : 96 => false
- 97 => true ✅
- 98 => false
- 99 => 162 => 39 => false

#### Results

**Happy Numbers:** 1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100

I cannot find a relation between them

I am thinking of defining an object called `happy` with all happy numbers (less than or equal to 100) as keys. If the number is less than or equals 100, look at this map. Otherwise, find the sum

## Possible Approach: Reference Object

1. Create a new object / hash map `happyMap` and store all the numbers found as keys, with values are set into true
2. If the number is less than or equals 100:
   1. Retrieve the equivalent boolean from the map (if the number is in the map => true. False otherwise)
3. Otherwise:
   1. Calculate the sum of the squared digits
   2. Return a call to the same function with the new calculated value

### Analyzing my Code

- Time Complexity: **O(log n)**
- Space Complexity: **O(1)**

### LeetCode Score: Beats 99.77% Time, Beats 91.18% Memory
