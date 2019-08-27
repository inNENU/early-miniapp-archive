/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-14 23:26:51
 * @Description: 功能页面
 */

import $register from 'wxpage';
import $page from '../utils/page';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('function', {
  onLoad(options) {
    if (options.scene) {
      const arg = decodeURIComponent(options.scene);

      this.setData({
        [arg]: true,
        T: a.T,
        nm: a.nm
      });
    } else if (options.action)
      this.setData({
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
