/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-02 15:48:12
 * @Description: 媒体组件
 */

import $register from 'wxpage';

$register.C({
  properties: { config: Object },
  methods: {
    change(event: NormalEvent) {
      this.triggerEvent('change', event);
    },
    animation(event: NormalEvent) {
      this.triggerEvent('animation', event);
    }
  }
});
