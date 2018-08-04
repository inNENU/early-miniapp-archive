var a = getApp().globalData,
  c = getApp().common;
Page({
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: 'head',
      title: 'V0.9开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.9.0',
      text: '播放器界面美化；\n初步建立播放器播放逻辑；\n初步动态设置文字；'
    }, {
      tag: 'p',
      head: 'V0.9.1',
      text: '数个bug修复；\n字体显示效果优化；\n安卓段落在某些机型上显示异常的修复；'
    }, {
      tag: 'p',
      head: 'V0.9.2',
      text: '音乐播放器界面制作了进度条；\n关于界面报错修复；\段落空格大小修复；'
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