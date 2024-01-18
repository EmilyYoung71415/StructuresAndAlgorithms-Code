/*****
 * from
 * isArray
 * of
 * concat
 * every
 * fill
 * filter
 * find
 * findIndex
 * forEach
 * includes
 * indexOf
 * join
 * keys
 * map
 * pop
 * push
 * reduce
 * reverse
 * shift
 * slice
 * some
 * sort
 * splice
 * toLocaleString
 * unshift
 * values
 */


// splice方法使用deleteCount参数来控制是删除还是添加：
/**
 * splice(start,delCount,[item1,item2,item3...)
 * start:
 *      0 从0开始
 *      start>arr.len-1 表示倒数开始  如arr.len=3 splice(4,xx) 即
 *      负数：-1开始计数 ，表示从数组末尾开始的第x位
 * deletCount
 *      0 或 负数 表示不删除 而是添加新元素，
 *      splice(2) 即 从2开始 删除 arr.len-start
 * 
 * 从start位置开始删除[start，end]的元素 即截取， 从x位置元素之后的都不要了
 *      array.splice(start)
 * 从start位置开始删除[start，Count]的元素。细化： 从x位置之后y个元素都不要了
 *                                         即slice(start,end)另类截取
 * array.splice(start, deleteCount)    
 *  
 * 从start位置开始添加item1, item2, ...元素
 *      arr.splice(index,0,xxx1)  // index位之后添加一个元素
 *      arr.splice(index,0,xx1,xx2,xx4)
 * 返回 由被删除的元素组成的一个数组  如果没删是添加 就是 空数组[]
 * 
 * 
 */
let arr = [1,4,5]
// let res = arr.splice(2)// 删除第2个元素以后的 返回删除元素 同时原数组改变
// let res = arr.splice(1,1) // 删除1之后的1个元素 包含index=1
// let res = arr.splice(0,0,2,3) // 23145
// let res = arr.splice(1,0,2,3)

// for(let item of arr){
//     item = item+1;
//     console.log(item)
// }

/****
 * for...in 语句以原始插入顺序迭代对象的可枚举属性。
 * 包括：原型上的方法/属性   if(obj.hasOwnProperty(item))
 * for in 出来的是key
 * 
 * for of 出来的是value
 *  for of迭代出来的对象 进行修改不会改变原值
 * for of 是最简单 最直接的遍历数组元素的语法
 * 避开了 for in 的缺陷 
 * 而且！ 可以正确响应 break等退出
 * for of 使用 与 g函数配合十分默契。
 * 深入浅出 es6
 * 
 */
// let res= arr.reduce((prev,cur)=>{
//     return prev+cur;
// },0)






console.log(arr)
console.log(res)