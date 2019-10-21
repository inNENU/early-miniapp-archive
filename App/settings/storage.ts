/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:46:26
 * @Description: 关于
 */
import { Delete, listFile } from '../utils/file';
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../utils/page';
import { modal, tip } from '../utils/wx';
import $register from 'wxpage';
import { resDownload } from '../utils/tab';
const { globalData: a } = getApp() as WechatMiniprogram.App.MPInstance<{}>;

/** 列表动作 */
type ListAction =
  | 'getStorage'
  | 'refreshGuide'
  | 'refreshFunc'
  | 'deleteData'
  | 'deleteData'
  | 'resetApp';

$register('storage', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      {
        tag: 'head',
        title: '存储设置',
        grey: true,
        feedback: true,
        contact: true
      },
      {
        tag: 'List',
        head: '数据缓存',
        content: [{ text: '空间占用情况', desc: '0K/10240K' }]
      },
      {
        tag: 'List',
        head: '文件系统',
        content: [{ text: '空间占用情况', desc: '0K/10240K' }]
      },
      {
        tag: 'List',
        head: '资源刷新',
        foot: '如果页面显示出现问题请刷新资源',
        content: [
          { text: '刷新功能资源', button: 'refreshFunc' },
          { text: '刷新指南资源', button: 'refreshGuide' }
        ]
      },
      {
        tag: 'List',
        head: '重置',
        content: [
          { text: '清除小程序数据', button: 'deleteData' },
          { text: '清除小程序文件', button: 'deleteFile' },
          { text: '初始化小程序', button: 'resetApp' },
          {
            text: '退出小程序',
            navigate: true,
            openType: 'exit',
            target: 'miniProgram'
          }
        ]
      },
      { tag: 'foot', author: '', desc: `当前版本：${a.version}` }
    ]
  },

  onNavigate(res) {
    resolvePage(res, this.getStorage());
  },
  onLoad(option: any) {
    if (a.page.aim === '存储设置') setPage({ option, ctx: this });
    else setPage({ option: { aim: 'storage' }, ctx: this }, this.getStorage());

    popNotice('storage');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  /** 列表动作 */
  list({ detail }: any) {
    if (detail.event) this[detail.event as ListAction]();
  },

  /** 获得存储信息 */
  getStorage() {
    const p = this.data.page as any;
    const { currentSize } = wx.getStorageInfoSync();
    let fileSize = 0;

    ((wx
      .getFileSystemManager()
      .statSync(wx.env.USER_DATA_PATH, true) as unknown) as any[]).forEach(
        element => {
          fileSize += element.stats.size;
        }
      );

    p[1].content[0].desc = `${currentSize}K/10240K`; // 写入存储大小
    p[2].content[0].desc = `${Math.floor(fileSize / 1024)}K/10240K`; // 写入文件大小

    return p;
  },

  /** 刷新指南资源 */
  refreshGuide() {
    resDownload('page');
  },

  /** 刷新功能资源 */
  refreshFunc() {
    resDownload('function');
  },

  /** 清除小程序数据 */
  deleteData() {
    wx.clearStorageSync();
    tip('数据清除完成');
  },

  /** 清除小程序文件 */
  deleteFile() {
    wx.showLoading({ title: '删除中', mask: true });

    listFile('').forEach((filePath: string) => {
      Delete(filePath);
    });

    wx.hideLoading();
  },

  /** 初始化小程序 */
  resetApp() {
    // 显示提示
    wx.showLoading({ title: '初始化中', mask: true });

    // 清除文件系统文件与数据存储
    listFile('').forEach((filePath: string) => {
      Delete(filePath);
    });
    wx.clearStorageSync();

    // 隐藏提示
    wx.hideLoading();
    // 提示用户重启
    modal('小程序初始化完成', '请单击 “退出小程序按钮” 退出小程序');
  }
});
