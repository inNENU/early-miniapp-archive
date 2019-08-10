/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-10 21:36:12
 * @Description: 建设中页面
 */

import $register from 'wxpage';
import $page from '../utils/page';
const { globalData: a } = getApp();

$register('function', {
  onLoad(options) {
    if (options.scene) {
      const arg = decodeURIComponent(options.scene);

      this.setData({
        [arg]: true,
        T: a.T,
        nm: a.nm
      });
    }
    else this.setData({
      [options.action]: true,
      T: a.T,
      nm: a.nm
    });
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  main() {
    this.$launch('/page/main');
  }
});
