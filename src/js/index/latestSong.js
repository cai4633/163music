{
  let view = {
    el: '.latest-song',
    init(){this.$el = $(this.el)}, 
    template: `
    <h1>最新歌曲</h1>
    <ul>
      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li></li>

      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li></li>
      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li></li>
      <li>
        <div class="left">
          <h2>暗示暗示暗示暗示暗暗示暗示暗暗示暗示暗暗示暗示暗示</h2>
          <div class="text"><span>SQ</span><span class="details">周鑫-暗示</span></div>
        </div>
        <div class="right">
          <span class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
          </span>
        </div>
      </li>
      <li></li>
    </ul>
  `,
    render(data){
      this.$el.html(this.template)
    }
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
