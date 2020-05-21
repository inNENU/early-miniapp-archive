import $register = require('wxpage');

$register.C({
  properties: {
    /** 图片组件配置 */
    config: { type: Object as any },

    /** 展示图片列表 */
    url: {
      type: Array,
      value: []
    }
  },

  methods: {
    /** 图片加载完成 */
    load() {
      this.setData({ load: true });
    },

    /** 图片加载出错 */
    error() {
      this.setData({ error: true });

      console.warn(`${this.data.config.src}图片加载失败`);
      wx.reportMonitor('10', 1);
    },

    /** 进行图片预览 */
    view() {
      wx.previewImage({
        current: this.data.config.res || this.data.config.src,
        urls:
          this.data.url.length === 0
            ? [this.data.config.res || this.data.config.src]
            : this.data.url
      });
    }
  }
});
