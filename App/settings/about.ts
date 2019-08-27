/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-14 22:49:41
 * @Description: 关于
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);
let clickNumber = 0;
let developMode = false;

$register('about', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '关于', grey: true, feedback: true, contact: true },
      {
        tag: 'List',
        head: '版本号',
        content: [
          { text: a.version, button: 'debugMode' },
          { text: '启用测试功能', swiKey: 'test', Switch: 'testSwitch' },
          { text: '调试开关', swiKey: 'debugMode', Switch: 'debugSwitch' },
          { text: '退出开发者模式', button: 'debugMode' }
        ]
      },
      {
        tag: 'list',
        head: '工作室与开发者介绍',
        content: [
          { text: '   小程序全部内容均由Hope Studio独立开发。' },
          { text: 'Hope Studio介绍', aim: 'MrHope0' },
          { text: 'Mr.Hope个人介绍', aim: 'MrHope1' },
          { text: '致谢名单', aim: 'MrHope4' }
        ]
      },
      {
        tag: 'list',
        head: '小程序介绍',
        content: [
          { text: '开发者访谈', aim: 'MrHope3' },
          { text: '小程序功能太少?', aim: 'MrHope2' }
        ]
      },
      { tag: 'foot', author: '', desc: `当前版本：${a.version}` }
    ]
  },
  onNavigate(res) {
    const p = this.data.page;
    const value = wx.getStorageSync('developMode');

    developMode = value || value === false ? value : wx.setStorageSync('developMode', false);

    if (!developMode) (p[1].content as any[]).forEach((x, y) => {
      x.hidden = !(y === 0);
    });
    $page.resolve(res, p);
  },
  onLoad(option: any) {
    if (a.page.aim === '关于') $page.Set({ option, ctx: this });
    else {
      const p = this.data.page;
      const value = wx.getStorageSync('developMode');

      developMode = value || value === false ? value : wx.setStorageSync('developMode', false);
      if (!developMode) (p[1].content as any[]).forEach((x, y) => {
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
    $wx.request(`config/${a.appID}/${a.version}/about`, (data: any) => {
      $page.Set(
        { option: { aim: '关于' }, ctx: this },
        this.data.page.slice(0, 2)
          .concat(data, this.data.page.slice(-1))
      );
    });
  },
  onPageScroll(event) {
    $page.nav(event, this);
  },
  list({ detail }: any) {
    console.log(detail);
    if (detail.event) this[detail.event as 'debugSwitch' | 'testSwitch'](detail.value);
  },
  debugMode() {
    if (developMode) {
      wx.setStorageSync('developMode', false);
      (this.data.page[1].content as any[]).forEach((x, y) => {
        x.hidden = !(y === 0);
      });
      this.setData({ page: this.data.page });
      clickNumber = 0;
      developMode = false;
    } else if (clickNumber < 5) clickNumber += 1;
    else if (clickNumber < 10) {
      $wx.tip(`再点击${10 - clickNumber}次即可启用开发者模式`);
      clickNumber += 1;
    } else {
      this.setData({ debug: true });
      wx.nextTick(() => {
        this.setData({ focus: true });
      });
    }
  },
  password(event: MiniprogramEvent) {
    console.log(event);
    if (event.detail.value.length === 7) {
      if (event.detail.value === '5201314') { // 密码正确
        $wx.tip('已启用开发者模式');
        (this.data.page[1].content as any[]).forEach(x => {
          x.hidden = false;
        });
        this.setData({ page: this.data.page, debug: false });
        wx.setStorageSync('developMode', true);
        developMode = true;

      } else { // 密码错误
        wx.showToast({ title: '密码错误', icon: 'none', duration: 1000, image: '/icon/close.png' });
        this.setData({ debug: false });
      }
      event.detail.value = '';
    }

    return event.detail.value;
  },
  cancelInput() {
    this.setData({ debug: false });
  },
  debugSwitch(value: boolean) {

    (this.data.page[1].content as any[])[2].status = value;
    this.setData({ page: this.data.page });
    wx.setStorageSync('debugMode', value);

    if (value) wx.setEnableDebug({ enableDebug: true });
    else wx.setEnableDebug({ enableDebug: false });
  },
  testSwitch(value: boolean) {
    $wx.tip(`已${value ? '启用' : '关闭'}测试功能`);
  }
});
