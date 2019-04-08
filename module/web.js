/* global getApp wx*/
const { lib: { $page } } = getApp();

$page('web', {
  onLoad(res) {
    const { title } = res;

    wx.setNavigationBarTitle({ title });
    this.setData({ url: res.url, title });
  },
  onShareAppMessage() {
    return { title: this.data.title, path: `/module/web?url=${this.data.url}` };
  }
});
