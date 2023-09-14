let longestCommonPrefix = function (strs: string[]): string {
  let result = strs[0];
  let i = result.length - 1;
  let k = 1;
  let p = i;
  while (p >= 0) {
    if (k < strs.length) {
      if (result[p] !== strs[k][p]) i = p - 1;
      if (i === -1) return "";
      k++;
    } else {
      p--;
      k = 1;
    }
  }
  result = result.slice(0, i + 1);
  return result;
};
