var P = require('../utils/wxpage'),
	S = require('../utils/setPage'),
	a = getApp().globalData,
	w = getApp().watcher,
	tab = require("../utils/tab");

P('me', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: 'head',
      title: '我的东师',
      action: true,
      grey: true,
      // show: true,
    }, {
      //   tag: 'info',
      // }, {
      tag: 'list',
      content: [{
        text: '设置',
        url: 'settings/theme'
        // }, {
        //   text: '登录',
        //   url: 'settings/login'
      }, {
        text: '关于',
        url: 'settings/about',
        desc: a.Version
      }, ]
    }, {
      tag: 'foot',
      desc: '当前版本：' + a.Version
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
	onPageScroll(e) {
		S.nav(e, this)
	},
	cA(e) {
		S.component(e, this)
	},
})