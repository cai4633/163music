{
  let view = {
    el: '.tab-content .page-3',
    init(){this.$el = $(this.el)}, 
    template: `<div class='search-wrapper'><i><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-search"></use> </svg></i><input type='search' placeholder='搜索歌曲'></div> `,
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
