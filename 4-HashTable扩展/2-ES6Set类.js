/**
 * @desc Set
 * 
 * add
 * delete
 * has
 * clear
 * 
 */

 // 数组去重  利用Set类生成不重复元素，再把Set转换为数组类型
 // 扩展符 Array.from都可以
// [...new Set(array)]
// Array.from(new Set(array)) 

/**
 * @desc WeakSet
 * 
 *      1.WeakSet 的成员只能是对象
 *      2.WeakSet 中的对象都是弱引用
 *        只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失
 *      WeakSet 的成员是不适合引用的，因为它会随时消失
 *      WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在
 * 
 */