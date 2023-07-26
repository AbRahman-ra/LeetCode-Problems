# Valid Parentheses (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/valid-parentheses/)

## Question

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

### Example 1

```ts
Input: s = "()";
Output: true;
```

### Example 2

```ts
Input: s = "()[]{}";
Output: true;
```

### Example 3

```ts
Input: s = "(]";
Output: false;
```

## Constraints

- `1 <= s.length <= 10e4`
- `s` consists of parentheses only `'()[]{}'`.

---

## Solution

### Insights

- If the length is 1 => false (edge case)
  - In general, if the length is odd => false
- This requires a stack
- We have opening parentheses `( [ {`, and closing ones `) ] }`
- I am thinking of the following scenario:
  - We walk through the string
  - When we find an opening parenthesis, we push it to the stack
  - Last pushed parenthesis is the first one closed, let's take an example:

```ts
Input: "([{[()]}])";

/*
Stack = []
Iterate
stack: ["(", "[", "{", "[", "("]
*/
```

Last one pushed is `"("`, and it's the first one closed => that's why we use a stack

If we found a closing parenthesis, we look for the last item in the stack, if it's its corresponding opening parenthesis => pop the opening form the stack. Otherwise return false

How to know the corresponding opening parenthesis to the closing one. We can define a reference object for that. The keys are the closing parenthesis, while the values are the opening parenthesis

If the current character is an opening parenthesis (not a key in the reference object), push it to the stack. If it's a closing parenthesis (a key in the object) => If the last value in the stack is same as the value of the key in the object => pop it off the stack, otherwise return false

### Possible Approach: Reference Object with a Stack

So, we still have not very clear vision, but here is what we've concluded so far

1. Define an empty stack
2. Define a reference object
3. If the current value is an opening parenthesis => push it to the stack
4. Otherwise => if the last value in the stack is NOT the corresponding opening parenthesis return false, otherwise pop it off the stack
5. Return true if you never returned false

We can refine our pseudo code as well as handling the edge cases in the next section

### Possible Approach (Refined): Reference Object with a Stack

Let's write a clearer pseudo code

1. If the length of the input string is odd => return false
2. Define a reference object `ref` with closing parenthesis as keys and corresponding opening parenthesis as values
3. Define a stack `stack` initialized to empty array
4. For every character in the given string, do:
   1. If the character is an opening parenthesis => push it to the stack
   2. Otherwise (it's a closing parenthesis):
      1. If the last item in the stack is NOT the corresponding opening parenthesis => return false
5. Return true (if the stack is empty)

---

## Analyzing the code

- Time Complexity: **O(n)**
- Space Complexity: **O(n)**
  - Maximum stack size is when we have all the string is opening parenthesis only `{{{{(((([[[[[[`

## LeetCode Score: Beats 99.88% Time ✅🚀, Beats 54.61% Space
