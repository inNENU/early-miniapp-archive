/*
 * @Author: Mr.Hope
 * @Date: 2019-08-17 10:09:53
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 01:13:44
 * @Description: 实时日志封装
 */

/** 实时日志管理器 */
const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : wx.getLogManager({ level: 1 });
const realtime = Boolean(wx.getRealtimeLogManager);

/** 写入普通日志 */
const debug = (...args: any[]) => {
  console.log(...args);
  log.debug(...args);
};

/** 写入信息日志 */
const info = (...args: any[]) => {
  console.info(...args);
  log.info(...args);
};

/** 写入警告日志 */
const warn = (...args: any[]) => {
  console.warn(...args);
  log.warn(...args);
};

/** 写入错误日志 */
const error = (...args: any[]) => {
  console.error(...args);
  if (realtime) (log as WechatMiniprogram.GetRealtimeLogManager).error(...args);
  else log.warn('error', ...args);
};

/**
 * 写入过滤信息
 *
 * @param filterMsg 过滤信息
 */
const fliter = (filterMsg: string) => {
  if (realtime) (log as WechatMiniprogram.GetRealtimeLogManager).setFilterMsg(filterMsg);
};

export default { debug, info, warn, error, fliter };
