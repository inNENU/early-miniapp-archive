var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: 'V0.2开发日志' },
      { tag: 'p', head: 'V0.3.1', text: '重构了界面，优化小程序性能；' },
      { tag: 'p', head: 'V0.3.2', text: '修复了微信主题导航栏异常的问题；\n重新编写微信主题导航栏样式；' },
      { tag: 'p', head: 'V0.3.3', text: '精简了小程序样式代码;' },
      { tag: 'p', head: 'V0.3.4', text: '重新构建了P标签，废弃h2标签，废弃n标签;' },
      { tag: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})