var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  tab = require("../utils/tab");

P('function', {
  data: {
    page: [{
      tag: 'head',
      title: '功能大厅',
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
        text: '音律东师',
        icon: '/icon/music.svg',
        url: '/function/player'
      }, {
        text: '影约东师',
        icon: '/icon/movie.svg',
        url: '/function/video'
      }, {
        text: '校园公众号',
        icon: '/icon/gzh.svg',
        aim: 'gzh0'
      }, ]
    }, {
      tag: 'grid',
      head: '即将推出',
      content: [{
        text: '内网公告',
        icon: '/icon/notice.svg',
        url: '/modules/building?month=9'
      }, {
        text: '体测计算器',
        icon: '/icon/PECal.svg',
        url: '/modules/building?month=9'
      }, {
        text: '成绩查询',
        icon: '/icon/exam.svg',
        url: '/modules/building?month=10'
      }, {
        text: '课表查询',
        icon: '/icon/schedule.svg',
        url: '/modules/building?month=10'
      }, {
        text: '考场查询',
        icon: '/icon/score.svg',
        url: '/modules/building?month=10'
      }, {
        text: '绩点计算',
        icon: '/icon/scoreCal.svg',
        url: '/modules/building?month=10'
      }, {
        text: '故障报修',
        icon: '/icon/repair.svg',
        url: '/modules/building?month=11'
      }, {
        text: '东师掠影',
        icon: '/icon/scenery.svg',
        url: '/modules/building?month=11'
      }, {
        text: '校历',
        icon: '/icon/calendar.svg',
        url: '/modules/building?month=11'
      }]
    }, ],
  },
  onPreload(res) {
    if (!S.preSet(this.$take(res.query.name), a, null, this, false)) {
      this.set = true;
    };
    console.log('Function preload finished time:', new Date() - a.d, 'ms');
  },
  onLoad() {
    this.setData({
      T: a.T,
      nm: a.nm
    })
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    };
    S.Notice('function');
    tab.checkUpdate('funcNotify', 'localFunc', 'functionRes', '是否立即下载功能所需资源？', '下载后会使功能响应速度明显提升。(会消耗90K流量)\n不下载资源可能造成部分功能启动缓慢，可以稍后在设置中进行下载', '40K', a)
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
      S.request('main/function', function(data, indicator) {
        S.Set(data, a, null, indicator);
        wx.stopPullDownRefresh();
      }, this)
    };
    tab.markerSet();
  },
  onPullDownRefresh() {
    S.request('main/function', function(data, indicator) {
      S.Set(data, a, null, indicator);
      wx.stopPullDownRefresh();
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})