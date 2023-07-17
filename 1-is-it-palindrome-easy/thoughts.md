# Is It Palindrome (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/valid-palindrome/)

## Question

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

---

## Examples

### Example 1

```{JS}
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2

```{JS}
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Example 3

```{JS}
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

---

## Constrains

```{JS}
1 <= s.length <= 2 * 1e5
s consists only of printable ASCII characters.
```

---

## Solution

### Insights

- We need to remove any character that's not (letters - numbers)
  - Example: spaces, special characters \_!@$%^&\*
- We need to lowercase any upper cased letters
- Check after that the palindromeness (let me say)

### Possible Approach: Two Pointers

- 2 pointers from both edges
- If character is upper cased => lower case it
- If character is not alphanumeric => skip the pointer
- If string length is 1, no matter the character is allowed or not, it's always palindrome
- If string length is 2 & both characters equal, no matter the character is allowed or not, it's always palindrome

Numbers ASCII code: from 48 to 57 (inclusive)

Capital letters ASCII code: from 65 to 90 (inclusive)

Small letters ASCII code: from 97 to 122 (inclusive)

.....48=====57.....65==========90.....97==========122.....

Range of `=` sign indicates allowed characters code

**WAIT! No need for all of this!!!**

### Refine Our Thinking

- While left pointer is always before the right pointer
- If character at left pointer has a code between 65 & 90 => lower case it
- If character at right pointer has a code between 65 & 90 => lower case it

#### Note

This approach is logical, but it's not correct 100%, what if we have multiple non-alphanumeric sequent characters?

- It's better to deal with `continue` statements, to restart the loop and the entire checking process.

---

### Possible Approach: Refined

No need for using ASCII codes, because JS supports something intuitive like this:

```{JS}
"z" > "a"; // true
```

For simplicity, let's refine our approach more & more:

1. Accept a string
2. Set up 2 pointers at the beginning & end of the string
3. The pointers will shrink after each loop iteration, and will stop once they interfere
4. While the pointers don't interfere (left pointer < right pointer) => do the following
   1. If the character (at any of both pointers) is not alpha numeric => skip it & restart the loop
      - Why restart the loop? [here](#note)
   2. If the lowercased characters at both pointers are not equal => false
   3. If you finished the whole while loop without violating `2` => it's a valid palindrome => return true

---

### Analyzing my Code

- The code has a time complexity O(n/2) which simplifies to O(n), and a space complexity of O(1)
- I used arrow functions in both functions `isPalindrome` and `isAlphaNumeric` instead of regular function expression, because they consume less memory (they have no `prototype` object or their own `this` keyword, which we will not use here or at any potential use for this function in the future 🤔)

### LeetCode Score: Beats 88.70% Time, Beats 76.79% Memory
