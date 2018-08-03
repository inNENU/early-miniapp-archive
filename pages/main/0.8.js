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
      text: '界面渲染速度进一步提高；\n初步构建播放器界面；\n改进template，加入template-all模板；'
    }, {
      tag: 'p',
      head: 'V0.8.5',
      text: 'template进一步压缩，通用模板一体化；\n优化压缩iOS.wxss；'
    }, {
      tag: 'p',
      head: 'V0.8.6',
      text: '优化压缩Android.wxss；\n修复tabbar阴影在安卓上显示异常的问题；\n改进页脚；'
    }, {
      tag: 'p',
      head: 'V0.8.7',
      text: '优化压缩NENU.wxss；\n改进NENU头部标题；\n抽取构建common.wxss；\n加入wx.setBackgroundcolor；'
    }, {
      tag: 'p',
      head: 'V0.8.8',
      text: 'Android图片bug修复；\n改进shop页显示；\n改进p标签文字；'
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