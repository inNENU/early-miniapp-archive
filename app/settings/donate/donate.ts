/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 16:51:31
 * @Description: 捐赠
 */
import * as $register from 'wxpage';
import { changeNav, popNotice, setColor } from '../../utils/page';
import { requestJSON, savePhoto } from '../../utils/wx';
import { AppOption } from '../../app';
const { globalData } = getApp<AppOption>();

interface DonateDetail {
  /** 捐赠者姓名 */
  0: string;
  /** 捐赠金额 */
  1: number;
}

type DonateList = DonateDetail[];

$register('donate', {
  data: {
    T: globalData.T,
    darkmode: globalData.darkmode,
    page: [
      { tag: 'head', title: '捐赠', shareable: true, leftText: '返回' },
      { tag: 'title', text: '服务器现状' },
      {
        tag: 'p',
        text:
          '   目前，小程序服务器后端部署在阿里云的轻量应用服务器上，您每一次在小程序对图片和文件的访问都会造成服务器的流量开销。而且由于服务器配置不高，在访问人数较多的时候可能会出现无应答或异常应答的情况。您可以选择捐赠来让小程序变得更好。\n   Mr.Hope每年会在小程序与网站上支出服务器、域名、数据库等成本约600元。Mr.Hope向同学郑重承诺，你打赏的每一分钱都会投入到小程序开发上来。'
      },
      { tag: 'title', text: '捐赠方式' },
      {
        tag: 'p',
        text:
          '   如果您愿意对我进行捐赠，可以点击下方二维码。这样会将对应的二维码保存至您的手机相册。您可以稍后使用相应APP扫码来进行打赏。因为您也是学生，Mr.Hope不建议您捐赠数目较大的金额，几分钱也是同学一份心意。为了方便统计，请您在打赏时备注“小程序打赏+ 昵称/姓名”，这样能够方便Mr.Hope统计。Mr.Hope会将每一笔捐赠的姓名和打赏金额显示在下方的列表中。再次感谢您的支持！'
      }
    ]
  },
  onLoad() {
    this.setData({
      'page[0].statusBarHeight': globalData.info.statusBarHeight
    });

    // 获取捐赠列表数据
    requestJSON('config/donateList', (donateList) => {
      let sum = 0;

      ((donateList as unknown) as DonateList).forEach((element) => {
        sum += element[1];
      });

      this.setData({ donateList, sum: Math.floor(100 * sum) / 100 });
    });
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    popNotice('donate');
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  onShareAppMessage: () => ({
    title: '捐赠Mr.Hope',
    path: '/settings/donate/donate'
  }),

  /** 保存二维码 */
  save(res: WXEvent.Touch) {
    console.log('Start QRCode download.'); // 调试
    savePhoto(`img/donate/${res.currentTarget.dataset.name}.png`);
  }
});
