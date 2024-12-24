export function findFirstOccurance(nums: number[], target: number) {    
    let start = 0;
    let end = nums.length - 1;

    if (nums[end] < target || nums[start] > target) return -1;
    
    // floor the middle
    let first = ((start + end) - ((start + end) % 2)) / 2;
    
    while (start < end) {
        if (nums[first] > target) end = first - 1;
        else if (nums[first] < target) start = first + 1;
        else end = first
        
        first = ((start + end) - ((start + end) % 2)) / 2;
    }

    return nums[first] === target ? first : -1;
}


function findLastOccurance(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    
    if (nums[end] < target || nums[start] > target) return -1;
    
    // ceil the middle
    let last = ((start + end) + ((start + end) % 2)) / 2;
    
    while (start < end) {
        if (nums[last] > target) end = last - 1;
        else if (nums[last] < target) start = last + 1;
        else start = last
        
        last = ((start + end) + ((start + end) % 2)) / 2;
    }
    
    return nums[last] === target ? last : -1;
 }


function searchRange(nums, target) {
    return [findFirstOccurance(nums, target), findLastOccurance(nums, target)];
};