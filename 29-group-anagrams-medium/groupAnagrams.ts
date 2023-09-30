function groupAnagrams(strs: string[]): string[][] {
  let primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101,
  ];

  /* let products = [
    2, 6, 15, 28, 55, 78, 119, 152, 207, 290, 341, 444, 533, 602, 705, 848,
    1003, 1098, 1273, 1420, 1533, 1738, 1909, 2136, 2425, 2626,
  ]; */

  let result: string[][] = [];

  let strSums: number[] = [];

  for (let word of strs) {
    let sum = 1;
    for (let i = 0; i < word.length; i++) {
      sum *= primes[word.charCodeAt(i) - 97];
    }
    strSums.push(sum);
  }

  let c = 0;
  let ref: { [key: number]: number } = {};

  for (let j = 0; j < strSums.length; j++) {
    if (ref[strSums[j]] !== undefined) {
      result[ref[strSums[j]]].push(strs[j]);
    } else {
      ref[strSums[j]] = c;
      result[c] = [strs[j]];
      c++;
    }
  }

  return result;
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
