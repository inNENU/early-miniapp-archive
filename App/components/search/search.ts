/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-13 19:30:54
 * @Description: 搜索组件
 */

import * as $register from 'wxpage';

$register.C({
  properties: {
    words: Array,
    searchword: String
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
    select(event: WXEvent.Touch) {
      const value = this.data.words[event.currentTarget.dataset.index];

      this.setData({ value });
      this.setData({ words: [] });
      this.triggerEvent('search', { value });
    },
    confirm(event: WXEvent.Input) {
      this.setData({ words: [] });
      this.triggerEvent('search', { value: event.detail.value });
    }
  },
  observers: {
    searchword(value: string) {
      this.setData({ value, showInput: true });
    }
  },
  options: { styleIsolation: 'shared' }
});
