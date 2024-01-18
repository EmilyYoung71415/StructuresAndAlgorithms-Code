/**
 * 浅拷贝：
 *      数组：slice\concat\
 *      遍历数组和对象，将其放在新对象中 见shallowcopy
 *      Object.assign() //对象
 *      prev.concat()
 * 深拷贝：
 *      JSON.parse( JSON.stringify(arr) )
 *      问题： 对数组或对象里的func无效
 * 
 * 
 *      递归遍历对象或数组（深的原因是： 直接数组等于数组的话其实是引用传递)
 *      jq的extend函数
 */


 function shallowcopy(obj){
    // 只拷贝对象（ 数组、object
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array? []:{};
    
    // 遍历obj，依次拷贝对象属性
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key];
        }
    }
    return newObj;
 }


 function deepCopy(obj){
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array? []:{};
    
    // 遍历obj，依次拷贝对象属性
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = typeof obj[key] === 'object'?deepCopy(obj[key]):obj[key];        }
    }
    return newObj;
 }



 // 测试集

 /**
  *     var x = {
            a: 1,
            b: {
                f: {
                    g: 1
                }
            },
            c: [1, 2, 3]
        };


        let test = shallowcopy(x);
        test.b.f = x.b.f true;
  * 
  * 
  * 
  * 
  * 
  */