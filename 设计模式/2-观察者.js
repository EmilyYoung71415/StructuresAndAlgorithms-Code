/**
 * 观察者模式
 * 
 *  定义对象间的一种一对多的依赖关系，
 * 以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动更新
 * 
 * 
 *  例子：
 *      观察者 订阅了某个消息，当某个消息发生改变时，观察者会收到消息通知
 *      就像 职位信息一旦更新，订阅了该职位信息的求职者在单位发布招聘信息时会收到通知
 */


 const jobPost = (title)=>({
     title:title
 })

 class JobSeeker{
    constructor(name){
        this.name = name;
    }   
    notify(jobpost){
        console.log(this.name,'订阅了这个职位',jobpost.title);
    }
 }

// 发布职位的平台
// 维护一个依赖列表，当状态发生改变时，自动停止他们
class JobBoard{
    constructor(){
        this._subscriber = [];
    }
    subscribe(jobseeker){
        this._subscriber.push(jobseeker);
    }
    addjob(jobposting){
        // 平台通知订阅了信息的求职者
        this._subscriber.map(seeker=>{
            seeker.notify(jobposting);
        })
    }
}

// 使用
/*
const jonDoe = new JobSeeker('John Doe')
const janeDoe = new JobSeeker('Jane Doe')
const kaneDoe = new JobSeeker('Kane Doe')

const jobBoard = new JobBoard()
jobBoard.subscribe(jonDoe)
jobBoard.subscribe(janeDoe)


jobBoard.addjob(jobPost('Software Engineer'))

jobBoard.addjob(jobPost('策划'))
*/
/***
 * 观察者 与 发布订阅模式的区别
 * 
 * 发布订阅模式多了事件通道
 * 观察者：
 *      subject 事件发布者
 *      observe 观察者
 *   事件发布源头 会维护一份 观察者名单，当事件发生时，按照名单通知观察者
 *  买手机，用户去销售部门登记，销售人员一有新款就通知用户
 *  这里 销售人员作为事件发布者，知道 观察者的名单，哪个用户订阅了哪款手机
 *  按事件的发生 通知不同手机的观察者
 * 
 *  ╭─────────────╮  Fire Event  ╭──────────────╮
    │             │─────────────>│              │
    │   Subject   │              │   Observer   │
    │             │<─────────────│              │
    ╰─────────────╯  Subscribe   ╰──────────────╯

 * 发布订阅
 *     多了一个管道，相当于 邮局。在发送方与收信方进行 信息的传递
 *                              (联想 北京遇上西雅图的男女主信封通信)
 *                  甲将信寄到 邮局， 邮局再将信转给 乙 甲乙互相不知道对方的存在
 *                  即 甲不知道自己发出的消息，有哪些人订阅了，自己也没办法控制不给订阅的某个人发消息通知
 *                     乙
 *              是不是更像，作者写书(甲) 和 出版社 读者(乙)之间的关系
 *                
 *                      
 * 
 *  ╭─────────────╮            ╭───────────────╮   Fire      ╭──────────────╮
    │             │  Publish   │               │────────────>│              │
    │  Publisher  │───────────>│ Event Channel │   Event     │  Subscriber  │
    │             │  Event     │               │<────────────│              │
    ╰─────────────╯            ╰───────────────╯   Subscribe ╰──────────────╯
 */
/****
 * 观察者
 * 订阅、发布、退订
 * on 订阅
 * emit 发布事件
 * off 退订
 * 
 * let p = new Observe()
 * p.on('event1',(arg)=>{console.log(arg)}) // 该事件发生之后 会执行当前定义的回调
 * p.emit('event1',1,2) // 触发event1 并且给这个事件传入 1、2两个数据 
 * p.off('event1') 以后再 on('event1')都不会再有输出
 * 
 */

 function Observer(){
     this.events  = {}
     // "someEvent":function{}
 }

Observer.prototype.on = function(type,cb){
    this.events[type] = this.events[type]?this.events[type].concat([cb]):[cb];
}

// 找到event事件类型下的订阅者(订阅者订阅时指定的回调函数) 依次执行
Observer.prototype.emit = function(event,...arg){
    let cbList = this.events[event];
    if(!cbList) return ;
    cbList.forEach(cb => {
        cb(...arg);
    });
}

// 取消该事件下的某个回调函数
Observer.prototype.off = function(event,lister){
    this.events[event] = this.events[event].filter(cb=>{
        return cb!==lister;
    })
}

let p = new Observer()
p.on('haha',(msg)=>{
    console.log(msg)
})
p.on('haha2',(msg)=>{
    console.log(`${msg}--- fromhaha2`)
})
p.emit('haha','你好哈哈哈')
p.off('haha',(msg)=>{
    console.log(msg)
})
p.emit('haha','你好哈哈哈11111')
p.emit('haha2','你好哈哈哈')

