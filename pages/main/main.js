var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'nav', navtitle: '首页', top: true },
      { name: 'head', text: '首页' },
      { name: 'n', text: '' },
      { name: 'n', text: '\n开发版本：0.0.2i' },
      { name: 'n', text: '构建debug与精简版两个小程序版本；\n大幅减少精简版小程序代码数量；' },
      { name: 'h3', text: '这里是东师青年官方小程序' },
      { name: 'h3', text: '首页制作中......' },
    ],
  },
  onShow() {
    let SDK = wx.getSystemInfoSync().SDKVersion;
    if (SDK.charAt(0) < 2 && SDK.charAt(2) < 9) {
      wx.showModal({
        title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false,
        success(res) { if (res.confirm) { wx.navigateBack({}) }; }
      })
    }
    this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }); u.tBC(a.nm);
  },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  goTheme() { u.go("/pages/settings/theme") },
})