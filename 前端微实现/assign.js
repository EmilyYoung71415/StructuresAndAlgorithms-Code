/**
 * 
 *
    const object1 = {
        a: 1,
        b: 2,
        c: 3
    };

    const object2 = Object.assign({c: 4, d: 5}, object1);
    返回一个新的对象，传参中后面的数会覆盖前面的
    Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象
 */

function assign(target,varArgs){
    'use strict';
    if(target==null){
        throw new Error()
    }

    let origin = Object(target);
    // 遍历之后的参数
    for(let i = 1;i<arguments.length;i++){
        let nextSource = arguments[i];
        // 遍历next里面的属性 赋值给 origin
        if(nextSource!==null){
            for(let nextkey in nextSource){
                // 如果下个对象的当前属性自身的
                if(Object.prototype.hasOwnProperty.call(nextSource,nextkey)){
                    origin[nextkey] = nextSource[nextkey];
                }
            }
        }
    }
    return origin;
}

