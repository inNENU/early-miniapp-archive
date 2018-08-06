var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  w = getApp().watcher,
  tab = require("../utils/tab");

P('guide', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
        tag: 'head',
        title: '东师指南',
        action: true,
        aimStep: 1,
        grey: true
      },
      {
        tag: 'grid',
        head: '',
        content: [{
          text: '新生报到',
          icon: '/icon/check.svg',
          aim: 'check'
        }, {
          text: '学习',
          icon: '/icon/study.svg',
          aim: 'study'
        }, {
          text: '食堂',
          icon: '/icon/dining.svg',
          aim: 'dining'
        }, {
          text: '生活',
          icon: '/icon/life.svg',
          aim: 'life'
        }, {
          text: '寝室',
          icon: '/icon/dorm.svg',
          aim: 'dorm'
        }, {
          text: '校园网',
          icon: '/icon/network.svg',
          aim: 'network'
        }, {
          text: '校园卡',
          icon: '/icon/card.svg',
          aim: 'card'
        }, {
          text: '吃喝玩乐',
          icon: '/icon/nearby.svg',
          aim: 'nearby'
        }, {
          text: '交通',
          icon: '/icon/traffic.svg',
          aim: 'traffic'
        }, {
          text: '学生组织',
          icon: '/icon/studentOrg.svg',
          aim: 'studentOrg'
        }, {
          text: '资助',
          icon: '/icon/subsidize.svg',
          aim: 'subsidize'
        }, ]
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
      this.setData({
        nm: data
      });
    });
    S.Notice(this.aim);
    tab.checkUpdate('resNotify', 'localList', 'fileList', '是否立即下载界面所需资源？', '下载后可离线查看大部分界面。(会消耗80K流量)\n不下载资源可能造成部分界面异常，可以稍后在设置中进行下载', '10K', a)
  },
  onReady() {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/mp/main/guide.json',
      success(res) {
        if (res.statusCode == 200) {
          c.setPage(res.data, that, a);
        }
      }
    });
    S.preLoad(this, a);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})