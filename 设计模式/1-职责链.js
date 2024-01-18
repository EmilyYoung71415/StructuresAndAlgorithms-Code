/**
 * 为解除请求的发送者和接收者之间耦合，而使多个对象都有机会处理这个请求；
 * 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它
 * 
 * 例子：
 *      我有三笔钱， 银行100余额，支付宝200，比特币300
 *      支付一样东西，支付方式优先级为： 银行、支付宝、比特币；
 *                  如果当前不够则选择下种支付方式
 */

class Account {

    setNext(account) {
        this.successor = account
    }
    
    pay(amountToPay) {
        if (this.canPay(amountToPay)) {
            console.log(`Paid ${amountToPay} using ${this.name}`)
        } else if (this.successor) {
            console.log(`Cannot pay using ${this.name}. Proceeding...`)
            this.successor.pay(amountToPay)
        } else {
            console.log('None of the accounts have enough balance')
        }
    }
    
    canPay(amount) {
        return this.balance >= amount
    }
}

class Bank extends Account {
    constructor(balance) {
        super()
        this.name = 'bank'
        this.balance = balance
    }
}

class Paypal extends Account {
    constructor(balance) {
        super()        
        this.name = 'Paypal'
        this.balance = balance
    }
}

class Bitcoin extends Account {
    constructor(balance) {
        super()        
        this.name = 'bitcoin'
        this.balance = balance
    }
}

// 初始化数据

const bank = new Bank(100)          // Bank with balance 100
const paypal = new Paypal(200)      // Paypal with balance 200
const bitcoin = new Bitcoin(300)    // Bitcoin with balance 300

// 定义优先级

bank.setNext(paypal)
paypal.setNext(bitcoin)

bank.pay(259)

/***
 * 手动添加递归的感觉？？？
 * 
 * 
 */

