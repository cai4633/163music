{
    let view = {
        el: ".songlist",
        init() {
            this.$el = $(this.el)
        },
        template: ` <ul>{{contents}}</ul> `,
        li: ` <li data-id="{{id}}">
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
</li>`,
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
            let html = this.template.replace("{{contents}}", texts.join(""))
            this.$el.html(html)
        },
    }
    let model = {
        data: { songs: [] },
        getAllList() {
            const query = new AV.Query("Song")
            const id = document.location.search.match(/\?id=([#%\w]+)(&)?/)[1]
            const list = AV.Object.createWithoutData("playList", id)
            query.equalTo('list',list)
            return query.find().then((songs) => {
                songs.forEach((song) => {
                    this.data.songs.push({ id: song.id, ...song.attributes })
                })
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.model.getAllList().then(() => {
                this.view.render(this.model.data)
                this.bindEvent()
            })
        },
        bindEvent() {
            this.view.$el.find("ul li").on("click", (e) => {
                let url = document.URL.replace(/\/?(?:playlist.html)?(?:\?.+)?$/, "/song.html?id=")
                url += encodeURIComponent($(e.currentTarget).attr("data-id"))
                window.open(url, "_self")
            })
        },
    }
    controller.init(view, model)
}
