/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-09 17:11:18
 * @Description: 建设中页面
 */

import $register from 'wxpage';
// import $util from '../utils/common';
const { globalData: a } = getApp();

$register('building', {
  onLoad(options) {
    if (options.scene) {
      const arg = decodeURIComponent(options.scene);

      this.setData({
        [arg]: true,
        T: a.T,
        nm: a.nm
      });
    }
    else this.setData({
      [options.action]: true,
      T: a.T,
      nm: a.nm
    });
  },
  main() {
    this.$launch('/page/main');
  }
});
