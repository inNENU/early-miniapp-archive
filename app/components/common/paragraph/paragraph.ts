/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 15:26:03
 * @Description: 段落组件
 */
Component({
  properties: {
    /** 段落配置 */
    config: { type: Object }
  },

  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
