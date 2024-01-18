/**
 * 组合：
 *      将对象组合成树形结构以表示“部分-整体”的层次结构，
 *      它使得客户对单个对象和复合对象的使用具有一致性。
 * 
 *  例子：
 *      一个公司下很多雇员，单个考虑雇员是独立的。
 *      雇员之间，有很多相似的： 都要的工资、名字；但是也有不同的，角色不同，工种不同；
 *      但是现在将其组合起来形成组织架构
 *      
 *      如设计师和工程师两类，都有方法：getname\getsalary; 
 *      不同的是设计师;design; 工程师develop
 * 
 *      现在创建一个组织架构organization 包含了很多不同种的雇员；
 *      每次通过这个组织类，来统计该组织的总共工资；
 */


 class Develop{
    constructor(name, salary) {
        this.name = name
        this.salary = salary
    }

    getName() {
        return this.name
    }

    setSalary(salary) {
        this.salary = salary
    }

    getSalary() {
        return this.salary
    }

    getRoles() {
        return this.roles
    }

    develop() {
    }
 }

 class Designer {

    constructor(name, salary) {
        this.name = name
        this.salary = salary
    }

    getName() {
        return this.name
    }

    setSalary(salary) {
        this.salary = salary
    }

    getSalary() {
        return this.salary
    }

    getRoles() {
        return this.roles
    }

    design() {
    }
}

class Organization {
    constructor(){
        this.employees = []
    }

    addEmployee(employee) {
        this.employees.push(employee)
    }

    getNetSalaries() {
        let netSalary = 0

        this.employees.forEach(employee => {
            netSalary += employee.getSalary()
        })

        return netSalary
    }
}

// 使用
const john = new Designer('john',233);
const xiaohong = new Develop('xiaohong',2234);

const group = new Organization();
group.addEmployee(john);
group.addEmployee(xiaohong)

console.log(group.getNetSalaries());