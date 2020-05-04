{
  let view = {
    el: ".view main",
    init() {
      this.$el = $(this.el)
    },
    template: `
    <h1>新建歌曲</h1>
    <form action="">
      <div class="row">
        <label for="song_name">歌名</label><input id="song_name" type="text" value='__song_name__'>
      </div>
      <div class="row">
        <label for="singer">歌手</label><input id="singer" type="text" value='__singer__'>
      </div>
      <div class="row">
        <label for="song_url">外链</label><input id="song_url" type="text" value='__song_url__'>
      </div>
      <div class="row">
        <input type="submit" value="提交" class='submit'>
      </div>
    </form>
  `,
    render(data = {}) {
      let [placeholder, html] = [["song_name", "singer", "song_url"], this.template]
      placeholder.forEach((str) => html = html.replace(`__${str}__`, data[str] || "") )
      $(this.el).html(html)
    },
    reset() { this.render({}) },
  }

  let model = {
    createClass(className, obj) {
      const TestObject = AV.Object.extend(className)
      const testObject = new TestObject()
      for (key in obj) { testObject.set(key, obj[key]) }
      return testObject.save().then(
        (object) => { console.log("保存成功") },
        (err) => { console.log(err) }
      )
    },
  }

  let controller = {
    init(view, model) {
      Object.assign(this, { view, model })
      this.view.init()
      this.view.render(this.model.data)
      this.bindEvents()
      window.eventHub.on("getSongInfo", (data) => { this.view.render(data) })
    },
    bindEvents() {
      this.view.$el.on("submit", "form", (e) => {
        e.preventDefault()
        let [ids, data] = [["song_name", "song_url", "singer"], {}]
        ids.forEach((id) => { data[id] = $(`#${id}`).val() })
        this.model.createClass("Songs", data).then(() => { this.view.reset() })
        window.eventHub.emit("saveSong", data)
      })
    },
  }

  controller.init(view, model)
}
