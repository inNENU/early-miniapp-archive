var u = getApp().util,
  a = getApp().globalData,
  w = getApp().watcher;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '东师指南',
        action: true,
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
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    u.checkUpdate('resNotify', 'localList', 'fileList', '是否立即下载界面所需资源？', '下载后可离线查看大部分界面。(会消耗60K流量)', '30K')
  },
  onShow() {
    this.setData({
      nm: a.nm
    })
  },
  onPageScroll(e) {
    u.nav(e, this)
  }
})