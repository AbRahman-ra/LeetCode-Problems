/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

// Normal Solution
let containsNearbyDuplicate1 = (nums, k) => {
  // Initialization
  let ref = new Map();

  for (let i in nums) {
    // If nums[i] exists in ref and i - `stored i` <= k, return true
    if (ref.has(nums[i]) && i - ref.get(nums[i]) <= k) return true;
    // Otherwise (if nums[i] DNE in ref or difference > k) store the current index
    ref.set(nums[i], i);
  }

  return false;
};

// Same logic, Better space complexity
let containsNearbyDuplicate = (nums, k) => {
  // Initialization
  let ref = new Set();

  for (let i = 0; i < nums.length; i++) {
    // The set is bigger than k => delete the old index number
    if (ref.size > k) ref.delete(nums[i - k - 1]);
    // If the set has the number & size less than k => return true
    if (ref.has(nums[i])) return true;

    ref.add(nums[i]);
  }

  return false;
};
