
const { globalData: a, lib: { $page, $set } } = getApp();

$page('donate', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '捐赠', shareable: true, leftText: '返回' },
      {
        tag: 'p',
        head: '捐赠说明',
        text: '    目前，小程序服务器选用阿里云的轻量应用服务器，一天不足一元钱，在访问人数较多的时候可能会出现无应答或异常应答的情况。您可以选择倦赠来让小程序变得更好。\n    Mr.Hope向同学承诺，你打赏的每一分钱都会投入到小程序开发上来。'
      },
      { tag: 'title', text: '非常感谢' },
      {
        tag: 'p',
        text: '    非常感谢同学选择了捐赠。你可以点击下方二维码来保存至到相册并使用相应APP进行打赏。如果可以，Mr.Hope希望同学在打赏时注明“小程序打赏”并备注姓名，Mr.Hope会将同学的姓名和打赏金额显示在下方的列表中。再次感谢同学的支持。'
      }
    ]
  },
  onLoad() {
    this.setData({ 'page[0].statusBarHeight': a.info.statusBarHeight });
    $set.request('main/donateList', donateList => {
      this.setData({ donateList });
    });
  },
  onReady() {
    $set.Notice('donate');
  },
  save(res) {
    console.log('Start QRCode download.');// 调试
    wx.downloadFile({
      url: `https://mp.nenuyouth.com/img/donate/${res.currentTarget.dataset.name}.png`,
      success: res1 => {
        console.log(res1);
        if (res1.statusCode === 200)
          // 获取用户设置
          wx.getSetting({
            success: res2 => {
              if (res2.authSetting['scope.writePhotosAlbum'])
                // 如果已经授权相册直接写入图片
                wx.saveImageToPhotosAlbum({
                  filePath: res1.tempFilePath,
                  success: msg => {
                    wx.showToast({ title: '保存成功', icon: 'success' });
                  }
                });
              else wx.authorize({// 没有授权——>提示用户授权
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  wx.saveImageToPhotosAlbum({
                    filePath: res1.tempFilePath,
                    success: msg => {
                      wx.showToast({ title: '保存成功', icon: 'success' });
                    }
                  });
                },
                fail: () => { // 用户拒绝权限，提示用户开启权限
                  wx.showModal({
                    title: '权限被拒', content: '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                    showCancel: false, confirmText: '确定', confirmColor: '#3CC51F',
                    complete: () => {
                      wx.showToast({ title: '二维码保存失败', icon: 'none', duration: 1500, mask: false });
                    }
                  });
                }
              });
            }
          });
      },
      fail: () => {
        wx.showToast({ title: '二维码下载失败', icon: 'none' });
      }
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(res) {
    $set.component(res, this);
  },
  onShareAppMessage: () => ({ title: '捐赠Mr.Hope', path: '/settings/donate' })
});
