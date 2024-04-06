# Merge Two Sorted Lists (Easy)

## [Problem on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)

## Question

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

---

## Examples

### Example 1

```{JS}
Input: list1 = [1, 2, 4]; list2 = [1, 3, 4];
Output: [1, 1, 2, 3, 4, 4]
```

### Example 2

```{JS}
Input: list1 = []; list2 = [];
Output: []
```

### Example 3

```{JS}
Input: list1 = []; list2 = [0];
Output: [0]
```

---

## Constrains

- The number of nodes in both lists is in the range [0, 50].
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in non-decreasing order.

---

## Definition of LL in JS

```{JS}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
```

---

## Solution

### Insights

- We need make a new resultant list which has a length of sum of the two lists' lengths
- We need to make two pointers walking on both lists
- If the value of `list1` is smaller => insert it to the resultant list and increment its pointer
- Otherwise, insert the value of `list2` and increment its pointer

Possible scenario: What if one list finishes before the other?

### Example

```{JS}
list1 = [1, 2, 3]
list2 = [4, 5, 6]
output: 1 => 2 => 3 => 4 => 5 => 6
//               end1           end2
```

### More Complex Example

```{JS}
list1 = [2, 4]
list2 = [3, 5, 6]
output: 2 => 3 => 4 => 5 => 6
//               end1      end2
```

When one list ends, its next will be automatically null

### **Possible idea:**

Continue iterating and if you have a value it will be merged to the list because any value will be still > null

### **EDIT: WRONG IDEA!!!**

BECAUSE NULL == 0, WHAT IF WE HAVE A POSITIVE VALUE IN THE OTHER LIST? NULL WILL BE PLACED FIRST SINCE IT'S SMALLER

- By this, we will need to stop when both lists end (i.e both nexts === null)

### **Another Possible Idea:**

We will loop for the 2 lists as long as both doesn't finish, if one finishes, we will put all the items of the other in the resultant list without thinking, this will solve the problem of null (end of one list) < current value in other list

### Edge cases

- If one list is already empty: return the other list
- If both lists are empty: return null

---

### Possible Approach (Refined): Two Pointers

1. Check for edge cases
2. Define a resultant LL `result = empty list`
3. Define a current node `current` that refers to `result`'s current node
4. Define 2 pointers: `p1 = list1`, `p2 = list2`;
5. While no list ended, do:
   1. If `p1.value < p2.value` => insert `p1` in `result` (or `current` since they are pointing to the same thing), increment `p1`
   2. Else => insert `p2` in result, increment `p2`
   3. In both cases, increment `current` to be at the next node
6. The loop will break once any list finishes => identify the unfinished list (The list whose pointer is not null)
7. While unfinished list still unfinished
   1. Insert its value to `current`
   2. Increment its pointer
   3. If the list is not finished => increment `current`
8. Return `result`

---

### Analyzing my Code

- The code has a time and a space complexity of O(m+n) where `m` & `n` are the lengths of the 2 lists. Since this code can no more be optimized in terms of complexities, I played on small details:
  - Used arrow functions (consume less memory)
  - More comparisons (conditions) than operations (less time)

### LeetCode Score: Beats 99.00% Time, Beats 84.22% Memory
