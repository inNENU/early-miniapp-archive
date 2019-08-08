/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-08 14:36:15
 * @Description: 模块页面8
 */

import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';

$register('sharePage', {
  onNavigate(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res);
  },
  onLoad(res: any) {
    if ('scene' in res) res.aim = decodeURIComponent(res.scene);
    res.From = '主页';
    res.share = true;
    res.depth = 1;

    console.log(res);
    $page.Online(res, this);
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
  onPageScroll(res) {
    $component.nav(res, this);
  },
  cA(res) {
    $component.trigger(res, this);
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
