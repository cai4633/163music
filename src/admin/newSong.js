{
  let view = {
    el: ".newSong",
    template: `
    <h1 class='new'>新建歌曲</h1>
    <ul></ul>
    `,
    render(data = { songs: [] }) {
      let { songs } = data
      let domLis = songs.map((song) => $("<li>").text(song["song_name"]))
      $(this.el).html(this.template)
      domLis.map((li) => $(this.el).find("ul").append(li))
    },
  }

  let model = { data: { songs: [] }, }

  let controller = {
    init(view, model) {
      Object.assign(this, { view, model })
      this.view.render(this.model.data)
      window.eventHub.on("getSongInfo", () => { this.active() })
      window.eventHub.on("saveSong", (data) => {
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
    },
    active() { $(".new").addClass("active") },
  }

  controller.init(view, model)
}
