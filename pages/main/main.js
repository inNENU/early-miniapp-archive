var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '首页', top: true, show: true },
      { tag: 'p', head: '这里是东师青年官方小程序' },
      { tag: 'p', head: '首页制作中......' },
      { tag: 'list', head: false, content: [{ text: '主题设置', url: '/pages/settings/theme' }] },
      { tag: 'foot' },
    ],
  },
  onShow() { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }); u.tBC(a.nm); },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) },
})