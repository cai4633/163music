{
  let controller = {
    files: [],
    init() {
      AV.init({
        appId: "T3IwpOc7xgWfCpseFzJEbTpy-9Nh9j0Va",
        appKey: "9550pnCPDOdHCxajGsV0YN41",
        serverURL: "https://t3iwpoc7.lc-cn-e1-shared.com",
      })
      this.bindEvents()
    },

    bindEvents() {
      $(document).on("drop dragover", (e) => {
        e.preventDefault()
      })
    },
  }

  controller.init()
}
