/* global getApp*/
const { globalData: a, lib: { $page, $set } } = getApp();

$page('module7', {
  onNavigate(res) {
    $set.preSet(this.$session.get(`${res.query.aim}Temp`), a, res, this);
  },
  onLoad(res) {
    $set.Online(a, res, this);
  },
  onShow() {
    $set.setColor(a, this.data.page[0].grey);
  },
  onPageScroll(res) {
    $set.nav(res, this);
  },
  cA(res) {
    $set.component(res, this);
  },
  onShareAppMessage() {
    return { title: this.data.page[0].title, path: `/module/sharePage?From=主页&depth=1&share=true&aim=${this.aim}` };
  },
  onUnload() {
    delete this.data.page;
  }
});
