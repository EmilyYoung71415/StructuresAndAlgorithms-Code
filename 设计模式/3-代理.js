/**
 * 代理
 * 
 * 为其他对象提供一个代理以控制对这个对象的访问
 * 
 * 类比：门上的锁；
 *      锁都是一个开关嘛，但是外部接口可以不一样
 * 
 * 
 */

class LabDoor {
    open() {
        console.log('开门')
    }

    close() {
        console.log('关门')
    }
}
// 给门添加一个代理，代理通过某个步骤之后才能执行门的方法
class Security {
    constructor(door) {
        this.door = door
    }

    open(password) {
        if (this.authenticate(password)) {
            this.door.open()
        } else {
        	console.log('密码错误，访问失效')
        }
    }

    authenticate(password) {
        return password === 'ecr@t'
    }

    close() {
        this.door.close()
    }
}

const door = new Security(new LabDoor())
door.open('sjfhsdjfhs') // Big no! It ain't possible.

door.open('ecr@t') // Opening lab door
door.close() // Closing lab door