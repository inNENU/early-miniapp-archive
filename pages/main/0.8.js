var a = getApp().globalData,
  c = getApp().common;
Page({
  data: {
    T: a.T,
    nm: a.nm,
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
    }, {
      tag: 'p',
      head: 'V0.8.3',
      text: '初步构建校园风光wxml；\n数处bug修复；'
    }, {
      tag: 'p',
      head: 'V0.8.4',
      text: '界面渲染速度进一步提高；\n初步构建播放器界面；\n改进template；'
    }, {
      tag: 'p',
      head: 'V0.8.5',
      text: 'template进一步压缩；\n主题wxss优化压缩；'
    }, {
      tag: 'p',
      head: 'V0.8.6',
      text: '优化NENU主题；\n改进页脚；'
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