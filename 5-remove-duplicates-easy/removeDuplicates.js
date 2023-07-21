/**
 * @param {number[]} nums
 * @return {number}
 */

let removeDuplicates = function (nums) {
  // Initialization
  let pL = 0,
    pR = 1;

  // While we haven't reach to the array end
  while (pR < nums.length) {
    if (nums[pR] > nums[pL]) {
      pL++;
      [nums[pL], nums[pR]] = [nums[pR], nums[pL]];
    }
    pR++;
  }
  return ++pL;
};
