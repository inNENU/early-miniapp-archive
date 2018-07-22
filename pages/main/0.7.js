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
      head: 'V0.7.0',
      text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
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