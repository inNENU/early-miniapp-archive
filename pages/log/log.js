var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '开发日志', top: true },
      { name: 'p', text: '这是一个临时的界面，用于记录开发日志。 随着开发进行该界面会被“我的信息”界面取代。' },
      { name: 'list', heading:'日志如下：',content: [{ text: 'alpha日志', url: 'alpha' }, { text: 'V0.1开发日志', url: '0.1' }, { text: 'V0.2开发日志', url: '0.2' }] },
      { name: 'h2', text: '即将实现的内容：' },
      { name: 'p', head:'即将实现的内容：',text: '开启夜间模式时减少亮度；\n重构主页界面；\n构建微信夜间主题；\n利用iconfont压缩代码体积；\n构建iOSlist icon；\n适配iOSpicker-view夜间模式；' },
      { name: 'h2', text: '等待官方改进才能实现的内容：' },
      { name: 'p', text: 'iOS的navigationBar回弹动画；' },
    ],
  },
  onShow() { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})