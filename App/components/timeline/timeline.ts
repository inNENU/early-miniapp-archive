/*
 * @Author: Mr.Hope
 * @Date: 2019-09-04 17:42:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-25 07:18:32
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
  /** 跳转详情的名称 */
  aim?: string;
  /** class名称 */
  class?: string;
}

$register.C({
  properties: {
    /** 时间线配置 */
    config: Array
  },
  data: {
    /** 是否使用交错布局 */
    alternate: false,
    timeList: [] as TimeLineItem[]
  },
  lifetimes: {
    attached() {
      const res = wx.getSystemInfoSync();

      this.setData({ alternate: res.windowWidth >= 750 });
    }
  },
  methods: {
    active(event: WXEvent.Touch) {
      const aim = this.data.config[event.currentTarget.dataset.index].aim as TimeLineItem['aim'];

      if (aim) this.triggerEvent('active', { aim });
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
