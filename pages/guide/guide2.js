var u = getApp().util, a = getApp().globalData;
Page({
  data: { T: a.T, nm: a.nm }, onLoad(e) { u.gC(this, a, e) }, onPageScroll(e) { u.nav(e, this.data.page, this) },
  img(e) { u.img(this.data.page, this, e) }, back() { u.back() },
})