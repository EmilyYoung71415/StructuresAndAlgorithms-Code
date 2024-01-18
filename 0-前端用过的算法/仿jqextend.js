/**
 * 仿jq的继承
 * 第一个参数： false、true 表示是否开启深拷贝
jQuery.extend( [deep], target, object1 [, objectN ] )
 * 
 * target 是目标对象，obj是待复制对象
 * 效果：将待复制对象属性都绑定在目标对象上
 *      若相同属性，后者代替更新前者
 * 
 * 
 * 浅拷贝与深拷贝的差别：
 *      var obj1 = {
            a: 1,
            b: { b1: 1, b2: 2 }
        };

        var obj2 = {
            b: { b1: 3, b3: 4 },
            c: 3
        };

        // {
        //    a: 1,
             // 深的
        //    b: { b1: 3, b2: 2, b3: 4 },
            // 浅的
              b: { b1: 3, b3: 4 },
        //    c: 3,
        // }

    实现思路：
        核心部分和2的深拷贝一致，不过多了很多细节的判断（针对传入参数等
 */

// 判断传入的参数，对deep与否的不同情况进行代码疏通
// extend（bool,target,obj1,obj2....） bool有可能不会传入，即需要根据
// 第一个参数类型 确定target与要合并的对象的下标起始值
// 多个对象继承注入target后者更新前者 视bool决定配置



function extend(){ 
    var deep = false;
    var length = arguments.length;

    var i  =1;// 要复制对象的下标
    // 第一个参数不传入布尔的时候，target是默认第一个参数
    var target = arguments[0]||{};

    if(typeof target === 'boolean'){
        deep = target;
        target = arguments[i]||{};
        i++;
    }

    // 如果target 不是 对象，由于无法复制所以设置{}
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }

    // 遍历循环需要复制的对象们
    for(;i<length;i++){
        // 获取当前对象
        let curObj = arguments[i];
        // 不能为空
        if(curObj!==null){
            for(let key in curObj){
                // 目标属性值
                let src = target[key];
                // 要复制对象的属性值                
                let copy = curObj[key];
                // 解决循环引用额问题
                if(target===copy){
                    continue;
                }

                if(deep&&copy&&typeof copy==='object'){
                    target[key] = extend(deep,src,copy);
                }
                else if(copy!==undefined){
                    target[key] =  copy;
                }
            }
        }
    }
    return target;
}                                                                                           