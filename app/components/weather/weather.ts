/* eslint-disable camelcase */
/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:35:04
 * @Description: 天气小组件
 */

import * as $register from 'wxpage';
import weatherHandler from './handler';

/** 一小时天气预报详情 */
export interface WeatherForcast1H {
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

/** 24小时天气预报详情 */
export interface WeatherForcast24H {
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
  /** 星期 */
  weekday?: string;
}

/** 天气详情 */
export interface WeatherDetail {
  /** 天气预警 */
  alarm: {
    [props: number]: {
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
    };
  };
  /** 1小时天气预报 */
  forecast_1h: {
    [props: number]: WeatherForcast1H;
  };
  /** 24小时天气预报 */
  forecast_24h: {
    [props: number]: WeatherForcast24H;
  };
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
  /** 日出日落时间 */
  rise: {
    [props: number]: {
      /** 日出时间 */
      sunrise: string;
      /** 日落时间 */
      sunset: string;
      /** 日期 */
      time: string;
    };
  };
  tips: {
    observe: {
      [props: number]: string;
    };
  };
  /** 小时预报 */
  hourForecast?: WeatherForcast1H[];
  /** 天预报 */
  dayForecast: WeatherForcast24H[];
}

export interface WeatherData {
  /** 天气数据 */
  data: WeatherDetail;
  message: string;
  status: number;
}

$register.C({
  data: {
    /** 提示的索引值 */
    tipIndex: 0,
    /** 天气信息 */
    weather: {} as WeatherDetail,
    /** 天气样式class */
    weatherClass: ''
  },
  lifetimes: {
    attached() {
      this.getWeather();
    }
  },
  methods: {
    navigate() {
      this.$route('weather');
    },
    /** 变更提示信息 */
    refresh() {
      const { length } = Object.keys(this.data.weather.tips.observe);
      const { tipIndex } = this.data;

      this.setData({ tipIndex: tipIndex === 0 ? length - 1 : tipIndex - 1 });
    },
    /* 获取天气信息 */
    getWeather() {
      wx.request({
        url: 'https://mp.innenu.com/server/weather.php',
        success: res => {
          const weather = (res.data as WeatherData).data;
          /** 天气种类缩写 */
          const weatherType = weather.observe.weather_short;
          /** 设置天气图标 */
          const weatherClass =
            weatherType.indexOf('晴') === -1
              ? weatherType.indexOf('雷') !== -1 ||
                weatherType.indexOf('电') !== -1 ||
                weatherType.indexOf('暴') !== -1
                ? 'stormy'
                : weatherType.indexOf('雪') !== -1 ||
                  weatherType.indexOf('霜') !== -1 ||
                  weatherType.indexOf('冰') !== -1
                ? 'snowy'
                : weatherType.indexOf('雨') === -1
                ? weatherType.indexOf('阴') !== -1 ||
                  weatherType.indexOf('云') !== -1
                  ? 'cloudy'
                  : ''
                : 'rainy'
              : new Date().getHours() > 6 && new Date().getHours() < 18
              ? new Date().getSeconds() % 2 === 0
                ? 'sunny'
                : 'rainbow'
              : 'starry';

          this.setData({ weatherClass, weather });

          // 将天气详情和获取时间写入存储，避免重复获取
          wx.setStorageSync('weather', {
            data: weatherHandler(weather),
            date: new Date().getTime()
          });
        }
      });
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'apply-shared'
  }
});
