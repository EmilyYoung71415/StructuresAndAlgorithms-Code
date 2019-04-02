/*****
 * 
 * 堆即树，插入删除都为O(logN)，而落地结构可以用数组实现
 * 堆是完全二叉树，
 *      左子节点: 2*index+1，
 *      右子节点: 2*index-1，
 *      父节点：~~(index-1)/2;
 * 
 * 堆性质：
 *     堆只是限定了某结点的值大于（或小于）其左右孩子结点的值，
 *      但没有限定左右孩子结点之间的大小关系
 * 
 *     堆是为了实现排序而设计，一般堆不遍历，因为子节点没有相互约束的关系无法决定下个节点走向
 *     遍历每个元素时，堆相当于无序结构
 * 
 * 复杂度：建立堆的操作O(N)、调整堆：O(logn)
 * 
 * 操作：
 * 添加数据add
 * 删除数据remove：
 *     在数组里找到要删除的节点(可能不止一个)
 * 弹出堆顶元素poll
 * get堆顶元素peek
 */


class Heap{
    constructor(){
        this.arr = [];
    }
    peek(){
        if(this.arr.length==0) return null;
        return this.arr[0];
    }
    getLen(){
        return this.arr.length;
    }
    isEmpty(){
        return !this.arr.length;
    }
    add(x){
        this.arr.push(x);
        this.heapifyUp();
    }
    poll(){// 弹出堆顶元素
        if(this.arr.length==0) return null;
        if(this.arr.length==1) return this.arr.pop();

        let item = this.arr[0];
        // 将尾元素移动到堆顶，问题转换为 删除堆底元素
        // 并新得堆顶元素，需要向下调整堆
        this.arr[0] = this.arr.pop();
        this.heapifyDown();
        return item;
    }
    remove(x){
        // 遍历数组找到 值等于x的所有元素，存放元素下标
        const removeIndexArr = this.find(x);
        for(let i=0;i<removeIndexArr.length;i++){
            // 预删除元素的最新下标 (每次遍历的时候 需要新find一下 因为堆调整要改变数组元素的位置)
            let itemIndex = this.find(x).pop();

            // 最后一个元素 直接Pop 无需堆调整
            if(itemIndex ==  this.arr.length-1){
                this.arr.pop()
            }
            else{
                // 将堆顶元素 移至预删除元素位置
                this.arr[itemIndex] = this.arr.pop();

                // 找当前删除元素的父元素 
                // 如果父元retr素是合适的or没有父元素 就向下调整 (并且左index未超界)
                // 父元素不合适 向上调整
                let pIndex = this.getPIndex(itemIndex),
                    lIndex = itemIndex*2 + 1;
                if(lIndex<this.arr.length-1&&(!this.arr[pIndex] || this.compare(pIndex,itemIndex))){
                    this.heapifyDown(itemIndex);
                }
                else{
                    this.heapifyUp(itemIndex);
                }
            }
        }
    }
    // 尾插数据后，逐渐向上调整该元素 直至找到合适的位置
    // 向上：他那条路径的向上追溯
    heapifyUp(curIndex){
        curIndex = curIndex || this.arr.length-1;
        let pIndex = this.getPIndex(curIndex);//父节点index
        // pIndex比curIndex的元素大 则需要交换
        while(pIndex>=0&&!this.compare(pIndex,curIndex)){//有父节点
            this.swap(this.arr,curIndex,pIndex);
            curIndex = pIndex;
            pIndex = this.getPIndex(curIndex);
        }
    }
    // 向下跳转堆顶元素 堆顶出现新元素之后的调整堆
    heapifyDown(curIndex=0){
        // 该节点的两个子节点的下标
        let len = this.arr.length,
            nextIndex = null,
            rIndex = curIndex*2 + 2,
            lIndex = curIndex*2 + 1;

        while(lIndex<len){
            // 在左右子节点中找到更合适的(大顶堆：更大的;小顶堆：更小的)
            // 将更合适的调整到堆顶
            if(rIndex<len&&this.compare(rIndex,lIndex)){
                nextIndex = rIndex;
            }
            else{
                nextIndex = lIndex;
            }

            // 出现三种情况:最合适的是 左子、右子、本身，只有本身不需要交换
            if(this.compare(curIndex,nextIndex)) break;

            // 其余情况都要交换
            this.swap(this.arr,curIndex,nextIndex);
            curIndex = nextIndex;
            rIndex = curIndex*2 + 2,
            lIndex = curIndex*2 + 1;
        }
    }
    getPIndex(index){
        return (index/2>>0);
    }
    // 在this.arr找值=x的所有元素，保存元素的下标
    find(x){
        let result = [];
        this.arr.forEach((item,index)=>{
            if(item == x){
                result.push(index);
            }
        })
        return result;
    }
    compare(properIndex,index){// 更适合的元素
        throw new Error('子类复写方法')
    }
    swap(arr,index1,index2){
        arr[index1] ^= arr[index2];
        arr[index2] ^= arr[index1];
        arr[index1] ^= arr[index2];
    }
 }

module.exports = Heap;