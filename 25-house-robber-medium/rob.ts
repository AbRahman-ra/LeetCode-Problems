/**
 * [1, 0, 8, 12, 14, 6, 9, 2]
 * maxSum(1, 0)
 * = maxSum(1 + maxSum(8, 12), 0 + maxSum(12, 14))
 * = maxSum(1 + maxSum(8 + maxSum(14, 6), 12 + maxSum(6, 9)), 0 + maxSum(12 + maxSum(6, 9), 14 + maxSum(9, 2)))
 * = maxSum(1 + maxSum(8 + maxSum(14 + maxSum(9, 2), 6 + maxSum(2, undefined)), 12 + maxSum(6 + maxSum(2, undefined), 9)), 0 + maxSum(12 + maxSum(6, 9), 14 + maxSum(9, 2)))
 * = maxSum(1 + maxSum(8 + maxSum(14 + 9, 6 + 2), 12 + maxSum(6 + 2, 9)), 0 + maxSum(12 + maxSum(6, 9), 14 + 9))
 * = maxSum(1 + maxSum(8 + 23, 12 + 9), 0 + maxSum(12 + 9, 14 + 9))
 * = maxSum(1 + 31, 0 + 23)
 * = maxSum(32, 23)
 * => 32
 */

function rob(nums: number[]): number {
  let memo: { [key: string]: number } = {};
  function maxSum(index: number): number {
    if (memo[index] !== undefined) return memo[index];
    if (index >= nums.length) return 0;
    if (index === nums.length - 1) {
      memo[nums.length - 1] = nums[nums.length - 1];
      return nums[nums.length - 1];
    }
    if (nums[index] + maxSum(index + 2) > nums[index + 1] + maxSum(index + 3)) {
      memo[index] = nums[index] + maxSum(index + 2);
      return nums[index] + maxSum(index + 2);
    } else {
      memo[index + 1] = nums[index + 1] + maxSum(index + 3);
      return nums[index + 1] + maxSum(index + 3);
    }
  }
  return maxSum(0);
}
