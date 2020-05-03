$(document).ready(() => {
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
  }

  controller.init()
  // .createClass("Songs", { name: "test", singer: "test", description: "hello World!", cover: "" })
})

$(document).on("drop dragover", (e) => {
  e.preventDefault()
})
