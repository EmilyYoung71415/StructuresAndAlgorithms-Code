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

const jonDoe = new JobSeeker('John Doe')
const janeDoe = new JobSeeker('Jane Doe')
const kaneDoe = new JobSeeker('Kane Doe')

const jobBoard = new JobBoard()
jobBoard.subscribe(jonDoe)
jobBoard.subscribe(janeDoe)


jobBoard.addjob(jobPost('Software Engineer'))

jobBoard.addjob(jobPost('策划'))

/***
 * 观察者 与 发布订阅模式的区别
 * 
 * 
 */


