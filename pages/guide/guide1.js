var u = getApp().util, a = getApp().globalData;
Page({
  onLoad(e) { u.gC(this, a, e) }, onPageScroll(e) { u.nav(e, this.data.page, this) },
  img(e) { u.img(this.data.page, this, e) }, phone(e) { u.phone(this.data.page, e) }, doc(e) { u.doc(e) }, back() { u.back() },
})