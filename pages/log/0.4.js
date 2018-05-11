var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: 'V0.4开发日志', grey: true },
      { tag: 'p', head: 'V0.4.1', text: '微信导航栏底端的进一步优化调整；' },
      { tag: 'p', head: 'V0.4.2', text: '构建doc组件；' },
      { tag: 'foot' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e) }, onPageScroll(e) { u.nav(e, this.data.page, this) }, back() { u.back() },
})