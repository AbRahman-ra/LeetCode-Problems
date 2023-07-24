# Ransom Note (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/ransom-note/)

## Question

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

---

## Examples

### Example 1

```ts
Input: (ransomNote = "a"), (magazine = "b");
Output: false;
```

### Example 2

```ts
Input: (ransomNote = "aa"), (magazine = "ab");
Output: false;
```

### Example 3

```ts
Input: (ransomNote = "aa"), (magazine = "aab");
Output: true;
```

---

## Constrains

- `1 <= ransomNote.length, magazine.length <= 10e5`
- `ransomNote` and `magazine` consist of lowercase English letters.

---

## Solution

### Insights

- I believe we can use a frequency counter object, but I wonder if we can do it with less space

So, what would we do without a code?

- We look at the magazine, and extract its letter and validate how many are in the note:

```js
magazine = "aab";
note = "abc";

// we have a in both => extra a in magazine => b in both => no c => false
```

- But this is not so practical, imagine both magazine and note are not ordered

```js
magazine = "uacbdr";
note = "crud";
// note has c, magazine ? yes => note has r, magazine ? yes, note has u, magazine ? yes => note has d, magazine ? yes => true
```

This approach will cost us to look in the entire word looking for one single letter, which make it worse

what about putting all the characters of both in 2 columns (sets), and match them together

- (c r u d) ||| (u a c b d r)
- (**c** r u d) ||| (u a **c** b d r)
- (**c** **r** u d) ||| (u a **c** b d **r**)
- (**c** **r** **u** d) ||| (**u** a **c** b d **r**)
- (**c** **r** **u** **d**) ||| (**u** a **c** b **d** **r**)

This may seem very similar to the first insight, but the main difference here that we don't start the comparison unless we finish putting all letters of both words

### Possible Approach: Frequency Counter Object

This `spread` that is to be done after passing both words is actually nothing but storing both objects' characters in an object. In the end, I don't recall any approach better than this.

Make 2 objects `magazineObj` & `noteObj`, store letter as a key and it's count as a value. If `noteObj` letters' count is less than or equal the count in `magazineObj` => we're fine

There is an edge case not to forget, if the length of magazine is less than the length of note => return false. Since eac letter in magazine is allowed to appear once.

---

### Possible Approach (Refined): Frequency Counter Object

We can simplify our ideas in the following pseudo code:

1. If the magazine length is less than the note length => return false
2. Define 2 comparison Objects `magazineObj` and `noteObj` as empty objects
3. While magazine doesn't, do:
   1. If the current character exist in its corresponding object, increment it by 1
   2. Otherwise set it to 1
4. Loop over the `noteObj` keys
   1. If the key's count is greater than `magazineObj` corresponding key count, return false
5. Return true

---

### Analyzing my Code

- Time Complexity: **O(n)** where n is the length of `magazine`
- Space Complexity: **O(n+m)**

Well, My code ranked really really bad on LC, that's why we have this documentation

### LeetCode Score: Beats 41.3% Time, Beats 52.88% Memory

---

## Better Solution (Attached)

Instead of creating two objects, create only one. Fill it with the values of magazine, then loop over the note, once you find the letter in the object, subtruct 1 from its count. Else (if the count is less than 0 or undefined) return false
