/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-26 00:33:57
 * @Description: 关于
 */
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $file from '../utils/file';
import $page from '../utils/page';
import $my from '../utils/wx';
const { globalData: a } = getApp();

$register('about', {
  clickNumber: 0,
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '关于', aimDepth: 1, grey: true, feedback: true, contact: true },
      {
        tag: 'list',
        head: '版本号',
        content: [
          { text: a.version, button: 'debugMode' },
          { text: '启用测试功能', swiKey: 'test', Switch: 'testSwitch' },
          { text: '调试开关', swiKey: 'debugMode', Switch: 'debugSwitch' },
          { text: '清除小程序数据', button: 'deleteData' },
          { text: '清除小程序文件', button: 'deleteFile' },
          { text: '初始化小程序', button: 'resetApp' },
          { text: '退出小程序', navigate: true, openType: 'exit', target: 'miniProgram' },
          { text: '退出开发者模式', button: 'debugMode' }
        ]
      },
      {
        tag: 'list',
        head: '正式版开发日志',
        content: [
          { text: `${a.version}\n重构小程序\n更新编译基础库为2.7.2\n小程序现在拥有更好的性能` },
          { text: '查看详细日志', url: '/settings/2.0' }
        ]
      },
      {
        tag: 'list',
        head: '工作室与开发者介绍',
        content: [
          { text: '   小程序全部内容均由Hope Studio独立开发。' },
          { text: 'Hope Studio介绍', aim: 'MrHope0' },
          { text: 'Mr.Hope个人介绍', aim: 'MrHope1' },
          { text: '   感谢陈旭、董雨馨、傅阳、林传舜、沈竞泽、苏炀、邱诗懿、王一竹、张霁月在界面编写、排版与订正上给予的无私帮助。' }
        ]
      },
      {
        tag: 'list',
        head: '遇到问题？',
        content: [
          { text: '对小程序有任何意见、建议或是想汇报bug？\n请添加QQ 1178522294 或点击右下角来联系开发者。' },
          { text: '小程序功能太少?', aim: 'MrHope2' },
          { text: '小程序响应慢？', desc: '欢迎捐赠', url: '/settings/donate' }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}` }
    ]
  },
  onNavigate(res: WXPage.PageArg) {
    const p = this.data.page;
    const value = wx.getStorageSync('developMode');

    this.developMode = value || value === false ? value : wx.setStorageSync('developMode', false);
    if (wx.getStorageSync('debugMode')) p[1].content[2].status = true;
    if (!this.developMode) p[1].content.forEach((x: any, y: number) => {
      x.hidden = !(y === 0);
    });
    $page.resolve(res, p);
  },
  onLoad(option: any) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else {
      const p = this.data.page;
      const value = wx.getStorageSync('developMode');

      this.developMode = value || value === false ? value : wx.setStorageSync('developMode', false);
      if (!this.developMode) p[1].content.forEach((x: any, y: number) => {
        x.hidden = !(y === 0);
      });
      $page.Set({ option: { aim: 'about' }, ctx: this }, p);
    }

    $page.Notice('about');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    $my.request(`config/${a.version}/about`, (data: object) => {
      $page.Set(
        { option: { aim: 'about' }, ctx: this },
        this.data.page.slice(0, 2).concat(data, this.data.page.slice(-1))
      );
    });

  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e: any) {
    $component.trigger(e, this);
  },
  debugMode() {
    if (this.developMode) {
      wx.setStorageSync('developMode', false);
      this.data.page[1].content.forEach((x: any, y: number) => {
        x.hidden = !(y === 0);
      });
      this.setData!({ page: this.data.page });
      this.clickNumber = 0;
      this.developMode = false;
    } else if (this.clickNumber < 5) this.clickNumber += 1;
    else if (this.clickNumber < 10) {
      $my.tip(`再点击${10 - this.clickNumber}次即可启用开发者模式`);
      this.clickNumber += 1;
    } else {
      this.setData!({ debug: true });
      wx.nextTick(() => {
        this.setData!({ focus: true });
      });
    }
  },
  password(e: any) {
    if (e.detail.value.length === 7) {
      if (e.detail.value === '5201314') { // 密码正确
        $my.tip('已启用开发者模式');
        this.data.page[1].content.forEach((x: any) => {
          x.hidden = false;
        });
        this.setData!({ page: this.data.page, debug: false });
        wx.setStorageSync('developMode', true);
        this.developMode = true;

      } else { // 密码错误
        wx.showToast({ title: '密码错误', icon: 'none', duration: 1000, image: '/icon/close.png' });
        this.setData!({ debug: false });
      }
      e.detail.value = '';
    }

    return e.detail.value;
  },
  cancelInput() {
    this.setData!({ debug: false });
  },
  debugSwitch(e: any) {
    const pos = e.target.dataset.id.split('-');

    this.data.page[pos[0]].content[pos[1]].status = e.detail.value;
    this.setData!({ page: this.data.page });
    wx.setStorageSync('debugMode', e.detail.value);
    if (e.detail.value) wx.setEnableDebug({ enableDebug: true });
    else wx.setEnableDebug({ enableDebug: false });
  },
  testSwitch(res: any) {
    $component.trigger(res, this);
    $my.tip(`已${res.detail.value ? '启用' : '关闭'}测试功能`);
  },
  deleteData() {
    wx.clearStorageSync();
    $my.tip('数据清除完成');
  },
  deleteFile() {
    wx.showLoading({ title: '删除中', mask: true });

    $file.listFile('').forEach((filePath: string) => {
      $file.Delete(filePath);
    });

    wx.hideLoading();
  },
  resetApp() {
    // 显示提示
    wx.showLoading({ title: '初始化中', mask: true });

    // 清除文件系统文件与数据存储
    $file.listFile('').forEach((filePath: string) => {
      $file.Delete(filePath);
    });
    wx.clearStorageSync();

    // 隐藏提示
    wx.hideLoading();
    // 提示用户重启
    wx.showModal({ title: '小程序初始化完成', content: '请单击 “退出小程序按钮” 退出小程序', showCancel: false });
  }
});
