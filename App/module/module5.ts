/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:40:51
 * @Description: 模块页面5
 */

import { changeNav, resolvePage, setColor, setOnlinePage } from '../utils/page';
import $register from 'wxpage';

$register('module5', {
  onNavigate(option) {
    resolvePage(option);
  },

  onLoad(res: any) {
    setOnlinePage(res, this);
  },

  onShow() {
    if (this.data.page) {
      // 设置胶囊和背景颜色
      const { nc, bc } = setColor(this.data.page[0].grey);

      wx.setNavigationBarColor(nc);
      wx.setBackgroundColor(bc);
    }
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?aim=${this.data.page[0].aim}`
    };
  }
});
