/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:50:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-09 17:09:06
 * @Description: 版本介绍
 */
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
const { globalData } = getApp();

$register('version', {
  data: {
    T: globalData.T,
    nm: globalData.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aimDepth: 1, aim: 'currentLog' },
      { tag: 'p', head: 'V2.2.1 2019.8.6', text: '初步添加搜索模块' },
      { tag: 'p', head: 'V2.2.2 2019.8.7', text: '优化排序算法' },
      { tag: 'p', head: 'V2.2.3 2019.8.8', text: '搜索模式适配夜间模式' },
      { tag: 'p', head: 'V2.2.4 2019.8.8', text: '自定义导航栏改进' },
      { tag: 'p', head: 'V2.2.5 2019.8.8', text: '修复swiper故障的问题' },
      { tag: 'p', head: 'V2.2.6 2019.8.9', text: '添加客服/意见反馈入口\n优化搜索与天气页面UI' },
      { tag: 'foot', author: 'Mr.Hope' }
    ]
  },
  onNavigate(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res, this.data.page);
  },
  onLoad(res: any) {
    $page.Set({ option: res, ctx: this });

    // 显示通知
    $page.Notice('version');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page && this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  }
});
