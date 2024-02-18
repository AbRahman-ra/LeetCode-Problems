"use strict";
/**
 * Uses The GON Algorithm to construct a number
 * @param dough The number we want to generate its GON
 * @return pizza The generated GON
 */
function bake(dough) {
    // 12345
    let pizza = dough, sum = 0, slice = 0;
    while (pizza) {
        slice = pizza % 10;
        sum += slice;
        pizza = (pizza - slice) / 10;
    }
    /**
    * __11_
    * 12345
    * 1 + 2 + 3 + 4 + 5 = 15
    * ____5 & carry up 1
    * ___15 & carry up 1
    * __715
    * _3715
    * 13715
    *
    * pizza = 15%10
    * sum = (15 - 5) + (15 - 15%10)/10 => 11
    * sum = (sum - last place in number) + (all numbers before units place in sum)
    * pizza = (sum%10)*(10**i)+pizza
    * sum = (11 - 4) + 1 = 8
    */
    pizza = 0;
    let i = 0, pureSum = sum, carryUp = 0, yeastedDough = dough;
    while (sum) {
        pizza += sum % 10 * 10 ** i; // 5 + 10 
        pureSum = pureSum - yeastedDough % 10; // 6
        carryUp = (sum - sum % 10) / 10; // 1
        sum = pureSum + carryUp; // 7
        yeastedDough = (yeastedDough - yeastedDough % 10) / 10; //123
        i++;
    }
    return pizza;
}
console.log(bake(12345));
console.log(bake(2345)); // 2604
console.log(bake(345)); // 382
console.log(bake(45)); // 49
console.log(bake(5)); // 5
