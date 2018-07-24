var a = getApp().globalData,
  c = getApp().common;
Page({
  data: {
    page: [{
      tag: 'head',
      title: 'V0.7开发日志',
      grey: true
    }, {
      tag: 'p',
      head: 'V0.7.0',
      text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
    }, {
      tag: 'p',
      head: 'V0.7.1',
      text: 'map界面增加marker与label；\n初步适配iPad；\n初步制作了地点nav；'
    }, {
      tag: 'p',
      head: 'V0.7.2',
      text: '制作了footer；\n制作了界面弹窗；'
    }, {
      tag: 'p',
      head: 'V0.7.2',
      text: 'footer改进；\n现在可以选中段落文字了；'
    }, {
      tag: 'p',
      head: 'V0.7.3',
      text: '初步完成util.js重组；\n尝试预先setPage，进入后开始加载可能打开的界面；'
    }, {
      tag: 'p',
      head: 'V0.7.4',
      text: '进一步完善界面预载入；\n大量优化已有函数的性能；'
    }],
  },
  onLoad(e) {
		c.setPage(this.data.page, this, a, e)
  },
	onPageScroll(e) {
		c.nav(e, this)
	},
  cA(e) {
		c.componentAction(e, this)
  }
})