/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 16:52:08
 * @Description: 媒体组件
 */

import $register from 'wxpage';
import { tip } from '../../../utils/wx';

$register.C({
  properties: { config: Object },
  methods: {
    _video(event: NormalEvent) {
      console.info(`视频状态为${event.type}`); // 输出视频组件状态
      switch (event.type) {
        case 'waiting':
          tip('缓冲中..'); // 视频缓冲时提示用户等待
          break;
        case 'play':
          wx.hideToast(); // 正常播放时隐藏提示
          break;
        case 'error':
        default:
          tip('视频加载出错');
          wx.reportMonitor('5', 1); // 调试
      }
    }
  }
});
