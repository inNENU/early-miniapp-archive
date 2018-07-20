var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '东师指南',
        top: true,
        aimStep: 1,
        grey: true
      },
      {
        tag: 'grid',
        head: 'finished',
        content: [{
            text: '食堂',
            icon: '/icon/dining.svg',
            aim: 'dining'
          },
          {
            text: '学习',
            icon: '/icon/study.svg',
            aim: 'study'
          },
        ]
      },
      {
        tag: 'grid',
        head: 'working',
        content: [{
            text: '新生报到',
            icon: '/icon/check.svg',
            aim: 'check'
          },
          {
            text: '生活',
            icon: '/icon/life.svg',
            aim: 'life'
          },
          {
            text: '资助',
            icon: '/icon/subsidize.svg',
            aim: 'subsidize'
          }, {
            text: '寝室',
            icon: '/icon/dorm.svg',
            aim: 'dorm'
          },
        ]
      }, {
        tag: 'grid',
        head: 'testing',
        content: [{
          text: '测试页',
          url: '/templates/test'
        }, ]
      }, {
        tag: 'grid',
        head: 'building',
        content: [{
          text: '校园卡',
          icon: '/icon/card.svg',
          aim: 'card'
        }]
      },
    ],
  },
  onLoad() {
    u.sP(this.data.page, this, a);
    u.cRU();
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