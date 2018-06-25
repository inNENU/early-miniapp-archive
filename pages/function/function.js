var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '功能大厅',
        top: true
      },
      {
        tag: 'grid',
        head: '测试中',
        content: [{
          text: '绩点计算',
          icon: '/icon/scoreCal.svg',
          url: '/fuction/pages/details/cal'
        }, ]
      }, {
        tag: 'grid',
        head: '即将推出',
        content: [{
          text: '校园街景',
          icon: '/icon/map.svg',
          url: '/fuction/pages/details/map'
        }, {
          text: '四六级',
          icon: '/icon/CET.svg',
          url: '/fuction/pages/details/CET'
        }, {
          text: '成绩查询',
          icon: '/icon/score.svg',
          url: '/fuction/pages/details/score'
        }, {
          text: '体测计算器',
          icon: '/icon/PECal.svg',
          url: '/fuction/pages/details/PECal'
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