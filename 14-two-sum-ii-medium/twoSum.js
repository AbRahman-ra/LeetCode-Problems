/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

let twoSum = function (numbers, target) {
  let pS = 0,
    pE = numbers.length - 1;
  while (pS < pE) {
    if (numbers[pS] + numbers[pE] === target) return [pS + 1, pE + 1];
    else if (numbers[pS] + numbers[pE] > target) pE--;
    else pS++;
  }
};
