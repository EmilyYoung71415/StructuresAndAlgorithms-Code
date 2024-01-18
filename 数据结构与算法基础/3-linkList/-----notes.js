/**
 * @desc 数组的问题
 *  在其他语言中,数组长度是固定的，当数据被数组填满时，再加入数据很苦难
 *  需要将数组中的其他元素向前或向后平移
 *  
 *  但在js中，数组不存在这个问题。
 *  js中数组的主要问题是:    
 *      它们被实现成了对象，效率低
 * 
 * 设计链表：
 *      Node类
 *          this.element = element;
 *          this.next = null;// next用来保存下个节点的链接
 *      LinkedList类
 *          append 
 *          insert(node,posi)
 *          remove(item)
 *              ===> index = indexOf(item)
 *                   removeAt(index)
 *          indexOf(item)
 *          removeAt(posi)
 *          toString
 */