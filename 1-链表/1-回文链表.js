/***
 * leetcode 234
 * 请判断一个链表是否为回文链表。
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */

 // 思路：遍历1遍，将数据存放在数组里 然后转换为判断数组的回文
function isPalindrome(head) {
    let arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    
    let i=0;
    let j=arr.length-1;
    while (i<=j) {
        if (arr[i] === arr[j]) {
            i++;
            j--;
        }
        else {
            return false;
        }
    }
    return true;
}