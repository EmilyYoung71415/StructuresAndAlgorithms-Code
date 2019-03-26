/***
 * 双链表：
 * 每个指针域具有两个指向：next、prev
 * 
 * 尾插链表还是需要两个指针节点 head、prev
 * 
 * 插入add
 * getItemByNum按序号查找节点
 * getItem按值查找节点
 * insert(x,index)
 * removeAt删除节点：删除第i个节点
 */

function Node(data){
    this.data = data;
    this.prev = null;
    this.next = null;
}


class DoublyLinkedListR{
    constructor(){
        this.head = new Node()
        this.rear = this.head;
    }
    add(x){ // 双链表头插还简单点
        let newnode = new Node(x)
        this.rear.next = newnode;
        newnode.prev = this.rear;
        this.rear = newnode
    }
    getItemByNum(index){
        if(index==0) return this.head;
        if(index<1||index==null) throw new Error('不存在节点')
        let j = 1;
        let p = this.head.next;
        while(p&&j<index){
            p = p.next
            j++
        }
        return p
    }
    getItem(data){
        let p = this.head.next;
        while(p&&p.data!=data){
            p = p.next 
        }
        return p;
    }
    // 如果是链尾发生了改变 那么要修改this.rear
    insert(x,index){
        let p = this.getItemByNum(index-1);
        if(p==null) throw new Error('位置超出链表范围')
        let newnode = new Node(x);
        newnode.next = p.next;
        if(p.next){// 非链尾
            p.next.prev = newnode
        }
        p.next = newnode
        newnode.prev = p;
        if(newnode.next == null){
            this.rear = newnode
        }
    }
    // 如果删除了链尾 也要更新rear
    removeAt(index){
        let p = this.getItemByNum(index-1);
        if(p==null) throw new Error('位置超出链表范围')
        let q = p.next;
        p.next = q.next.next
        if(q.next){// q.next不存在 可能是链尾
            q.next.prev = p;
        }else{// 是链尾就需要更改rear
            this.rear = p;
        }
    }
}

module.exports = DoublyLinkedListR