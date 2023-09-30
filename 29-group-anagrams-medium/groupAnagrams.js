"use strict";
function groupAnagrams(strs) {
    let primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
        73, 79, 83, 89, 97, 101,
    ];
    let result = [];
    let strSums = [];
    for (let word of strs) {
        let sum = 1;
        for (let i = 0; i < word.length; i++) {
            sum *= primes[word.charCodeAt(i) - 97];
        }
        strSums.push(sum);
    }
    let c = 0;
    let ref = {};
    for (let j = 0; j < strSums.length; j++) {
        if (ref[strSums[j]] !== undefined) {
            result[ref[strSums[j]]].push(strs[j]);
        }
        else {
            ref[strSums[j]] = c;
            result[c] = [strs[j]];
            c++;
        }
    }
    return result;
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
