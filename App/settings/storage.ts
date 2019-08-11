/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-11 19:39:36
 * @Description: 关于
 */
import $register, { WXPage } from 'wxpage';
import $file from '../utils/file';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

$register('storage', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '存储设置', grey: true, feedback: true, contact: true },
      {
        tag: 'List',
        head: '数据缓存',
        content: [
          { text: '空间占用情况', desc: '0K/10240K' }
        ]
      },
      {
        tag: 'List',
        head: '文件系统',
        content: [
          { text: '空间占用情况', desc: '0K/10240K' }
        ]
      },
      {
        tag: 'List',
        head: '重置',
        content: [
          { text: '清除小程序数据', button: 'deleteData' },
          { text: '清除小程序文件', button: 'deleteFile' },
          { text: '初始化小程序', button: 'resetApp' },
          { text: '退出小程序', navigate: true, openType: 'exit', target: 'miniProgram' }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}` }
    ]
  },
  onNavigate(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res, this.getStorage());
  },
  onLoad(option: any) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else $page.Set({ option: { aim: 'about' }, ctx: this }, this.getStorage());

    $page.Notice('about');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(event) {
    $page.nav(event, this);
  },
  list({ detail }: any) {
    console.log(detail);
    if (detail.event) this[detail.event](detail.value);
  },
  getStorage() { // 获得存储信息
    const p = this.data.page;
    const { currentSize } = wx.getStorageInfoSync();
    let fileSize = 0;

    (wx.getFileSystemManager()
      .statSync(wx.env.USER_DATA_PATH, true) as unknown as any[])
      .forEach(element => {
        fileSize += element.stats.size;
      });

    p[1].content[0].desc = `${currentSize}K/10240K`; // 写入存储大小
    p[2].content[0].desc = `${Math.floor(fileSize / 1024)}K/10240K`; // 写入文件大小

    return p;
  },
  deleteData() {
    wx.clearStorageSync();
    $wx.tip('数据清除完成');
  },
  deleteFile() {
    wx.showLoading({ title: '删除中', mask: true });

    $file.listFile('')
      .forEach((filePath: string) => {
        $file.Delete(filePath);
      });

    wx.hideLoading();
  },
  resetApp() {
    // 显示提示
    wx.showLoading({ title: '初始化中', mask: true });

    // 清除文件系统文件与数据存储
    $file.listFile('')
      .forEach((filePath: string) => {
        $file.Delete(filePath);
      });
    wx.clearStorageSync();

    // 隐藏提示
    wx.hideLoading();
    // 提示用户重启
    $wx.modal('小程序初始化完成', '请单击 “退出小程序按钮” 退出小程序');
  }
});
