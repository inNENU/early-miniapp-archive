var u = getApp().util, a = getApp().globalData;
Page({
  data: {
  },
  onLoad(e) {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/miniProgram/dorm.json', 
      // header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res); that.setData({ T: a.T, nm: a.nm, page: u.sP(res.data, a, e), }); console.log("set complete")
      }
    });
  },
  onLoad(e) { u.sP(this.data.page, this, a, e) }, onPageScroll(e) { u.nav(e, this.data.page, this) },
  img(e) { u.img(this.data.page, this, e) }, back() { u.back() },
})