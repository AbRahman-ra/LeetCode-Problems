function longestConsecutive(nums: number[]): number {
  let count = 0;
  let current = 0;
  let numsSet = new Set(nums);

  for (let num of numsSet) {
    if (numsSet.has(+num - 1)) continue;
    else {
      current = 1;
      while (numsSet.has(+num + 1)) {
        current++;
        count = current >= count ? current : count;
        num++;
      }
      count = current >= count ? current : count;
    }
  }
  return count;
}
