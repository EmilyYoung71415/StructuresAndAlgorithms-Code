/***
 *  @desc 相关笔记可看
 * https://github.com/EmilyYoung71415/useful-javascript-snippets/blob/master/1-第一卷/README.md
    
    输入：
        [1, 1, '1', '2', 1]
    输出
        [1,'1','2']
 */

 //普通版
 var a = [1, 1, '1', '2', 1]
 function unique1(arr) {
     var res = []
     for (var i = 0, len = arr.length; i < len; i++) {
         var item = arr[i]
         for (var j = 0, jlen = res.length; j < jlen; j++) {
             if (item === res[j]) //arr数组的item在res已经存在,就跳出循环
                 break
         }
         if (j === jlen) //循环完毕,arr数组的item在res找不到,就push到res数组中
             res.push(item)
     }
     return res
 }
 console.log(unique1(a)) // [1, 2, "1"]


 //进阶

 var a =  [1, 1, '1', '2', 1]
 function unique2(arr) {
     return arr.filter(function(ele,index,array){
        return array.indexOf(ele) === index//很巧妙,这样筛选一对一的,过滤掉重复的
        //index是该元素的下标
        //indexOf（ele） 获得当前元素第一次出现的数组下标 
        //两者不相同则是出现了重复数据 过滤掉当前元素
     })
 }
 //console.log(unique2(a)) // [1, 1, "2"]


 //进阶优化

 var a =  [1, 1, '1', '2', 1]
 function unique3(arr) {
     var obj = {}
     return arr.filter(function(item, index, array){
         //hasOwnProperty 相当于基于hash查找
         //数组里有字符串、数字等。由此根据数字+它的类型值生成一格hash值作为对象属性标识新元素。
         //如果新对象有这个属性则是重复值，返回false，过滤掉当前值。
         return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
     })
 }
 
 //console.log(unique3(a)) // [1, 2, "1"]


 const unique4 = a => [...new Set(a)]

 console.log(unique4(a))


 /**
 * 数组去重
 * 
 * 不同版本的思路：
 *      1、双重循环，新来的元素和已去重后的每个数比较，不一样则push
 *      2、改进： 双重循环的内循环 用indexof查找
 *      3、排序后，比较相邻元素
 *      4、filter: 简化外层循环
 *      5、es6：Set
 *              [...new Set(arr)]
 *              Array.from(new Set(arr));
 */