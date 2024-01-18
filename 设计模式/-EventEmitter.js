/**
 * 什么联想到这个的？
 * 从封装 移动端点击事件 监听事件，取消监听；
 * 然后想到了react-component里面用到的事件监听
 * 实现简易事件系统
 * 可以实现发布、订阅
 * 
 * http://www.zoucz.com/blog/2016/07/01/czevent/
 * https://github.com/mqyqingfeng/EventEmitter/blob/master/eventEmitter.js
 * https://github.com/Olical/EventEmitter/blob/master/EventEmitter.js
 * 
 * 
 * https://github.com/jerryOnlyZRJ/mobile-events/blob/master/docs/user/docs(zh).md
 */
/*
    //EventEmitter 给别的函数对象提供绑定事件、触发事件的能力
    var EventEmitter = require('events');
    var util = require('util');
    // 事件宿主对象 
    function MyEmitter() {
        EventEmitter.call(this);
        ... 
    }
    // 把事件宿主对象原型链指向事件模块 由此宿主对象也拥有处理事件能力
    util.inherits(MyEmitter, EventEmitter);
    var myEmitter = new MyEmitter();
    myEmitter.on("hehe",function(){
        console.log("hehe")
    })
    myEmitter.on("hehe",function(){
        console.log("haha")
    })
    myEmitter.emit("hehe");
    console.log(myEmitter.listeners("hehe"));
*/

/***
 * 功能：
 *  1、添加绑定事件 on
 *  2、添加绑定一次性事件 once
 *  3、移除事件监听 off
 *     触发事件 emit
 *  4、其他需要的扩展 
 */


 /***
  * 思路：
  *     1、需要一个事件类，创建不同名称的事件；
  *        事件内部维护： 当事件被触发时，应该对应的函数处理
  *     2、一些约束：
  *         事件宿主对象 绑定的事件：
  *     2.1、只能有一个，即对象绑定一个类型的事件
  *     2.2、处理函数有多个。
  *     2.3、对于同一个事件，重复绑定不同的事件处理是无效的；
  */


  


