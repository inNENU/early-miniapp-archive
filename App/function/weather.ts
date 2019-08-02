/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-02 16:42:25
 * @Description: 天气预报
 */
import $register from 'wxpage';
import weatherHandler from '../components/weather/handler';
import { WeatherData } from '../components/weather/weather';

const { globalData: a } = getApp();
let share = false;

$register('weather', {
  data: {
    weather: {},
    number: 0,
    animation: {}
  },
  onLoad(options = {}) {
    const weatherData = wx.getStorageSync('weather');

    // 如果天气数据获取时间小于5分钟，则可以使用
    if (weatherData.date > new Date().getTime() - 300000) {
      const weather = weatherData.data.data as WeatherData['data'];

      this.canvas(weather);

      this.setData!({
        weather,
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

    // 设置页面背景色
    wx.setBackgroundColor({
      backgroundColorTop: a.nm ? '#000000' : '#efeef4',
      backgroundColor: a.nm ? '#000000' : '#efeef4',
      backgroundColorBottom: a.nm ? '#000000' : '#efeef4'
    });

    // 设置是否被分享
    share = Boolean(options.share);

    this.backgroundChange();
  },
  canvas(weather: WeatherData['data']) { // 绘制温度曲线
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
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      ctx.setFillStyle('#ffb74d');
      ctx.arc(x, y + 32, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.draw(true);

      ctx.setFillStyle('#ffb74d');
      ctx.fillText(`${dayForecast[i].max_degree}°`, x - 10, y + 20);
      ctx.draw(true);
    }

    ctx.setStrokeStyle('#4fc3f7');
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

      ctx.setFillStyle('#4fc3f7');
      ctx.arc(x, y + 20, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.draw(true);

      ctx.setFillStyle('#4fc3f7');
      ctx.fillText(`${dayForecast[i].min_degree}°`, x - 10, y + 44);
      ctx.draw(true);
    }
  },
  backgroundChange() { // 改变背景动画
    const animation1 = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease'
    });
    const animation2 = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease'
    });
    const animation3 = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease'
    });

    wx.startAccelerometer({
      interval: 'normal',
      success: () => console.log('start Accelerometer success')
    });

    wx.onAccelerometerChange(res => {
      animation1.translateX(res.x * 13.5)
        .step();
      animation2.translateX(res.x * 18)
        .step();
      animation3.translateX(res.x * 22.5)
        .step();

      this.setData!({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export()
      });
    });
  },
  // 更新提示
  refresh() {
    const { length } = Object.keys(this.data.weather.tips.observe);
    const numbers = this.data.number;

    this.setData!({ number: numbers === 0 ? length - 1 : numbers - 1 });
  },
  onUnload() {
    wx.stopAccelerometer({
      success: () => console.log('stop Accelerometer success')
    });
  },
  back() {
    if (share) wx.switchTab({ url: '/page/main' });
    else this.$back();
  },
  onShareAppMessage: () => ({ title: '天气', path: '/function/weather?share=true' })
});
