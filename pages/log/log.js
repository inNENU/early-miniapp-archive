var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '开发日志', top: true },
      { name: 'h2', text: '' },
      { name: 'p', text: '这是一个临时的界面，用于记录开发日志。 随着开发进行该界面会被“我的信息”界面取代。' },
      { name: 'h2', text: '日志如下：' },
      { name: 'list', content: [{ text: 'alpha日志', url: 'alpha' }, { text: 'V0.1开发日志', url: '0.1' }] },
      { name: 'h2', text: '即将实现的内容：' },
      { name: 'p', text: '自动开启夜间模式；\n通过平台信息进行预设主题界面；\n重构主页界面；\n构建微信主题；\n构建微信夜间主题；\n利用iconfont压缩代码体积；' },
      { name: 'h2', text: '等待官方改进才能实现的内容：' },
      { name: 'p', text: 'iOS的navigationBar回弹动画；' },
    ],
  },
  onShow() { let page = u.sP(this.data.page, a); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
})