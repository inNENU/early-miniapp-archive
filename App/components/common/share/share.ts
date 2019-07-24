/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-24 13:11:22
 * @Description: 分享组件
 */

import $register from 'wxpage';
import $wx from '../../../utils/wx';

const { logger, globalData: { env } } = getApp();// 获得日志管理器，全局数据

$register.C({
  properties: { config: { type: Object, value: { aim: '' } } },
  data: {
    env, // 小程序运行环境
  },
  methods: {
    _move(event: NormalEvent) { // 分享按钮
      const touch = event.touches[0];

      switch (event.type) {
        case 'touchstart':// 计算点击点与按钮左上角的距离
          this.left = touch.pageX - event.currentTarget.offsetLeft;
          this.top = touch.pageY - event.currentTarget.offsetTop;
          this.time = event.timeStamp;
          break;
        case 'touchmove':// 根据touchstart的计算值移动分享按钮
          this.setData({ top: touch.pageY - this.top, left: touch.pageX - this.left });
          break;
        case 'touchend':// 如果触摸小于200ms——>视为点击操作，显示菜单
        default:
          if (this.time > event.timeStamp - 200) this.setData({ menuDisplay: true });
          break;
      }
    },
    // 取消显示菜单
    _cancel() {
      this.setData({ menuDisplay: false });
    },
    // QQ暂不支持联系客服的兼容
    _contact() {
      if (env === 'qq') $wx.tip('QQ小程序暂不支持联系客服');
      this._cancel();
    },
    // 下载二维码
    _download() {
      // 下载二维码
      console.log('Start QRCode download.');// 调试
      if (env === 'wx')
        $wx.downLoad(`/img/QRCode/${env}/${this.data.config.aim}.jpg`, path => {
          wx.getSetting({// 获取用户设置
            success: res2 => {
              // 如果已经授权相册直接写入图片
              if (res2.authSetting['scope.writePhotosAlbum'])
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success: () => {
                    $wx.tip('二维码已保存至相册');

                    // 调试
                    logger.debug('二维码保存成功');
                    wx.reportMonitor('8', 1);
                  },
                  fail: msg => {
                    $wx.tip('二维码保存失败');

                    // 调试
                    console.warn('二维码保存失败:', msg);
                    logger.warn('二维码保存失败', msg);
                    wx.reportMonitor('6', 1);
                  }
                });

              // 没有授权——>提示用户授权
              else wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {

                  // 获得授权，写入图片
                  wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: () => {
                      $wx.tip('二维码已保存至相册');

                      // 调试
                      logger.debug('二维码保存成功');
                      wx.reportMonitor('8', 1);
                    },
                    fail: msg => {
                      $wx.tip('二维码保存失败');

                      // 调试
                      console.warn('二维码保存失败:', msg);
                      logger.warn('二维码保存失败', msg);
                      wx.reportMonitor('6', 1);
                    }
                  });
                },

                // 用户拒绝权限，提示用户开启权限
                fail: () => {
                  $wx.modal('权限被拒', '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限', () => {
                    $wx.tip('二维码保存失败');
                    logger.warn('用户拒绝相册授权'); // 调试
                  });
                }
              });
            }
          });
        }, () => {
          $wx.tip('二维码下载失败');

          // 调试
          console.warn(`下载二维码失败${this.data.config.aim}`);
          logger.warn(`下载二维码失败${this.data.config.aim}`);
          wx.reportMonitor('6', 1);
        }, statusCode => {
          $wx.tip('二维码下载失败，服务器出错');

          // 调试
          console.warn(`二维码状态码异常:${statusCode}`);
          logger.warn(`二维码状态码异常:${statusCode}`);
          wx.reportMonitor('7', 1);
        });
      else $wx.tip('QQ暂不支持二维码');

      this._cancel();
    }
  },
  time: 0,
  left: 0,
  top: 0
});
