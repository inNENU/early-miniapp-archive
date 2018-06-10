var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: 'alpha开发日志',
        grey: true
      },
      {
        tag: 'p',
        head: 'V0.0.1',
        text: '制作了navigationBar与tabBar；\n导入网页的生活界面；\n增加制作了footer；\n简要地对东师青年指南界面进行了链接；\n制作了无定义界面的跳转内容；'
      },
      {
        tag: 'p',
        head: 'V0.0.2',
        text: '修复tabBar的icon模糊情况；\n修复图片显示比例不正常的问题；\n对页面样式进行了简单的定义与设计；'
      },
      {
        tag: 'p',
        head: 'V0.0.3',
        text: '利用globalData，属性进行批量定义；\n重新组织了界面，为以后开发主题提供接口；'
      },
      {
        tag: 'p',
        head: 'V0.0.4',
        text: '精简优化了代码，代码数量减少了15 %；\n少量错误修复，思考切换主题时如何动态改变界面渲染情况，思考导入夜间模式方法；'
      },
      {
        tag: 'p',
        head: 'V0.0.5',
        text: '调用微信存储接口保存主题信息；\n模板化js，加入公共js模板util.js并调试成功；'
      },
      {
        tag: 'p',
        head: 'V0.0.6',
        text: '简单对部分界面添加了样式，进行了美化；\n初步制作主题切换界面，加入picker并进行初步调试；'
      },
      {
        tag: 'p',
        head: 'V0.0.7',
        text: '修复了几处错误并进行了功能改进；\n重建小程序目录结构；\n初步制作iOS主题样式；'
      },
      {
        tag: 'p',
        head: 'V0.0.8',
        text: '对界面内容进行模块化；\n初步制作iOS navigationBar特效；\n完整构造iOS主题样式；\n初步构建iOS夜间模式；'
      },
      {
        tag: 'p',
        head: 'V0.0.9',
        text: '修复主题选择器无法改变theme值的问题，新增夜间模式开关；\n修复了iOS夜间模式的几个bug，完整构建iOS夜间主题；'
      },
      {
        tag: 'p',
        head: 'Valpha Final patched by Mr.Hope',
        text: '修复了全部已知bug；\n缩小了50 % 的代码包体积\n修复了以下bug：\n  修复了tabBar文字消失的问题；\n  修复了主题页面文字不能换色的问题；\n  修复夜间模式彩蛋显示不清的问题；\n  修复首页及主题页夜间模式异常的问题；\n进行了以下优化：\n  对东师指南和功能界面进行夜间模式适配；\n  删除无用代码与注释；\n  统一已编写代码格式；\n  优化logo与nenuyouth图片大小；'
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