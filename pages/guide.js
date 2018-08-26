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
          icon: '/icon/guide/check.svg',
          aim: 'check0'
        }, {
          text: '学习',
          icon: '/icon/guide/study.svg',
          aim: 'study0'
        }, {
          text: '食堂',
          icon: '/icon/guide/dining.svg',
          aim: 'dining0'
        }, {
          text: '生活',
          icon: '/icon/guide/life.svg',
          aim: 'life0'
        }, {
          text: '寝室',
          icon: '/icon/guide/dorm.svg',
          aim: 'dorm0'
        }, {
          text: '校园网',
          icon: '/icon/guide/network.svg',
          aim: 'network0'
        }, {
          text: '校园卡',
          icon: '/icon/guide/card.svg',
          aim: 'card0'
        }, {
          text: '吃喝玩乐',
          icon: '/icon/guide/nearby.svg',
          aim: 'nearby0'
        }, {
          text: '交通',
          icon: '/icon/guide/traffic.svg',
          aim: 'traffic0'
        }, {
          text: '学生组织',
          icon: '/icon/guide/studentOrg.svg',
          aim: 'studentOrg0'
        }, {
          text: '社团',
          icon: '/icon/guide/corporation.svg',
          aim: 'corporation0'
        }, {
          text: '资助',
          icon: '/icon/guide/subsidize.svg',
          aim: 'subsidize0'
        }, {
          text: 'SIM卡',
          icon: '/icon/guide/sim.svg',
          aim: 'sim0'
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
    S.Notice('guide');
    tab.checkUpdate('resNotify', 'localList', 'guideRes', '20K')
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
      wx.startPullDownRefresh();
      S.request('main/guide', function(data, indicator) {
        S.Set(data, a, null, indicator);
        wx.stopPullDownRefresh();
      }, this)
    }
    S.preLoad(this, a);
  },
  onPullDownRefresh() {
    S.request('main/guide', function(data, indicator) {
      S.Set(data, a, null, indicator);
      wx.stopPullDownRefresh();
    }, this);
    tab.checkUpdate('resNotify', 'localList', 'guideRes', '20K')
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
  onShareAppMessage() {
    return {
      title: '东师指南',
      path: `/pages/guide`
    }
  },
})