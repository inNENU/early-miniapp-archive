var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    pages: [{
      tag: 'head',
      title: '商品详情',
      grey: true,
    }, ]
  },
  onLoad(e) {
    u.sP(this.data.page, this, a, e)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  }
})