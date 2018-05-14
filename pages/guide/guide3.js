var u = getApp().util, a = getApp().globalData;
Page({
  onLoad(e) { u.gC(this, a, e) }, onPageScroll(e) { u.nav(e, this) },
  img(e) { u.img(e, this) }, phone(e) { u.phone(e, this) }, doc(e) { u.doc(e) }, back() { u.back() },
})