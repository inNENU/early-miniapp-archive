/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 01:55:44
 * @Description: 模块页面3
 */

import $register from 'wxpage';
import $page from '../utils/page';

$register('module3', {
  onNavigate(option) {
    $page.resolve(option);
  },

  onLoad(res: any) {
    $page.Online(res, this);
  },

  onShow() {
    if (this.data.page) {
      // 设置胶囊和背景颜色
      const { nc, bc } = $page.color(this.data.page[0].grey);

      wx.setNavigationBarColor(nc);
      wx.setBackgroundColor(bc);
    }
  },

  onPageScroll(event) {
    $page.nav(event, this);
  },

  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?aim=${this.data.page[0].aim}`
    };
  }
});
