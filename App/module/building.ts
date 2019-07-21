/* global wx Page*/
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
