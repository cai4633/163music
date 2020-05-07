window.eventHub = {
  events: {},
  emit(event,data){
    if(!this.events[event] || !this.events[event].length){
      return;
    }
    this.events[event].forEach((fn)=>{
      fn.call(null,data)
    })
  },
  on(event,fn){
    this.events[event] || (this.events[event] = [])
    this.events[event].push(fn)
  }
}