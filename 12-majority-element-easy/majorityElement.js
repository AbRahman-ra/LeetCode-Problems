/**
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = (nums) => {
  // If the length is 2 or less => return the first element directly
  if (nums.length <= 2) return nums[0];

  // Initialization of counter and candidate
  let counter = 1,
    candidate = nums[0];

  //starting from the second item
  for (let i = 1; i < nums.length; i++) {
    // If the current item = the candidate => increment
    if (nums[i] === candidate) counter++;
    // Otherwise, decrement and check if the decremented counter = 0 => set the candidate to the current element
    else {
      counter--;
      if (counter === 0) {
        candidate = nums[i];
        counter = 1;
      }
    }
  }

  return candidate;
};
