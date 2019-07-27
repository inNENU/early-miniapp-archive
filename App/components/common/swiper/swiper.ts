/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 15:12:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-27 13:48:21
 * @Description: 媒体组件
 */

import { tip } from '../../../utils/wx';

Component({
  properties: { config: Object },
  methods: {
    _change(event: NormalEvent) {
this.triggerEvent('change', event, eventOption);
    }
  }
});