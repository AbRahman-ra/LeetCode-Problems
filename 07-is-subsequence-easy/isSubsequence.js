/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

let isSubsequence = function (s, t) {
  let ps = 0,
    pt = ps;
  while (pt < t.length && ps < s.length) {
    if (t[pt] === s[ps]) ps++;
    pt++;
  }
  return ps === s.length;
};
