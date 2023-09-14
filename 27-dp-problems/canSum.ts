const canSum = (
  target: number,
  numbers: number[],
  memo: { [target: number]: boolean } = {}
): boolean => {
  if (memo[target] !== undefined) return memo[target];
  if (target === 0) return true;
  if (target < 0) return false;

  for (let number of numbers) {
    memo[target] = canSum(target - number, numbers, memo);
    if (memo[target]) return true;
  }

  return false;
};

console.log(canSum(15, [3, 5, 10, 12]));
console.log(canSum(7, [5, 3, 4, 7]));
console.log(canSum(7, [2, 4]));
console.log(canSum(300, [7, 14]));
