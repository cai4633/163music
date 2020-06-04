window.eventHub = {
  events: {},
  emit(event,data){
    if(this.events[event] && this.events[event].length){
      this.events[event].forEach((fn)=>{
        fn.call(null,data) 
      })
    }
  },
  on(event,fn){
    if(Array.isArray(event)){
      event.forEach((item)=>{
        this.events[item] = this.events[item] || []
        this.events[item].push(fn)
      })
    }else{
      this.events[event] = this.events[event] || []
      this.events[event].push(fn)
    }
  }
}