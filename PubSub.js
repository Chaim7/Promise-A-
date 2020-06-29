
 class PubSub{
    constructor(){
        this._map={}
    }
    publish(eventName,...rest){
        if(!eventName){
            throw new Error('eventName is undefinded')
        }
        const callbackArr = this._map[eventName] || []
        callbackArr.forEach(cb=>cb(...rest))
    }
    subscribe(eventName,callback){
        if(!eventName||!callback){
            throw new Error('Wrong')
        }
        if(!this._map[eventName]){
            this._map[eventName] =[]
        }
        this._map[eventName].push(callback)
    }
    unsubscribe(eventName,callback){
        if(!eventName){
            this._map={}
        }else if(eventName&&!callback){
            delete this._map[eventName]
        }else{
            const callbackArr =this._map[eventName]||[]
            this._map[eventName]=callbackArr.filter(cb=>(cb!==callback))
        }
    }
}
export default new PubSub()