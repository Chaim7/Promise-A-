const PENDING = 'PENDING'
const REJECTED = 'REJECTED'
const RESOLVED = 'RESOLVED'
const resolvePromise = (Promise2, x, resolve, reject) => {
    if (Promise2 == x) {
        return reject(new TypeError('fdsfsdfsdf'))
    }
    let called
    if (typeof x == 'object' && typeof then != null || typeof x == 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(Promise2, y, resolve, reject)
                }, e => {
                    if(called) return
                    called=true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if(called)return
            called=true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.resolveCallback = []
        this.rejectCallback = []
        let resolve = (value) => {
            if (this.status == PENDING) {
                this.status = RESOLVED
                this.value = value
                this.resolveCallback.forEach(fn => fn(this.value))
            }

        }
        let reject = (reason) => {
            if (this.status == PENDING) {
            this.status = REJECTED
            this.value = reason
            this.rejectCallback.forEach(fn => fn(this.reason))
        }
    }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFufilled, onRejected) {
        onFufilled= typeof onFufilled=='function'?onFufilled:v=>v
        onRejected= typeof onRejected=='function'?onRejected:err=>{throw err}
        let Promise2 = new Promise((resolve, reject) => {
            if (this.status == PENDING) {

                this.resolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.value)
                            resolvePromise(Promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })

                this.rejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            onRejected(this.reason)
                            resolvePromise(Promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
            if (this.status == RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.value)
                        resolvePromise(Promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            }
            if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        onRejected(this.reason)
                        resolvePromise(Promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            }


        })
        return Promise2
    }
}
Promise.defe=Promise.deferred=function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve=resolve 
        dfd.reject=reject
    })
    return dfd
}
// cnpm i promises-aplus-tests -g
module.exports = Promise