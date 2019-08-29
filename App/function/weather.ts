/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-29 16:57:19
 * @Description: 天气预报
 */
import $register from 'wxpage';
import $page from '../utils/page';
import weatherHandler from '../components/weather/handler';
import { WeatherData, WeatherDetail } from '../components/weather/weather';

const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('weather', {
  data: {
    /** 天气数据 */
    weather: {} as WeatherDetail,
    /** 当前tips的索引值 */
    tipIndex: 0,
    /** 动画对象 */
    animation: {}
  },
  onLoad() {
    const weatherData = wx.getStorageSync('weather');

    // 如果天气数据获取时间小于5分钟，则可以使用
    if (weatherData.date > new Date().getTime() - 300000) {
      const weather = (weatherData.data as WeatherDetail);

      this.canvas(weather);

      this.setData({
        weather,
        // 18点至次日5点为夜间
        night: new Date().getHours() > 18 || new Date().getHours() < 5,
        nm: a.nm,
        statusBarHeight: a.info.statusBarHeight
      });
    } else // 否则需要重新获取并处理
      wx.request({
        url: 'https://mp.nenuyouth.com/server/weather.php',
        success: res => {
          const weather = weatherHandler((res.data as WeatherData).data);

          this.canvas(weather);

          this.setData({
            weather,
            // 18点至次日5点为夜间
            night: new Date().getHours() > 18 || new Date().getHours() < 5,
            nm: a.nm,
            statusBarHeight: a.info.statusBarHeight
          });
        }
      });

    // 设置页面背景色
    wx.setBackgroundColor({
      backgroundColorTop: a.nm ? '#000000' : '#efeef4',
      backgroundColor: a.nm ? '#000000' : '#efeef4',
      backgroundColorBottom: a.nm ? '#000000' : '#efeef4'
    });

    this.backgroundChange();
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  /**
   * 绘制温度曲线
   *
   * @param weather 天气详情
   */
  canvas(weather: WeatherDetail) {
    console.log(weather);
    // 为了防止iPad等设备可以转屏，必须即时获取
    const width = getApp().globalData.info.windowWidth;
    /** 天气画布组件 */
    const canvaseContent = wx.createCanvasContext('weather');
    const highTemperature: number[] = [];
    const lowTemperature: number[] = [];
    const dayForecast = weather.dayForecast;
    let max = -50;
    let min = 50;

    // 生成最高/最低温
    dayForecast.forEach(element => {
      const maxDegreee = Number(element.max_degree);
      const minDegree = Number(element.min_degree);

      highTemperature.push(maxDegreee);
      lowTemperature.push(minDegree);
      if (maxDegreee > max) max = maxDegreee;
      if (minDegree < min) min = minDegree;
    });

    /** 温差 */
    const gap = max - min;

    canvaseContent.beginPath();
    canvaseContent.lineWidth = 2;
    canvaseContent.font = '16px sans-serif';

    canvaseContent.strokeStyle = '#ffb74d';
    canvaseContent.fillStyle = '#ffb74d';

    // 绘制高温曲线
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      if (i === 0) canvaseContent.moveTo(x, y + 32);
      else canvaseContent.lineTo(x, y + 32);
    }
    canvaseContent.stroke();
    canvaseContent.draw();

    // 绘制高温度数值与点
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      canvaseContent.arc(x, y + 32, 3, 0, Math.PI * 2);
      canvaseContent.fill();
      canvaseContent.draw(true);

      canvaseContent.fillText(`${dayForecast[i].max_degree}°`, x - 10, y + 20);
      canvaseContent.draw(true);
    }

    canvaseContent.strokeStyle = '#4fc3f7';
    canvaseContent.fillStyle = '#4fc3f7';

    // 绘制低温曲线
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - lowTemperature[i]) / gap * 100;

      if (i === 0) canvaseContent.moveTo(x, y + 20);
      else canvaseContent.lineTo(x, y + 20);
    }
    canvaseContent.stroke();
    canvaseContent.draw(true);

    // 绘制低温度数值与点
    for (let i = 0; i < dayForecast.length; i += 1) {
      const x = width / 10 + i * width / 5;
      const y = (max - lowTemperature[i]) / gap * 100;

      canvaseContent.arc(x, y + 20, 3, 0, Math.PI * 2);
      canvaseContent.fill();
      canvaseContent.draw(true);

      canvaseContent.fillText(`${dayForecast[i].min_degree}°`, x - 10, y + 44);
      canvaseContent.draw(true);
    }
  },

  /** 改变背景动画 */
  backgroundChange() {
    /** 动画选项 */
    const animationOptions: WechatMiniprogram.CreateAnimationOption = { duration: 200, timingFunction: 'ease' };
    /** 背景层1动画 */
    const layer1Animation = wx.createAnimation(animationOptions);
    /** 背景层2动画 */
    const layer2Animation = wx.createAnimation(animationOptions);
    /** 背景层3动画 */
    const layer3Animation = wx.createAnimation(animationOptions);

    wx.startAccelerometer({
      interval: 'normal',
      success: () => console.log('start Accelerometer success')
    });

    wx.onAccelerometerChange(res => {
      layer1Animation.translateX(res.x * 13.5)
        .step();
      layer2Animation.translateX(res.x * 18)
        .step();
      layer3Animation.translateX(res.x * 22.5)
        .step();

      this.setData({
        animation1: layer1Animation.export(),
        animation2: layer2Animation.export(),
        animation3: layer3Animation.export()
      });
    });
  },

  /** 更新提示 */
  refresh() {
    const { length } = Object.keys(this.data.weather.tips.observe);
    const numbers = this.data.tipIndex;

    this.setData({ tipIndex: numbers === 0 ? length - 1 : numbers - 1 });
  },
  onUnload() {
    /** 移除加速度计监听 */
    wx.stopAccelerometer({ success: () => console.log('stop Accelerometer success') });
  },
  back() {
    if (this.$state.firstOpen) wx.reLaunch({ url: '/page/main' });
    else this.$back();
  },
  onShareAppMessage: () => ({ title: '天气', path: '/function/weather' })
});
