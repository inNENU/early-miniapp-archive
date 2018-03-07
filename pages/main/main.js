var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '首页', top: true },
      { name: 'n', text: '\n开发版本：V0.2.1' },
      { name: 'n', text: '增加了夜间模式修改开始与启动时间的功能；\n添加了iOSpicker-view模板；\n改进了夜间模式设置函数；\n精简了界面js模板的代码数量；' },
      { name: 'h3', text: '这里是东师青年官方小程序' },
      { name: 'h3', text: '首页制作中......' },
      { name: 'list', content: [{ text: '主题设置', url: '/pages/settings/theme' }] },
    ],
  },
  onShow() {
    let SDK = wx.getSystemInfoSync().SDKVersion;
    if (SDK.charAt(0) <= 1 && SDK.charAt(2) < 9) {
      wx.showModal({
        title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false,
        success(res) { if (res.confirm) { wx.navigateBack({}) }; }
      })
    }
    this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }); u.tBC(a.nm);
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})