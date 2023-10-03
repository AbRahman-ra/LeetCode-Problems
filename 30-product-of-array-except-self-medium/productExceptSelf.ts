function productExceptSelf(nums: number[]): number[] {
  let result: number[] = [];

  // Make it work first

  /*
  let products: number[] = [],
    pro = 1;
  for (let n of nums) {
    pro *= n;
    products.push(pro);
  }

  pro = 1;

  let productsRev = new Array(nums.length).fill(1);

  for (let i = nums.length - 1; i >= 0; i--) {
    pro *= nums[i];
    productsRev[i] = pro;
  }

  result.push(productsRev[1]);
  for (let i = 1; i < nums.length - 1; i++) {
    result.push(products[i - 1] * productsRev[i + 1]);
  }
  result.push(products[nums.length - 2]);
  */

  // Make it efficient
  result.push(1);
  for (let i = 1; i < nums.length; i++) {
    result.push(nums[i - 1] * result[i - 1]);
  }

  let pro = 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    pro *= nums[i + 1];
    result[i] *= pro;
  }
  return result;
}

console.log(productExceptSelf([-1, 1, 0, -3, 3]));
console.log(productExceptSelf([1, 2, 3, 4]));

/**
 * [1, 2, 3, 4] => [24, 12, 8, 6]
 * [1, 1, 2, 6]
 * [24, 12, 8, 6]
 * [1, 2, 6, 24]
 * [24, 24, 12, 4]
 */
