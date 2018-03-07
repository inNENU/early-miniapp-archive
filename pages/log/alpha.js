var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: 'alpha开发日志' },
      { name: 'h2', text: 'V0.0.1' },
      { name: 'p', text: '制作了navigationBar与tabBar；\n导入网页的生活界面；\n增加制作了footer；\n简要地对东师青年指南界面进行了链接；\n制作了无定义界面的跳转内容；' },
      { name: 'h2', text: 'V0.0.2' },
      { name: 'p', text: '修复tabBar的icon模糊情况；\n修复图片显示比例不正常的问题；\n对页面样式进行了简单的定义与设计；' },
      { name: 'h2', text: 'V0.0.3' },
      { name: 'p', text: '利用globalData，属性进行批量定义；\n重新组织了界面，为以后开发主题提供接口；' },
      { name: 'h2', text: 'V0.0.4' },
      { name: 'p', text: '精简优化了代码，代码数量减少了15 %；\n少量错误修复，思考切换主题时如何动态改变界面渲染情况，思考导入夜间模式方法；' },
      { name: 'h2', text: 'V0.0.5' },
      { name: 'p', text: '调用微信存储接口保存主题信息；\n模板化js，加入公共js模板util.js并调试成功；' },
      { name: 'h2', text: 'V0.0.6' },
      { name: 'p', text: '简单对部分界面添加了样式，进行了美化；\n初步制作主题切换界面，加入picker并进行初步调试；' },
      { name: 'h2', text: 'V0.0.7' },
      { name: 'p', text: '修复了几处错误并进行了功能改进；\n重建小程序目录结构；\n初步制作iOS主题样式；' },
      { name: 'h2', text: 'V0.0.8' },
      { name: 'p', text: '对界面内容进行模块化；\n初步制作iOS navigationBar特效；\n完整构造iOS主题样式；\n初步构建iOS夜间模式；' },
      { name: 'h2', text: 'V0.0.9' },
      { name: 'p', text: '修复主题选择器无法改变theme值的问题，新增夜间模式开关；\n修复了iOS夜间模式的几个bug，完整构建iOS夜间主题；' },
      { name: 'h2', text: 'Valpha Final patched by Mr.Hope' },
      { name: 'p', text: '修复了全部已知bug并缩小了50 % 的代码包体积\n修复了以下bug：\n  修复了tabBar文字消失的问题；\n  修复了主题页面文字不能换色的问题；\n  修复夜间模式彩蛋显示不清的问题；\n  修复首页及主题页夜间模式异常的问题；\n进行了以下优化：\n  对东师指南和功能界面进行夜间模式适配；\n  删除无用代码与注释；\n  统一已编写代码格式；\n  优化logo与nenuyouth图片大小；' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  back() { u.back() },
})