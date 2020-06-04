{
    let view = {
        el: ".view main .addSong",
        init() {
            this.$el = $(this.el)
        },
        template: `
    <h1>添加歌单歌曲</h1>
    <form action="">
        <div class="row">
             <label for="name">歌单名</label><input id="name" type="text" value='__name__' required='required'>
         </div>
        <div class="row">
             <label for="song_name">歌名</label><input id="song_name" type="text" value='' required='required'>
        </div>
        <div class="row">
              <label for="singer">歌手</label><input id="singer" type="text" value='' required='required'>
        </div>
        <div class="row">
            <label for="cover">封面</label><input id="cover" type="text" value='' required='required'>
        </div>
        <div class="row">
            <label for="background">背景</label><input id="background" type="text" value='' required='required'>
        </div>
        <div class="row">
            <label for="song_url">外链</label><input id="song_url" type="text" value='' required='required'>
            <label for="163_url" class='outer-url'>网易云外链</label><input id="outer-url" type="checkbox" checked value='outer-url'>
        </div>
        <div class="row">
            <label for="lyric">歌词</label><textarea id="lyric" cols='40' rows='10' required ></textarea>
      </div>
        <div class="row">
          <input type="submit" value="提交" class='submit'>
        </div>
    </form>
  `,
        render(data = {}, words = []) {
            words = ["name"]
            let html = this.template
            words.forEach((str) => (html = html.replace(`__${str}__`, data[str] || "")))
            if (data.id) {
                html = html.replace("d歌单", "添加歌单歌曲")
            }
            $(this.el).html(html)
        },
        reset(words = []) {
            this.render({}, words)
        },
        hide() {
            this.$el.hide()
        },
        show() {
            this.$el.show()
        },
    }

    let model = {
        data: {},
        listID: "",
        words: ["name", "cover", "avatar", "song_name", "singer", "background", "song_url", "lyric"],
        createClass(className, obj) {
            const TestObject = AV.Object.extend(className)
            const testObject = new TestObject()
            const list = AV.Object.createWithoutData("playList", this.listID)
            for (key in obj) {
                testObject.set(key, obj[key])
            }
            testObject.set("list", list)
            return testObject.save().then(
                (object) => {
                    Object.assign(this.data, { id: object.id })
                    confirm("歌曲添加成功！")
                },
                (err) => {
                    console.log(err)
                }
            )
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
                if ($("#outer-url").prop("checked")) {
                    let temp = this.getOuterUrl(data["song_url"])[1]
                    data["song_url"] = `http://music.163.com/song/media/outer/url?id=${temp}.mp3`
                }
                Object.assign(this.model.data, data)
                this.model.createClass("Song", data).then(() => {
                    this.view.reset(this.model.words)
                })
            })
            window.eventHub.on(["selected", "getSongInfo"], (data) => {
                this.view.render((this.model.data = data), this.model.words)
            })
            window.eventHub.on("pop-add-song", (data) => {
                this.view.show()
                this.model.listID = data
            })
            window.eventHub.on("hide-add-song", (data) => {
                this.view.hide()
            })
        },
    }

    controller.init(view, model)
}
