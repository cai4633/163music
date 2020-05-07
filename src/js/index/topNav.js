{
  let view = {
    el: ".top-nav",
    init() {
      this.$el = $(this.el)
    },
    template: `
    <ul>
      <li>
        <a href="javascript:;" class="active"><span>推荐音乐</span></a>
      </li>
      <li>
        <a href="javascript:;"><span>热歌榜</span></a>
      </li>
      <li>
        <a href="javascript:;"><span>搜索</span></a>
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
      })
    },
  }
  controller.init(view, model)
}
