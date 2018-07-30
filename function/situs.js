var c = getApp().common,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: 'head',
      title: '物理学院',
      display: false,
    }, {
      tag: 'swiper',
      url: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    }, {
      tag: 'h3',
      text: '物理学院',
      style: 'font-size:28px;'
    }, {
      tag: 'p',
      head: '学院简介',
      text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
    }, {
      tag: 'p',
      head: '师资力量',
      text: 'map界面增加marker与label；\n'
    }, {
      tag: 'p',
      head: 'V0.7.0',
      text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
    }, {
      tag: 'p',
      head: 'V0.7.1',
      text: 'map界面增加marker与label；\n'
    }, {
      tag: 'p',
      head: 'V0.7.0',
      text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
    }, {
      tag: 'p',
      head: 'V0.7.1',
      text: 'map界面增加marker与label；\n'
    }, ],
  },
  onLoad(e) {
    console.log(e)
    c.setPage(wx.getStorageSync('benbu' + e.id), this, a, e);
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  }
})