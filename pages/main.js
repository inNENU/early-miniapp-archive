var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  tab = require("../utils/tab");

P('main', {
  data: {
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
  onPageLaunch() {
    console.log('主页面启动：', new Date() - a.d, 'ms');
    S.preSet(this.data.page, a, null, this, false);
    tab.tabBarChanger(a.nm);
  },
  onLoad() {
    S.request('main/main', function(data, indicator) {
      S.Set(data, a, null, indicator);
    }, this)
  },
  onReady() {
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
    // w.on('theme', this, function(data) {
    //   this.setData({
    //     T: data
    //   });
    // });
    ['guide', 'function', 'shop', 'me'].forEach(x => {
      S.request('main/' + x, function(data, indicator) {
        indicator.$put(x, data);
        indicator.$preload(`${x}?name=${x}`);
      }, this)
    })
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})