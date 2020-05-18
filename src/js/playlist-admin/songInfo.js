{
    let view = {
        el: ".view main",
        init() {
            this.$el = $(this.el)
        },
        template: `
    <h1>新建歌单</h1>
    <form action="">
      <div class="row">
        <label for="name">歌单名</label><input id="name" type="text" value='__name__' required='required'>
      </div>
      <div class="row">
        <label for="cover">封面</label><input id="cover" type="text" value='__cover__' required='required'>
      </div>
      <div class="row">
      <div class="row">
        <label for="tag">标签</label><input id="tag" type="text" value='__tag__' required='required'>
      </div>
        <label for="uploader">上传者</label><input id="uploader" type="text" value='__uploader__' required='required'>
      </div>
      <div class="row">
        <label for="avatar">头像</label><input id="avatar" type="text" value='__avatar__' required='required'>
      </div>
      <div class="row">
        <label for="description">简介</label><textarea id="description" cols='40' rows='10' required >__description__</textarea>
      </div>
      <div class="row">
        <input type="submit" value="提交" class='submit'>
      </div>
    </form>
  `,
        render(data = {}, words = []) {
            let html = this.template
            words.forEach((str) => (html = html.replace(`__${str}__`, data[str] || "")))
            if (data.id) {
                html = html.replace("新建歌单", "编辑歌单")
            }
            $(this.el).html(html)
        },
        reset(words = []) {
            this.render({}, words)
        },
    }

    let model = {
        data: {},
        words: ["name", "uploader", "tag", "description", "cover", "avatar"],
        createClass(className, obj) {
            const TestObject = AV.Object.extend(className)
            const testObject = new TestObject()
            for (key in obj) {
                testObject.set(key, obj[key])
            }
            return testObject.save().then(
                (object) => {
                    Object.assign(this.data, { id: object.id })
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        update(id, obj) {
            const song = AV.Object.createWithoutData("playList", id)
            this.words.forEach((key) => {
                song.set(key, obj[key])
            })
            return song.save().then(() => {})
        },
    }

    let controller = {
        init(view, model) {
            Object.assign(this, { view, model })
            this.view.init()
            this.view.render(this.model.data, this.model.words)
            this.bindEvents()
        },
        getOuterUrl(url) {
            return url.match(/(^\d+$)/) || url.match(/\?id\=(\d+)/)
        },
        bindEvents() {
            this.view.$el.on("submit", "form", (e) => {
                e.preventDefault()
                let data = {}
                this.model.words.forEach((str) => {
                    data[str] = $(`#${str}`).val()
                })
                Object.assign(this.model.data, data)
                if (this.model.data.id) {
                    // 更新
                    this.model
                        .update(this.model.data.id, this.model.data)
                        .then(() => {
                            window.eventHub.emit("update", JSON.parse(JSON.stringify(this.model.data)))
                        })
                        .then(() => {
                            this.view.render((this.model.data = {}), this.model.words)
                        })
                } else {
                    //新建
                    this.model.createClass("playList", data).then(() => {
                        this.view.reset(this.model.words)
                        window.eventHub.emit("new", this.model.data)
                    })
                }
            })
            window.eventHub.on(["selected", "getSongInfo"], (data) => {
                this.view.render((this.model.data = data), this.model.words)
            })
        },
    }

    controller.init(view, model)
}
