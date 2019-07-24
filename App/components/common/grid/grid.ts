/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-24 12:51:38
 * @Description: 分享组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    config: { type: Object, value: { aim: '' } },
    theme: { type: String }
  },
  methods: {
    _navigate(event: NormalEvent) {
      this.$route(event.currentTarget.dataset.url);
    }
  // },
  // observers: {
  //   theme(theme: string) {
  //     this.setData({ theme });
  //   }
  // },
  // options: {
    // styleIsolation: 'shared'
  }
});