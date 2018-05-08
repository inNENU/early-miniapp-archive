var u = getApp().util, a = getApp().globalData;
Page({
  data: {},
  onLoad(e) { let that = this; wx.request({ url: 'https://mrhope.top/miniProgram/' + e.aim + '.json', success(res) { that.setData({ T: a.T, nm: a.nm, page: u.sP(res.data, a, e), }); } }); },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } }, img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})