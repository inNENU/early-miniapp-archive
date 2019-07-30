/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 11:04:22
 * @Description: 天气预报
 */
import $register from 'wxpage';
import { WeatherData, WeatherForcast1H, WeatherForcast24H } from '../components/weather/weather';

const { globalData: a } = getApp();

$register('weather', {
  data: {
    weather: {},
    number: 0
  },
  onLoad() {
    const weather = wx.getStorageSync('weather') as WeatherData["data"];

    if (weather) {
      const windDirection = weather.observe.wind_direction;

      // 设置风向
      weather.observe.wind_direction =
        windDirection === '0' ? '北'
          : windDirection === '1' ? '东北'
            : weather.observe.wind_direction === '2' ? '东'
              : weather.observe.wind_direction === '3' ? '东南'
                : weather.observe.wind_direction === '4' ? '南'
                  : weather.observe.wind_direction === '5' ? '西南'
                    : weather.observe.wind_direction === '6' ? '西'
                      : weather.observe.wind_direction === '7' ? '西北'
                        : '未知';

      weather.hourForecast = [];
      weather.dayForecast = [];

      // 设置天气预报的时间
      Object.keys(weather.forecast_1h).forEach(x => {
        const index = Number(x);
        const time = weather.forecast_1h[index].update_time;

        weather.forecast_1h[index].update_time = `${time.slice(8, 10)}:${time.slice(10, 12)}`;

        if (index < 24) (weather.hourForecast as WeatherForcast1H[]).push(weather.forecast_1h[index]);
      });

      // 设置天气预报的时间
      Object.keys(weather.forecast_24h).forEach(x => {
        const index = Number(x);
        if (index < 5) {
          const time = weather.forecast_24h[index].time;

          weather.forecast_24h[index].weekday =
            index === 0 ? '昨天'
              : index === 1 ? '今天'
                : index === 2 ? '明天'
                  : index === 3 ? '后天'
                    : `星期${['天', '一', '二', '三', '四', '五', '六'][new Date().getDay() + index - 1]}`;

          weather.forecast_24h[index].time = `${time.slice(5, 7)}/${time.slice(8, 10)}`;

          (weather.dayForecast as WeatherForcast24H[]).push(weather.forecast_24h[index]);
        }
      });

      this.setData!({ weather, nm: a.nm });
    } else wx.request({
      url: 'https://mp.nenuyouth.com/server/weather2.php',
      success: res => {
        const weather = (res.data as WeatherData).data;

        this.setData!({ weather });
      }
    });
    this.canvas();

    wx.setBackgroundColor({ backgroundColorTop: '#efeef4', backgroundColor: '#efeef4', backgroundColorBottom: '#efeef4' });
  },
  // 绘制温度曲线
  canvas() {
    const width = getApp().globalData.info.screenWidth;
    const ctx = wx.createCanvasContext('weather');
    const highTemperature: number[] = [];
    const lowTemperature: number[] = [];
    let max = -50;
    let min = 50;
    let dayForecast = this.data.weather.dayForecast as WeatherData["data"]["dayForecast"];

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
    for (let i = 0; i < dayForecast.length; i++) {
      const x = width / 10 + i * width / 5;
      const y = (max - highTemperature[i]) / gap * 100;

      ctx.fillText(`${dayForecast[i].max_degree}°`, x - 10, y + 20);
      if (i === 0) ctx.moveTo(x, y + 32);
      else ctx.lineTo(x, y + 32);
    };
    ctx.stroke();
    ctx.draw();

    ctx.setStrokeStyle('#4fc3f7');
    ctx.setFillStyle('#4fc3f7');
    // 绘制低温曲线
    for (let i = 0; i < dayForecast.length; i++) {
      const x = width / 10 + i * width / 5;
      const y = (max - lowTemperature[i]) / gap * 100;

      ctx.fillText(`${dayForecast[i].min_degree}°`, x - 10, y + 44);
      if (i === 0) ctx.moveTo(x, y + 20);
      else ctx.lineTo(x, y + 20);
    };
    ctx.stroke();
    ctx.draw(true);

    this.setData!({ statusBarHeight: wx.getSystemInfoSync().statusBarHeight });
  },
  // 更新提示
  refresh() {
    const { length } = Object.keys(this.data.weather.tips.observe);
    const number = this.data.number;

    this.setData!({ number: number === 0 ? length - 1 : number - 1 });
  },
  back() {
    this.$back();
  },
  redirect() {
    wx.switchTab({ url: '/page/main' });
  }
});