let memo = new Map();

const twoSum = (numsArr: Array<number>, target: number, i: number): Array<number> => {
  // Initialization
  let map = new Map();
  
  for(let j = i; j < numsArr.length; j++) {
    let comp = target - numsArr[j];
    
    // If complementary element in map, return element & complementary
    if (map.has(comp)) {
      memo.set(target, map);
      // console.log(memo);
      return [comp, numsArr[j]];
    }
    // Else, store element in map
    else map.set(numsArr[j], j);
  }

  // No elements whose sum is = target
  return [];
}; 


function threeSum(nums: number[]): number[][] {
  // loop over the elements
  // fix first pointer
  // two sum rest of the array with target = -first pointer element
  // if two sum != []
  // push first pointer element to the result, 
  // then push it again to the 3 sum result, 
  // then increment the first pointer
  
  let result: number[][] = [];
  
  for (let i = 0; i < nums.length - 1; i++) { // i is first pointer
    // Get 2 sum
    let twoSumResult = twoSum(nums, -nums[i], i + 1);
    console.log(twoSumResult);
    // get target from memo
    // memo will be target: twoSumMap => is twoSumMap same as the one in the result
    // Same solution (repetition)
    
    
  }
  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(memo);