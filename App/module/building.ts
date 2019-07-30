/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 16:27:26
 * @Description: 建设中页面
 */

import $register from 'wxpage';
import $wx from '../utils/wx';

$register('building', {
  onLoad(res) {
    const timeoutFunc = setTimeout(() => {
      wx.navigateBack({ delta: 1 });
    }, 3000);
    const month = res && res.month ? res.month : 12;

    $wx.modal('该功能尚未开放', `该功能将于${month}月份左右上线，敬请期待。`, () => {
      clearTimeout(timeoutFunc);
      wx.navigateBack({ delta: 1 });
    });
  }
});
