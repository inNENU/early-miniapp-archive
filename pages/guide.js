var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
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
    this.setData({
      T: a.T,
      nm: a.nm
    })
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    };
    S.Notice(this.aim);
    tab.checkUpdate('resNotify', 'localList', 'fileList', '是否立即下载指南页所需资源？', '下载后可离线查看界面文字。(会消耗60K流量)\n不下载资源可能会造成部分界面异常，可以稍后在设置中进行下载', '20K', a)
    let that = this;
    this.$on('theme', function(data) {
      that.setData({
        T: data
      });
    });
    this.$on('nightmode', function(data) {
      that.setData({
        nm: data
      });
    });
  },
  onReady() {
    if (!this.set) {
      S.request('main/guide', function(data, indicator) {
        S.Set(data, a, null, indicator);
      }, this)
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