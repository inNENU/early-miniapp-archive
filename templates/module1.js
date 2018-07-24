var c = getApp().commmon,
  a = getApp().globalData;
Page({
  onLoad(e) {
    c.getContent(this, a, e)
  },
  onReady() {
    c.preloadPage(this.data.page, a);
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  },
})