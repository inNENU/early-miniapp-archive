Component({
  properties: {
    /** 普通列表配置 */
    config: Object as any
  },

  // QQ 及低版本微信兼容
  options: {
    styleIsolation: 'shared'
  }
});
