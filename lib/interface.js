/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 交互模块
 * @Date: 2019-04-11 15:48:45
 * @LastEditTime: 2019-04-11 17:14:34
 */

// 初始化日志管理器
const logger = wx.getLogManager({ level: 1 }),

  /**
   * @description: 展示提示
   * @param {sting} text 提示文字
   * @param {sting} [icon='none'] 提示图标
   * @param {sting} [duration=1500] 提示持续时间
   *
   * @returns {void}
   */
  tip = (text, icon, duration) => {
    wx.showToast({ title: text, icon: icon ? icon : 'none', duration });
  },

  /**
   * @description: 网络状态汇报
   *
   * @returns {void}
   */
  netWorkReport = () => {

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

        logger.error('Request fail and cannot get networkType');
      }
    });
  },

  /**
   * @description: 包装wx.request
   *
   * @param {string} path 请求路径
   * @param {callback} callbackFunc 回调函数
   * @param {callback} [failFunc= () => null] 失败回调函数
   * @param {callback} [errorFunc = () => null] 获取错误回调函数
   *
   * @returns {void}
   */
  request = (path, callbackFunc, failFunc = () => null, errorFunc = () => null) => {
    wx.request({
      url: `https://mp.nenuyouth.com/${path}.json`,
      success: res => {
        console.log('Request success:', res);// 调试
        if (res.statusCode === 200) callbackFunc(res.data);
        else {
          console.warn(`request ${path} fail: ${res.statusCode}`);
          errorFunc();
          tip('服务器出现问题，请稍后重试');
          wx.reportMonitor('3', 1);
        }
      },
      fail: failMsg => {
        failFunc();
        netWorkReport();
        console.log(failMsg);
        wx.reportMonitor('4', 1);
      }
    });
  };

module.exports = { netReport: netWorkReport, request, tip };
