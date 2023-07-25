/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */

// First Approach

// Second Approach
let reverseBits = function (n) {
  // n = `${n}`;
  let ref = 4294967295;
  let i = n.length - 32;

  while (i < n.length) {
    if (!+n[i]) ref -= 2 ** (i + 32 - n.length);
    i++;
  }

  return ref;
};

let n = 11111111111111111111111111111111;

console.log(n);
