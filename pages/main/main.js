var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '首页', top: true },
      { name: 'h3', text: '这里是东师青年官方小程序' },
      { name: 'h4', text: '首页制作中......' },
      { name: 'list', heading: false, content: [{ text: '主题设置', url: '/pages/settings/theme' }] },
    ],
  },
  onShow() {
    this.setData({ version: a.Version, T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }); u.tBC(a.nm);
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) },
})