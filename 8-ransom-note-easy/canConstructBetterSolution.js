/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */

let canConstruct = (ransomNote, magazine) => {
  let map = {};

  for (let letter of magazine) {
    map[letter] = (map[letter] || 0) + 1;
  }

  for (let letter of ransomNote) {
    if (map[letter] <= 0 || !map[letter]) return false;
    map[letter]--;
  }

  return true;
};

console.log(!-2);
