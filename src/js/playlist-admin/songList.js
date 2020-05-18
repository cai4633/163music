{
    let view = {
        el: ".newSong",
        init() {
            this.$el = $(this.el)
        },
        template: `
    <h1 class='new'>新建歌单</h1>
    <ul></ul>
    `,
        render(data = { songs: [] }) {
            let { songs, selectedID } = data
            let domLis = songs.map((song, index) => {
                let li = $("<li>").text(song["name"])
                if (index === selectedID) {
                    li.addClass("active")
                }
                return li
            })
            $(this.el).html(this.template)
            domLis.map((li) => $(this.el).find("ul").append(li))
        },
    }

    let model = {
        data: { songs: [], selectedID: null },
        getAllList() {
            const query = new AV.Query("playList")
            return query.find().then((lists) => {
                lists.forEach((song) => {
                    this.data.songs.push({ id: song.id, ...song.attributes })
                })
            })
        },
    }

    let controller = {
        init(view, model) {
            Object.assign(this, { view, model })
            this.view.init()
            this.view.render(this.model.data)
            this.model.getAllList().then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        active(selector) {
            this.view.$el.find("*").removeClass("active").end().find(selector).addClass("active")
        },
        bindEvents() {
            this.view.$el.on("click", "li", (e) => {
                this.model.data.selectedID = $(e.target).index()
                window.eventHub.emit("selected", this.model.data.songs[$(e.target).index()])
                this.active(e.target)
            })
            window.eventHub.on("getSongInfo", () => {
                this.active(".new")
            })
            window.eventHub.on("new", (data) => {
                this.model.data.selectedID = null
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
                this.active(".new")
            })
            window.eventHub.on("update", () => {
                this.model.data.songs = []
                this.model.getAllList().then(() => {
                    this.view.render(this.model.data)
                })
            })
            this.view.$el.on("click", "h1.new", (e) => {
                window.eventHub.emit("getSongInfo", {})
                this.active(e.target)
            })
        },
    }

    controller.init(view, model)
}
