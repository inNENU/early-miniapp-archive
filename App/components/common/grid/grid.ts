/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 15:19:56
 * @Description: 网格组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    /** 网格组件配置 */
    config: { type: Object, value: { aim: '' } }
  },

  methods: {
    /** 跳转到指定页面 */
    navigate(event: WXEvent.Touch) {
      this.$route(event.currentTarget.dataset.url);
    }
  },

  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
