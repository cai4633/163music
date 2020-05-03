$(document).ready(() => {
  let view = {
    view: document.querySelector("view"),
  }

  let controller = {
    files: [],
    init() {
      AV.init({
        appId: "T3IwpOc7xgWfCpseFzJEbTpy-9Nh9j0Va",
        appKey: "9550pnCPDOdHCxajGsV0YN41",
        serverURL: "https://t3iwpoc7.lc-cn-e1-shared.com",
      })
      return this
    },

    createClass(className, obj) {
      const TestObject = AV.Object.extend(className)
      const testObject = new TestObject()
      for (key in obj) {
        testObject.set(key, obj[key])
      }
      testObject.save().then((object) => {
        console.log("保存成功")
      })
      return this
    },

    chooseFiles() {
      $("#chooseFiles").on("click", (e) => {
        $("#uploadInput").click()
      })

      $("#uploadInput").on("change", (e) => {
        const avatarUpload = document.getElementById("uploadInput")
        this.files = Array.from(avatarUpload.files)
        let description = this.files.length ? `已选择${this.files.length}个文件` : "请选择文件..."
        $(".text").text(description)
      })
      return this
    },

    upload() {
      //多文件上传
      $("#submit").on("click", () => {
        let count = 0
        if (this.files.length) {
          for (let i = 0; i < this.files.length; i++) {
            let localFile = this.files[i]
            let file = new AV.File(localFile.name, localFile)
            $(".text").text("上传进行中...")
            file.save().then((file) => {
              count++
              if (count === this.files.length) {
                $(".text").text(`上传完成！文件名：${file.attributes.name}。 外链：${file.attributes.url}`)
              }
            })
          }
        }
      })
      return this
    },

    drop(){
      $('#chooseFiles').on('drop',(e)=>{
        e.preventDefault()
        this.files = [].concat(Array.from(e.originalEvent.dataTransfer.files))
        let description = this.files.length ? `已选择${this.files.length}个文件` : "请选择文件..."
        $(".text").text(description)
      })
      return this
    }
  }

  controller
    .init()
    .chooseFiles()
    .upload()
    // .createClass("Songs", { name: "test", singer: "test", description: "hello World!", cover: "" })
    .drop()
})

$(document).on('drop dragover', (e)=>{
  e.preventDefault()
})