Component({
  properties: {
    /** 网格组件配置 */
    config: { type: Object, value: { aim: '' } }
  },

  // QQ 及低版本微信兼容
  options: {
    styleIsolation: 'shared'
  }
});
