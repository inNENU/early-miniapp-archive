/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-20 22:42:13
 * @Description: 捐赠
 */
import $register from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

$register('donate', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '捐赠', shareable: true, leftText: '返回' },
      {
        tag: 'p',
        head: '捐赠说明',
        text: '   目前，小程序服务器选用阿里云的轻量应用服务器，一天不足一元钱，在访问人数较多的时候可能会出现无应答或异常应答的情况。您可以选择捐赠来让小程序变得更好。\n    Mr.Hope向同学承诺，你打赏的每一分钱都会投入到小程序开发上来。'
      },
      { tag: 'title', text: '非常感谢' },
      {
        tag: 'p',
        text: '   非常感谢同学选择了捐赠。你可以 “点击下方二维码” 来将二维码保存至到相册并使用相应APP进行打赏。如果可以，Mr.Hope希望同学在打赏时注明“小程序打赏”并备注姓名，Mr.Hope会将同学的姓名和打赏金额显示在下方的列表中。再次感谢同学的支持。'
      }
    ]
  },
  onLoad() {
    this.setData!({ 'page[0].statusBarHeight': a.info.statusBarHeight });
    $wx.request('config/donateList', donateList => {
      this.setData!({ donateList });
    });
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    $page.Notice('donate');
  },
  save(res: MiniprogramEvent) {
    console.log('Start QRCode download.');// 调试
    $wx.downLoad(`img/donate/${res.currentTarget.dataset.name}.png`, (path: string) => {
      // 获取用户设置
      wx.getSetting({
        success: res2 => {
          if (res2.authSetting['scope.writePhotosAlbum'])
            // 如果已经授权相册直接写入图片
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success: () => {
                $wx.tip('保存成功');
              }
            });
          else wx.authorize({// 没有授权——>提示用户授权
            scope: 'scope.writePhotosAlbum',
            success: () => {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: () => {
                  $wx.tip('保存成功');
                }
              });
            },
            fail: () => { // 用户拒绝权限，提示用户开启权限
              $wx.modal('权限被拒', '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限', () => {
                $wx.tip('二维码保存失败');
              });
            }
          });
        }
      });
    }, () => {
      $wx.tip('二维码下载失败');
    });
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(res) {
    $component.trigger(res, this);
  },
  onShareAppMessage: () => ({ title: '捐赠Mr.Hope', path: '/settings/donate' })
});
