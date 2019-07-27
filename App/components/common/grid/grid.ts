/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-27 13:24:30
 * @Description: 分享组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    config: { type: Object, value: { aim: '' } }
  },
  methods: {
    _navigate(event: NormalEvent) {
      this.$route(event.currentTarget.dataset.url);
    }
  },
  options: {
    styleIsolation: 'shared'
  }
});