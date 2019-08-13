/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 09:38:02
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-13 18:23:34
 * @Description: 小程序主脚本
 */

import $register from 'wxpage';
import app from './utils/app';

$register.A({
  globalData: {
    version: 'V 2.3.1',
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
    resolvePath: (name: string) =>
      ['main', 'function', 'guide', 'me', 'search'].includes(name)
        ? `/page/${name}`
        : ['setting', 'version', 'about', 'authorize', 'storage', 'donate', 'log'].includes(name)
          ? `/settings/${name}`
          : ['weather', 'map', 'situs', 'PEcal', 'player', 'video'].includes(name)
            ? `/function/${name}`
            : `/module/${name}`
  },
  onLaunch(opts) {
    console.info('小程序启动，参数为', opts); // 调试

    // 如果初次启动执行初始化
    if (!wx.getStorageSync('inited')) app.appInit();

    app.startup(this.globalData);

    console.log('全局数据为', this.globalData);
  },
  onAwake(time: number) {
    console.log('小程序在', time, 'ms之后被唤醒');
    this.logger.debug(`"onAwake after ${time}ms`);// 调试

    // 重新应用夜间模式、
    this.globalData.nm = app.nightmode();

    app.noticeCheck(this.globalData as GlobalData);
    app.appUpdate(this.globalData as GlobalData);
  },
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
