/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 15:25:44
 * @Description: 媒体组件
 */

import * as $register from 'wxpage';
import { tip } from '../../../utils/wx';

$register.C({
  properties: {
    /** 媒体组件配置 */
    config: { type: Object }
  },

  methods: {
    /** 视频缓冲时提示用户等待 */
    wait() {
      tip('缓冲中..');
    },

    /** 正常播放时隐藏提示 */
    play() {
      wx.hideToast();
    },

    /** 提示用户加载出错 */
    error() {
      tip('视频加载出错');
      wx.reportMonitor('5', 1); // 调试
    }
  }
});
