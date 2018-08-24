var P = require('../utils/wxpage');

P('web', {
  onLoad(res) {
    let title = res.title;
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      url: res.url,
      title
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.title,
      path: `/pages/main/web?url=${this.data.url}`
    }
  },
})