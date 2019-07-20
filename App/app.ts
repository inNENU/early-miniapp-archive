/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 09:38:02
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-20 21:04:51
 * @Description: 小程序主脚本
 */

import $register from 'wxpage';
import app from './utils/app';

const $App = $register.A;

$App({
  globalData: {
    version: 'V 2.0.4',
    music: { play: false, played: false, index: 0 },
    page: {
      data: [],
      aim: ''
    },
    date: new Date().getTime(),
    env: 'wx'
    // T, nm, info也在globalData中
  },
  config: {
    route: ['/page/$page', '/module/$page', '/function/$page', '/settings/$page'],
    // eslint-disable-next-line no-confusing-arrow
    resolvePath: (name: string) =>
      ['main', 'function', 'guide', 'me'].includes(name)
        ? `/page/${name}`
        : ['setting', 'version', 'about'].includes(name)
          ? `/settings/${name}`
          : `/module/${name}`
  },

  onLaunch(opts) {
    try {
      qq && qq.env;
      this.globalData.env = 'qq';
    } catch (e) { }

    console.info('小程序启动，参数为', opts); // 调试

    // Const capsule = wx.getMenuButtonBoundingClientRect();

    // Console.log(capsule);

    // 如果初次启动执行初始化
    if (!wx.getStorageSync('inited')) app.appInit();

    // 获取主题、夜间模式、设备信息
    this.globalData.T = wx.getStorageSync('theme');
    this.globalData.nm = app.nightmode();
    this.globalData.info = wx.getSystemInfoSync();

    console.info('设备信息为', this.globalData.info); // 调试

    app.startup(this.globalData.version);
  },
  onAwake(time: number) {
    console.log('小程序在', time, 'ms之后被唤醒');
    this.logger.debug(`"onAwake after ${time}ms`);// 调试

    // 重新应用夜间模式、
    this.globalData.nm = app.nightmode();

    app.noticeCheck(this.globalData.version);
    app.appUpdate(this.globalData.version);
  },

  // OnShow: function () { },

  onError(errorMsg) {
    console.error('出错信息为：', errorMsg);
    this.logger.warn('Error ocurred', errorMsg); // 调试
  },
  onPageNotFound(msg) {
    // 重定向到主界面
    wx.switchTab({ url: 'pages/main' });

    console.warn('未找到界面:', msg);
    this.logger.warn('未找到界面', msg); // 调试
  },

  // 日志管理器对象
  logger: wx.getLogManager({ level: 1 })
});
