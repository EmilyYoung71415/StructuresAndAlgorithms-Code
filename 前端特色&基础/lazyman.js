/**
 * 微信笔面试题目
 * 
 * LazyMan("Hank")
 *  ==-> 
 *      Hi! This is Hank!
 * LazyMan("Hank").sleep(10).eat("dinner")
 *  ==->　
 *      Hi! This is Hank!　
 *      等待10s 
 *      Wake up after 10
 *      eat dinner 
 * 
 *  LazyMan("Hank").eat("dinner").eat("supper")
 *   ==->　
 *      Hi This is Hank!
        Eat dinner
        Eat supper  
        
    LazyMan("Hank").sleepFirst(5).eat("supper")
     ==->　
        等待5秒
        Wake up after 5
        Hi This is Hank!
        Eat supper 
        
    题目解析:
        实现一个类, 可以输出名字\吃饭\睡觉 等行为    
        优先级:sleepFirst 最高,其余的平等
        按照调用次序进行顺序执行 ,所以是一个队列(函数队列)
    考察:
        方法链式调用
        类的使用 和 面向对象
        设计模式
        代码解耦
方法:
    LazyMan
    sleepFirst(x) // 将日程提到最前面,等待x秒之后, Wake up after x 再执行其他的
    sleep(x) // 等待x秒后 输出  Wake up after x
    eat(xxx)
公共逻辑:  
    都需要传入 一个参数,然后console.log(xxxx)
    链式调用
    会有异步的产生: 
            1\ settimeout
    注意 lazyman(xxx).sleepFisrt(xx) 是先执行的 sleepFirst
 */
/*
(function(window, undefined){
    function LazyMan(){}
    LazyMan.prototype.sleep = function(num){
        subscribe('sleep',num);
        return this;
    }
    LazyMan.prototype.eat = function(str){
        subscribe("eat", str);
		return this;
    }
    LazyMan.prototype.sleepFirst = function(num){
        subscribe("sleepFirst", num);
		return this;
    }
    // 输出文字
    function lazyManLog(str){
        console.log(str);
    } 
    // 具体方法
	function lazyMan(str){
		lazyManLog("Hi!This is "+ str +"!");
		publish();
	}
	function eat(str){
		lazyManLog("Eat "+ str +"~");
		publish();
	}
	function sleep(num){
		setTimeout(function(){
			lazyManLog("Wake up after "+ num);
			publish();
		}, num*1000);
		
	}
	function sleepFirst(num){
		setTimeout(function(){
			lazyManLog("Wake up after "+ num);
			publish();
		}, num*1000);
    }
    
    function run(option){
		var msg = option.msg,
			args = option.args;
		switch(msg){
			case "lazyMan": lazyMan.apply(null, args);break;
			case "eat": eat.apply(null, args);break;
			case "sleep": sleep.apply(null,args);break;
			case "sleepFirst": sleepFirst.apply(null,args);break;
			default:;
		}
	}

    var cbList = [];// {funcname:xxx,arg:hanck}


    // 订阅
    function subscribe(name,str){//  subscribe("eat", str);
        // if(name==='sleepFirst'){
        //     cbList.unshift({
        //         msg:name,
        //         arg:str
        //     })
        // }else{
        //     cbList.push({
        //         msg:name,
        //         arg:str
        //     })
        // }
        var param = {},
        args = Array.prototype.slice.call(arguments);
        if(args.length < 1){
            throw new Error("subscribe 参数不能为空!");
        }
        param.msg = args[0];
        param.args = args.slice(1); // 函数的参数列表
        if(param.msg == "sleepFirst"){
            cbList.unshift(param);
        }else{
            cbList.push(param);
        }
    }

    // 这个函数 是怎么实现的
    // 发布 每次 执行动作之后 动作负责主动调用 publish
    function publish(){
        if(cbList.length>0){
            run(cbList.shift())
        }
    }

    // 暴露接口
    window.LazyMan = function(str){
        subscribe("lazyMan", str);
        // 如果是 lazyman(xxx).sleepFirst(zz) 思考数据流
        // 异步让链式调用先执行 ,publish 先挂起
		setTimeout(function(){
			publish();// 所以这里的cblist里的函数第一个永远是sleepfirst
		}, 0);
		return new LazyMan();
	};



})(window);

LazyMan("Hank").eat("dinner").sleepFirst(2)
*/
/*
// callback版本  本质思路 和 发布订阅一样的
     function LazyMan(name){
            this.queue = [initName]
            let _this = this;
            function initName(){
                console.log(`this is ${name}`);
                _this.callbackqueue()
            }
            setTimeout(()=>this.callbackqueue())
            return this;
        }    
        LazyMan.prototype.callbackqueue = function(){
            //this.queue.forEach(func=>func())
            let cbfunc = this.queue.shift();
            cbfunc&&cbfunc();
        }

        LazyMan.prototype.eat = function(meal){
            this.queue.push(()=>{
                console.log(`eat ${meal}`)
                this.callbackqueue()
            })
            return this;
        }

        LazyMan.prototype.sleep = function(time){
            this.queue.push(()=>{
                setTimeout(()=>{
                    console.log(`wake up after ${time}s`)
                    this.callbackqueue()
                },time*1000)
            })
            return this;
        }
        
        LazyMan.prototype.sleepFirst = function(time){
            this.queue.unshift(()=>{
                setTimeout(()=>{
                    console.log(`wake up ${time}s`)
                    this.callbackqueue()
                },time*1000)
            })
            return this;
        }
        new LazyMan('yxy')
            .eat('dinner')
            .eat('apple')
            .sleep(2)
            .sleepFirst(0.2)

let p = new LazyMan("hello").sleepFirst(1)
*/

/*
// promise + 队列
function LazyMan(name){
    this.queue = [initName];

    // 回调里的函数 需要返回promise
    function initName(){
        return new Promise(resolve=>{
            console.log(`hello this is ${name}`);
            resolve()
        })
    }

    // 异步执行 队列里的函数
    // 通过异步调用 将队列的启动执行推迟到下个 eventloop
    // 所有事件由队列管理
    Promise.resolve().then(()=>this.callbackqueue());
}
// 这里相当于 按顺序执行异步了吧
// 将异步函数push到数组里 然后通过promise链式调用(保证顺序)迭代
LazyMan.prototype.callbackqueue = function(){
    let sequence = Promise.resolve()
    // 遍历 queue里的函数  
    // 这个有一个完全不一样的 直接 迭代执行 回调队列的函数
    this.queue.forEach(func=>{
        // func()
        sequence = sequence.then(func)
    })
}

LazyMan.prototype.eat = function(meal){
    this.queue.push(()=>{
        console.log(`eat ${meal}`);
    })
    return this;
}

LazyMan.prototype.sleep = function(time){
    this.queue.push(()=>new Promise(resolve=>{
        setTimeout(()=>{
            console.log(`wake up ${time}s later`);
            resolve()
        },time*1000)
    }))
    return this;            
}

LazyMan.prototype.sleepFirst = function(time){
    // this.queue.unshift(()=>{
    //     setTimeout(()=>{
    //         console.log(`wake up ${time}s later`);
    //     },time*1000)
    // })
    // 
    this.queue.unshift(()=>new Promise(resolve=>{
        setTimeout(()=>{
            console.log(`wake up ${time}s later`);
            resolve()
        },time*1000)
    }))
    return this;  
}

// 这样有个问题。 异步的总在 同步的后面...
//let p = new LazyMan('yxy').eat('dinner').sleepFirst(0.2).eat('lunch').sleep(1).sleep(2);
new LazyMan('yxy')
    .sleepFirst(0.2)
    .eat('dinner')
    .sleep(1)

*/

/*
// promise 使用 async 代替
        function LazyMan(name){
            this.queue = [initName];
            function initName(){
                return new Promise(resolve=>{
                    console.log(`hello this is ${name}`)
                    resolve()
                })
            }


            // 执行启动
            setTimeout(async ()=>{
                // 直接在这里异步调用
                for(let func of this.queue){
                    await func()
                }  
            })
        }

        LazyMan.prototype.eat = function(meal){
            this.queue.push(() => {
                console.log(`eat ${meal}`)
            })
            return this
        }

        LazyMan.prototype.sleep = function(time){
            this.queue.push(()=>new Promise(resolve=>{
                setTimeout(()=>{
                    console.log(`wake up after ${time}s later`)
                    resolve()
                },time*1000)
            }))
            return this;
        }   
        LazyMan.prototype.sleepFirst = function(time){
            this.queue.unshift(()=>new Promise(resolve=>{
                setTimeout(()=>{
                    console.log(`wake up after ${time}s later`)
                    resolve()
                },time*1000)
            }))
            return this;
        }
        new LazyMan('yxy')
            .sleep(1)
            .eat('banana')
            .sleepFirst(2)

*/