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
  * 引申：
  *     函数的参数传递：
  *     -- 所有函数的参数都是按值传递
  *     var value = 1;
        function foo(v) {
            v = 2;
            console.log(v); //2
        }
        foo(value);
        console.log(value) // 1

        函数内部修改传入参数，外部并没有发生改变
  *     而引用传递：
  *         同指一个地址（因为复杂数据结构拷贝会产生性能问题）
  *         
  *     var obj = {
            value: 1
        };
        function foo(o) {
            o.value = 2;
            console.log(o.value); //2
        }
        foo(obj);
        console.log(obj.value) // 2

        函数内部修改对象的属性值，外面也会跟着改、


        但是这个又怎么解释呢？
         var obj = {
            value: 1
        };
        function foo(o) {
            o = 2;
            console.log(o); //2
        }
        foo(obj);
        console.log(obj)// obj.value =2 

        问题： 修改传入对象（直接替换），外部却没有变，
              但是修改对象的属性，对象原型的属性却要变

        情况分析：
            本质上来说：函数传递都是拷贝传递
            基本数据类型拷贝的是 按值
            复杂对象拷贝: 是按址

        o作为函数形参，是obj的拷贝，而obj是对象拷贝即是拷贝的地址，引用传递
        然而，另o=2，并没有修改原对象，
        ===> o =2 基本数据类型，在栈内存中开辟了一块内存，切断了o与obj的拷贝引用，所以不会影响原来的值
        
  */