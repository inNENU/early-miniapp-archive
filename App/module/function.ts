/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-04 12:45:18
 * @Description: 功能页面
 */

import $register from 'wxpage';
import $page from '../utils/page';
import { listFile, Delete } from '../utils/file';
import { modal } from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('function', {
  data: { appID: a.appID },
  onLoad(options) {
    if (options.scene) {
      const arg = decodeURIComponent(options.scene);

      this.setData({
        [arg]: true,
        T: a.T,
        nm: a.nm
      });
    } else if (options.action)
      this.setData({
        [options.action]: true,
        T: a.T,
        nm: a.nm
      });
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  /** 初始化小程序 */
  resetApp() {
    // 显示提示
    wx.showLoading({ title: '初始化中', mask: true });

    // 清除文件系统文件与数据存储
    listFile('')
      .forEach((filePath: string) => {
        Delete(filePath);
      });
    wx.clearStorageSync();

    // 隐藏提示
    wx.hideLoading();
    // 提示用户重启
    modal('小程序初始化完成', '请单击 “退出小程序按钮” 退出小程序');

    this.setData({ exit: true, reset: false });
  },

  /** 返回主页 */
  main() {
    this.$launch('/page/main');
  }
});