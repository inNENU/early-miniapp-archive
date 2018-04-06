var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: 'V0.2开发日志' },
      { name: 'h2', text: 'V0.2.1' },
      { name: 'p', text: '增加了夜间模式修改开始与启动时间的功能；\n添加了iOSpicker-view模板；\n改进了夜间模式设置函数；\n精简了界面js模板的代码数量；' },
      { name: 'h2', text: 'V0.2.2' },
      { name: 'p', text: '修复自动开启夜间模式判断开始与结束时间异常的问题；' },
      { name: 'h2', text: 'V0.2.3' },
      { name: 'p', text: '初步构建微信主题夜间模式;' },
      { name: 'h2', text: 'V0.2.4' },
      { name: 'p', text: '加入绩点计算器;' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})