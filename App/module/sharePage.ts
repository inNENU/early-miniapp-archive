/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-14 23:08:52
 * @Description: 模块页面8
 */

import $register from 'wxpage';
import $page from '../utils/page';

$register('sharePage', {
  onNavigate(option) {
    $page.resolve(option);
  },
  onLoad(option: any) {
    if ('scene' in option) option.aim = decodeURIComponent(option.scene);
    option.From = '主页';
    option.share = true;
    option.depth = 1;

    console.log(option);
    $page.Online(option, this);
    wx.reportMonitor('2', 1);
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
  redirect() {
    this.$launch('/page/main');
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?aim=${this.data.page[0].aim}`
    };
  }
});
