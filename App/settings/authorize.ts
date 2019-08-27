/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-27 11:55:36
 * @Description: 捐赠
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);
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

type authorizeList =
  'scope.userLocation' | 'scope.writePhotosAlbum' | 'scope.userInfo' |
  'scope.address' | 'scope.invoiceTitle' | 'scope.invoice' | 'scope.werun' | 'scope.record' | 'scope.camera';

type ListAction = 'location' | 'album' | 'address' | 'invoiceTitle' | 'invoice' | 'werun' | 'record' | 'camera';

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
          { text: '地理位置', desc: '未授权×' },
          { text: '保存到相册', desc: '未授权×' },
          { text: '用户信息', desc: '未授权×' },
          { text: '通讯地址', desc: '未授权×' },
          { text: '发票抬头', desc: '未授权×' },
          { text: '获取发票', desc: '未授权×' },
          { text: '微信运动步数', desc: '未授权×' },
          { text: '录音', desc: '未授权×' },
          { text: '摄像头', desc: '未授权×' }
        ]
      },
      {
        tag: 'List',
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
        ],
        foot: ' '
      },
      { tag: 'foot', author: '' }
    ],
    authorize: {}
  },
  onNavigate(res) {
    $page.resolve(res, this.data.page);
  },
  onLoad(option: any) {
    if (a.page.aim === '授权设置') $page.Set({ option, ctx: this });
    else $page.Set({ option: { aim: 'authorize' }, ctx: this });

    $page.Notice('authorize');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    const list = this.data.page[1].content as any[];

    $page.Notice('authorize');
    wx.getSetting({
      success: res => {
        authorizeList.forEach((type, index) => {
          if (res.authSetting[type]) list[index].desc = '已授权✓';
        });

        this.setData({ 'page[1].content': list });
      }
    });
  },
  list({ detail }: any) {
    if (detail.event) this[detail.event as ListAction]();
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
    wx.showLoading({ title: '授权中' });

    wx.authorize({
      scope: authorizeList[type],
      success: () => {
        wx.hideLoading();
        $wx.tip('授权成功');
        this.setData({ [`page[1].content.[${type}].desc`]: '已授权✓' });
      },
      fail: () => { // 用户拒绝权限，提示用户开启权限
        wx.hideLoading();
        $wx.modal('权限被拒', '您拒绝了权限授予，请在小程序设置页允许权限', () => {
          wx.openSetting({
            success: res => {
              if (res.authSetting[authorizeList[type]]) $wx.tip('授权成功');
              else $wx.tip('授权失败，您没有授权');

              wx.getSetting({
                success: res2 => {
                  const list = this.data.page[1].content;

                  authorizeList.forEach((type2, index) => {
                    (list as any)[index].desc = res2.authSetting[type2] ? '已授权✓' : '未授权×';
                  });

                  this.setData({ 'page[1].content': list });
                }
              });
            }
          });
        });
      }
    });
  },
  onPageScroll(event) {
    $page.nav(event, this);
  }
});
