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
      text: '完善了关于界面；\n首页改版，制作了功能未完成的回调界面；'
    }, {
      tag: 'p',
      head: 'V0.8.1',
      text: '地图界面进一步改进；\n修复转发界面；\n修复通知；'
    }, {
      tag: 'p',
      head: 'V0.8.2',
      text: '加入音乐界面；'
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