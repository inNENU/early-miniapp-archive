/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 16:23:39
 * @Description: 捐赠
 */
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();
const authorizeList: authorizeList[] = [
  'scope.userLocation',
  'scope.writePhotosAlbum',
  'scope.userInfo',
  'scope.address',
  'scope.invoiceTitle',
  'scope.invoice',
  'scope.werun',
  'scope.record',
  'scope.camera'
];

type authorizeList = 'scope.userLocation' | 'scope.writePhotosAlbum' | 'scope.userInfo' |
  'scope.address' | 'scope.invoiceTitle' | 'scope.invoice' | 'scope.werun' | 'scope.record' | 'scope.camera';

$register('authorize', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '授权设置', grey: true },
      {
        tag: 'list',
        head: '授权信息',
        content: [
          { text: '地理位置', desc: 'X' },
          { text: '保存到相册', desc: 'X' },
          { text: '用户信息', desc: 'X' },
          { text: '通讯地址', desc: 'X' },
          { text: '发票抬头', desc: 'X' },
          { text: '获取发票', desc: 'X' },
          { text: '微信运动步数', desc: 'X' },
          { text: '录音', desc: 'X' },
          { text: '摄像头', desc: 'X' }
        ]
      },
      {
        tag: 'list',
        head: '进行授权',
        content: [
          { text: '地理位置', button: 'location' },
          { text: '保存到相册', button: 'album' },
          { text: '通讯地址', button: 'address' },
          { text: '发票抬头', button: 'invoiceTitle' },
          { text: '获取发票', button: 'invoice' },
          { text: '微信运动步数', button: 'werun' },
          { text: '录音', button: 'record' },
          { text: '摄像头', button: 'camera' }
        ]
      }
    ],
    authorize: {}
  },
  onNavigate(res: WXPage.PageArg) {
    $page.resolve(res, this.data.page);
  },
  onLoad() {
    $page.Set({ ctx: this, option: { aim: 'authorize' } });
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    const list = this.data.page[1].content;
    $page.Notice('authorize');
    wx.getSetting({
      success: res => {
        authorizeList.forEach((type, index) => {
          if (res.authSetting[type]) list[index].desc = '√';
        });

        this.setData!({ 'page[1].content': list });
      }
    });
  },
  location() {
    this.authorize(0);
  },
  album() {
    this.authorize(1);
  },
  address() {
    this.authorize(3);
  },
  invoiceTitle() {
    this.authorize(4);
  },
  invoice() {
    this.authorize(5);
  },
  werun() {
    this.authorize(6);
  },
  record() {
    this.authorize(7);
  },
  camera() {
    this.authorize(8);
  },
  authorize(type: number) {
    wx.authorize({
      scope: authorizeList[type],
      success: () => {
        $wx.tip('授权成功');
      },
      fail: () => { // 用户拒绝权限，提示用户开启权限
        $wx.modal('权限被拒', '您拒绝了权限授予，请在小程序设置页允许权限', () => {
          wx.openSetting({
            success: res => {
              if (res.authSetting[authorizeList[type]]) {
                $wx.tip('授权成功');
                this.setData!({
                  [`page[1].content[${type}].desc`]: '√'
                });
              }
              else $wx.tip('授权失败，您没有授权');
            }
          });
        });
      }
    });
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(res) {
    $component.trigger(res, this);
  }
});
