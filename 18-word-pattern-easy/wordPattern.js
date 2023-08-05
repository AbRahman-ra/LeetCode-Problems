/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

let wordPattern = function (pattern, s) {
  let pW = 0;
  let pP = 0;
  let result = "";
  let ref = new Map();
  let set = new Set();
  while (pP <= pattern.length) {
    if (s[pW] !== " " && s[pW] !== undefined) result += s[pW];
    else {
      if (!ref.has(pattern[pP])) ref.set(pattern[pP], result);
      else if (ref.get(pattern[pP]) !== result) return false;
      set.add(result);
      result = "";
      pP++;
    }
    pW++;
  }
  return set.size === ref.size;
};
