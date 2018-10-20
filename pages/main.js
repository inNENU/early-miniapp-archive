var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  tab = require("../utils/tab");

P('main', {
  data: {
    page: [{
      tag: "head",
      title: "首页",
      action: true,
      aimStep: 1,
      grey: true,
      shareable: true,
      aim: "main"
    }, {
      tag: "list",
      head: "了解学业",
      content: [{
        text: "我要上哪些课？",
        desc: "课程计划",
        aim: "study9"
      }, {
        text: "通识教育课程",
        aim: "study5"
      }, {
        text: "专业教育课程",
        aim: "study6"
      }, {
        text: "发展方向课程",
        aim: "study7"
      }, {
        text: "了解更多",
        aim: "study5"
      }]
    }],
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date() - a.d, 'ms');
    let page = wx.getStorageSync('main');
    S.preSet(page ? page : this.data.page, a, null, this, false);
    tab.tabBarChanger(a.nm);
  },
  onLoad() {
    tab.tabBarChanger(a.nm);
    wx.startPullDownRefresh();
    S.request('main/main', (data, indicator) => {
      S.Set(data, a, null, indicator);
      wx.stopPullDownRefresh();
      wx.setStorageSync('main', data);
    }, this);
    S.Notice('main');
  },
  onReady() {
    let that = this;
    this.$on('theme', data => {
      that.setData({
        T: data
      });
    });
    this.$on('nightmode', data => {
      that.setData({
        nm: data
      });
    });
    // ['guide', 'function'].forEach(x => {
    //   S.request(`main/${x}`, (data, indicator) => {
    //     indicator.$put(x, data);
    //     indicator.$preload(`${x}?name=${x}`);
    //     wx.setStorageSync(x, data);
    //   }, this)
    // });
    this.$preload(`me`);
    //调试
    // wx.openUrl({
    //   url: 'http://mrhope.top',
    //   fail: (msg) => {
    //     console.log('fail:', msg)
    //   },
    //   success: (msg) => {
    //     console.log('success:', msg)
    //   }
    // })
  },
  onPullDownRefresh() {
    S.request('main/main', (data, indicator) => {
      S.Set(data, a, null, indicator);
      wx.stopPullDownRefresh();
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
  onShareAppMessage() {
    return {
      title: 'NenuYouth',
      path: `/pages/main`
    }
  },
})