var c = getApp().common,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: 'head',
      title: '关于',
      aimStep: 2,
      grey: true,
    }, {
      tag: 'list',
      head: '版本号',
      content: [{
        text: a.Version,
        button: 'debugMode'
      }, ]
    }, {
      tag: 'p',
      head: '正式版开发日志',
      text: 'V1.0.0\n小程序正式发布；'
    }, ]
  },
  onLoad(e) {
    c.setPage(this.data.page, this, a);
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
  debugMode() {

  }
})