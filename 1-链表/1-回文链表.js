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
    let len=arr.length;
    while (i<=Math.floor(len/2)) {
        if (arr[i] !== arr[len-1-i]) {
            return false;
        }
        i++;
    }
    return true;
}

// 思路2: 回文链表反转后，与原链表一致
// 实现2-1：生成新的链表-反转链表 ==> 但是有深拷贝的问题
// 实现2-2：借助双向链表思路，prev属性记录一个反向遍历
function isPalindrome(head) {
    let tail = head
    let prev = null
    while(tail) {
        tail.prev = prev
        prev = tail
        tail = tail.next
    }
    // prev指向链尾
    let temp = prev
    while(head) {
        if (head.val === temp.val) {
            head = head.next
            temp = temp.prev
        } 
        else {
            return false
        }
    }
    return true
}


// 递归版本
function isPalindrome(head) {
    let left = head;
    return traverse(head);

    function traverse(node) {
        if (node==null) return true;
        let prevIsSame = traverse(node.next);
        // 逆序输出code
        let currIsSame = left.val === node.val;
        left = left.next;// left通过这种方式向右，node通过弹栈的方式向左
        return prevIsSame && currIsSame;
    }
}