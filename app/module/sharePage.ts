/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 17:39:12
 * @Description: 分享页面
 */

import $register = require('wxpage');
import { changeNav, resolvePage, setColor, setOnlinePage } from '../utils/page';

$register('sharePage', {
  onNavigate(option) {
    resolvePage(option);
  },

  onLoad(option: any) {
    if ('scene' in option) option.aim = decodeURIComponent(option.scene);
    option.From = '主页';
    option.share = true;
    option.depth = 1;

    console.log(option);
    setOnlinePage(option, this);
    wx.reportMonitor('2', 1);
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

  /** 重定向到主页 */
  redirect() {
    this.$launch('main');
  },

  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?aim=${this.data.page[0].aim}`
    };
  }
});
