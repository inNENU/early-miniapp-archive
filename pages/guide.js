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
  onPreload(res) {
    if (!S.preSet(this.$take(res.query.name), a, null, this, false)) {
      this.set = true;
    };
    console.log('Guide preload finished time:', new Date() - a.d, 'ms');
  },
  onLoad() {
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    };
    S.Notice(this.aim);
    tab.checkUpdate('funcNotify', 'localFunc', 'funcList', '是否立即下载功能所需资源？', '下载后会使功能响应速度明显提升。(会消耗90K流量)\n不下载资源可能造成部分界面异常，可以稍后在设置中进行下载', '40K', a)
    P.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    P.on('nightmode', this, function(data) {
      this.setData({
        nm: data
      });
    });
  },
  onReady() {
    if (!this.set) {
      //request
    }
    S.preLoad(this, a);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})