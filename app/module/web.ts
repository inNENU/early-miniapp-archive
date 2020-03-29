/*
 * @Author: Mr.Hope
 * @Date: 2019-08-13 19:19:05
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-29 20:07:56
 * @Description: Webview模块
 */

import * as $register from 'wxpage';
import { setColor } from '../utils/page';

$register('web', {
  onLoad(res: any) {
    // 设置导航栏标题
    const { title } = res;

    wx.setNavigationBarTitle({ title });
    this.setData({ url: res.url, title });
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onShareAppMessage() {
    return { title: this.data.title, path: `/module/web?url=${this.data.url}` };
  }
});
