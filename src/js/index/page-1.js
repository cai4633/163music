{
  let view = {
    el: ".tab-content .page-1",
    init() {
      this.$el = $(this.el)
    },
    template: `    
    <section class="recommendSong"></section>
    <seciton class="latest-song"></seciton> 
    <script src="./js/index/recommendSong.js"></script> 
    <script src="./js/index/latestSong.js"></script>
    `,
    render(data) {
      this.$el.html(this.template)
    },
    hide(){
      this.$el.removeClass('active')
    },
    show(){
      this.$el.addClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)
      window.eventHub.on('tab-switch',(data)=>{
        $('.tab-content').children().removeClass('active').end().find(`.${data}`).addClass('active')
      })
    },
  }
  controller.init(view, model)
}
