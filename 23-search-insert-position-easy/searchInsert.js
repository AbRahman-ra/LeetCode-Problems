"use strict";
function searchInsert(nums, target) {
  let sta = 0; // start
  let end = nums.length - 1; // end
  let mid = (sta + end) / 2 - ((sta + end) % 2) / 2; // middle
  while (sta < end) {
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      end = mid - 1;
      mid = (sta + end) / 2 - ((sta + end) % 2) / 2;
    } else {
      sta = mid + 1;
      mid = (sta + end) / 2 - ((sta + end) % 2) / 2;
    }
  }
  return nums[mid] >= target ? mid : ++mid;
}
