/**
 * @param {string} s
 * @return {number}
 */

let lengthOfLastWord = function (s) {
  // Initialization
  let pE = s.length - 1,
    pS = pE;

  // Looping from the string end
  // While we haven't reach to the string start
  while (pS >= 0) {
    // If we have spaces at the end, go backwards
    if (s[pE] === " ") pE--;
    // Otherwise
    else {
      // If we have a space at the start pointer, break the loop;
      if (s[pS] === " ") break;
    }
    pS--;
  }

  return pE - pS;
};
