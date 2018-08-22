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
          aim: 'check0'
        }, {
          text: '学习',
          icon: '/icon/study.svg',
          aim: 'study0'
        }, {
          text: '食堂',
          icon: '/icon/dining.svg',
          aim: 'dining0'
        }, {
          text: '生活',
          icon: '/icon/life.svg',
          aim: 'life0'
        }, {
          text: '寝室',
          icon: '/icon/dorm.svg',
          aim: 'dorm0'
        }, {
          text: '校园网',
          icon: '/icon/network.svg',
          aim: 'network0'
        }, {
          text: '校园卡',
          icon: '/icon/card.svg',
          aim: 'card0'
        }, {
          text: '吃喝玩乐',
          icon: '/icon/nearby.svg',
          aim: 'nearby0'
        }, {
          text: '交通',
          icon: '/icon/traffic.svg',
          aim: 'traffic0'
        }, {
          text: '学生组织',
          icon: '/icon/studentOrg.svg',
          aim: 'studentOrg0'
        }, {
          text: '资助',
          icon: '/icon/subsidize.svg',
          aim: 'subsidize0'
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
    tab.checkUpdate('resNotify', 'localList', 'guideRes', '是否立即下载指南页所需资源？', '下载后可离线查看界面。(会消耗60K流量)\n不下载资源会造成界面加载卡顿，可以稍后在设置中进行下载', '20K', a)
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
	onShareAppMessage() {
		return {
			title: '东师指南',
			path: `/pages/guide`
		}
	},
})