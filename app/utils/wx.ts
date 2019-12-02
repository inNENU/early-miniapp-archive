/* eslint-disable max-params */
/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 交互模块
 * @Date: 2019-04-11 15:48:45
 * @LastEditTime: 2019-11-21 17:07:19
 */

import { debug, warn } from './log';

/**
 * 显示提示文字
 *
 * @param text 提示文字
 * @param duration 提示持续时间
 * @param icon= 提示图标
 */
export const tip = (
  text: string,
  duration = 1500,
  icon: 'success' | 'loading' | 'none' = 'none'
) => {
  wx.showToast({ icon, title: text, duration: duration ? duration : 1500 });
};

/**
 * 显示提示窗口
 *
 * @param title 提示文字
 * @param content 提示文字
 * @param confirmFunc 点击确定的回调
 * @param cancelFunc 点击取消的回调，不填则不显示取消按钮
 */
export const modal = (
  title: string,
  content: string,
  confirmFunc?: () => void,
  cancelFunc?: () => void
) => {
  /** 显示取消按钮 */
  const showCancel = Boolean(cancelFunc);

  wx.showModal({
    title,
    content,
    showCancel,
    success: res => {
      if (res.confirm && confirmFunc) confirmFunc();
      else if (res.cancel && cancelFunc) cancelFunc();
    }
  });
};

/** 网络状态汇报 */
export const netReport = () => {
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

      warn('Request fail with', networkType);
    },
    fail: () => {
      tip('网络连接出现问题，请稍后重试');

      warn('Request fail and cannot get networkType');
    }
  });
};

/**
 * 包装wx.request
 *
 * @param path 请求路径
 * @param successFunc 回调函数
 * @param failFunc 失败回调函数
 * @param errorFunc 状态码错误回调函数
 */
export const request = (
  path: string,
  successFunc: (data: Record<string, any>) => void,
  failFunc?: (errMsg: WechatMiniprogram.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  wx.request({
    url: `https://mp.innenu.com/${path}.json`,
    success: res => {
      debug(`请求${path}成功:`, res); // 调试
      if (res.statusCode === 200) successFunc(res.data as object);
      else {
        tip('服务器出现问题，请稍后重试');
        // 调试
        warn(`请求${path}失败：${res.statusCode}`);
        wx.reportMonitor('3', 1);

        if (errorFunc) errorFunc(res.statusCode);
      }
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      netReport();

      // 调试
      warn(`请求${path}失败:`, failMsg);
      wx.reportMonitor('4', 1);
    }
  });
};

/**
 * 包装wx.downloadFile
 *
 * @param path 下载路径
 * @param successFunc 成功回调函数
 * @param failFunc 失败回调函数
 * @param errorFunc 状态码错误回调函数
 */
export const downLoad = (
  path: string,
  successFunc: (/** 缓存文件路径 */ tempFilePath: string) => void,
  failFunc?: (
    /** 失败信息 */ errMsg: WechatMiniprogram.GeneralCallbackResult
  ) => void,
  errorFunc?: (/** 服务器状态码 */ statusCode: number) => void
) => {
  const progress = wx.downloadFile({
    url: `https://mp.innenu.com/${path}`,
    success: res => {
      wx.hideLoading();
      if (res.statusCode === 200) successFunc(res.tempFilePath);
      else {
        tip('服务器出现问题，请稍后重试');
        if (errorFunc) errorFunc(res.statusCode);

        // 调试
        warn(`下载 ${path} 失败: ${res.statusCode}`);
      }
    },
    fail: failMsg => {
      wx.hideLoading();
      if (failFunc) failFunc(failMsg);
      netReport();
      warn(`下载 ${path} 失败:`, failMsg);
    }
  });

  progress.onProgressUpdate(res => {
    wx.showLoading({ title: `下载中${Math.round(res.progress)}%` });
  });
};

/**
 * 保存图片到相册
 *
 * @param imgPath 图片地址
 */
export const savePhoto = (imgPath: string) => {
  downLoad(
    imgPath,
    path => {
      // 获取用户设置
      wx.getSetting({
        success: res => {
          // 如果已经授权相册直接写入图片
          if (res.authSetting['scope.writePhotosAlbum'])
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success: () => {
                tip('保存成功');
              }
            });
          // 没有授权——>提示用户授权
          else
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success: () => {
                    tip('保存成功');
                  }
                });
              },

              // 用户拒绝权限，提示用户开启权限
              fail: () => {
                modal(
                  '权限被拒',
                  '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                  () => {
                    tip('二维码保存失败');
                  }
                );
              }
            });
        }
      });
    },
    () => {
      tip('图片下载失败');
    }
  );
};