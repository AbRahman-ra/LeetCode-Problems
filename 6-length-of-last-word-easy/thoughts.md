# Length of Last Word (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/length-of-last-word/)

## Question

Given a string `s` consisting of words and spaces, return the length of the last word in the string.

**A word** is a maximal substring consisting of non-space characters only.

---

## Examples

### Example 1

```{JS}
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

### Example 2

```{JS}
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

### Example 3

```{JS}
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

---

## Constrains

```{js}
1 <= s.length <= 10e4
s consists of only English letters and spaces ' '.
There will be at least one word in s.
```

---

## Solution

### Insights

- From examples, I can see the problem is how to handle the too much consecutive spaces
- We may use a sliding window (not sure yet), it's very similar to 2 pointers approach
- We need to return the length of the last word, not the longest word
- Since we need to find the length of the last word, why don't we start from the last index (string end) to the first index (string beginning)? Seems very good approach to me

Let's test by our eyes without any code:

```js
let s = "   fly me   to   the moon  ";
```

So, it's moon and will return 4, we need to set an ending pointer `pE` and a start pointer `pS`, both pointers are set to the first non-spaced index (24 in the above example). The start pointer will decrement unless it hits a space.

The `m` letter's index in the above example is 21, so the length is `pE - pS + 1`, or we can adjust `pS` to stop at the first space (space before letter `m`), and by this the length will be `pE - pS`

So, we will stop once we hit a space, but what about the first spaces we will find (spaces after the word `moon`)? we don't want to quit before even reaching th the word itself! We want to check if we started a word or not

### Possible Approach: Two Pointers

- We need to set 2 pointers `pE` & `pS` with the last index in the string
- We need to set a boolean `wordFound` to be `false` by default
- If s[pE] is not a space, `wordfound = true`, else decrement both pointers
- If wordFound, fix pE & start counting
  - If current letter is not space, decrement pS, else break the loop
- Return `pE - pS + 1`

I believe this approach can be enhanced by trying to remove `wordFound` variable. Let's try again:

```js
let s = "   fly me   to   the moon  ";
let pE = s.length - 1,
  pS = pE;
/*
pE: 26, pS = 26 => s[pE] is a space ? YES => pE--, pS--
pE: 25, pS = 25 => s[pE] is a space ? YES => pE--, pS--
pE: 24, pS = 24 => s[pE] is a space ? NO => start counting, pS--
pE: 24, pS = 23 => s[pS] is a space ? NO => pS--
pE: 24, pS = 22 => s[pS] is a space ? NO => pS--
pE: 24, pS = 21 => s[pS] is a space ? NO => pS--
pE: 24, pS = 20 => s[pS] is a space ? YES => exit
return pE - pS => 4
*/
```

The logic is acceptable, and it seems we can get rid of `wordFound` and save memory, we can arrange our steps in something like:

1. Define 2 pointers `pE` & `pS` that both equals the last index in `s`
2. While we didn't reach to the string first index, do:
   1. If `s[pE]` is a space, decrement pE and pS
   2. Otherwise:
      1. if `s[pS]` is NOT a space, decrement pS
      2. Otherwise break the loop
3. Return `pE - pS`

Since we will decrement pS in all cases, we can set it out of the if condition

### Possible Approach (Refined): Two Pointers

Let's try to write an efficient and clean pseudo code for the test we did above

1. Define 2 pointers `pE` & `pS` that both equals the last index in `s`
2. While we didn't reach to the string first index, do:
   1. If `s[pE]` is a space, decrement pE
   2. Otherwise if `s[pS]` is a space, break the loop
   3. Decrement pS
3. Return `pE - pS`

### Analyzing my Code

- Time Complexity: **O(n)**
- Space Complexity: **O(1)**

### LeetCode Score: Beats 91.34% Time, Beats 95.99% Memory
