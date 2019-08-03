/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-04 02:49:02
 * @Description: 图片组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    config: { type: Object },
    url: {
      type: Array,
      value: []
    }
  },
  methods: {
    load() { // 图片加载完成
      this.setData({ load: true });
    },
    error() { // 图片加载出错
      this.setData({ error: true });

      console.warn(`${this.data.config.src}图片加载失败`);
      wx.reportMonitor('10', 1);
    },
    view() { // 开始预览图片
      wx.previewImage({
        current: this.data.config.res || this.data.config.src,
        urls: this.data.url.length === 0 ? [this.data.config.res || this.data.config.src] : this.data.url
      });
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
