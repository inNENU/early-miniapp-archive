var a = getApp().globalData,
  c = getApp().common;
Page({
  data: {
    page: [{
      tag: 'head',
      title: 'V0.8开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.8.0',
      text: ''
    }],
  },
  onLoad(e) {
    c.setPage(this.data.page, this, a, e)
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  }
})