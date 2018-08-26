var P = require('../../utils/wxpage'),
  S = require('../../utils/setPage'),
  a = getApp().globalData;

P('1.0', {
  data: {
    page: [{
      tag: 'head',
      title: '更新日志',
      grey: true,
      aim: 'currentLog'
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
      text: '添加视频组件；\n修复腾讯视频无法播放的问题；\n更换了部分icon；'
    }, {
      tag: 'p',
      head: "V1.0.7 2018.08.25",
      text: '对NENU主题导航栏显示效果进行优化；\n添加错误监控报警；\n加入强制更新器；'
    }, {
      tag: 'p',
      head: "V1.0.8 2018.08.26",
      text: '移除东青文创界面；\n改进二维码；'
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