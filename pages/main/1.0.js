var P = require('../../utils/wxpage'),
  S = require('../../utils/setPage'),
  a = getApp().globalData;

P('1.0', {
  data: {
    page: [{
      tag: 'head',
      title: '更新日志',
      grey: true
    }, {
      tag: 'p',
      head: "V1.0.1 2018.08.20",
      text: '部分bug修复；'
    }, {
      tag: 'p',
      head: "V1.0.2 2018.08.21",
      text: '增加了分享悬浮窗；'
    }, {
      tag: 'p',
      head: "V1.0.3 2018.08.22",
      text: '增加了事件监控；\n移除腾讯判定违规内容；'
    }, {
      tag: 'p',
      head: "V1.0.4 2018.08.23",
      text: '新增公众号组件；\n添加公众号文章跳转功能；'
    }, {
      tag: 'p',
      head: "V1.0.5 2018.08.23",
      text: '影约东师支持腾讯视频；'
    }, {
      tag: 'p',
      head: "V1.0.6 2018.08.24",
      text: '修复腾讯视频无法播放的问题；\n添加视频组件；'
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