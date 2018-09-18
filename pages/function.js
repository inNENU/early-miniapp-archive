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
        icon: '/icon/function/map.svg',
        url: '/function/map'
      }, {
        text: '音律东师',
        icon: '/icon/function/music.svg',
        url: '/function/player'
      }, {
        text: '影约东师',
        icon: '/icon/function/movie.svg',
        url: '/function/video'
      }, {
        text: '校园公众号',
        icon: '/icon/function/gzh.svg',
        aim: 'gzh0'
      }, {
        text: '体测计算器',
        icon: '/icon/function/PECal.svg',
        url: '/function/PEcal'
      }, ]
    }, {
      tag: 'grid',
      head: '即将推出',
      content: [{
        text: '内网公告',
        icon: '/icon/function/notice.svg',
        url: '/modules/building?month=9'
      }, {
        text: '成绩查询',
        icon: '/icon/function/exam.svg',
        url: '/modules/building?month=10'
      }, {
        text: '课表查询',
        icon: '/icon/function/schedule.svg',
        url: '/modules/building?month=10'
      }, {
        text: '考场查询',
        icon: '/icon/function/score.svg',
        url: '/modules/building?month=10'
      }, {
        text: '绩点计算',
        icon: '/icon/function/scoreCal.svg',
        url: '/modules/building?month=10'
      }, {
        text: '故障报修',
        icon: '/icon/function/repair.svg',
        url: '/modules/building?month=11'
      }, {
        text: '东师掠影',
        icon: '/icon/function/scenery.svg',
        url: '/modules/building?month=11'
      }, {
        text: '校历',
        icon: '/icon/function/calendar.svg',
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
    tab.checkUpdate('funcNotify', 'localFunc', 'functionRes', '20K')
    let that = this;
    this.$on('theme', data => {
      that.setData({
        T: data
      });
    });
    this.$on('nightmode', data => {
      that.setData({
        nm: data
      });
    });
  },
  onReady() {
    if (!this.set) {
      wx.startPullDownRefresh();
      S.request('main/function', (data, indicator) => {
        S.Set(data, a, null, indicator);
        wx.stopPullDownRefresh();
      }, this)
    };
    tab.markerSet();
  },
  onPullDownRefresh() {
    S.request('main/function', (data, indicator) => {
      S.Set(data, a, null, indicator);
      wx.stopPullDownRefresh();
    }, this);
    tab.checkUpdate('funcNotify', 'localFunc', 'functionRes', '40K')
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})