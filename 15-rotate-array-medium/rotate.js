/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

let rotate = function (nums, k) {
  let n = nums.length;
  k = k % n;
  if (k === 0) return;
  let pS = 0;
  let pE = pS + n - k;
  while (pS < pE) {
    if (pE < n) {
      [nums[pS], nums[pE]] = [nums[pE], nums[pS]];
      pS++;
      pE++;
    } else {
      k = k % (n - pS);
      pE = n - k;
      if (k === 0) break;
    }
  }
  return nums;
};
