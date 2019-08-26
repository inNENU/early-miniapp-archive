/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-16 17:07:38
 * @Description: 弹窗组件
 */

import $register from 'wxpage';

$register.C({
  properties: {
    config: Object,
    // 是否展示对话框
    show: {
      type: Boolean,
      default: false
    }
  },
  data: {},
  methods: {
    // 用户确认
    confirm() {
      this.triggerEvent('confirm');
    },
    // 用户取消
    cancel() {
      this.triggerEvent('cancel');
    },
    // 用户点击关闭按钮
    closeDialog() {
      this.triggerEvent('close');
    },
    // 用户点击更多按钮
    more() {
      this.triggerEvent('more');
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
