/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */

let canConstruct = (ransomNote, magazine) => {
  if (magazine.length < ransomNote.length) return false;

  let magazineObj = {},
    noteObj = {};

  for (let i in magazine) {
    if (i < ransomNote.length) {
      noteObj[ransomNote[i]] = (noteObj[ransomNote[i]] || 0) + 1;
    }
    magazineObj[magazine[i]] = (magazineObj[magazine[i]] || 0) + 1;
  }

  for (let letter in noteObj) {
    if (
      magazineObj[letter] === undefined ||
      magazineObj[letter] < noteObj[letter]
    )
      return false;
  }
  return true;
};
