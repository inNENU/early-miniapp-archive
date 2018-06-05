var u = getApp().util, a = getApp().globalData;
Page({
  onLoad(e) { u.gC(this, a, e) }, onPageScroll(e) { u.nav(e, this) },
  back() { u.back() },
  cA(e) { u.cA(e, this) },
})