"use strict";
function jump(nums) {
    if (nums.length <= 2)
        return nums.length - 1;
    let count = 1;
    let i = 0;
    let m = nums[0];
    let iMax = 0;
    let max = nums[0];
    while (m < nums.length - 1 && i < nums.length) {
        if (i <= m) {
            iMax = i + nums[i] > iMax + max ? i : iMax;
            max = nums[iMax];
            i++;
        }
        else {
            m = iMax + max;
            count++;
        }
    }
    return count;
}
console.log(jump([2, 3, 1, 1, 4])); // 2
console.log(jump([2, 3, 0, 1, 4])); // 2
console.log(jump([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3])); // 2
console.log(jump([1, 1, 1, 1])); // 2
console.log(jump([1, 1, 2, 1, 1])); // 3
