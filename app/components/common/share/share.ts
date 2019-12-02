/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-03 13:07:41
 * @Description: 分享组件
 */

import * as $register from 'wxpage';
import { debug, warn } from '../../../utils/log';
import { downLoad, modal, tip } from '../../../utils/wx';

const {
  globalData: { env, appID }
} = getApp<{}, GlobalData>(); // 获得日志管理器，全局数据

const savePhoto = (path: string) => {
  wx.saveImageToPhotosAlbum({
    filePath: path,
    success: () => {
      tip('二维码已保存至相册');

      // 调试
      debug('二维码保存成功');
      wx.reportMonitor('8', 1);
    },
    fail: msg => {
      tip('二维码保存失败');

      // 调试
      warn('二维码保存失败', msg);
      wx.reportMonitor('6', 1);
    }
  });
};

let time = 0;
let left = 0;
let top = 0;

$register.C({
  properties: { config: { type: Object, value: { aim: '' } } as any },
  data: {
    // 小程序运行环境
    env
  },
  methods: {
    /** 分享按钮处理逻辑 */
    move(event: WXEvent.Touch) {
      const touch = event.touches[0];

      switch (event.type) {
        case 'touchstart': // 计算点击点与按钮左上角的距离
          left = touch.pageX - event.currentTarget.offsetLeft;
          top = touch.pageY - event.currentTarget.offsetTop;
          time = event.timeStamp;
          break;
        case 'touchmove': // 根据touchstart的计算值移动分享按钮
          this.setData({ top: touch.pageY - top, left: touch.pageX - left });
          break;
        case 'touchend': // 如果触摸小于200ms——>视为点击操作，显示菜单
        default:
          if (time > event.timeStamp - 200) this.setData({ menuDisplay: true });
      }
    },

    /** 取消显示菜单 */
    cancel() {
      this.setData({ menuDisplay: false });
    },

    /** QQ暂不支持联系客服的兼容 */
    contact() {
      if (env === 'qq')
        wx.setClipboardData({
          data: '1178522294',
          success: () =>
            modal(
              '暂不支持',
              'QQ小程序暂不支持联系客服，请添加QQ1178522294。QQ号已经添加至您的剪切板。'
            )
        });
    },

    /** 二维码下载 */
    download() {
      downLoad(
        `/img/QRCode/${appID}/${this.data.config.aim}.jpg`,
        path => {
          wx.getSetting({
            // 获取用户设置
            success: res2 => {
              // 如果已经授权相册直接写入图片
              if (res2.authSetting['scope.writePhotosAlbum']) savePhoto(path);
              // 没有授权——>提示用户授权
              else
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success: () => {
                    // 获得授权，写入图片
                    savePhoto(path);
                  },

                  // 用户拒绝权限，提示用户开启权限
                  fail: () => {
                    modal(
                      '权限被拒',
                      '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                      () => {
                        tip('二维码保存失败');
                        warn('用户拒绝相册授权'); // 调试
                      }
                    );
                  }
                });
            }
          });
        },
        () => {
          tip('二维码下载失败');

          // 调试
          warn(`下载二维码失败${this.data.config.aim}`);
          wx.reportMonitor('6', 1);
        },
        statusCode => {
          tip('二维码下载失败，服务器出错');

          // 调试
          warn(`二维码状态码异常:${statusCode}`);
          wx.reportMonitor('7', 1);
        }
      );
    }
  },

  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});