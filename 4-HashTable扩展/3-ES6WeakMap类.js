/**
 * WeakMap与Map的区别
 * 
 *      1.WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
 *      2.WeakMap的键名所指向的对象，不计入垃圾回收机制
 * 
 * WeakMap的设计目的?
 *  ===> 有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用
 *       比如存放一个 obg1,obg2,不用的时候需要自动消除：obg1=null,obj2=null
 *       否则 垃圾回收机制无法回收，一旦忘了写，就会造成内存泄露
 * 
 *      如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap
 *      WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。
 *      WeakMap结构有助于防止内存泄漏。
 * 比如：
 *      在网页的 DOM 元素上添加数据，就可以使用WeakMap结构
 *      以DOM节点作为键名
 * 
 * 同样：
 *      WeakMap 没有遍历操作 + 无法清空
 *      WeakMap只有四个方法可用：get()、set()、has()、delete()
 * 
 */

/**
 * @func 1-DOM节点作为键名
 * 
 */
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});
// myElement是一个 DOM 节点，每当发生click事件，就更新一下状态
myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);

// 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

/**
 * @func  2-部署私有属性
 * 
 */
// WeakMap来保存私有属性items，并用外层函数（闭包）来封装Queue类
// WeakMap是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏
let Queue2 = (function () {
    const items = new WeakMap();
    class Queue2 {
        constructor() {
            items.set(this, []);
        }
        enqueue(element) {
            let q = items.get(this);
            q.push(element);
        }
        dequeue() {
            let q = items.get(this);
            let r = q.shift();
            return r;
        }
        //其他方法
    }
    return Queue2;
})();



