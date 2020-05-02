$(document).ready(() => {
  let view = {
    view: document.querySelector("view"),
  }

  let controller = {
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
        console.log("保存成功。")
      })
      return this
    },

    chooseFiles() {
      $("#chooseFiles").on("click", (e) => {
        $("#uploadInput").click()
      })

      $("#uploadInput").on("change", (e) => {
        const avatarUpload = document.getElementById("uploadInput")
        let fileName = ""
        let length = avatarUpload.files.length
        if (length) {
          fileName = `已选择${length}个文件`
        }
        let description = fileName ? fileName : "请选择文件..."
        $(".text").text(description)
      })
      return this
    },

    upload() {
      //多文件上传
      $("#submit").on("click", () => {
        const avatarUpload = document.getElementById("uploadInput")
        let count = 0
        if (avatarUpload.files.length) {
          for (let i = 0; i < avatarUpload.files.length; i++) {
            let localFile = avatarUpload.files[i]
            let file = new AV.File(localFile.name, localFile)
            $(".text").text("上传进行中...")
            file.save().then((file) => {
              count++
              if (count === avatarUpload.files.length) {
                $(".text").text("上传完成！")
              }
            })
          }
        }
      })
      return this
    },
  }

  controller
    .init()
    .chooseFiles()
    .upload()
    .createClass("Songs", { name: "test", singer: "test", description: "hello World!", cover: "" })
})
