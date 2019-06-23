/* global getApp*/
const { globalData: a, lib: { $component, $page, $register } } = getApp();

$register('module2', {
  onNavigate(res) {
    $page.resolve(a, res, this);
  },
  onLoad(res) {
    $page.Online(a, res, this);
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
  onShareAppMessage() {
    return { title: this.data.page[0].title, path: `/module/sharePage?From=主页&depth=1&share=true&aim=${this.aim}` };
  },
  onUnload() {
    delete this.data.page;
  }
});
