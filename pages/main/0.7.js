var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: 'head',
      title: 'V0.7开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.7.1',
      text: ''
    }],
  },
  onLoad(e) {
    u.sP(this.data.page, this, a, e)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  },
  sN(e) {
    u.sN(e)
  }
})