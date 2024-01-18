/****
 * 思路：
 * 遍历访问的时候，如果后面一个元素不等于前面的元素，将该非重复元素移动到最新xx位不含重复元素的有序数组里
 * 如果是等于前面的元素，则不管，直至遍历到末尾，
 * 然后修改原数组的长度为最新不含重复元素的有序数组的长度 (arr.length = x) 相当于只保留前x-1个元素
 * 
 * 即插入排序的思想
 * 需要两个指针，i指向不含重复元素的数组末尾，j为原数组遍历元素
 *                                                                                                                            
 */
unionSet([1,2,2,4]);
function unionSet(arr) {
    if (!arr || !arr.length) return;

    // for (let i=0,j=1,len=arr.length;j<len;j++) {
    //     if (arr[j] !== arr[i]) {
    //         arr[++i] = arr[j];
    //     }
    //     if (j===len-1) {
    //         arr.length = i+1;
    //     }
    // }
    let slow = 0;
    let fast = 1;
    while (fast < arr.length) {
        if(arr[slow] !== arr[fast]) {
            arr[++slow] = arr[fast];
        }
        fast++;
    }
    arr.length = slow+1;
}

// 扩展： 如果是无序数组，时间复杂度为O(N)要求，求解决方案？ ==> hash表

// 扩展：有序链表去重
function deleteDulplicates(head) {
    if (head==null) return;

    let slow = head;
    let fast = head.next;

    while (fast) {
        if (fast.val !== slow.val) {
            // arr[++slow] = arr[fast]
            slow.next = fast;
            slow = slow.next;
        }
        fast = fast.next;
    }
    slow.next = null;
}