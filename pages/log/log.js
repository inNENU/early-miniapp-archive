var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '开发日志', top: true },
      { tag: 'h3', text: '当前版本' + a.Version },
      { tag: 'p', head: '已知bug：', text: '升级版本后初始化函数存在问题；\n切换主题后主题界面会显示异常；\n绩点计算器输入时键盘异常收起；\n报到界面无法正常展示；' },
      { tag: 'p', head: '即将实现的内容：', text: '重构switch和picker-view函数；\n模板中加入style；\n构建list中的picker和list中的swiper；开启夜间模式时减少亮度；\n重构主页界面；在icon变多后尝试利用iconfont压缩代码体积；\n构建iOSlist icon；\n适配iOSpicker-view夜间模式；\nhead和foot的进一步改进；\n同一界面加载不同pages数组来减少界面注册，加快启动速度；\n在初始化小程序问用户是否离线文字，若不再判断是否取消日后提示；在设置里加入离线文字的选项；\n思考离线照片；\n构建双排img组件；\n构建phone组件；\n微信列表改为点击展开样式；\n考虑footer的必要性，对footer做优化或者构建新的footer；\n构建grid九宫格样式组件；\n移除pages本地内容改为在线加载，引入showloading组件；' },
      { tag: 'list', head: '日志如下：', content: [{ text: 'alpha日志', url: 'alpha' }, { text: 'V0.1开发日志', url: '0.1' }, { text: 'V0.2开发日志', url: '0.2' }, { text: 'V0.3开发日志', url: '0.3' }] },
      { tag: 'p', head: '等待官方改进才能实现的内容：', text: 'iOS的navigationBar回弹动画；' },
      { tag: 'p', head: false, text: '这是一个临时的界面，用于记录开发日志。 随着开发进行该界面会被“我的信息”界面取代。' },
    ],
  },
  onShow() { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }); u.tBC(a.nm); },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})