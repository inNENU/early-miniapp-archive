var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '功能大厅',
        action: true
      },
      {
        tag: 'grid',
        head: '测试中',
        content: [{
          text: '绩点计算',
          icon: '/icon/scoreCal.svg',
          url: '/function/cal'
        }, ]
      }, {
        tag: 'grid',
        head: '即将推出',
        content: [{
          text: '校园街景',
          icon: '/icon/map.svg',
          url: '/function/map'
        }, {
          text: '四六级',
          icon: '/icon/CET.svg',
          url: '/function/CET'
        }, {
          text: '成绩查询',
          icon: '/icon/score.svg',
          url: '/function/score'
        }, {
          text: '体测计算器',
          icon: '/icon/PECal.svg',
          url: '/function/PECal'
        }, ]
      },
    ],
  },
  onShow() {
    u.sP(this.data.page, this, a)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  sN(e) {
    u.sN(e)
  }
})