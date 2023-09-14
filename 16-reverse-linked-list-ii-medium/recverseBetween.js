/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = val === undefined ? 0 : val;
 * this.next = next === undefined ? null : next;
}
 */

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

let reverseBetween = function (head, left, right) {
  let result = head;
  let start = head;
  let i = 1;
  while (i < left - 1) {
    start = start.next;
    i++;
  }
  // i = left - 1, start = node before left
  let middle;
  if (left === 1) {
    middle = start;
    start = null;
  } else {
    middle = start.next;
    start.next = null;
  }
  i = left;
  let previous = null;
  let current = middle;
  let next;
  let firstReversedNode;

  while (i <= right) {
    next = current.next;
    current.next = previous;
    if (i === left) firstReversedNode = current;
    previous = current;
    current = next;
    i++;
  }
  if (firstReversedNode) firstReversedNode.next = next;

  if (left > 1) start.next = previous;
  else start = previous;

  if (left === 1) return previous;
  return result;
};
