/**
 * @param {number[]} nums
 * @return {boolean}
 */

let canJump = function (nums) {
  let max = 0 + nums[0];
  if (max >= nums.length - 1) return true;
  let i = 1;

  while (i <= max) {
    if (nums[i] + i >= nums.length - 1) return true;
    if (nums[i] + i > max) max = nums[i] + i;
    i++;
  }
  return false;
};
