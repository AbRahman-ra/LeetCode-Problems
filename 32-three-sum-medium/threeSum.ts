const twoSum = (numsArr: Array<number>, target: number, i: number): Array<number> => {
  // Initialization
  let map = new Map();
  
  for(let j = i; j < numsArr.length; j++) {
    let comp = target - numsArr[j];
    
    // If complementary element in map, return element & complementary
    if (map.has(comp)) {
      map.set(target, map);
      return comp > numsArr[j] 
      ? [numsArr[j], comp]
      : [comp, numsArr[j]];
    }
    // Else, store element in map
    else map.set(numsArr[j], j);
  }

  // No elements whose sum is = target
  return [];
}; 


function threeSum(nums: number[]): number[][] {
  let memo = new Map();
  // loop over the elements
  // fix first pointer
  // two sum rest of the array with target = -first pointer element
  // if two sum != []
  // push first pointer element to the result, 
  // then push it again to the 3 sum result, 
  // then increment the first pointer
    
  for (let i = 0; i < nums.length - 1; i++) { // i is first pointer
    // Get 2 sum
    let result = twoSum(nums, -nums[i], i + 1);
    
    if (result.length) {
      // Sort the triplet
      if(nums[i] > result[1]) result.push(nums[i]);
      else if (nums[i] < result[0]) result.unshift(nums[i]);
      else result = [result[0], nums[i], result[1]];

      if (memo.has(`${result}`)) {
        memo.set(`${result}`, true);
      }
      console.log(memo);
    }
    // get target from memo
    // memo will be target: twoSumMap => is twoSumMap same as the one in the result
    // Same solution (repetition)
  }

  let resultArray: number[][] = [];
  for (let key in memo) {
    resultArray.push(key);
  }

  return resultArray;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(memo);