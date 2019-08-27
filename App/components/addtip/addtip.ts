/*
 * @Author: Mr.Hope
 * @Date: 2019-08-19 12:08:25
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-20 18:12:34
 * @Description: 添加到我的小程序
 */

import $register from 'wxpage';

const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register.C({
  /**
   * 组件的属性列表
   */
  properties: {
    // 提示文字
    text: {
      type: String,
      value: '点击「添加小程序」，下次访问更便捷'
    },
    // 多少秒后关闭
    duration: {
      type: Number,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    SHOW_TOP: false,
    SHOW_MODAL: false,
    statusBarHeight: a.info.statusBarHeight
  },
  lifetimes: {
    ready() {
      // 判断是否已经显示过
      const cache = wx.getStorageSync('addtip');

      if (cache) return;
      // 没显示过，则进行展示
      this.setData({ SHOW_TOP: true });

      // 关闭时间
      setTimeout(() => {
        this.setData({ SHOW_TOP: false });
      }, this.data.duration * 1000);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 显示全屏添加说明
    showModal() {
      this.setData({
        SHOW_TOP: false,
        SHOW_MODAL: true
      });
    },

    okHandler() {
      this.setData({ SHOW_MODAL: false });
      wx.setStorage({ key: 'addtip', data: new Date().getTime() });
    }
  }
});
