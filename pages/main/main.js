var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '首页',
        top: true,
        show: true,
        grey: true
      },
      {
        tag: 'grid',
        head: false,
        content: [{
          text: '绩点计算(beta)',
          icon: '/icon/scoreCal.svg',
          url: 'details/cal'
        }, {
          text: '校园街景',
          icon: '/icon/map.svg',
          url: 'details/map'
        }, {
          text: '四六级',
          icon: '/icon/CET.svg',
          url: 'details/CET'
        }, {
          text: '成绩查询',
          icon: '/icon/score.svg',
          url: 'details/score'
        }, {
          text: '体测计算器',
          icon: '/icon/PECal.svg',
          url: 'details/PECal'
        }, ]
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