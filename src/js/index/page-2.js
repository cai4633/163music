{
  let view = {
    el: '.tab-content .page-2',
    init(){this.$el = $(this.el)}, 
    template: `page-2`,
    render(data){
      this.$el.html(this.template)
    },
    hide(){
      this.$el.removeClass('active')
    },
    show(){
      this.$el.addClass('active')
    },
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)

    }
  }
  controller.init(view, model)
}
