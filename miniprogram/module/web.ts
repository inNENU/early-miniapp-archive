/* global getApp wx*/
import $register from 'wxpage';
import $page from '../utils/setpage';

$register('web', {
  onLoad(res: any) {
    const { title } = res;

    wx.setNavigationBarTitle({ title });
    this.setData!({ url: res.url, title });
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onShareAppMessage() {
    return { title: this.data.title, path: `/module/web?url=${this.data.url}` };
  }
});
