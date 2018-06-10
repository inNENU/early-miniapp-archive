var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: 'V0.5开发日志',
        grey: true
      },
      {
        tag: 'p',
        head: 'V0.5.1',
        text: '构建了出现错误显示的界面；\n改进了grid的显示效果；\n改进了微信主题下的分割线宽度；'
      },
      {
        tag: 'p',
        head: 'V0.5.2',
        text: '创建了login界面并进行了初步设计；'
      },
      {
        tag: 'p',
        head: 'V0.5.3',
        text: '初步改进了资源目录；\n增设了NENU主题；'
      },
      {
        tag: 'p',
        head: 'V0.5.4',
        text: '尝试引入PubSub；'
      },
      {
        tag: 'p',
        head: 'V0.5.5',
        text: '合并组件函数为cA；\n加入了map界面'
      },
      {
        tag: 'p',
        head: 'V0.5.6',
        text: '改进doc组件加载；\n加入json测试界面；'
      },
      {
        tag: 'p',
        head: 'V0.5.7',
        text: '对map界面进行了简单的调试；'
      },
    ],
  },
  onLoad(e) {
    u.sP(this.data.page, this, a, e)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  },
})