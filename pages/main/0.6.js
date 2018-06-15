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
      text: '初步制作了文创商品界面结构；\n构建返回按钮；\ntab页改版，新增我的东师界面；'
    }, {
      tag: 'p',
      head: 'V0.6.5',
      text: '初步制作了文创商品的弹出层；\n优化了下载文件时的百分比显示；\n修复了wechat主题设置界面分割线重叠的问题；'
    }, {
      tag: 'p',
      head: 'V0.6.6',
      text: '修复了wechat夜间模式导航栏阴影异常；\n添加了iOS的navigationBar回弹动画；\n修改了p标签head参数逻辑；'
    }, {
      tag: 'p',
      head: 'V0.6.7',
      text: ''
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