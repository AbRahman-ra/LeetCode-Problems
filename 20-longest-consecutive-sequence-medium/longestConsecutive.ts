function longestConsecutive(nums: number[]): number {
  if (nums.length <= 1) return nums.length;
  let ref: { [value: number]: number } = {};
  for (let i = 0; i < nums.length; i++) ref[nums[i]] = i;
  let count = Object.keys(ref).length;
  for (let key in ref) {
    if (ref[+key - 1] === undefined) count--;
  }
  count++;
  return count;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])); // 7
