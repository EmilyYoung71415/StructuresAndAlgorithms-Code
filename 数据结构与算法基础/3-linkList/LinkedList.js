/**
 *  链表
 *    append 向链表追加数
 *    insert(position, element) 在某个固定位置后面加入
 *    remove  删除链表最后一个数
 *    removeAt 删除链表某个位置的数
 *    indexOf 查找某数 
 *    isEmpty
 *    toString
 *    print
 * 
 */


// 构造node节点类
function  Node(item,next=null){
    this.value = item;
    this.next = next;
}

function LinkedList(){
    this.head = null;
    this.length = 0;
}


LinkedList.prototype = {
    append:function(item){
        // 判断头节点是否有
        // 有则不断迭代头节点之后的节点，直到找到最后一个节点
        // 让最后一个节点 = node
        const node = new Node(item);
        let current = null;
        if(this.head===null){
            this.head = node;
        }else{
            current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    },
    insert:function(item,posi){// 本质是在posi前面插入
        // 判断posi是否超出范围
        // 1->2->4  要在2上插入
        // 则找到current = 2\ previous =1
        // previous.next = node
        // node.next = current
        if(posi>=0&&posi<=this.length){
            let 
                node =  new Node(item),
                current = this.head,
                previous = null,
                index = 0;

            if(posi===0){
                node.next = current;
                this.head = node;
            }else{
                // 不断向下迭代，并更新当前索引环境下的最新previous\current
                while(index++ < posi){
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }

            this.length++;
            return true;
        }else{
            throw new Error('posi超出链表范围');
        }
    },
    // 按照值删除
    remove:function(item){
        // 与append类似 找到最后一个节点 
        // ==》 更简单的写法： indexOf() ,removeAt
        let index = this.indexOf(item);
        return this.removeAt(index);
    },
    indexOf:function(item){
        // 一直迭代，直至xx.value = item index++
        let 
            current =  this.head,
            index = 0;
        while(current){
            // 先判断再加
            if(current.value === item){
                return index;
            }
            index++;
            current = current.next;            
        }
        // 没找到
        return -1;
    },
    findbyIndex:function(posi){
        if(posi<this.length&&posi>=0){
            // 如果是删除第一个节点： 让下个节点继承，不会影响到前一个节点
            let 
                current = this.head,
                previous = null,
                index = 0;
            if(posi ===0){
                return this.head;
            }else{
                while(index++ < posi){
                    previous = current;
                    current = current.next;
                }
                return current.value;
            }
        }else{
            throw new Error('超出范围！')
        }
    },
    find:function({value=undefined,callback=undefined}){
        if(!this.head){
            return null;
        }

        let currentNode = this.head;
        while (currentNode) {
            if(callback&&callback(currentNode.value)){
                return currentNode;
            }
            if(value!=undefined&&currentNode.value===value){
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    },
    removeAt:function(posi){
        // 删除某个节点
        // 1->2->5 removeAt(1)
        // 1->5    previous current
        if(posi<this.length&&posi>=0){
            // 如果是删除第一个节点： 让下个节点继承，不会影响到前一个节点
            let 
                current = this.head,
                previous = null,
                index = 0;
            if(posi ===0){
                this.head = current.next;
            }else{
                while(index++ < posi){
                    previous = current;
                    current = current.next;
                }
                 // 确定了previous current
                previous.next = current.next;
            }
           this.length--;
           return current.value;
        }else{
            throw new Error('超出范围！')
        }
    },
    isEmpty:function(){
        return this.length ===0;
    },
    // 将链表输出方便查看
    toString:function(){
        let 
            current = this.head,
            str = '';
        while(current){
            str += current.value + (current.next?'->':'');
            current = current.next;
        }
        return str;
    }
}


let arr = new LinkedList();
arr.append(1)
arr.append(2)
arr.append(56)
arr.insert(233,3)// 1  2 56 233
//arr.removeTail()//
//arr.removeTail()
// 删除
//arr.remove(233)
//console.log(arr.toString())