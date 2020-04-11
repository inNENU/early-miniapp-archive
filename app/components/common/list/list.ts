Component({
  properties: {
    /** 普通列表配置 */
    config: Object as any
  },

  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
