/// <reference path="./pageData.d.ts" />

declare interface InitGlobalData {
  /** 小程序运行环境 */
  env: string;
  /** 版本号 */
  version: string;
  /** 播放器信息 */
  music: {
    /** 是否正在播放 */
    play: boolean;
    played: boolean;
    /** 播放歌曲序号 */
    index: number;
  };
  /** 页面信息 */
  page: {
    /** 页面数据 */
    data?: PageData,
    /** 页面名称 */
    aim?: string
  };
  /** 启动时间 */
  date: number;
  /** 正在应用的主题 */
  T?: string;
  /** 夜间模式开启状态 */
  nm?: boolean;
  /** 设备信息 */
  info?: WechatMiniprogram.GetSystemInfoSyncResult;
  /** 小程序appid */
  appID?: string;
  /** 地图点位 */
  marker: any;
}

declare interface GlobalData extends InitGlobalData {
  /** 正在应用的主题 */
  T: string;
  /** 夜间模式开启状态 */
  nm: boolean;
  /** 设备信息 */
  info: WechatMiniprogram.GetSystemInfoSyncResult;
  /** 小程序appid */
  appID: string;
}

