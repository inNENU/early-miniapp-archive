/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-31 13:28:29
 * @Description: 天气预报
 */
import $register from 'wxpage';
import weatherHandler from '../components/weather/handler';
import { WeatherData } from '../components/weather/weather';

const { globalData: a } = getApp();

$register('weather', {
  data: {
    weather: {},
    number: 0
  },
  onLoad(options = {}) {
    const weatherData = wx.getStorageSync('weather');

    // 如果天气数据获取时间小于5分钟，则可以使用
    if (weatherData.date > new Date().getTime() - 300000) {
      const weather = weatherData.data.data as WeatherData['data'];

      this.canvas(weather);

      this.setData!({
        weather,
        share: Boolean(options.share),
        night: new Date().getHours() > 18 || new Date().getHours() < 5,
        nm: a.nm,
        statusBarHeight: wx.getSystemInfoSync().statusBarHeight
      });
    }
    // 否则需要重新获取并处理
    else wx.request({
      url: 'https://mp.nenuyouth.com/server/weather2.php',
      success: res => {
        const weather = weatherHandler((res.data as WeatherData).data);

        this.canvas(weather);

        this.setData!({
          weather,
          share: Boolean(options.share),
          night: new Date().getHours() > 18 || new Date().getHours() < 5,
          nm: a.nm,
          statusBarHeight: wx.getSystemInfoSync().statusBarHeight
        });
      }
    });


    wx.setBackgroundColor({
      backgroundColorTop: '#efeef4', backgroundColor: '#efeef4', backgroundColorBottom: '#efeef4'
    });
  },
  // 绘制温度曲线
  canvas(weather: WeatherData['data']) {
    const width = getApp().globalData.info.screenWidth;
    const ctx = wx.createCanvasContext('weather');
    const highTemperature: number[] = [];
    const lowTemperature: number[] = [];
    const dayForecast = weather.dayForecast;
    let max = -50;
    let min = 50;

    dayForecast.forEach(element => {
      const maxDegreee = Number(element.max_degree);
      const minDegree = Number(element.min_degree);

      highTemperature.push(maxDegreee);
      lowTemperature.push(minDegree);
      if (maxDegreee > max) max = maxDegreee;
      if (minDegree < min) min = minDegree;
    });

    const gap = max - min;

    ctx.beginPath();

    // 绘制高温曲线
    ctx.setLineWidth(2);
    ctx.setStrokeStyle('#ffb74d');
    ctx.setFillStyle('#ffb74d');
    ctx.setFontSize(16);
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      if (i === 0) ctx.moveTo(x, y + 32);
      else ctx.lineTo(x, y + 32);
    }
    ctx.stroke();
    ctx.draw();

    // 绘制温度与点
    ctx.setFillStyle('#ffb74d');
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillText(`${dayForecast[i].max_degree}°`, x - 10, y + 20);
    }
    ctx.draw(true);

    ctx.setStrokeStyle('#4fc3f7');
    ctx.setFillStyle('#4fc3f7');
    // 绘制低温曲线
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - lowTemperature[i]) / gap * 100;

      if (i === 0) ctx.moveTo(x, y + 20);
      else ctx.lineTo(x, y + 20);
    }
    ctx.stroke();
    ctx.draw(true);

    ctx.setFillStyle('#4fc3f7');

    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - lowTemperature[i]) / gap * 100;


      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`${dayForecast[i].min_degree}°`, x - 10, y + 44);
    }
    ctx.draw(true);
  },
  // 更新提示
  refresh() {
    const { length } = Object.keys(this.data.weather.tips.observe);
    const numbers = this.data.number;

    this.setData!({ number: numbers === 0 ? length - 1 : numbers - 1 });
  },
  back() {
    this.$back();
  },
  redirect() {
    wx.switchTab({ url: '/page/main' });
  },
  onShareAppMessage: () => ({ title: '天气', path: '/function/weather?share=true' })
});
