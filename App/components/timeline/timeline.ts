/*
 * @Author: Mr.Hope
 * @Date: 2019-09-04 17:42:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-08 17:30:29
 * @Description: 时间线组件
 */

import $register from 'wxpage';

export interface TimeLineItem {
  /** 时间线项目标题 */
  title: string;
  /** 时间线项目文字 */
  text: string;
  /** 时间线项目图标地址 */
  icon?: string;
  /** 时间线指示点颜色 */
  color: 'green' | 'red' | 'blue';
}

$register.C({
  properties: {
    /** 时间线配置 */
    config: Array
  },
  data: {
    /** 是否使用交错布局 */
    alternate: false
  },
  methods: {
    attached() {
      const res = wx.getSystemInfoSync();

      this.setData({ alternate: res.windowWidth >= 750 });
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
