declare interface GlobalData {
  /** 全局数据 */
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
    data: any[],
    /** 页面名称 */
    aim: ''
  };
  /** 正在应用的主题 */
  T?: string;
  /** 夜间模式开启状态 */
  nm?: boolean;
  /** 设备信息 */
  info?: any;
  date?: number;
}

