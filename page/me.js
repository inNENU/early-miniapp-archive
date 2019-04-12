/* global wx getApp*/
const { globalData: a, lib: { $page, $set } } = getApp();

$page('me', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '我的东师', action: true, grey: true },
      {
        tag: 'list',
        content: [
          { text: '设置', icon: '/icon/setting.svg', url: '/settings/setting' },
          { text: '关于', icon: '/icon/about.svg', url: '/settings/about', desc: a.version }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}` }
    ]
  },
  onPreload() {
    if (!$set.preSet(this.data.page, a, { aim: 'me' }, this, false))
      this.set = true;

    console.log(`${this.aim}预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    if (!this.set) $set.Set(this.data.page, a, null, this, false);
    $set.Notice('me');
  },
  onShow() {
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'],
      [nc, bc] = $set.color(a.nm, this.data.page[0].grey);

    // 设置胶囊、背景颜色以及tab栏颜色
    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    this.$preload('setting?From=我的东师&aim=setting');
    this.$preload('about?From=我的东师&aim=about');
  },
  onReady() {
    if (!this.set) $set.Set(this.data.page, a, null, this);
    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
