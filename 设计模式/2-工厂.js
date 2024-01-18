
class web{
    ask(){
        console.log('面试一些前端的问题');
    }
}


class linux{
    ask(){
        console.log('面试一些linux问题');
    }
}

class Hr{
    takeInterview(){
        const interViewer = this.makeInterView();
        interViewer.ask();
    }
}

class webManager extends Hr{
    makeInterView(){
        return new web();
    }
}

class linuxManager extends Hr{
    makeInterView(){
        return new linux();
    }
}

const mywebManager = new webManager();
mywebManager.takeInterview();

const mylinuxManager = new linuxManager();
mylinuxManager.takeInterview();


/***
 * 有啥好处？
 * 
 * 乍一看是 父类提取子类的 公共逻辑， 怎么调用决定权给了子类；
 * 和简单工厂比起来，子类有了决定权；
 * 
 * 
 * 什么时候有用：
 *      类之间有相似的逻辑，但是具体的行为依赖于调用的时候，即我们需要把这个new的方向给暴露出来。
 *      具体new什么是我们可以操作的，这是和简单工厂最大的差别；
 *      
 *      如上，工厂是 hr， 用户使用的时候是 继承他，自己决定new什么；
 * 
 *      等等。
 */