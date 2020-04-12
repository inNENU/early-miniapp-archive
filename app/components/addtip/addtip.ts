/** 添加到我的小程序 */

import * as $register from 'wxpage';
import { AppOption } from '../../app';
const { globalData } = getApp<AppOption>();

$register.C({
  properties: {
    /** 提示文字 */
    text: { type: String, value: '点击「添加小程序」，下次访问更便捷' },
    /** 关闭时延，单位ms，默认5000 */
    duration: { type: Number, value: 5000 }
  },

  data: {
    SHOW_TOP: false,
    SHOW_MODAL: false,
    statusBarHeight: globalData.info.statusBarHeight
  },

  lifetimes: {
    ready() {
      // 判断是否已经显示过
      const cache = wx.getStorageSync('addtip');

      if (!cache) {
        // 没显示过，则进行展示
        this.setData({ SHOW_TOP: true });

        // 关闭时间
        setTimeout(() => {
          this.setData({ SHOW_TOP: false });
        }, this.data.duration);
      }
    }
  },

  methods: {
    /** 显示全屏添加说明 */
    showModal() {
      this.setData({
        SHOW_TOP: false,
        SHOW_MODAL: true
      });
    },

    /** 确定逻辑处理 */
    okHandler() {
      this.setData({ SHOW_MODAL: false });
      wx.setStorage({ key: 'addtip', data: new Date().getTime() });
    }
  }
});
