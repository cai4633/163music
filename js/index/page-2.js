{
    let view = {
        el: ".tab-content .page-2",
        init() {
            this.$el = $(this.el)
        },
        template: `
    <div class="banner">
        <h1></h1>
        <p>更新日期：<span class="date">{{date}}</span></p>
    </div>
    <div class="hotSong"><ul>{{content}}</ul></div>
    `,
        li: `
    <li data-id="{{id}}">
                <div class="left">
                    <span class="index">{{index}}</span>
                </div>
                <div class="mid">
                    <h3>{{song_name}}</h3>
                    <div class="text"><span class="sq"></span><span class="details">{{singer}}-{{song_name}}</span></div>
                </div>
                <div class="right">
                    <span class="play"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-pl-play"></use></svg></span>
                </div>
    </li>
    `,
        render(data) {
            let songs = data.songs
            let keys = ["song_name", "singer", "id", "index"]
            let texts = []
            songs.forEach((song, index) => {
                let text = this.li
                Object.assign(song, { index: index + 1 })
                keys.forEach((str) => {
                    text = text.replace(new RegExp(`{{${str}}}`, "g"), song[`${str}`])
                })
                texts.push(text)
            })
            let obj = {
                content: texts.join(""),
                date: `${data.list.month}月${data.list.day}日`,
            }
            const strs = ["content", "date"]
            let html = this.template
            strs.forEach((str) => {
                html = html.replace(`{{${str}}}`, obj[str] || null)
            })
            this.$el.html(html)
        },
        hide() {
            this.$el.removeClass("active")
        },
        show() {
            this.$el.addClass("active")
        },
    }
    let model = {
        data: { songs: [], list: {} },
        datePaser(date) {
            return {
                month: new Date(date).getMonth() + 1,
                day: new Date(date).getDate(),
            }
        },
        getSongsFromList() {
            const querySong = new AV.Query("Song")
            const queryList = new AV.Query("playList")
            const list = AV.Object.createWithoutData("playList", "5ec3e743a1988300079bbfdc")
            querySong.equalTo("list", list)
            queryList.equalTo("objectId", "5ec3e743a1988300079bbfdc")
            return Promise.all([
                queryList.first().then((list) => {
                    this.data.list = this.datePaser(list.updatedAt)
                }),
                querySong.find().then((songs) => {
                    songs.forEach((song) => {
                        this.data.songs.push({ id: song.id, ...song.attributes })
                    })
                }),
            ])
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.model.getSongsFromList().then(() => {
                this.view.render(this.model.data)
                this.bindEvent()
            })
        },
        bindEvent() {
            this.view.$el.find("ul li").on("click", (e) => {
                let url = document.URL.replace(/\/?(?:index.html)?(?:\?.+)?$/, "/song.html?id=")
                url += encodeURIComponent($(e.currentTarget).attr("data-id"))
                window.open(url, "_self")
            })
        },
    }
    controller.init(view, model)
}
