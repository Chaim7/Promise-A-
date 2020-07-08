window.onscroll=debounce(fn,1000)

function debounce(fn,delay,immediate){
    let timer =null
    return function(){
        let context =this
        let args= arguments
        if(timer)clearTimeout(timer);
        if(immediate){
            let callNow = !timer
            timer=setTimeout(()=>{
                timer =null
            },delay)
            if(callNow)fn.apply(context,args)
        }else{
            timer = setTimeout(()=>{
                fn.apply(context,args)
            },delay)
        }
    }
}
 
function throttle(fn,delay,type){
   if(type===1){
       let previous = 0
   }else if(type ===2){
       let timer =null
   }
   return function(){
       let context = this
       let args =arguments
       if(type===1){
           let now = Date.now()
           if(now - previous>delay){
               fn.apply(context,delay)
               previous=now
           }

       }else if(type ===1){
            if(!timer){
                setTimeout(()=>{
                    timer=null
                    fn.apply(context,args)
                },delay)
            }
       }

   }
}


