# Reverse Bits (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/reverse-bits/)

## Question

Reverse bits of a given 32 bits **unsigned integer**.

**Note:**

- Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
- In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.

---

## Examples

### Example 1

```ts
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
```

### Example 2

```ts
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
```

---

## Constraints

- The input must be a binary string of length 32

## Follow up: If this function is called many times, how would you optimize it?

---

## Solution

### Insights

- I studied how to convert a binary into a decimal. Let me just clarify to myself (and you) the story of signed & unsigned integers:

- The idea is: we have 32 bits, 0, 1, 10, 11, 100, 101, 110, 111, 1000, etc... Up to 111111....11111 (32 digits)
- The unsigned integer counts 1111...1111 as 2^31 + 2^30 + ... + 2^1 + 2^0 which seems completely making sense, in other words the range is from 0 to 2^31 + 2^30 + ... + 2^1 + 1
- The signed integer counts from 0 till the half of the above range (call it x), then after this half, it will be -x then -(x-1) and -(x-2) down to -1
- The range in unsigned integer is from 0 to 2x, while in signed one is from -x to x

- Since the input is always 32 bits, we can make this in 1 easy operation, let's test it out...

```js
x = 10010;
output = 1*(2**0) + 0*(2**1) + 0*(2**2) + 1*(2**3) + 0*(2**4) = 9
```

- So, we can skip the zeros for a faster response

We can have another approach, and it will be useful if we have `1` more than `0`

- to have 2x as a reference 11111....11111 (4294967295)
- we'll pass on our number, if we found a zero we'll subtract it from the reference number and return the modified number in the end

Let me elaborate both concepts in the upcoming section

## Possible Approach 1: Manual Passing (Refined)

Seems easy, intuitive and straight forward

```js
x = 10010;
output = 2**0 + 2**3 => 18
```

Apply it to a 32 length bit

```js
x = 10010 => x = 00000000000000000000000000010010
output = 2**27 + 2**30 = 1207959552
```

## Possible Approach 2: Reference Number

```js
ref = 4294967295;
x = 10010 => 00000000000000000000000000010010
output = ref - 2**0 - 2**1 - 2**2 - 2**3 - ... - 2**26 - 2**28 - 2**29 - 2**31 = 1207959552
1207959552 is the integer of the reversed x which is 01001000000000000000000000000000
```

The logic is correct, but it really depend on the test cases, I would go for the second by gut feeling (I feel there will be lots of 1 and less 0s, but it really depend)

---

## Approach 1: Implementation

1. Define an iterator `i = 0`, and a resultant `result = 0`
2. While `i` didn't pass all digits, do:
   1. If the current digit is 1, add 2^[digit's index] to the result
3. Return the result

## Approach 2: Implementation

1. Define an iterator `i = 0`, and a reference `ref = 4294967295`
2. While `i` didn't pass all digits, do:
   1. If the current digit is 0, subtract 2^[digit's index] from the reference
3. Return the reference

## EDIT

The approach is logically correct, the problem is, if we have leading zeros `00000001000100101`, they will be ignored, and it will be read `1000100101`, so we need a way to compensate the lost zeros because either approach they will significantly affect the result

We might be interested in counting from behind not from the beginning, and end once our iterator finished 0. If the iterator can't find the digit, we'll compensate it with a zero.

We cannot define `i` directly to be 32, because I n.length might be less tan 32, and then `n[i]` get out of bounds. But we know the loop will do 32 operations, so if it started at i = n.length, it must end at i = n.length - 32. This will raise another good question, what if i is negative? Here we set a condition to compensate the value at the negative index to be 0.

I noticed, we can even follow the same approach counting from the beginning forwards. Let's refactor the pseudo codes.

### Approach 1

1. Define an iterator `i = n.length - 32`, and a resultant `result = 0`
2. While `i` didn't pass all digits, do:
   1. If the current digit is 1, add 2^[digit's index] to the result
3. Return the result

### Approach 2

1. Define an iterator `i = n.length - 32`, and a reference `ref = 4294967295`
2. While `i` didn't pass all digits, do:
   1. If the current digit is 0 or `undefined`, subtract 2^[digit's index counted from 0] from the reference
3. Return the reference

In step 2: How to shift i from `n.length - 32` to 0? You guessed it, Let's take an example 😁

i = [-3, -2, ..., 28] => [0, 1, 2, ..., 31]

We notice that 31 (corrected last index) - 28 (actual last index) is 3, if we increment both sides by 1, we got `32 - 29` => which is the difference between corrected length and actual length, we'll call it delta

To shift i to start from 0, add delta to it => i + delta = i + 32 - n.length

## EDIT AGAIN

It seems it's harder than what I thought, I need to watch videos on bit manipulation, the logic is correct but the number will be shorthanded to the scientific notation 1.10101110001e+11, which ruins everything because programming languages don't hold large numbers correctly
