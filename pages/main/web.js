var P = require('../../utils/wxpage');

P('web', {
  onLoad(res) {
    console.log('a')
    this.setData({
      url: res.url
    });
    //   let title = e.title ? e.title : '东师青年';
    //   console.log(title)
    //   wx.setNavigationBarTitle({
    //     title: title
    //   })
  },
})