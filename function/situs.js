/* global wx getApp*/
const $file = require('../lib/file');

const { globalData: a, lib: { $page, $set } } = getApp();

$page('situs', {
  data: {},
  onPreload(res) {
    this.xiaoqu = res.query.xiaoqu;
    this.id = res.query.id;
    $set.preSet($file.readJson(`function/${this.xiaoqu}/${res.query.aim}`), a, res, this, false);
  },
  onLoad(res) {
    $set.Online(a, res, this);
  },
  /*
   * OnReady() {
   *   This.marker = wx.getStorageSync(`${this.xiaoqu}-all`)[this.id];
   * },
   */

  /*
   * Detail() {
   *   let markers = this.marker;
   *   wx.openLocation({
   *     latitude: marker.latitude,
   *     longitude: markers.longitude,
   *     name: markers.title,
   *   });
   * },
   */
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/function/situs?From=主页&depth=1&share=true&xiaoqu=${this.xiaoqu}&id=${this.id}&aim=${this.aim}`
    };
  },

  // 覆写重定向到主页
  redirect() {
    this.$switch('/page/main');
  }
});
