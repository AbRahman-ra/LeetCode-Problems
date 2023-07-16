let isPalindrome = function (s) {
  // Edge Cases
  if (s.length <= 1) return true;
  if (s.length === 2 && s[0] === s[1]) return true;

  // General Case
  // Set up the two pointers
  let pL = 0;
  let pR = s.length - 1;
  s = s.toLowerCase();

  // While the pointers are not at the middle of the string
  while (pL < pR) {
    // If the character at the left pointer is not alpha numeric => skip & restart the loop
    if (!isAlphaNumeric(s[pL])) {
      pL++;
      continue;
    }
    // If the character at the right pointer is not alpha numeric => skip & restart the loop
    if (!isAlphaNumeric(s[pR])) {
      pR--;
      continue;
    }

    // If the lowercased characters are not equal => return false
    if (s[pL] !== s[pR]) return false;

    // Increment the pointers
    pL++;
    pR--;
  }
  return true;
};

let isAlphaNumeric = (c) =>
  (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9");

console.log(isPalindrome("race a car"));
