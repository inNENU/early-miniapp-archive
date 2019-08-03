/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-04 02:49:26
 * @Description: 列表组件
 */

import $register from 'wxpage';

$register.C({
  properties: { config: { type: Object } },
  methods: {
    navigate(res: NormalEvent) {
      const { url } = this.getDetail(res).content;

      this.$route(url);
    },
    pickerTap(res: PickerEvent) { // 控制选择器显隐
      const { id, content: { visible: value } } = this.getDetail(res);

      this.setData({
        [`config.content[${id}].visible`]: !value
      });
    },
    pickerChange(res: PickerEvent) {
      const { id, content } = this.getDetail(res);

      if (res.type === 'change') {
        const { value } = res.detail;

        if (Array.isArray(value)) {
          // 判断为多列选择器，遍历每一列更新页面数据、并存储选择器值
          value.forEach((x: string | number, y: number) => {
            content.value[y] = content.pickerValue[y][Number(x)];
            content.currentValue[y] = x;
          });
          wx.setStorageSync(content.key, value.join('-'));
        } else {
          // 判断为单列选择器，更新页面数据并存储选择器值
          content.value = content.pickerValue[Number(value)];
          content.currentValue = Number(value);
          wx.setStorageSync(content.key, Number(value));
        }

        // 将选择器的变更响应到页面上
        this.setData(
          { [`config.content[${id}]`]: content },
          () => {
            this.triggerEvent('change', { value, event: content.picker });
            // this.triggerEvent('change', { id, value, type: 'picker', event: content.picker });
          }
        );
      }
    },
    switch(res: SwitchEvent) {
      const { id, content } = this.getDetail(res);

      // 更新页面数据
      this.setData(
        { [`this.config.content[${id}].status`]: res.detail.value },
        () => {
          console.log(this.data.config);
          this.triggerEvent('change', { event: content.Switch, value: res.detail.value });
        }
      );

      wx.setStorageSync(content.swiKey, res.detail.value); // 将开关值写入存储的swiKey变量中
    },
    button(res: NormalEvent) { // 触发按钮事件
      const { content } = this.getDetail(res);

      this.triggerEvent('change', { event: content.button });
    },
    sliderTap(res: NormalEvent) { // 触发滑块事件
      const { id, content } = this.getDetail(res);

      // 更新页面数据
      this.setData(
        { [`this.config.content[${id}].visible`]: !content.visible }
      );
    },
    sliderChange(res: SliderEvent) {
      const { id, content } = this.getDetail(res);
      const { value } = res.detail;
      // 更新页面数据，并写入值到存储
      content.value = value;

      // 写入页面数据
      this.setData(
        { [`this.config.content[${id}].value`]: value },
        () => {
          this.triggerEvent('change', { value, event: content.slider });
        }
      );

      if (res.type === 'change') wx.setStorageSync(content.sliKey, value);
    },
    getDetail(res: MiniprogramEvent) { // 获得选择器位置与内容
      const id = res.currentTarget.id || res.currentTarget.dataset.id;

      return { id, content: this.data.config.content[id] };
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
