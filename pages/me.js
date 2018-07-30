var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    page: [{
        tag: 'head',
        title: '我的信息',
        action: true,
        grey: true,
        aimStep: 0,
        // show: true,
      }, {
      //   tag: 'info',
      // }, {
        tag: 'list',
        content: [{
          text: '设置',
          url: 'settings/theme'
        // }, {
        //   text: '登录',
        //   url: 'settings/login'
        }, {
          text: '关于',
          url: 'settings/about'
        }, ]
      },
      {
        tag: 'foot',
        desc: '当前版本：' + a.Version
      },
    ],
  },
  onLoad() {
    c.setPage(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    w.on('nightmode', this, function(data) {
      console.log(data)
      this.setData({
        nm: data
      });
    });
  },
  onShow() {
    tab.tabBarChanger(a.nm);
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
})