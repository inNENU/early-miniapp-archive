var P = require('../../utils/wxpage'),
  S = require('../../utils/setPage'),
  a = getApp().globalData;

P('1.1', {
  data: {
    page: [{
      tag: 'head',
      title: '更新日志',
      grey: true,
      aim: 'currentLog'
    }, {
      tag: 'p',
      head: "V1.1 2018.09.26",
      text: 'bug修复与显示优化；\n添加分享悬浮窗；\n新增公众号文章跳转；\n优化小程序更新逻辑；\n移除东青文创；\n初步适配大屏设备；'
    }, {
      tag: 'p',
      head: "V1.1.1 2018.10.11",
      text: '加入预加载分包功能；'
    }, {
      tag: 'foot',
      author: 'Mr.Hope'
    }],
  },
  onLoad(res) {
    S.Set(this.data.page, a, res, this, false);
    S.Notice(this.aim);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})