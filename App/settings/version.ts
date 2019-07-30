/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:50:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 11:08:36
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
      { tag: 'p', head: 'V2.1.0 2019.7.26', text: '初步完成小程序组件化' },
      { tag: 'p', head: 'V2.1.1 2019.7.27', text: '减少小程序代码包体积' },
      { tag: 'p', head: 'V2.1.2 2019.7.28', text: '添加天气页面' },
      { tag: 'p', head: 'V2.1.3 2019.7.29', text: '修复预加载逻辑问题' },
      { tag: 'p', head: 'V2.1.4 2019.7.30', text: '修复通知重复弹出的问题' },
      { tag: 'list', content: [{ text: '历史更新', desc: '点击查看', aim: 'log0' }] },
      { tag: 'foot', author: 'Mr.Hope' }
    ]
  },
  onNavigate(res: WXPage.PageArg) {
    $page.resolve(res, this.data.page);
  },
  onLoad(res: any) {
    $page.Set({ option: res, ctx: this });

    // 显示通知
    $page.Notice(this.aim);
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

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
