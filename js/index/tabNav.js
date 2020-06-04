{
  let view = {
    el: ".tab-nav",
    init() {
      this.$el = $(this.el)
    },
    template: `
    <ul>
      <li>
        <a href="javascript:;" data-id='page-1' class="active"><span>推荐音乐</span></a>
      </li>
      <li>
        <a href="javascript:;" data-id='page-2'><span>热歌榜</span></a>
      </li>
      <li>
        <a href="javascript:;" data-id='page-3'><span>搜索</span></a>
      </li>
    </ul>
  `,
    render(data) {
      this.$el.html(this.template)
    },
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)
      this.bindEvents()
    },
    bindEvents() {
      this.view.$el.on("click", "a", (e) => {
        e.preventDefault()
        this.view.$el.find('a').removeClass('active')
        $(e.currentTarget).addClass('active')
        window.eventHub.emit('tab-switch',$(e.currentTarget).attr('data-id'))
      })
    },
  }
  controller.init(view, model)
}
