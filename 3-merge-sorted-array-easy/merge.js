/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
let merge = (nums1, m, nums2, n) => {
  let p1 = m - 1,
    p2 = n - 1;

  // While both arrays don't end
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p1 + p2 + 1] = nums1[p1];
      p1--;
    } else {
      nums1[p1 + p2 + 1] = nums2[p2];
      p2--;
    }
  }

  // While array1 ends before array2
  while (p2 >= 0) {
    nums1[p2] = nums2[p2];
    p2--;
  }

  return nums1;
};
