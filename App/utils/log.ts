/*
 * @Author: Mr.Hope
 * @Date: 2019-08-17 10:09:53
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-17 10:40:50
 * @Description: 实时日志封装
 */

/** 实时日志管理器 */
const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : undefined;

/** 写入普通日志 */
const debug = (...args: any[]) => {
  console.log(...args);
  if (log) log.debug(...args);
};

/** 写入信息日志 */
const info = (...args: any[]) => {
  console.info(...args);
  if (log) log.info(...args);
};

/** 写入警告日志 */
const warn = (...args: any[]) => {
  console.warn(...args);
  if (log) log.warn(...args);
};

/** 写入错误日志 */
const error = (...args: any[]) => {
  console.error(...args);
  if (log) log.error(...args);
};

/** 写入过滤信息 */
const fliter = log ? (filterMsg: string) => log.setFilterMsg(filterMsg) : () => undefined;

export default { debug, info, warn, error, fliter };
