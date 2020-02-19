/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 09:38:02
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-14 20:12:35
 * @Description: 小程序主脚本
 */

import * as $register from 'wxpage';
import {
  appInit,
  appUpdate,
  nightmode,
  noticeCheck,
  startup
} from './utils/app';
import { version } from './utils/config';

$register.A({
  /** 小程序的全局数据 */
  globalData: ({
    version,
    music: { play: false, played: false, index: 0 },
    page: {
      data: [],
      aim: ''
    },
    date: new Date().getTime(),
    env: 'wx'
    // T, nm, info也在globalData中
  } as unknown) as GlobalData,

  config: {
    route: [
      '/page/$page/$page',
      '/module/$page',
      '/function/$page/$page',
      '/settings/$page/$page'
    ],
    resolvePath: name =>
      ['main', 'function', 'guide', 'me', 'search'].includes(name)
        ? `/page/${name}/${name}`
        : [
            'weather',
            'calendar',
            'map',
            'situs',
            'PEcal',
            'player',
            'video'
          ].includes(name)
        ? `/function/${name}/${name}`
        : [
            'about',
            'auth',
            'donate',
            'log',
            'outlook',
            'resource',
            'storage'
          ].includes(name)
        ? `/settings/${name}/${name}`
        : `/module/${name}`
  },
  onLaunch(opts) {
    console.info('小程序启动，参数为', opts); // 调试

    // 如果初次启动执行初始化
    if (!wx.getStorageSync('inited')) appInit();

    startup(this.globalData);

    console.log('全局数据为', this.globalData);
  },
  onAwake(time: number) {
    console.log('小程序在', time, 'ms之后被唤醒');

    // 重新应用夜间模式、
    this.globalData.nm = nightmode();

    noticeCheck(this.globalData);
    appUpdate(this.globalData);
  },
  onError(errorMsg) {
    console.error('出错信息为：', errorMsg);
  },
  onPageNotFound(msg) {
    // 重定向到主界面
    wx.switchTab({ url: 'page/main/main' });

    console.warn('未找到界面:', msg);
  }
});
