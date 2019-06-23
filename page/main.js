/* global wx getApp*/
const { globalData: a, lib: { $component, $page, $register, $wx } } = getApp();

$register('main', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '首页', aim: 'main', action: true, aimDepth: 1, grey: true, shareable: true },
      {
        tag: 'list',
        head: '了解学业',
        content: [
          { text: '我要上哪些课？', desc: '课程计划', aim: 'study9' },
          { text: '通识教育课程', aim: 'study5' },
          { text: '专业教育课程', aim: 'study6' },
          { text: '发展方向课程', aim: 'study7' },
          { text: '了解更多', aim: 'study5' }
        ]
      }
    ]
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date() - a.date, 'ms');
    const page = wx.getStorageSync('main');
    const color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    $page.preSet(a, { aim: 'main' }, page ? page : this.data.page);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
  },
  onLoad() {
    $page.Set(a.page.data, a, { aim: 'main' }, this);

    const test = wx.getStorageSync('test');

    // 开启测试
    if (test) $wx.request('config/mainTest', data => {
      wx.setStorageSync('main', data);
      $page.Set(data, a, { aim: 'main' }, this, false);
    });
    else $wx.request(`config/${a.version}/main`, data => {
      $page.Set(data, a, null, this);
    });
    $page.Notice('main');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(a, this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    // 注册事件监听器
    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });

    // 执行tab页预加载
    ['guide', 'function'].forEach(x => {
      $wx.request(`config/${a.version}/${x}`, data => {
        this.$put(x, data);
        this.$preload(`${x}?name=${x}&aim=${x}`);
        wx.setStorageSync(x, data);
      });
    });
    this.$preload('me');
  },
  onPullDownRefresh() {
    const test = wx.getStorageSync('test');

    // 开启测试
    if (test) $wx.request('config/mainTest', data => {
      wx.setStorageSync('main', data);
      $page.Set(data, a, { aim: 'main' }, this, false);
    });
    else $wx.request(`config/${a.version}/main`, data => {
      $page.Set(data, a, null, this);
      wx.stopPullDownRefresh();
      wx.setStorageSync('main', data);
    });
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: 'myNENU', path: '/page/main' })
});
