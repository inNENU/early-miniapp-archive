/* global wx getApp*/
const { globalData: a, lib: { $component, $page, $register } } = getApp();

$register('me', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '我的东师', aim: 'me', action: true, grey: true },
      {
        tag: 'list',
        content: [
          { text: '设置', icon: '/icon/setting.svg', url: '/settings/setting?From=我的东师&aim=setting' },
          { text: '关于', icon: '/icon/about.svg', url: '/settings/about?From=我的东师&aim=about', desc: a.version }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}` }
    ]
  },
  onPreload(res) {
    $page.resolve(res, this.data.page);
    console.log(`我的东师预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    $page.Set({ option: { aim: 'me' }, ctx: this });
    $page.Notice('me');
  },
  onShow() {
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];
    const [nc, bc] = $page.color(this.data.page[0].grey);

    // 设置胶囊、背景颜色以及tab栏颜色
    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    /*
     * this.$preload('setting?From=我的东师&aim=setting');
     * this.$preload('about?From=我的东师&aim=about');
     */
  },
  onReady() {
    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: '我的东师', path: '/page/me' })
});
