/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-02 15:37:51
 * @Description: 分享组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    config: { type: Object, value: { aim: '' } }
  },
  methods: {
    navigate(event: NormalEvent) {
      this.$route(event.currentTarget.dataset.url);
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
