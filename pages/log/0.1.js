var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: 'V0.1开发日志',
        grey: true
      },
      {
        tag: 'p',
        head: 'V0.1.1',
        text: '修复了链接列表文字略偏上的问题；\n修复了链接列表箭头略偏下的问题；\n修复navtitle动画延后的问题；\n修复了在某些机型上navigationBar title位置错误的问题；'
      },
      {
        tag: 'p',
        head: 'V0.1.2',
        text: '在navigationBar中加入了返回交互动画；\n尝试适配iPhone X；\n优化了界面通信；\n修复了夜间模式必须重启才可切换的问题；'
      },
      {
        tag: 'p',
        head: 'V0.1.3',
        text: '重建主题控件，完成了主题切换模式；\n修复了tabBar栏在切换夜间模式后不能变黑的问题；\n少量错误修复'
      },
      {
        tag: 'p',
        head: 'V0.1.4',
        text: '重新编写了滚动动画，优化了iOS主题下navBar的显示效果；\n略微减小了navBar高度；去除兀余语句；\n优化了代码包的体积；'
      },
      {
        tag: 'p',
        head: 'V0.1.5',
        text: '修复了navB动画延后的问题，优化滚动动画响应速度；\n判断基础库版本，过低禁用小程序；\n修复了V0.0.1日志界面不能返回的问题；\n修复了主题界面的显示问题；'
      },
      {
        tag: 'p',
        head: 'V0.1.6',
        text: '重新构建小程序；\n去除兀余语句；大幅减少代码包的体积；'
      },
      {
        tag: 'p',
        head: 'V0.1.7',
        text: '重新新构建界面，使用wx: for渲染template模板，将页面信息置于js的pageData中；'
      },
      {
        tag: 'p',
        head: 'V0.1.8',
        text: '完全适配iPhone X；\n改善了iOS样式，完善了与iOS原生系统不一致的一些细节；'
      }, {
        tag: 'p',
        head: 'V0.1.9',
        text: '大幅改进iOSList标签；\n改进了主题切换逻辑；\n改变了开关触发器；'
      },
      {
        tag: 'p',
        head: 'V0.1.10',
        text: '大幅精简iOSHead，通过添加界面传参来优化page参数数量；\n少量代码压缩及故障修复；'
      },
      {
        tag: 'p',
        head: 'V0.1Final',
        text: '对iOS样式进行重新整理与精简；\优化了部分函数逻辑，减少渲染时间；\n数个bug修复；'
      },
      {
        tag: 'foot'
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