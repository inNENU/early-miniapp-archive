var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: 'head',
      title: 'V0.6开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.6.1',
      text: '修复完善了fileList部分更新的功能；\n简要制作了部分模块的夜间模式；'
    }, {
      tag: 'p',
      head: 'V0.6.2',
      text: '添加了swiper组件；\n改变了价格字体；'
    }, {
      tag: 'p',
      head: 'V0.6.3',
      text: '初步制作了东青文创中心界面；\n建立商品点击态；'
    }, {
      tag: 'p',
      head: 'V0.6.4',
      text: '初步制作了文创商品界面结构；\n构建返回按钮；\ntab页改版，新增我的东师界面'
    }, ],
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
})