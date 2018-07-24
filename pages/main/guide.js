var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../../utils/tab");
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
          // aim: 'card'
        }]
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
    tab.checkUpdate('resNotify', 'localList', 'fileList', '是否立即下载界面所需资源？', '下载后可离线查看大部分界面。(会消耗60K流量)', '30K', a)
  },
  onShow() {
    this.setData({
      nm: a.nm
    });
    c.preloadPage(this.data.page, a);
  },
  onPageScroll(e) {
    c.nav(e, this)
  }
})