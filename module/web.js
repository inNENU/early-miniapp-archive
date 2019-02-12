/* global getApp wx*/
let { lib: { $page } } = getApp();

$page("web", {
  onLoad(res) {
    let title = res.title;
    wx.setNavigationBarTitle({ title });
    this.setData({ url: res.url, title });
  },
  onShareAppMessage() {
    return {
      title: this.data.title, path: `/module/web?url=${this.data.url}`
    };
  }
});