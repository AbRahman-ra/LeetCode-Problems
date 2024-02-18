<?php

/**
 * Uses The GON Algorithm to construct a number
 * @param int $dough The number we want to generate its GON
 * @return int $pizza The generated GON
 */
function bake(int $dough): int
{
    // 12345
    $pizza = $dough;
    $sum = 0;
    $slice = 0;

    while ($pizza)
    {
        $slice = $pizza%10;
        $sum += $slice;
        $pizza = ($pizza - $slice) / 10;
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

    $pizza = 0;
    $i = 0;
    $pureSum = $sum;
    $carryUp = 0;
    $yeastedDough = $dough;

    while($sum) {
        $pizza += $sum%10 * 10**$i; // 5 + 10 
        $pureSum = $pureSum - $yeastedDough%10; // 6
        $carryUp = ($sum - $sum%10) / 10; // 1
        $sum = $pureSum + $carryUp; // 7
        $yeastedDough = ($yeastedDough - $yeastedDough%10)/10; //123
        $i++;
    }

    return $pizza;
}

echo bake(12345)."\n";
echo bake(2345)."\n"; // 2604
echo bake(345)."\n"; // 382
echo bake(45)."\n"; // 49
echo bake(5)."\n"; // 5