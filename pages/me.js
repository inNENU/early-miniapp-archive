var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  tab = require("../utils/tab");

P('me', {
  data: {
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
        url: 'settings/setting'
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
  onPreload(res) {
    if (!S.preSet(this.$take(res.query.name), a, null, this, false)) {
      this.set = true;
    };
    console.log('Me preload finished time:', new Date() - a.d, 'ms');
  },
  onLoad() {
    let that = this;
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    };
    S.Notice(this.aim);
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
  onShow() {
    tab.tabBarChanger(a.nm);
  },
  onReady() {
    if (!this.set) {
      S.request('main/me', function(data, indicator) {
        S.Set(data, a, null, indicator);
      }, this)
    };
		this.$preload('setting?From=我的东师');
		this.$preload('about?From=我的东师');
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})