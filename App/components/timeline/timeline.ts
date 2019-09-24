/*
 * @Author: Mr.Hope
 * @Date: 2019-09-04 17:42:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-12 20:00:16
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
      // console.log(this.properties.config);
      // console.log(this.data.config);
      const res = wx.getSystemInfoSync();
      // const alternate = res.windowWidth >= 750;
      // const timeList = this.properties.config as TimeLineItem[];

      // timeList.forEach((element, index) => {
      //   element.class = alternate ? `timeline-item-${index % 2 === 0 ? 'right' : 'left'}` : '';
      //   if (index === timeList.length - 1) element.class += 'timeline-item-last';
      // });

      // console.log(timeList);
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
