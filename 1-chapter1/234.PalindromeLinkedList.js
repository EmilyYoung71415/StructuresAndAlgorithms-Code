/******************************************

回文链表
请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true

要求：
O(n)复杂度

******************************************/

/******
 * 思路：
 *  1、数组 + 双指针
 *  由于链表无法反向索引，所以将链表先转换为 数组（value值
 *  一个头指针一个尾指针，同时向中间靠齐，每次判断指针所指的是否相等
 *  2、栈结构依次弹出与遍历当前链表对比
 *     ==-> 链表右半部分压入栈、检查栈顶到栈底的元素与链表左半部分的是否一致
 *  3、降低空间复杂度的方法?
 */

 function isPalindrome(head){
    let list = [];
    while(head){
        list.push(head.val)
        head = head.next;
    }
    let lIndex = 0,
        rIndex = list.length-1;
    while(lIndex<rIndex){
        if(list[lIndex]!=list[rIndex]){
            return false;
        }
        lIndex++;
        rIndex--;
    }
    return true
 }