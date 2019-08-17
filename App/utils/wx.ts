/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 交互模块
 * @Date: 2019-04-11 15:48:45
 * @LastEditTime: 2019-08-17 10:59:35
 */

import $log from './log';

/**
 * 显示提示文字
 *
 * @param text 提示文字
 * @param [duration=1500] 提示持续时间
 * @param [icon='none'] 提示图标
 */
export const tip = (text: string, duration?: number, icon: 'success' | 'loading' | 'none' = 'none') => {
  wx.showToast({ icon, title: text, duration: duration ? duration : 1500 });
};

/**
 * 显示提示窗口
 *
 * @param title 提示文字
 * @param content 提示文字
 * @param [confirmFunc] 点击确定的回调
 * @param [cancelFunc] 点击取消的回调，不填则不显示取消按钮
 */
export const modal = (title: string, content: string, confirmFunc?: () => void, cancelFunc?: () => void) => {
  /** 显示取消按钮 */
  const showCancel = !!cancelFunc;

  wx.showModal({
    title, content,
    showCancel,
    success: res => {
      if (res.confirm && confirmFunc) confirmFunc();
      else if (res.cancel && cancelFunc) cancelFunc();
    }
  });
};

/** 网络状态汇报 */
const netReport = () => {

  // 获取网络信息
  wx.getNetworkType({
    success: res => {
      const { networkType } = res;

      switch (networkType) {
        case '2g':
        case '3g':
          tip('您的网络状态不佳');
          break;
        case 'none':
        case 'unknown':
          tip('您没有连接到网络');
          break;
        case 'wifi':
          wx.getConnectedWifi({
            success: info => {
              if (info.wifi.signalStrength < 0.5)
                tip('Wifi信号不佳，网络链接失败');
            },
            fail: () => {
              tip('无法连接网络');
            }
          });
          break;
        default:
          tip('网络连接出现问题，请稍后重试');
      }

      $log.warn('Request fail with', networkType);
    },
    fail: () => {
      tip('网络连接出现问题，请稍后重试');

      $log.warn('Request fail and cannot get networkType');
    }
  });
};

/**
 * 包装wx.request
 *
 * @param path 请求路径
 * @param successFunc 回调函数
 * @param [failFunc] 失败回调函数
 * @param [errorFunc] 状态码错误回调函数
 */
const request = (
  path: string,
  successFunc: (data: IAnyObject) => void,
  failFunc?: (errMsg: WechatMiniprogram.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  wx.request({
    url: `https://mp.nenuyouth.com/${path}.json`,
    success: res => {
      $log.debug(`请求${path}成功:`, res);// 调试
      if (res.statusCode === 200) successFunc(res.data as object);
      else {
        tip('服务器出现问题，请稍后重试');
        // 调试
        $log.warn(`请求${path}失败：${res.statusCode}`);
        wx.reportMonitor('3', 1);

        if (errorFunc) errorFunc(res.statusCode);
      }
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      netReport();

      // 调试
      $log.warn(`请求${path}失败:`, failMsg);
      wx.reportMonitor('4', 1);
    }
  });
};

/**
 * 包装wx.downloadFile
 *
 * @param path 下载路径
 * @param successFunc 成功回调函数
 * @param [failFunc] 失败回调函数
 * @param [errorFunc] 状态码错误回调函数
 */
const downLoad = (
  path: string,
  successFunc: (path: string) => void,
  failFunc?: (errMsg: WechatMiniprogram.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  const progress = wx.downloadFile({
    url: `https://mp.nenuyouth.com/${path}`,
    success: res => {
      if (res.statusCode === 200) successFunc(res.tempFilePath);
      else {
        tip('服务器出现问题，请稍后重试');
        if (errorFunc) errorFunc(res.statusCode);

        // 调试
        $log.warn(`下载 ${path} 失败: ${res.statusCode}`);
      }
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      netReport();
      $log.warn(`下载 ${path} 失败:`, failMsg);
    }
  });

  progress.onProgressUpdate(res => {
    wx.showLoading({ title: `下载中${Math.round(res.progress)}%` });
  });
};

export default { downLoad, modal, netReport, request, tip };
