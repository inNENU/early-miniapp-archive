/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-06 23:30:28
 * @Description: 搜索组件
 */

import $register from 'wxpage';
// import { tip } from '../../../utils/wx';

$register.C({
  properties: {
    words: { type: Array },
    result: { type: Object }
  },
  data: {
    showInput: false,
    value: ''
  },

  methods: {
    showInput() {
      this.setData({ showInput: true });
    },
    hideInput() {
      this.setData({ value: '', showInput: false });
    },
    clearInput() {
      this.setData({ value: '' });
    },
    inputTyping(event: WXEvent.Input) {
      this.setData({ value: event.detail.value });
      this.triggerEvent('searching', { value: event.detail.value });
    },
    confirm(event: WXEvent.Input) {
      this.triggerEvent('search', { value: event.detail.value });
    }
  }
});
