/**
 * @param {number} n
 * @return {boolean}
 */

let happyMap = new Map();
happyMap
  .set(1, true)
  .set(7, true)
  .set(10, true)
  .set(13, true)
  .set(19, true)
  .set(23, true)
  .set(28, true)
  .set(31, true)
  .set(32, true)
  .set(44, true)
  .set(49, true)
  .set(68, true)
  .set(70, true)
  .set(79, true)
  .set(82, true)
  .set(86, true)
  .set(91, true)
  .set(94, true)
  .set(97, true)
  .set(100, true);

let isHappy = (n) => {
  if (+n <= 100) return !!happyMap.get(n);
  else {
    let nStr = n.toString();
    n = 0;
    for (let d of nStr) n += (+d) ** 2;
    return isHappy(n);
  }
};

console.log(isHappy(19));
