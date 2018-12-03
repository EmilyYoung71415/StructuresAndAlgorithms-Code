/**
 * 参考：https://blog.csdn.net/v_JULY_v/article/details/6105630
 * 
 * 红黑树，一种二叉查找树，但在每个结点上增加一个存储位表示结点的颜色.可以是Red或Black
 * 
 * 通过对任何一条从根到叶子的路径上各个结点着色方式的限制，
 * 红黑树确保没有一条路径会比其他路径长出俩倍，因而是接近平衡的。
 * 
 * 【红黑树的查找、插入、删除的时间复杂度最坏为O(log n)】
 * 它是如何保证一棵n个结点的红黑树的高度始终保持在logn的呢？
 * 1、每个结点要么是红的要么是黑的
 * 2、根节点是黑色的
 * 3、每个叶节点是红色的
 * 4、如果一个节点是红色、他的两个儿字都是黑色的
 * 5、对于任意结点而言，其到叶结点树尾端NIL指针的每条路径都包含相同数目的黑结点
 * 
 * 伪代码：// 以插入为例，即在二叉搜索树的基础上对插入之后的树进行了修复
 * 
 * RB-INSERT(T, z)  
        y ← nil  
        x ← T.root  
        while x ≠ T.nil  
            do y ← x  
            if z.key < x.key  
                then x ← x.left  
            else x ← x.right  
        z.p ← y  
        if y == nil[T]  
            then T.root ← z  
        else if z.key < y.key  
            then y.left ← z  
        else y.right ← z  
----------------分-界-线--------------------------
        z.left ← T.nil  
        z.right ← T.nil  
        z.color ← RED  
        RB-INSERT-FIXUP(T, z)  // 着色校正函数
    // 插入的是根节点：将根绘为黑色
    // 插入节点的父节点是黑色： 理应是红色，所以不校正

    // 当插入节点的父节点是红色，即着色校正函数做的事
        //case1: 父.color=red && 父的邻居(叔叔).color = red;
        //case2: 父.color=red && 父的邻居(叔叔).color = black && 当前节点是右子节点;
        //case3: 父.color=red && 父的邻居(叔叔).color = black && 当前节点是左子节点;  
 *
 * 
 * 
 * @func case1
 * [此时父结点的父结点一定存在，否则插入前就已不是红黑树] 
 *      then z.p.color ← BLACK // 将当前节点的父节点涂黑   
        y.color ← BLACK      // 叔叔节点涂黑          
        z.p.p.color ← RED      // 祖父结点涂红，             
        z ← z.p.p   // 把当前结点指向祖父节点
 * ===> 问题转换为 当前节点的父节点是红色,叔叔节点是黑色，当前节点是其父节点的右子
 *      即case2
 * @func case2
 *      当前节点的父节点做为新的当前节点，以新当前节点为支点左旋
 * ===》 插入修复情况2转换成了插入修复情况3
 *      即case3:当前节点的父节点是红色,叔叔节点是黑色，当前节点是其父节点的左孩子
 * @func case3
 *      父节点变为黑色，祖父节点变为红色，在祖父节点为支点右旋
 *      
 * 
 *    
 */


