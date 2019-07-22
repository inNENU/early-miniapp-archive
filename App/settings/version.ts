/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:50:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-22 13:07:15
 * @Description: 关于2.0版本
 */
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
const { globalData } = getApp();

$register('2.0', {
  data: {
    T: globalData.T,
    nm: globalData.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aimDepth: 1, aim: 'currentLog' },
      { tag: 'p', head: 'V2.0.0 2019.06.23', text: '重构小程序\n更新编译基础库为2.7.2\n小程序现在拥有更好的性能' },
      { tag: 'p', head: 'V2.0.1 2019.06.25', text: '部分问题修正\n初步完成小程序TS化' },
      { tag: 'p', head: 'V2.0.2 2019.07.10', text: '完成小程序TS化\n初步兼容QQ小程序' },
      { tag: 'p', head: 'V2.0.3 2019.07.15', text: '完全兼容QQ小程序\n完善QQ小程序的地图提示' },
      { tag: 'p', head: 'V2.0.4 2019.07.20', text: '修复分享好友失效的问题' },
      { tag: 'p', head: 'V2.0.5 2019.07.21', text: '添加天气模块' },
      { tag: 'p', head: 'V2.0.6 2019.07.22', text: '完善iOS夜间模式' },
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
