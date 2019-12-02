/* eslint-disable camelcase */
/*
 * @Author: Mr.Hope
 * @Date: 2019-07-31 11:05:08
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 15:32:27
 * @Description: 天气处理函数
 */
import { WeatherData, WeatherForcast1H } from './weather';

/**
 * 天气处理函数
 *
 * @param weather API返回的原生天气数据
 * @returns 处理后的可读天气数据
 */
const weatherHandler = (weather: WeatherData['data']) => {
  /** 当前风向代码 */
  const windDirection = weather.observe.wind_direction;

  // 设置风向
  weather.observe.wind_direction =
    windDirection === '8'
      ? '北'
      : windDirection === '1'
      ? '东北'
      : weather.observe.wind_direction === '2'
      ? '东'
      : weather.observe.wind_direction === '3'
      ? '东南'
      : weather.observe.wind_direction === '4'
      ? '南'
      : weather.observe.wind_direction === '5'
      ? '西南'
      : weather.observe.wind_direction === '6'
      ? '西'
      : weather.observe.wind_direction === '7'
      ? '西北'
      : '未知';

  weather.hourForecast = [];
  weather.dayForecast = [];

  // 设置天气预报的时间
  Object.keys(weather.forecast_1h).forEach(x => {
    const index = Number(x);
    /** 更新时间 */
    const time = weather.forecast_1h[index].update_time;

    weather.forecast_1h[index].update_time = `${time.slice(8, 10)}:${time.slice(
      10,
      12
    )}`;

    // 暂时只显示24小时天气预报 TODO: 显示48小时天气预报，并增加日落日出时间
    if (index < 24)
      (weather.hourForecast as WeatherForcast1H[]).push(
        weather.forecast_1h[index]
      );
  });

  // 设置天气预报的时间
  Object.keys(weather.forecast_24h).forEach(x => {
    const index = Number(x);

    // 暂时只显示五日天气预报。 TODO: 让此部分可横向滑动，补全7日天气预报
    if (index < 5) {
      const { time } = weather.forecast_24h[index];

      weather.forecast_24h[index].weekday =
        index === 0
          ? '昨天'
          : index === 1
          ? '今天'
          : index === 2
          ? '明天'
          : index === 3
          ? '后天'
          : `星期${
              ['天', '一', '二', '三', '四', '五', '六', '天', '一', '二'][
                new Date().getDay() + index - 1
              ]
            }`;

      weather.forecast_24h[index].time = `${time.slice(5, 7)}/${time.slice(
        8,
        10
      )}`;

      weather.dayForecast.push(weather.forecast_24h[index]);
    }
  });

  return weather;
};

export default weatherHandler;
