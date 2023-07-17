/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

let mergeTwoLists = (list1, list2) => {
  // If one list is empty, return the other list
  if (!list1) return list2;
  if (!list2) return list1;

  // General Case
  let result = new ListNode(0, null);
  let current = result;
  let p1 = list1,
    p2 = list2;

  // While both lists don't end
  while (p1 && p2) {
    if (p1.val < p2.val) {
      current.val = p1.val;
      current.next = new ListNode(0, null);
      p1 = p1.next;
    } else {
      current.val = p2.val;
      current.next = new ListNode(0, null);
      p2 = p2.next;
    }
    current = current.next;
  }

  // Add the rest of the list1 if there are any (if list2 ended before list1)
  while (p1) {
    current.val = p1.val;
    p1 = p1.next;
    current.next = p1 ? new ListNode(0, null) : null;
    current = current.next;
  }

  // Add the rest of the list2 if there are any (if list1 ended before list2)
  while (p2) {
    current.val = p2.val;
    p2 = p2.next;
    current.next = p2 ? new ListNode(0, null) : null;
    current = current.next;
  }

  return result;
};
