/**
 *  判断两个元素是否相等
 * 
 *  1、基本类型 相等则完全相等
 *  2、引用类型 的引用相等   a === b
 *          特殊情况： 0 === -0 （true） 但是实际上 -0 ！= 0
 *  3、a!==b 但实际上可以认为他们是相等的：
 *      eg： a={name:1,age:1}; b = {name:1,age:1}
 * 
 *      步骤： 
 *          判断类型是否一致
 * 
 *  另类字符串与正则
 *  /a/ 与 new RegExp("a")
 *      
 *  数值类型：
 *       NAN 与本身是相等的。
 *       0 的干扰   
 * 
 * 时间和布尔：
 *      + 转换为基本类型
 *      
 * 数组与对象：
 *      使用递归 如果有一个不一样就是false
 * 
 */


// Internal recursive comparison function for `isEqual`.
// "内部的"/ "递归地"/ "比较"
// 该内部方法会被递归调用
var eq = function (a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    // a === b 时
    // 需要注意 `0 === -0` 这个 special case
    // 0 和 -0 被认为不相同（unequal）
    // 至于原因可以参考上面的链接
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // A strict comparison is necessary because `null == undefined`.
    // 如果 a 和 b 有一个为 null（或者 undefined）
    // 判断 a === b
    if (a == null || b == null) return a === b;

    // Unwrap any wrapped objects.
    // 如果 a 和 b 是 underscore OOP 的对象
    // 那么比较 _wrapped 属性值（Unwrap）
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;

    // Compare `[[Class]]` names.
    // 用 Object.prototype.toString.call 方法获取 a 变量类型
    var className = toString.call(a);

    // 如果 a 和 b 类型不相同，则返回 false
    // 类型都不同了还比较个蛋！
    if (className !== toString.call(b)) return false;

    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        // 以上五种类型的元素可以直接根据其 value 值来比较是否相等
        case '[object RegExp]':
            // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            // 转为 String 类型进行比较
            return '' + a === '' + b;

            // RegExp 和 String 可以看做一类
            // 如果 obj 为 RegExp 或者 String 类型
            // 那么 '' + obj 会将 obj 强制转为 String
            // 根据 '' + a === '' + b 即可判断 a 和 b 是否相等
            // ================

        case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN
            // 如果 +a !== +a
            // 那么 a 就是 NaN
            // 判断 b 是否也是 NaN 即可
            if (+a !== +a) return +b !== +b;

            // An `egal` comparison is performed for other numeric values.
            // 排除了 NaN 干扰
            // 还要考虑 0 的干扰
            // 用 +a 将 Number() 形式转为基本类型
            // 即 +Number(1) ==> 1
            // 0 需要特判
            // 如果 a 为 0，判断 1 / +a === 1 / b
            // 否则判断 +a === +b
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;

            // 如果 a 为 Number 类型
            // 要注意 NaN 这个 special number
            // NaN 和 NaN 被认为 equal
            // ================

        case '[object Date]':
        case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;

            // Date 和 Boolean 可以看做一类
            // 如果 obj 为 Date 或者 Boolean
            // 那么 +obj 会将 obj 转为 Number 类型
            // 然后比较即可
            // +new Date() 是当前时间距离 1970 年 1 月 1 日 0 点的毫秒数
            // +true => 1
            // +new Boolean(false) => 0
    }


    // 判断 a 是否是数组
    var areArrays = className === '[object Array]';

    // 如果 a 不是数组类型
    if (!areArrays) {
        // 如果 a 不是 object 或者 b 不是 object
        // 则返回 false
        if (typeof a != 'object' || typeof b != 'object') return false;

        // 通过上个步骤的 if 过滤
        // !!保证到此的 a 和 b 均为对象!!

        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        // 通过构造函数来判断 a 和 b 是否相同
        // 但是，如果 a 和 b 的构造函数不同
        // 也并不一定 a 和 b 就是 unequal
        // 比如 a 和 b 在不同的 iframes 中！
        // aCtor instanceof aCtor 这步有点不大理解，啥用？
        var aCtor = a.constructor,
            bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                _.isFunction(bCtor) && bCtor instanceof bCtor) &&
            ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }

    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    // 第一次调用 eq() 函数，没有传入 aStack 和 bStack 参数
    // 之后递归调用都会传入这两个参数
    aStack = aStack || [];
    bStack = bStack || [];

    var length = aStack.length;

    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    // 将嵌套的对象和数组展开
    // 如果 a 是数组
    // 因为嵌套，所以需要展开深度比较
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        // 根据 length 判断是否应该继续递归对比
        length = a.length;

        // 如果 a 和 b length 属性大小不同
        // 那么显然 a 和 b 不同
        // return false 不用继续比较了
        if (length !== b.length) return false;

        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            // 递归
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    } else {
        // 如果 a 不是数组
        // 进入这个判断分支

        // Deep compare objects.
        // 两个对象的深度比较
        var keys = _.keys(a),
            key;
        length = keys.length;

        // Ensure that both objects contain the same number of properties before comparing deep equality.
        // a 和 b 对象的键数量不同
        // 那还比较毛？
        if (_.keys(b).length !== length) return false;

        while (length--) {
            // Deep compare each member
            // 递归比较
            key = keys[length];
            if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
    }

    // Remove the first object from the stack of traversed objects.
    // 与 aStack.push(a) 对应
    // 此时 aStack 栈顶元素正是 a
    // 而代码走到此步
    // a 和 b isEqual 确认
    // 所以 a，b 两个元素可以出栈
    aStack.pop();
    bStack.pop();

    // 深度搜索递归比较完毕
    // 放心地 return true
    return true;
};

// Perform a deep comparison to check if two objects are equal.
// 判断两个对象是否一样
// new Boolean(true)，true 被认为 equal
// [1, 2, 3], [1, 2, 3] 被认为 equal
// 0 和 -0 被认为 unequal
// NaN 和 NaN 被认为 equal
isEqual = function (a, b) {
    return eq(a, b);
};