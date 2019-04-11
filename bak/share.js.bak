/* global Component wx getApp*/
const { logger } = getApp();// 获得日志管理器

Component({
  properties: { res: { type: Object, value: { aim: '' } } },
  methods: {
    _share(e) { // 分享按钮
      const { 0: touch } = e.touches;

      switch (e.type) {
        case 'touchstart':// 计算点击点与按钮左上角的距离
          this.touchLeft = touch.pageX - e.currentTarget.offsetLeft;
          this.touchTop = touch.pageY - e.currentTarget.offsetTop;
          this.time = e.timeStamp;
          break;
        case 'touchmove':// 根据touchstart的计算值移动分享按钮
          this.setData({ top: touch.pageY - this.touchTop, left: touch.pageX - this.touchLeft });
          break;
        case 'touchend':// 如果触摸小于200ms——>视为点击操作，显示菜单
          if (this.time > e.timeStamp - 200) this.setData({ menuDisplay: true });
          break;
        case 'tap':// 在弹出菜单后进行了点击操作——>取消显示菜单
        default:
          this._menuHandler(e);
      }
    },
    _menuHandler(e) {
      this.setData({ menuDisplay: false });
      if (e.target.dataset.action === 'download') { // 点击了“保存二维码”，开始下载二维码
        console.log('Start QRCode download.');// 调试
        wx.downloadFile({
          url: `https://mp.nenuyouth.com/img/share/${this.data.page[0].aim}.jpg`,
          success: res1 => {
            console.log(res1);
            if (res1.statusCode === 200) wx.getSetting({// 获取用户设置
              success: res2 => {

                // 如果已经授权相册直接写入图片
                if (res2.authSetting['scope.writePhotosAlbum']) wx.saveImageToPhotosAlbum({
                  filePath: res1.tempFilePath,
                  success: msg => {
                    $act.tip('二维码保存成功');

                    // 调试
                    logger.debug('二维码保存成功');
                    wx.reportMonitor('8', 1);
                  },
                  fail: msg => {
                    $act.tip('二维码保存失败');

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
                      filePath: res1.tempFilePath,
                      success: msg => {
                        $act.tip('二维码保存成功');

                        // 调试
                        wx.reportMonitor('8', 1);
                      },
                      fail: msg => {
                        $act.tip('二维码保存失败');

                        // 调试
                        console.warn('二维码保存失败:', msg);
                        logger.warn('二维码保存失败', msg);
                        wx.reportMonitor('6', 1);
                      }
                    });
                  },

                  // 用户拒绝权限，提示用户开启权限
                  fail: () => {
                    wx.showModal({
                      title: '权限被拒', content: '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                      showCancel: false, confirmText: '确定', confirmColor: '#3CC51F',
                      complete: () => {
                        $act.tip('二维码保存失败');

                        // 调试
                        logger.warn('用户拒绝相册授权');
                      }
                    });
                  }
                });
              }
            });
            // 二维码获取状态码异常
            else {
              $act.tip('二维码下载失败，服务器出错');

              // 调试
              console.warn(`二维码状态码异常:${res1.statusCode}`);
              logger.warn(`二维码状态码异常:${res1.statusCode}`);
              wx.reportMonitor('7', 1);
            }
          },

          // 二维码下载失败
          fail: () => {
            $act.tip('二维码下载失败');

            // 调试
            console.warn(`下载二维码失败${ctx.data.page[0].aim}`);
            logger.warn(`下载二维码失败${ctx.data.page[0].aim}`);
            wx.reportMonitor('6', 1);
          }
        });
      }
    }
  }
});
