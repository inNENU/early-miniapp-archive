var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  w = getApp().watcher,
  tab = require("../utils/tab");



P('main', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: 'head',
      title: '首页',
      action: true,
      aimStep: 1,
      grey: true,
    }, {
      tag: 'list',
      head: '报到当天',
      content: [{
        text: '报到的流程'
      }, {
        text: '我的寝室在哪'
      }]
    }, {
      tag: 'list',
      content: [{
        text: '我的学院在哪里？我的寝室在哪里？'
      }, {
        text: '查看详情',
        url: '/function/map'
      }]
    }, {
      tag: 'list',
      content: [{
        text: '寝室环境是怎样的？寝室是几人寝？寝室有独立卫浴么？'
      }, {
        text: '查看详情',
        aim: 'dorm'
      }]
    }],
  },
  onPageLaunch: function() {
    console.log('主页面启动：', new Date() - a.d, 'ms');
    S.Set(this.data.page, a, null, this, false);
    tab.tabBarChanger(a.nm);
  },
  onReady() {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/mp/main/main.json',
      success(res) {
        if (res.statusCode == 200) {
          S.Set(that.data.page, a, null, that, false);
        }
      }
    });
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
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})