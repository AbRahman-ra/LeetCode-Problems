/**
 *
 * @param m number of grid rows
 * @param n number of grid columns
 * @returns number of possible ways to travel from top left to bottom right, knwoing that we are allowed to move either down or to the right only
 */
const gridTraveler = function (
  m: number,
  n: number,
  memo: { [key: string]: number } = {}
): number {
  let key = `${m},${n}`;
  let keyRev = `${n},${m}`;

  if (key in memo) return memo[key];
  if (keyRev in memo) return memo[keyRev];

  if (m === 1 || n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  memo[keyRev] = memo[key];
  return memo[key];
};

console.log(gridTraveler(3, 3));
