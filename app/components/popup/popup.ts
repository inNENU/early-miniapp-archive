/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-16 17:07:38
 * @Description: 弹窗组件
 */

import $register = require('wxpage');

export interface PopupConfig {
  /** 主标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 文字 */
  text?: string;
  /** 描述 */
  desc?: string;
  /** 是否展示更多按钮 (默认: 否) */
  more?: boolean;
  /** 取消按钮文字，填入 `false` 不显示取消按钮，默认为 '取消 */
  cancel?: string | boolean;
  /** 确认按钮文字 (默认: '确认')*/
  confirm?: string;
}

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
    confirm(): void {
      this.triggerEvent('confirm');
    },
    // 用户取消
    cancel(): void {
      this.triggerEvent('cancel');
    },
    // 用户点击关闭按钮
    closeDialog(): void {
      this.triggerEvent('close');
    },
    // 用户点击更多按钮
    more(): void {
      this.triggerEvent('more');
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
