/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-28 16:42:42
 * @Description: 天气预报
 */
import $register from 'wxpage';
import { WeatherData } from '../components/weather/weather';

const { globalData: a } = getApp();

$register('weather', {
  data: {
    weather: {}
  },
  onLoad() {
    const weather = wx.getStorageSync('weather');

    if (weather) this.setData!({ weather, nm: a.nm });
    else wx.request({
      url: 'https://mp.nenuyouth.com/server/weather2.php',
      success: res => {
        const weather = (res.data as WeatherData).data;
        const weatherType = weather.observe.weather_short;

        const weatherClass =
          weatherType.indexOf('晴') != -1
            ? (new Date().getHours() > 6 && new Date().getHours() < 18)
              ? new Date().getSeconds() % 2 == 0 ? 'sunny' : 'rainbow'
              : 'starry'
            : weatherType.indexOf('雷') !== -1 || weatherType.indexOf('电') !== -1 || weatherType.indexOf('暴') !== -1
              ? 'stormy'
              : weatherType.indexOf('雪') !== -1 || weatherType.indexOf('霜') !== -1 || weatherType.indexOf('冰') !== -1
                ? 'snowy'
                : weatherType.indexOf('雨') !== -1
                  ? 'rainy'
                  : weatherType.indexOf('阴') !== -1 || weatherType.indexOf('云') !== -1
                    ? 'cloudy' : "";

        this.setData!({ weatherClass, weather });

        wx.setStorageSync('weather', weather);
      }
    });
  }
});