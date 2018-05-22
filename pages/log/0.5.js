var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: 'V0.5开发日志', grey: true },
      { tag: 'p', head: 'V0.5.1', text: '构建了出现错误显示的界面；' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e) }, onPageScroll(e) { u.nav(e, this) }, back() { u.back() },
})