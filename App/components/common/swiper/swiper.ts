/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-07 13:58:01
 * @Description: 媒体组件
 */

import * as $register from 'wxpage';

$register.C({
  properties: { config: Object },
  methods: {
    change(event: WXEvent.SwiperChange) {
      this.triggerEvent('change', event);
    },
    animation(event: WXEvent.SwiperAnimationFinish) {
      this.triggerEvent('animation', event);
    }
  }
});
