{
  let view = {
    el: ".upload",
    template: `
    <input type="file" id="uploadInput" hidden multiple />
    <div id="chooseFiles">
      <p>点击或者拖拽文件</p>
      <p>文件大小不超过10M</p>
    </div>
    <button id="submit">上传</button>
    <span class="text">请选择文件...</span>
  `,
    render(data) {
      $(this.el).html(this.template)
    },
  }

  let model = {}

  let controller = {
    init(view, model) {
      Object.assign(this, { view, model })
      this.view.render(this.model.data)
      this.bindEvents()
    },
    bindEvents() {
      $("#chooseFiles").on("click", (e) => {
        $("#uploadInput").click()
      })
      $("#uploadInput").on("change", (e) => {
        this.files = Array.from($("#uploadInput")[0].files)
        let description = this.files.length ? `已选择${this.files.length}个文件` : "请选择文件..."
        $(".text").text(description)
      })
      $("#chooseFiles").on("drop", (e) => {
        e.preventDefault()
        this.files = [].concat(Array.from(e.originalEvent.dataTransfer.files))
        let description = this.files.length ? `已选择${this.files.length}个文件` : "请选择文件..."
        $(".text").text(description)
      })
      //多文件上传
      $("#submit").on("click", () => {
        this.upload()
      })
    },
    upload() {
      let count = 0
      if (this.files.length) {
        for (let i = 0; i < this.files.length; i++) {
          let file = new AV.File(this.files[i].name, this.files[i])
          $(".text").text("上传进行中...")
          file.save().then(({ attributes: { url, name } }) => {
            window.eventHub.emit("getSongInfo", {
              "song_url": url,
              "song_name": name,
            })
            count++
            if (count === this.files.length) {
              $(".text").text(`上传完成！`)
            }
          })
        }
      }
    },
  }

  controller.init(view, model)
}
