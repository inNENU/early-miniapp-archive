var P = require('../../utils/wxpage'),
  S = require('../../utils/setPage'),
  a = getApp().globalData;

P('0.9', {
  data: {
    page: [{
      tag: 'head',
      title: 'V0.9开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.9.0',
      text: '播放器界面美化；\n初步建立播放器播放逻辑；\n初步动态设置文字；'
    }, {
      tag: 'p',
      head: 'V0.9.1',
      text: '数个bug修复；\n字体显示效果优化；\n安卓段落在某些机型上显示异常的修复；'
    }, {
      tag: 'p',
      head: 'V0.9.2',
      text: '音乐播放器界面制作了进度条；\n关于界面报错修复；\段落空格大小修复；'
    }, {
      tag: 'p',
      head: 'V0.9.3',
      text: '设计修改底层框架思路，完善预加载，减少界面启动速度；'
    }, {
      tag: 'p',
      head: 'V0.9.4',
      text: '引入wxpage并做初步调试；'
    }, {
      tag: 'p',
      head: 'V0.9.5',
      text: 'modules引入preload；\n数个bug修复；\n重构setPage.js；'
    }, {
      tag: 'p',
      head: 'V0.9.6',
      text: '主页引入preload；\n数个bug修复；'
    }],
  },
  onLoad(res) {
    S.Set(this.data.page, a, res, this, false);
    S.Notice(this.aim);
    console.log('V0.9Log onLoad finished.')
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})