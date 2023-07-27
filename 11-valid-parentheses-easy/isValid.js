/**
 * @param {string} s
 * @return {boolean}
 */

let isValid = (s) => {
  // Initialization
  let ref = { ")": "(", "]": "[", "}": "{" };
  let stack = [];

  // For every character in the input string
  for (let char of s) {
    // If the current character is an opening parenthesis => push it to the stack
    if (!ref[char]) stack.push(char);
    // Otherwise, if the current character's corresponding opening parenthesis is not the last item in the stack => return false
    else if (ref[char] !== stack.pop()) return false;
  }
  // If the stack is not empty => return false
  return stack.length === 0;
};