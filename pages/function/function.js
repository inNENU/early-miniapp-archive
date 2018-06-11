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
				},]
			},
    ],
  },
  onShow() {
    u.sP(this.data.page, this, a)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
})