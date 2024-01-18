/**
 * @desc 
 *      链表：一个节点只有一个方向指针——指向下个节点
 *      双向链表：
 *           节点有两个方向指针— 既指向上个节点，又指向下个节点   
 *      
 *      方法：
 *  append // 链表尾部插入
 *  insert // 指定位置插入
 *  removeAt // 指定位置删除
 *  remove // 删除最后一个
 *  indexOf //找到元素索引
 */
function Node(elem){
    this.elem = elem;
    this.next = null;
    this.prev = null;
}
 function  doublyLinkedList(){
    this.head = null
    this.tail = null;
    this.len = 0;
 }

 doublyLinkedList.prototype = {
     append:function(elem){
        // 如果是头 
        // 尾节点next <=>  当前.prev.
        let node  =  new Node(elem);
        if(this.head===null){
            this.head = node;
            this.tail = node;
        }else{
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.len++;
     },
     // 任意位置插入
     insert:function(elem,posi){
        // 大前途：越界与否
        // 头节点 0 
            // 当前是否存在head节点
        // 尾
            // 和append差不多
        // 中间
            // 遍历循环 不断更新cur prev 
        if(posi>this.len||this.posi<0){
            return false;
        }

        let node = new Node(elem);
        let 
            cur = this.head,
            prev = null;
            
        if(posi===0){
            
            if(!this.head){
                this.head = node;
                this.tail = node;
            }
            // 当前posi指向的是this.head
            // 在posi之前插入
            else{
                node.next = cur;
                cur.prev = node;
                this.head = node;
            }
            
        }
        // 在尾部插入
        else if(posi === this.len-1){
            
            cur = this.tail;
            cur.next = node;
            node.prev = cur;
            this.tail = node;
        }
        // 中间
        else{
            
            let index = 0;
            // 遍历修改cur 和 prev
            while(index++ < posi){
                prev = cur;
                cur =  cur.next;
            }   
            // 找到index
            // 在index之前插入
            node.next = cur;
            prev.next = node;

            node.prev = prev;
            cur.prev = node;
        }
        this.len++;
        return true;
     },
     // 删除指定元素
     remove:function(elem){
        let index = this.indexOf(elem);
        this.removeAt(index);
     },
     removeAt:function(posi){
        // 和指定插入类似
        // 越界与否
        if(posi>this.len||this.posi<0){
            return null;
        }

        let 
            cur = this.head,
            prev = null,
            index = 0;
        
        if(posi===0){
            // 直接让 this.head = this.head.next
            // 额外情况考虑：
                // 头节点，链表只有一个元素： 修改tail
                // 让head.prev = null

            this.head = cur.next;
            if(this.len===1){
                this.tail = null;
            }else{
                this.head.prev = null;
            }
        }
        else if(posi === this.len-1){
            // 删除尾部
            this.tail = this.tail.prev;
            this.tail.next = null; 
        }
        else{
            let index = 0;
            while(index++ <posi){
                prev = cur;
                cur = cur.next;
            }
            prev.next = cur.next;
            cur.next.prev =  prev;
        }
        this.len--;
        return cur.elem;
     },
     indexOf:function(elem){
        // 第一个和最后一个检查
        let cur  = this.head;
        let index = -1

        if(this.head.elem === elem){
            return 0;
        }
        
        index++;

        while(cur.next){
            if(elem===cur.elem){
                return index;
            }
            cur = cur.next;
            index++;
        }

        // 尾部
        if(elem===cur.elem){
            return  index;
        }
        return -1;
     },
     toString:function(){
        let cur = this.head;
        let str = cur?cur.elem:"";

        while(cur.next){
            cur = cur.next;
            str += '->'+cur.elem;
        }
        console.log(str);
     }
 }

 let arr  = new doublyLinkedList();

 arr.append(56)
 arr.append(23)
 arr.append(15)
 arr.append(12)
 //arr.toString() // 56-23-15-12
//  arr.insert(2333,0)
//  arr.toString()//2333-56-23-15-12 
//  arr.insert(789,2)
//  arr.toString()
arr.removeAt(3)
arr.toString()