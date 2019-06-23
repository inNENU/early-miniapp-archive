/* global getApp wx*/
const { lib: { $register } } = getApp();

$register('web', {
  onLoad(res) {
    const { title } = res;

    wx.setNavigationBarTitle({ title });
    this.setData({ url: res.url, title });
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onShareAppMessage() {
    return { title: this.data.title, path: `/module/web?url=${this.data.url}` };
  }
});
