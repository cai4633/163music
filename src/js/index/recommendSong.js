{
    let view = {
        el: ".recommendLists",
        template: `
        <li data-id='{{id}}'><a><img src="{{cover}}" alt="cover image" width="100%" /> <p class="descrition">{{name}}</p></a></li>
      `,
        init() {
            this.$el = $(this.el)
        },
        render(data = { lists: [] }, words = []) {
            data["lists"].forEach((list) => {
                let li = this.template
                words.forEach((word) => {
                    li = li.replace(`{{${word}}}`, list[word])
                })
                $(li).appendTo(this.$el)
            })
        },
    }
    let model = {
        data: { lists: [] },
        words: ["name", "cover", "id"],
        getRecommendLists() {
            const query = new AV.Query("playList")
            return query.find().then((lists) => {
                const set = this.getSixRondom(lists)
                set.forEach((list) => {
                    this.imageFormat(list.attributes,['cover','avatar'])
                    this.data.lists.push({ id: list.id, ...list.attributes })
                })
            })
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
        getSixRondom(array = []) {
            const length = 6
            let set = new Set()
            let result = []
            while (set.size < length) {
                set.add(array[Math.floor(Math.random() * array.length)])
            }
            return Array.from(set)
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.model.getRecommendLists().then(() => {
                this.view.render(this.model.data, this.model.words)
            })
            this.bindEvents()
        },
        bindEvents() {
            this.view.$el.on("click", "li", (e) => {
                let url =
                    document.URL.replace(/\/?(?:index.html)?(?:\?.+)?$/, "/playlist.html?id=") +
                    encodeURIComponent($(e.currentTarget).attr("data-id"))
                window.open(url, "_self")
            })
        },
    }
    controller.init(view, model)
}
