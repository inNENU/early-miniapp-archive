/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-21 20:29:44
 * @Description: 天气预报
 */
import $register from 'wxpage';
const { globalData: a } = getApp();

$register('weather', {
  data: {
    weather: {}
  },
  onLoad() {
    const weather = wx.getStorageSync('weather');

    this.setData!({ weather, nm: a.nm });
  }
});