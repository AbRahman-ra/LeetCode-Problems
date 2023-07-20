/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

let removeElement = (nums, val) => {
  let pL = 0,
    pR = nums.length - 1;

  while (pL <= pR) {
    if (nums[pL] === val) {
      [nums[pL], nums[pR]] = [nums[pR], nums[pL]];
      pR--;
    } else pL++;
  }

  if (nums[pL] !== val) pL++;

  return pL;
};
