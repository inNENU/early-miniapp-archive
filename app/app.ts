import $register = require('wxpage');
import {
  appInit,
  appUpdate,
  darkmode,
  noticeCheck,
  startup
} from './utils/app';
import { version } from './utils/config';

interface InitGlobalData {
  /** 小程序运行环境 */
  env: string;
  /** 版本号 */
  version: string;
  /** 播放器信息 */
  music: {
    /** 是否正在播放 */
    playing: boolean;
    /** 播放歌曲序号 */
    index: number;
  };
  /** 页面信息 */
  page: {
    /** 页面数据 */
    data?: PageData;
    /** 页面名称 */
    aim?: string;
  };
  /** 启动时间 */
  date: number;
  /** 正在应用的主题 */
  T?: string;
  /** 夜间模式开启状态 */
  darkmode?: boolean;
  /** 设备信息 */
  info?: WechatMiniprogram.GetSystemInfoSyncResult;
  /** 小程序appid */
  appID?: string;
  /** 地图点位 */
  marker: any;
}

export interface GlobalData extends InitGlobalData {
  /** 正在应用的主题 */
  T: string;
  /** 夜间模式开启状态 */
  darkmode: boolean;
  /** 设备信息 */
  info: WechatMiniprogram.GetSystemInfoSyncResult;
  /** 小程序appid */
  appID: string;
}

export interface AppOption {
  globalData: GlobalData;
}

$register.A<AppOption>({
  /** 小程序的全局数据 */
  globalData: ({
    version,
    music: { playing: false, index: 0 },
    page: {
      data: [],
      aim: ''
    },
    date: new Date().getTime(),
    env: 'wx'
    // T, darkmode, info也在globalData中
  } as unknown) as GlobalData,

  config: {
    route: [
      '/page/$page/$page',
      '/module/$page',
      '/function/$page/$page',
      '/settings/$page/$page'
    ],
    resolvePath: (name): string =>
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
    this.globalData.darkmode = darkmode();

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
