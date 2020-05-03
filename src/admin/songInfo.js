{
  let view = {
    el: ".view main",
    template: `
    <h1>新建歌曲</h1>
    <form action="">
      <div class="row">
        <label for="song-name">歌名</label><input id="song-name" type="text">
      </div>
      <div class="row">
        <label for="singer">歌手</label><input id="singer" type="text">
      </div>
      <div class="row">
        <label for="song-url">外链</label><input id="song-url" type="text">
      </div>
      <div class="row">
        <input type="submit" value="提交">
      </div>
    </form>
  `,
    render(data) {
      $(this.el).html(this.template)
    },
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view 
      this.model = model 
      this.view.render(this.model.data)
    }
  }
  controller.init(view,model)
}
