var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    page: [{
      tag: 'head',
      title: '首页',
      action: true,
      aimStep: 1,
      grey: true,
    },{
      tag: 'foot',
      author: 'Mr.Hope',
      time: '2018/7/22'
    }, ],
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
  }
})