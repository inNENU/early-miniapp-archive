/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:02:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-29 20:08:10
 * @Description: 捐赠
 */
import $register = require('wxpage');
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../../utils/page';
import { modal, tip } from '../../utils/wx';
import { AppOption } from '../../app';
const { globalData } = getApp<AppOption>();

type AuthorizeList =
  | 'scope.userLocation'
  | 'scope.writePhotosAlbum'
  | 'scope.userInfo'
  | 'scope.address'
  | 'scope.invoiceTitle'
  | 'scope.invoice'
  | 'scope.werun'
  | 'scope.record'
  | 'scope.camera';

type ListAction =
  | 'location'
  | 'album'
  | 'address'
  | 'invoiceTitle'
  | 'invoice'
  | 'werun'
  | 'record'
  | 'camera';

const authorizeList: AuthorizeList[] = [
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

$register('authorize', {
  data: {
    T: globalData.T,
    darkmode: globalData.darkmode,
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
    resolvePage(res, this.data.page);
  },

  onLoad(option: any) {
    if (globalData.page.aim === '授权设置') setPage({ option, ctx: this });
    else setPage({ option: { aim: 'authorize' }, ctx: this });

    popNotice('authorize');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    const list = this.data.page[1].content as any[];

    popNotice('authorize');
    wx.getSetting({
      success: (res) => {
        authorizeList.forEach((type, index) => {
          if (res.authSetting[type]) list[index].desc = '已授权✓';
        });

        this.setData({ 'page[1].content': list });
      }
    });
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  /** 列表处理函数 */
  list({ detail }: any) {
    if (detail.event) this[detail.event as ListAction]();
  },

  /** 定位授权 */
  location() {
    this.authorize(0);
  },

  /** 相册授权 */
  album() {
    this.authorize(1);
  },

  /** 通讯地址授权 */
  address() {
    this.authorize(3);
  },

  /** 发票抬头授权 */
  invoiceTitle() {
    this.authorize(4);
  },

  /** 发票授权 */
  invoice() {
    this.authorize(5);
  },

  /** 微信运动数据授权 */
  werun() {
    this.authorize(6);
  },

  /** 录音授权 */
  record() {
    this.authorize(7);
  },

  /** 摄像头授权 */
  camera() {
    this.authorize(8);
  },

  /** 授权函数 */
  authorize(type: number) {
    wx.showLoading({ title: '授权中' });

    wx.authorize({
      scope: authorizeList[type],
      success: () => {
        wx.hideLoading();
        tip('授权成功');
        this.setData({ [`page[1].content.[${type}].desc`]: '已授权✓' });
      },
      fail: () => {
        // 用户拒绝权限，提示用户开启权限
        wx.hideLoading();
        modal('权限被拒', '您拒绝了权限授予，请在小程序设置页允许权限', () => {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting[authorizeList[type]]) tip('授权成功');
              else tip('授权失败，您没有授权');

              wx.getSetting({
                success: (res2) => {
                  const list = this.data.page[1].content;

                  authorizeList.forEach((type2, index) => {
                    (list as any)[index].desc = res2.authSetting[type2]
                      ? '已授权✓'
                      : '未授权×';
                  });

                  this.setData({ 'page[1].content': list });
                }
              });
            }
          });
        });
      }
    });
  }
});
