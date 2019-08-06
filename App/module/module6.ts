/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-06 18:43:44
 * @Description: 模块页面6
 */

import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';

$register('module6', {
  onNavigate(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res);
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
  onPageScroll(res) {
    $component.nav(res, this);
  },
  cA(res) {
    $component.trigger(res, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?From=主页&depth=1&share=true&aim=${this.data.page[0].aim}`
    };
  }
});
