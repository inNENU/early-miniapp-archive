var u = getApp().util, a = getApp().globalData;
Page({
  data: { T: a.T, nm: a.nm },
  onLoad(e) {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/miniProgram/' + e.aim + '.json', success(res) {
        console.log(a); console.log(res.data); u.sP(res.data, that, a, e)
      }
    });
  },
  onPageScroll(e) { u.nav(e, this.data.page, this) },
  img(e) { u.img(this.data.page, this, e) },
  back() { u.back() },
})