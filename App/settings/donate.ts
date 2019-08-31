/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 01:33:49
 * @Description: 捐赠
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

interface DonateDetail {
  /** 捐赠者姓名 */
  0: string;
  /** 捐赠金额 */
  1: number;
}

type DonateList = DonateDetail[];

$register('donate', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '捐赠', shareable: true, leftText: '返回' },
      { tag: 'title', text: '服务器现状' },
      {
        tag: 'p',
        text: '   目前，小程序服务器后端部署在阿里云的轻量应用服务器上，您每一次在小程序对图片和文件的访问都会造成服务器的流量开销。而且由于服务器配置不高，在访问人数较多的时候可能会出现无应答或异常应答的情况。您可以选择捐赠来让小程序变得更好。\n   Mr.Hope每年会在小程序与网站上支出服务器、域名、数据库等成本约600元。Mr.Hope向同学郑重承诺，你打赏的每一分钱都会投入到小程序开发上来。'
      },
      { tag: 'title', text: '捐赠方式' },
      {
        tag: 'p',
        text: '   如果您愿意对我进行捐赠，可以点击下方二维码。这样会将对应的二维码保存至您的手机相册。您可以稍后使用相应APP扫码来进行打赏。因为您也是学生，Mr.Hope不建议您捐赠数目较大的金额，几分钱也是同学一份心意。如果可以，希望您在打赏时能够注明“小程序打赏”并备注姓名，这样能够方便Mr.Hope统计。Mr.Hope会将每一笔捐赠的姓名和打赏金额显示在下方的列表中。再次感谢您的支持！'
      }
    ]
  },
  onLoad() {
    this.setData({ 'page[0].statusBarHeight': a.info.statusBarHeight });

    // 获取捐赠列表数据
    $wx.request('config/donateList', donateList => {
      let sum = 0;

      (donateList as unknown as DonateList).forEach(element => {
        sum += element[1];
      });

      this.setData({ donateList, sum: Math.floor(100 * sum) / 100 });
    });
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    $page.Notice('donate');
  },

  onPageScroll(event) {
    $page.nav(event, this);
  },

  onShareAppMessage: () => ({ title: '捐赠Mr.Hope', path: '/settings/donate' }),

  /** 保存二维码 */
  save(res: WXEvent.Touch) {
    console.log('Start QRCode download.');// 调试
    $wx.downLoad(`img/donate/${res.currentTarget.dataset.name}.png`, (path: string) => {
      // 获取用户设置
      wx.getSetting({
        success: res2 => {
          // 如果已经授权相册直接写入图片
          if (res2.authSetting['scope.writePhotosAlbum'])
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success: () => {
                $wx.tip('保存成功');
              }
            });

          // 没有授权——>提示用户授权
          else wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: () => {
                  $wx.tip('保存成功');
                }
              });
            },

            // 用户拒绝权限，提示用户开启权限
            fail: () => {
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
  }
});
