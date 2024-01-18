//堆
//比较函数是下面结点和上面结点交换的条件
//返回a < b，代表小根堆
//返回a > b，代表大根堆
//从树的顶点到叶节点是有序的递增序列
export class Heap<K> {
  heap: K[];
  compare: (data1: K, data2: K) => boolean;
  constructor(compare: (data1: K, data2: K) => boolean) {
    this.heap = [];
    this.compare = compare; //比较函数时比较的是否可以向上升的情况
  }
  // 交换节点位置
  swap(i1: number, i2: number) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  // 获得父节点
  getParentIndex(i: number) {
    return (i - 1) >> 1;
  }
  // 获得左节点
  getLeftIndex(i: number) {
    return 2 * i + 1;
  }
  // 获得右节点
  getRightIndex(i: number) {
    return 2 * i + 2;
  }
  // 上移：当父节点大的时候上移 → 比父节点小就向上爬
  goUp(index: number) {
    //当有父节点时，能换就换，不能换就退出！
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      //1、不符交换条件
      if (!this.compare(this.heap[index], this.heap[parentIndex])) break; //compare代表goUp的条件
      //2、符合交换条件
      this.swap(parentIndex, index);
      //3、指针移动到父
      index = parentIndex;
    }
  }
  // 下移：当子节点小的时候下移 →
  goDown(index: number) {
    let lastParentIndex = this.getParentIndex(this.size() - 1); //最后一个节点的父节点
    //当有子节点时，能换就换，不能换就退出
    while (index <= lastParentIndex) {
      const leftIndex = this.getLeftIndex(index);
      const rightIndex = this.getRightIndex(index);
      let leftWin = true;
      //注意要检查右孩子是否存在
      if (rightIndex < this.size()) {
        leftWin = this.compare(this.heap[leftIndex], this.heap[rightIndex]); //代表谁能上去
      }
      if (leftWin && this.compare(this.heap[leftIndex], this.heap[index])) {
        this.swap(leftIndex, index);
      } else if (!leftWin && this.compare(this.heap[rightIndex], this.heap[index])) {
        this.swap(rightIndex, index);
      } else {
        break;
      }
      index = leftWin ? leftIndex : rightIndex;
    }
  }
  // 插入
  push(value: K) {
    this.heap.push(value); //将值插入在数组最后一个元素
    this.goUp(this.heap.length - 1);
  }
  // 删除堆顶元素：这个有点不好理解哈
  shift() {
    //1、当堆中元素个数大于1：将堆中尾部元素放到堆首
    if (this.heap.length > 1) {
      let top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.goDown(0);
      return top;
    }
    //2、堆中元素个数小于1
    else if (this.heap.length === 1) return this.heap.pop();
    //3、堆中元素个数为0
    else return undefined;
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}
