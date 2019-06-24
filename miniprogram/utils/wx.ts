/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 交互模块
 * @Date: 2019-04-11 15:48:45
 * @LastEditTime: 2019-06-24 20:55:44
 */

// 初始化日志管理器
const logger = wx.getLogManager({ level: 1 });

/**
 * 显示提示文字
 *
 * @param text 提示文字
 * @param [duration=1500] 提示持续时间
 * @param [icon='none'] 提示图标
 */
const tip = (text: string, duration?: number, icon?: 'success' | 'loading' | 'none') => {
  wx.showToast({ title: text, icon, duration: duration ? duration : 1500 });
};

/**
 * @description: 网络状态汇报
 *
 * @returns {void}
 */
const netWorkReport = () => {

  // 获取网络信息
  wx.getNetworkType({
    success: res => {
      const { networkType } = res;

      if (networkType === '2g' || networkType === '3g')
        tip('您的网络状态不佳');
      else if (networkType === 'none' || networkType === 'unknown')
        tip('您的网络状态不佳');
      else if (networkType === 'wifi')
        wx.getConnectedWifi({
          success: info => {
            if (info.wifi.signalStrength < 0.5)
              tip('Wifi信号不佳，网络链接失败');
          },
          fail: () => {
            tip('无法连接网络');
          }
        });
      else tip('网络连接出现问题，请稍后重试');

      logger.warn('Request fail with', networkType);
    },
    fail: () => {
      tip('网络连接出现问题，请稍后重试');

      logger.warn('Request fail and cannot get networkType');
    }
  });
};

/**
 * 包装wx.request
 *
 * @param path 请求路径
 * @param callback 回调函数
 * @param [failFunc] 失败回调函数
 * @param [errorFunc] 获取错误回调函数
 */
const request = (
  path: string,
  callback: (data: object) => void,
  failFunc?: (errMsg: wx.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  wx.request({
    url: `https://mp.nenuyouth.com/${path}.json`,
    success: res => {
      console.log('Request success:', res);// 调试
      if (res.statusCode === 200) return callback(res.data as object);

      tip('服务器出现问题，请稍后重试');
      // 调试
      console.warn(`Request ${path} fail: ${res.statusCode}`);
      logger.warn(`Request ${path} fail: ${res.statusCode}`);
      wx.reportMonitor('3', 1);

      if (errorFunc) errorFunc(res.statusCode);

      return null;
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      netWorkReport();

      // 调试
      console.warn(`Request ${path} fail:`, failMsg);
      logger.warn(`Request ${path} fail:`, failMsg);
      wx.reportMonitor('4', 1);
    }
  });
};

/**
 * 包装wx.downloadFile
 *
 * @param path 下载路径
 * @param callback 成功回调函数
 * @param [failFunc] 失败回调函数
 * @param [errorFunc] 状态码错误为回调函数
 */
const downLoad = (
  path: string,
  callback: (path: string) => void,
  failFunc?: (errMsg: wx.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  const progress = wx.downloadFile({
    url: `https://mp.nenuyouth.com/${path}`,
    success: res => {
      if (res.statusCode === 200) return callback(res.tempFilePath);

      tip('服务器出现问题，请稍后重试');
      if (errorFunc) errorFunc(res.statusCode);

      // 调试
      console.warn(`DownLoad ${path} fail: ${res.statusCode}`);
      logger.warn(`DownLoad ${path} fail: ${res.statusCode}`);

      return null;
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      netWorkReport();
      console.warn(`DownLoad ${path} fail:`, failMsg);
      logger.warn(`DownLoad ${path} fail:`, failMsg);
    }
  });

  progress.onProgressUpdate(res => {
    wx.showLoading({ title: `下载中${Math.round(res.progress)}%` })
  });
};

export default { downLoad, netReport: netWorkReport, request, tip };
