/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-27 14:19:53
 * @Description: 媒体组件
 */

import $register from 'wxpage';

$register.C({
  properties: { config: Object },
  methods: {
    _change(event: NormalEvent) {
      this.triggerEvent('change', event);
    }
  }
});