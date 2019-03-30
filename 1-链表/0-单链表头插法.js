/***
 * 链表有个头节点，
 * add-插入:
 *      新来的节点都放在头结点的next位置。
 *      所以建立的链表顺序是反序的
 * getItemByNum按序号查找节点
 * getItem按值查找节点
 * removeAt删除节点：删除第i个节点
 *      特殊删除：假如让直接删除节点p
 *      remove(node){
 *          //当前节点着下一个节点的值
 *          node.data = node.next.data
 *          // 删除下个节点
 *          node.next = node.next.next;
 *      }
 */

function Node(data){
    this.data = data;
    this.next = null;
}

class LinkedListF{
    constructor(){
        this.head = new Node();// 一个空值的头结点
    }
    add(x){
        let p = new Node(x);
        p.next  = this.head.next;
        this.head.next = p;
    }
    // 从1开始计数
    getItemByNum(index){
        let j = 1;
        let p = this.head.next;// 第一个节点
        if(index==0) return this.head;//返回头结点
        if(index < 1||index==null) throw new Error('没有这样的节点');
        while(p&&j<index){
            p = p.next;
            j++
        }
        return p;
    }
    getItem(item){
        let p = this.head.next;
        while(p&&p.data!=item){
            p = p.next
        }
        return p;
    }
    insertAt(x,index){//将节点插入链表的第i位置
        let  p = this.getItemByNum(index-1);
        let newNode = new Node(x);
        newNode.next = p.next;
        p.next = newNode;
    }
    removeAt(index){
        // 找到index前面的那个节点
        let p = this.getItemByNum(index-1);
        p.next = p.next.next
    }
    printf(){
        let p = this.head.next;
        let str = '';
        while(p){
            str += `${p.data}—>`;
            p = p.next;
        }
        str += 'NULL'
        console.log(str)
    }
}
/*
let p = new LinkedListF()
let arr = [3,4,1,2,6];
arr.forEach(item=>{
    p.add(item)
})
p.printf()// 6—>2—>1—>4—>3—>NULL

console.log(p.getItemByNum(2))// 2
console.log(p.getItem(19))//null

p.insertAt(999,2)
p.printf()// 6—>999—>2—>1—>4—>3—>NULL

p.removeAt(1)
p.printf()// 999—>2—>1—>4—>3—>NULL
*/
module.exports = LinkedListF