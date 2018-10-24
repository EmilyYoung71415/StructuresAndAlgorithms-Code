/**
 * 
 * new 的模拟实现
        function Otaku () {
            ……
        }

        // 使用 new
        var person = new Otaku(……);
        // 使用 objectFactory
        var person = objectFactory(Otaku, ……)

        思路：
            1、new Fun(); 则先创建一个新对象
            1.5: 获得构造函数 的原型
            1.8: 使得对象能访问构造函数的属性，则将获得的构造函数内部的this修改
            2、使得对象_proto_ 指向构造函数的原型
 */


 // 第一版代码
function objectFactory() {

    var obj = new Object(),
    //借用数组方法处理arguments，获得的第一个参数是我们要传入的构造函数
    Constructor = [].shift.call(arguments);
    // 原型指向构造函数，这样就能访问到构造函数原型中得属性
    obj.__proto__ = Constructor.prototype;
    // 改造构造函数的this指向给 obj，使得obj可以访问到构造函数的属性
    Constructor.apply(obj, arguments);

    return obj;

};

// 返回值实现
// new 生成的函数 如果return了对象，则返回对象，不是返回对象则还是返回生成的那个obj

// 第二版的代码
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

};


/**
 * 
 * 相关引申：
 *      原型、原型链
 *      继承
 * 
 * 
 */


 /**
  * 
  * Object.create()
  * 有两个参数
  * 可以实现类继承
  * child.prototype = Object.create(parent.prototype);
  * child.prototype.constructor = child;
  * 
  * 
  * var o;
  * // 创建一个原型为null的空对象
    o = Object.create(null);

    o = {};
    o = Object.create(Object.prototype);


     Object.create有两个参数，第二个参数propertiesObject表示添加到新创建对象的可枚举属性

     // 创建一个以另一个空对象为原型,且拥有一个属性p的对象
    o = Object.create({}, { p: { value: 42 } })

    // 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:

    //创建一个可写的,可枚举的,可配置的属性p
    o2 = Object.create({}, {
    p: {
        value: 42, 
        writable: true,
        enumerable: true,
        configurable: true 
    } 
    });

    function Constructor(){}
    o = new Constructor();
    相当于
    // 但如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码
    o = Object.create(Constructor.prototype);
  */


  // 模拟object.create()
  /**
   * 创建新对象，对象指向 父级 返回new F()
   */
Object.create = function(proto,propertiesObject){
    function F(){}
    F.prototype = proto;
    return new F();
}


// 由类式继承实现的 extend 
// 用一个新构造函数扩展已有的构造函数
// 借助 apply、 构造器
// proxy 拦截

// 让当前构造器去扩展基本构造器，
// 核心思想是 
/**
 * var Person = function(name){
    this.name = name
  };
   // name 继承自父级
 * var Boy = extend(Person, function(name, age) {
    this.age = age;
   });

     var Peter = new Boy("Peter", 13);
 */

 /**
  * 1\descriptor：getOwnPropertyDescriptor 获取cur构造器的属性
  * 
  * 3、改变构造器属性为 父、子相融合结果 descriptor.value = proxy;
  * 4、Object.defineProperty(curobj.prototype, "constructor", descriptor);
  * 即关键在于 拦截时做了什么， 改变了哪些基本属性，===-》 修改curobj的构造器，
  */
function extend(base,curobj){
    let descriptor = Object.getOwnPropertyDescriptor(curobj.prototype,'constructor');

    let handler = {
        constructor:{

        },
        apply:{

        }
    }

    let proxy =  new Proxy(curobj,handler);
    descriptor.value = proxy;
    Object.defineProperty(curobj.prototype,'constructor',descriptor);
    return proxy;
}