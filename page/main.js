/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('main', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      {
        tag: 'head',
        title: '首页',
        action: true,
        aimDepth: 1,
        grey: true,
        shareable: true,
        aim: 'main'
      }, {
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
    const page = wx.getStorageSync('main'),
      color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    $set.preSet(page ? page : this.data.page, a, { aim: 'main' }, this, false);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
  },
  onLoad() {
    const test = wx.getStorageSync('test');

    // 开启测试
    if (test) $act.request('config/mainTest', data => {
      wx.setStorageSync('main', data);
      $set.Set(data, a, { aim: 'main' }, this, false);
    });
    else $act.request(`config/${a.version}/main`, data => {
      $set.Set(data, a, null, this);
    });
    $set.Notice('main');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, this.data.page[0].grey);

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
      $act.request(`config/${a.version}/${x}`, data => {
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
    if (test) $act.request('config/mainTest', data => {
      wx.setStorageSync('main', data);
      $set.Set(data, a, { aim: 'main' }, this, false);
    });
    else $act.request(`config/${a.version}/main`, data => {
      $set.Set(data, a, null, this);
      wx.stopPullDownRefresh();
      wx.setStorageSync('main', data);
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  onShareAppMessage: () => ({ title: 'myNENU', path: '/page/main' })
});
