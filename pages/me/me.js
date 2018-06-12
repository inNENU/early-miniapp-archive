var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '我的信息',
        top: true,
        show: true,
        grey: true
      },
      {
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
    u.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    })
  },
  onShow() {
    u.sP(this.data.page, this, a);
    u.tBC(a.nm);
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
})