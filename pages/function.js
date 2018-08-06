var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  w = getApp().watcher,
  tab = require("../utils/tab");

P('function', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: 'head',
      title: '功能大厅本地',
      action: true,
      grey: true
    }, {
      tag: 'grid',
      head: '',
      content: [{
        text: '校园地图',
        icon: '/icon/map.svg',
        url: '/function/map'
      }, {
        text: 'Voice of NENU',
        icon: '/icon/music.svg',
        url: '/function/music'
      }, {
        text: '校园风光',
        icon: '/icon/scenery.svg',
        url: '/function/scenery'
      }, {
        text: '播放器',
        icon: '/icon/scenery.svg',
        url: '/function/player'
      }, ]
    }, {
      tag: 'grid',
      head: '即将推出',
      content: [{
        text: '成绩查询',
        icon: '/icon/exam.svg',
        url: 'main/building'
      }, {
        text: '课表查询',
        icon: '/icon/schedule.svg',
        url: 'main/building'
      }, {
        text: '考场查询',
        icon: '/icon/score.svg',
        url: 'main/building'
      }, {
        text: '体测计算器',
        icon: '/icon/PECal.svg',
        url: 'main/building'
      }, {
        text: '绩点计算',
        icon: '/icon/scoreCal.svg',
        url: 'main/building'
      }, {
        text: '故障报修',
        icon: '/icon/repair.svg',
        url: 'main/building'
      }, {
        text: '表白墙',
        icon: '/icon/heart.svg',
        url: 'main/building'
      }, ]
    }, ],
  },
  onPreload(res) {
    if (!S.preSet(this.$take(res.query.name), a, null, this, false)) {
      this.set = true;
    };
    console.log('Function preload finished time:', new Date() - a.d, 'ms');
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
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})