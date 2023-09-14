function maxProfit(prices: number[]): number {
  let max = 0;
  let s = 0; // Selling Pointer
  let b = 0; // Buying Pointer

  while (s < prices.length) {
    if (prices[s] <= prices[s - 1]) {
      max += prices[s - 1] - prices[b];
      b = s;
    } else if (s === prices.length - 1) max += prices[s] - prices[b];
    s++;
  }

  return max;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 7
console.log(maxProfit([1, 2, 3, 4, 5])); // 4
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([1, 3, 2])); // 2

export {};
