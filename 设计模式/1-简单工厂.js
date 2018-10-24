class WoodenDoor{
    constructor(w,h){
        this.width = w;
        this.height = h;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }
}

// 工厂
const simpleFactory ={
    whDoor:(w,h)=>new WoodenDoor(w,h)
}

// 使用
const myDoor = simpleFactory.whDoor(200,300);
console.log(myDoor.getHeight());
console.log(myDoor.getWidth());
