var u = getApp().util,
  a = getApp().globalData,
  w = getApp().watcher;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '我的信息',
        action: true,
        show: true,
        grey: true
      }, {
        tag: 'info',
      }, {
        tag: 'list',
        content: [{
          text: '设置',
          url: '/pages/settings/theme'
        }, {
          text: '登录',
          url: '/pages/settings/login'
        }]
      },
      {
        tag: 'foot'
      },
    ],
  },
  onLoad() {
    u.sP(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    w.on('nightmode', this, function(data) {
      this.setData({
        nm: data
      });
    });
  },
  onPageScroll(e) {
    u.nav(e, this)
  }
})