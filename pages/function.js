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
      head: '测试中',
      content: [{
        text: '绩点计算',
        icon: '/icon/scoreCal.svg',
        url: '/function/cal'
      }, ]
    }, {
      tag: 'grid',
      head: '制作中',
      content: [{
        text: '校园街景',
        icon: '/icon/map.svg',
        url: '/function/map'
      }, {
        text: '地图',
        icon: '/icon/PECal.svg',
        url: '/function/situs?id=0'
      }, ]
    }, {
      tag: 'grid',
      head: '即将推出',
      content: [{
        text: '四六级',
        icon: '/icon/CET.svg',
        url: '/function/CET'
      }, {
        text: '成绩查询',
        icon: '/icon/score.svg',
        url: '/function/score'
      }, {
        text: '体测计算器',
        icon: '/icon/PECal.svg',
        url: '/function/PECal'
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
    tab.checkUpdate('funcNotify', 'localFunc', 'funcList', '是否立即下载功能所需资源？', '下载后会使功能响应速度明显提升。(会消耗30K流量)', '20K', a)
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