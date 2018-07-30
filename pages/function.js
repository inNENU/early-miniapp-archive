var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    page: [{
      tag: 'head',
      title: '功能大厅',
      action: true
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
      }, ]
    }, {
      tag: 'grid',
      head: '即将推出',
      content: [{
        text: '校园街景',
        icon: '/icon/PECal.svg',
        url: 'main/building'
      }, {
        text: '成绩查询',
        icon: '/icon/score.svg',
        url: 'main/building'
      }, {
        text: '课表查询',
        icon: '/icon/score.svg',
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
        text: '四六级',
        icon: '/icon/CET.svg',
        url: 'main/building'
      }, {
        text: '绩点计算',
        icon: '/icon/scoreCal.svg',
        url: 'main/building'
      }, ]
    }, ],
  },
  onLoad() {
    c.setPage(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    tab.checkUpdate('funcNotify', 'localFunc', 'funcList', '是否立即下载功能所需资源？', '下载后会使功能响应速度明显提升。(会消耗50K流量)\n不下载资源可能造成部分界面异常，可以稍后在设置中进行下载', '25K', a)
  },
  onShow() {
    this.setData({
      nm: a.nm
    })
  },
  onReady() {
    tab.markerSet()
  },
  onPageScroll(e) {
    c.nav(e, this)
  }
})