/**
 * 
 * 类型判断：
 *     ===-> 传说中的以为很简单的事 =  =
 * 
 * typeof 的弊端：
 *      最大划分度到基本数据类型：null\undefined\boolean\object\string\
 *                  + function
 *      我们想区分array和object时就不能这样了
 *      
 *      
 * Object.prototype.toString.call(something to be check)
 * 
 * 
 */
// 检测 常见数据类型
function type(obj) {
    var class2type = {};

    // 生成class2type映射
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function (item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}


// 复杂判断： 
/***
 * 
 * isElement 是不是dom元素
 * isArrayLike 
 * window对象
 * 空对象
 * plainObject
 * 
 */


function isFunction(obj) {
    return type(obj) === "function";
}


function isPlainObject(obj) {
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}
