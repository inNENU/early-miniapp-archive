var u = getApp().util, a = getApp().globalData;
// let app = getApp();
Page({
  data: {
    page: [
      { tag: 'head', title: '首页', top: true, show: true },
      { tag: 'p', head: '这里是东师青年官方小程序' },
      { tag: 'p', head: '首页制作中......' },
      { tag: 'list', head: false, content: [{ text: '设置', url: '/pages/settings/theme' }, { text: '登录', url: '/pages/settings/login' }] },
      { tag: 'foot' },
    ],
  },
  // onLoad() {
  //   app.pubSub.on('hello', (number) => {
  //     this.setData({
  //       helloMsg: 'hello times:' + number
  //     });
  //   });
  // },
  onShow() { u.sP(this.data.page, this, a); u.tBC(a.nm); },
  onPageScroll(e) { u.nav(e, this) },
})