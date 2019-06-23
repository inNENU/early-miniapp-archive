/* global getApp wx*/
const { globalData: a, lib: { $component, $page, $register } } = getApp();

$register('sharePage', {
  onNavigate(res) {
    $page.resolve(res);
  },
  onLoad(res) {
    if ('scene' in res) {
      res.From = '主页';
      res.aim = decodeURIComponent(res.scene);
      res.share = true;
      res.depth = 1;
      $page.Online(res, this);
    }
    wx.reportMonitor('2', 1);
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(a, this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(res) {
    $component.nav(res, this);
  },
  cA(res) {
    $component.trigger(res, this);
  },
  redirect() {
    this.$launch('/page/main');
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?From=主页&depth=1&share=true&aim=${this.data.page[0].aim}`
    };
  },
  onUnload() {
    delete this.data.page;
  }
});
