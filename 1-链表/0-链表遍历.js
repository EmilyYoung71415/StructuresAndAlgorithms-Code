/***
 * 链表遍历模板 兼具迭代和递归结构
 * 以单链表为例 （每个节点可以通过.next访问到下一个节点
 */

/* 基本的链表结点 */
function Node(data) {
    this.data = data;
    this.next = null;
}

// 迭代版
function traverse_tpl(head) {
    // for循环
    for (let p=head;p!=null;p=p.next) {
        // 访问p.data
    }

    // or while
    let p = head;
    while(p!=null) {
        // 访问p.data
        p = p.next;
    }
}

function traverse_tpl(head) {
    if (!head) return;
    // 访问p.data;
    traverse_tpl(head.next);
}

const {
    LinkedListF
} = require('../index');
// 链表可直接访问的结点head，头结点，从头结点开始通过.next访问结点元素
let list = new LinkedListF()
let arr = [3,4,1,2,6];
arr.forEach(item=>{
    list.add(item)
})
// list.printf()// 6—>2—>1—>4—>3—>NULL 实现p.printf()方法
traverse(list);
function traverse1(list){
    // 跳过无意义的头结点
    for(let p=list.head.next; p!=null; p=p.next) {
        console.log(p.data);
    }
}

function traverse2(list){
    // 跳过无意义的头结点
    let p = list.head.next;
    while(p!=null) {
        console.log(p.data);
        p = p.next;
    }
}

function traverse3(list){
    traversecall(list.head.next);
    function traversecall(head){
        if (head==null) return;
        console.log(head.data);
        traversecall(head.next);
    }
}
