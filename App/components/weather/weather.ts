import $register from 'wxpage';

interface WeatherAlarm {
  /** 城市 */
  city: string;
  /** 区域 */
  country: string;
  /** 报警详情 */
  detail: string;
  /** 信息 */
  info: string;
  /** 级别代码 */
  level_code: string;
  /** 级别名称 */
  level_name: string;
  /** 省份 */
  province: string;
  /** 类型代码 */
  type_code: string;
  /** 类型名称 */
  type_name: string;
  /** 更新时间 */
  update_time: string;
  /** 对应地址 */
  url: string;
}

interface WeatherForcast1H {
  /** 摄氏度 */
  degree: string;
  /** 更新时间 */
  update_time: string;
  /** 天气 */
  weather: string;
  /** 天气代码 */
  weather_code: string;
  /** 天气缩写 */
  weather_short: string;
  /** 风向 */
  wind_direction: string;
  /** 风力 */
  wind_power: string;
}
interface WeatherForcast24H {
  /** 日间天气 */
  day_weather: string;
  /** 日间天气代码 */
  day_weather_code: string;
  /** 日间天气缩写 */
  day_weather_short: string;
  /** 日间风向 */
  day_wind_direction: string;
  /** 日间风向代码 */
  day_wind_direction_code: string;
  /** 日间风力 */
  day_wind_power: string;
  /** 日间风力代码 */
  day_wind_power_code: string;
  /** 最高温 */
  max_degree: string;
  /** 最低温 */
  min_degree: string;
  /** 夜间温度 */
  night_weather: string;
  /** 夜间温度代码 */
  night_weather_code: string;
  /** 夜间温度缩写 */
  night_weather_short: string;
  /** 夜间风向 */
  night_wind_direction: string;
  /** 夜间风向代码 */
  night_wind_direction_code: string;
  /** 夜间风力 */
  night_wind_power: string;
  /** 夜间风力代码 */
  night_wind_power_code: string;
  /** 时间 */
  time: string;
}

interface WatherRise {
  /** 日出时间 */
  sunrise: string;
  /** 日落时间 */
  sunset: string;
  /** 日期 */
  time: string;
}

export interface WeatherData {
  data: {
    alarm: WeatherAlarm[];
    forecast_1h: WeatherForcast1H[];
    forecast_24h: WeatherForcast24H[];
    /** 实时数据 */
    observe: {
      /** 温度 */
      degree: string;
      /** 湿度 */
      humidity: string;
      /** 降水量 */
      precipitation: string;
      /** 压力 */
      pressure: string;
      /** 更新时间 */
      update_time: string;
      /** 天气 */
      weather: string;
      /** 天气代码 */
      weather_code: string;
      /** 天气缩写 */
      weather_short: string;
      /** 风向 */
      wind_direction: string;
      /** 风力 */
      wind_power: string;
    };
    rise: WatherRise[];
    tips: {
      observe: string[];
    }
  };
  message: string;
  status: number;
}

$register.C({
  data: {
    /** 提示的数字 */
    number: 0,
    /** 天气信息 */
    weather: null,
    /** 天气类别 */
    weatherClass: ''
  },

  lifetimes: {
    attached() {
      this.getWeather();
    }
  },

  options: {
    addGlobalClass: true
  },

  methods: {
    _navigate() {
      this.$route('weather');
    },
    /** 变更提示信息 */
    _refresh() {
      const { length } = Object.keys(this.data.weather.tips.observe);
      const number = this.data.number;

      this.setData({ number: number === 0 ? length - 1 : number - 1 });
    },
    /* 获取天气信息 */
    getWeather() {

      wx.request({
        url: 'https://mp.nenuyouth.com/server/weather2.php',
        success: res => {
          const weather = (res.data as WeatherData).data;

          // /* 设置弹出框内容 */
          // for (let i = 0; i < 5; i++) {
          //   const forecast = weather.data.forecast[i];

          //   forecast.low = forecast.low.substring(3);
          //   forecast.high = forecast.high.substring(3);
          // };

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

          this.setData({ weatherClass, weather });

          wx.setStorageSync('weather', weather);
        }
      })
    },
  }
});
