/* global getApp wx*/
let { globalData: a, lib: { $page, $set } } = getApp();

$page("sharePage", {
  onNavigate(res) {
    $set.preSet(this.$session.get(`${res.query.aim}Temp`), a, res, this);
  },
  onLoad(res) {
    if (!this.aim) {
      if ("scene" in res) res.From = "主页", res.aim = decodeURIComponent(res.scene), res.share = true, res.depth = 1;
      $set.Online(a, res, this);
    }
    wx.reportMonitor("2", 1);
  },
  onPageScroll(res) {
    $set.nav(res, this);
  },
  cA(res) {
    $set.component(res, this);
  },
  redirect() {
    this.$launch("/pages/main");
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/modules/sharePage?From=主页&depth=1&share=true&aim=${this.aim}`
    };
  },
  onUnload() {
    delete this.data.page;
  }
});