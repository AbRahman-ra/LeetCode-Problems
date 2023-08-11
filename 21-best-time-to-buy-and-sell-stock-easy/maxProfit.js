"use strict";
function maxProfit(prices) {
    let max = 0;
    let current = 0;
    let iMin = 0;
    let i = 0;
    while (i < prices.length) {
        current = prices[i] - prices[iMin];
        if (prices[i] < prices[iMin])
            iMin = i;
        max = Math.max(current, max);
        i++;
    }
    return max;
}
console.log(maxProfit([2, 4, 1]));
