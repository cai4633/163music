{
  let view = {
    el: '.recommendSong',
    init(){this.$el = $(this.el)}, 
    template: `
    <h1>推荐歌单</h1>
    <ul>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
      <li>
        <img
          src="http://p2.music.126.net/XjacbkhYbe21hgmdi4ihrA==/109951164829619895.jpg?imageView=1&type=webp&thumbnail=370x0"
          alt=""
          width="100%"
        />
        <p class="descrition">『欧美』 让歌声带着星光， 与梦相随</p>
      </li>
    </ul>
  
    `,
    render(data){
      this.$el.html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)

    }
  }
  controller.init(view, model)
}
