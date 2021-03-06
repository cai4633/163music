{
    let view = {
        el: "div.head",
        template: `      
    <header>
        <div class='hd-bg'></div>
        <div class="plhead-wrap">
            <div class="banner">
                <img src="{{cover}}" alt="banner" />
                <span class="lshd-icon">歌单</span>
            </div>
            <div class="text">
                <h1>{{name}}</h1>
                <div class="uploader-wrap">
                    <div class="u-avatar">
                        <img src="{{avatar}}" alt="avatar" />
                    </div>
                    <span class="uploader">{{uploader}}</span>
                </div>
            </div>
        </div>
    </header>
    <section class="description">
        <div class="tag-wrap">
            <span>标签：</span>
            {{tag}}
        </div>
        <div class="desc-wrap">
            <span>简介：</span>
            <span class="desc">{{description}}</span>
        </div>
    </section>`,
        init() {
            this.$el = $(this.el)
        },
        render(data, words) {
            let html = this.template
            words.forEach((word) => {
                html = html.replace(`{{${word}}}`, data[word] || "")
            })
            this.$el.html(html)
            document.title = `${data.name}`
            $("div.hd-bg").css("background-image", `url(${data["cover"]})`)
        },
    }
    let model = {
        data: [],
        words: ["cover", "description", "uploader", "avatar", "name", "tag"],
        getPlayList() {
            let id = decodeURIComponent(document.location.search.match(/id\=([^&\n]+)?/)[1])
            const query = new AV.Query("playList")
            return query.get(id).then((todo) => {
                todo = todo.toJSON()
                Object.assign(this.data, todo)
                this.splitTags(this.data)
                this.imageFormat(this.data, ["cover", "avatar"])
            })
        },
        splitTags(data) {
            let tags = ""
            if (data["tag"]) {
                data["tag"].split(" ").forEach((tag) => {
                    tags += `<span class="tag">${tag}</span>`
                })
            }
            data["tag"] = tags
        },
        imageFormat(data, keys = []) {
            if (!this.hasWebp()) {
                keys.forEach((key) => {
                    data[key] = data[key].replace("&type=webp", "")
                })
            }
        },
        hasWebp() {
            //检测客户端是否支持webp格式
            return !!document.createElement("canvas").toDataURL("image/webp", 0.2).match("data:image/webp")
        },
    }
    let controller = {
        init(view, model) {
            Object.assign(this, { view, model })
            this.view.init()
            this.model.getPlayList().then(() => {
                this.view.render(this.model.data, this.model.words)
            })
            this.bindEvents()
        },
        bindEvents() {},
    }
    controller.init(view, model)
}
