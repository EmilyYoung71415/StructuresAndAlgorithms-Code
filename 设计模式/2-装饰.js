/**
 * 装饰模式
 * 
 *  动态地给一个对象添加一些额外的职责，就扩展功能而言， 它比生成子类的方式更为灵活。
 * 
 * 
 * 例子：
 *      一个咖啡店，有基础款咖啡6元，在此基础上衍生4、6、8元不等的竞拍咖啡；
 *      每个类都差不多的，getcost、getdesc；每个衍生的类，返回的数据不一样；
 *      所以，比子类继承更有用？
 * 
 *      之所以称为装饰： 对于类相同的基础上，子类采用插入父类的方式，即父类作为基础组件。
 *                     装饰子类；
 * 
 *                  或者反过来理解，子类在父类的基础上增加了自己的东西，称呼为装饰父类？
 */


class SimpleCoffee{

    getCost() {
        return 10
    }
    getDescription() {
        return 'Simple coffee'
    }
}


class milkCoffe{
    constructor(coffee) {
        this.coffee = coffee
    }

    getCost() {
        return this.coffee.getCost() + 2
    }

    getDescription() {
        return this.coffee.getDescription() + ', milk'
    }
}


someCoffee = new SimpleCoffee()

coffee.getCost();

cod