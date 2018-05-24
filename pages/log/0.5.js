var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: 'V0.5开发日志', grey: true },
      { tag: 'p', head: 'V0.5.1', text: '构建了出现错误显示的界面；\n改进了grid的显示效果；\n改进了微信主题下的分割线宽度；' },
      { tag: 'p', head: 'V0.5.2', text: '创建了login界面并进行了初步设计；' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e) }, onPageScroll(e) { u.nav(e, this) }, back() { u.back() },
})