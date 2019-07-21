import $register from 'wxpage';

interface WeatherDetail {
  date: string;
  fengli: string;
  fengxiang: string;
  high: string;
  low: string;
  type: string;
}
interface Weather {
  data: {
    city: string;
    yesterday: {
      date: string;
      fl: string;
      fx: string;
      high: string;
      low: string;
      type: string;
    }
    forecast: WeatherDetail[];
    ganmao: string;
  }
}

$register.C({
  data: {
    // 所在城市
    city: "长春",
    // 获取到的天气信息
    weather: null,
    // 默认天气类别
    weatherClass: '',
    // 未来五日天气显示boolean
    showMoreForecast: false
  },

  lifetimes: {
    attached() {
      this.getWeather()
    }
  },

  options: {
    addGlobalClass: true
  },

  methods: {
    /* 显示未来五日预报 */
    showMoreForecast() {
      this.setData({ showMoreForecast: !this.data.showMoreForecast })
    },

    /* 获取天气信息 */
    getWeather() {

      wx.request({
        url: 'https://mp.nenuyouth.com/server/weather.php',
        success: res => {
          const weather = res.data as Weather;

          /* 设置弹出框内容 */
          for (let i = 0; i < 5; i++) {
            const forecast = weather.data.forecast[i];

            forecast.low = forecast.low.substring(3);
            forecast.high = forecast.high.substring(3);
          };

          const weatherType = weather.data.forecast[0].type;

          const weatherClass =
            weatherType.indexOf('晴') != -1
              ? (new Date().getHours() > 6 && new Date().getHours() < 19)
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

          this.setData({ weatherClass, weather: weather.data });

          wx.setStorageSync('weather', weather.data);
        }
      })
    },
  }
});
