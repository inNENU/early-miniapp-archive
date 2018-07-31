var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    page: [{
      tag: 'head',
      title: '首页',
      action: true,
      aimStep: 1,
      grey: true,
    }, {
      tag: 'list',
      content: [{
        text: '找不到自己的的学院和寝室？'
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
    }, {
      tag: 'foot',
      author: 'Mr.Hope',
      time: '2018/7/31'
    }, ],
  },
  onLoad() {
    c.setPage(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    w.on('nightmode', this, function(data) {
      console.log(data)
      this.setData({
        nm: data
      });
    });
  },
  onShow() {
    tab.tabBarChanger(a.nm);
  },
  onReady() {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/mp/main/main.json',
      success(res) {
        if (res.statusCode == 200) {
          c.setPage(res.data, that, a);
        }
      }
    })
  },
  onPageScroll(e) {
    c.nav(e, this)
  }
})