var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: 'V0.4开发日志', grey: true },
      { tag: 'p', head: 'V0.4.1', text: '微信导航栏底端的进一步优化调整；' },
      { tag: 'p', head: 'V0.4.2', text: '构建doc组件；' },
      { tag: 'p', head: 'V0.4.3', text: '构建list中的button模式；\n设置中加入立即刷新按钮；' },
      { tag: 'p', head: 'V0.4.4', text: '修复list夜间模式的bug；\n初步构建phone组件；' },
      { tag: 'p', head: 'V0.4.5', text: '初步构建slider的视图层；\n改进phone组件；\n修复button点击态失效的问题；' },
      { tag: 'p', head: 'V0.4.6', text: '加入日间夜间亮度滑块及调节开关；\n完整构建list中的slider；' },
      { tag: 'foot' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e) }, onPageScroll(e) { u.nav(e, this.data.page, this) }, back() { u.back() },
})