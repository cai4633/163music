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
      placeholder.forEach((str) => (html = html.replace(`__${str}__`, data[str] || "")))
      if (data.id) {
        html = html.replace("新建歌曲", "编辑歌曲")
      }
      $(this.el).html(html)
    },
    reset() {
      this.render({})
    },
  }

  let model = {
    data: {},
    createClass(className, obj) {
      const TestObject = AV.Object.extend(className)
      const testObject = new TestObject()
      for (key in obj) {
        testObject.set(key, obj[key])
      }
      return testObject.save().then(
        (object) => {
          Object.assign(this.data, {id: object.id})
        },
        (err) => {
          console.log(err)
        }
      )
    },
    update(id,obj) {
      const song = AV.Object.createWithoutData("Song", id)
      let str = ["song_name", "song_url", "singer"]
      str.forEach((key)=>{ song.set(key,obj[key]) })
      return song.save().then(()=>{
      })
    },
  }

  let controller = {
    init(view, model) {
      Object.assign(this, { view, model })
      this.view.init()
      this.view.render(this.model.data)
      this.bindEvents()
    },
    bindEvents() {
      this.view.$el.on("submit", "form", (e) => {
        e.preventDefault()
        let [strs, data] = [["song_name", "song_url", "singer"], {}]
        strs.forEach((str) => {
          data[str] = $(`#${str}`).val()
        })
        Object.assign(this.model.data, data)
        if (this.model.data.id) {
          // 更新
          this.model.update(this.model.data.id, this.model.data).then(()=>{
            window.eventHub.emit("update", JSON.parse(JSON.stringify(this.model.data)))
          })
        } else {
          //新建
          this.model.createClass("Song", data).then(() => {
            this.view.reset()
            window.eventHub.emit("new", this.model.data)
          })
          
        }
      })
      window.eventHub.on("getSongInfo", (data) => {
        this.model.data = data
        this.view.render(this.model.data)
      })
      window.eventHub.on("selected", (data) => {
        this.model.data = data
        this.view.render(this.model.data)
      })
    },
  }

  controller.init(view, model)
}