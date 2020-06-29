const deepClone=(obj)=>{
    if(obj == null)return obj
    if(obj instanceof Date)return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj!=='object') return obj
    let clone=new obj.constructor()
    Object.keys(obj).forEach(key=>{
        clone[key]=deepClone(obj[key])
    })
    return clone
}

let clone = JSON.parse(JSON.stringify(obj))