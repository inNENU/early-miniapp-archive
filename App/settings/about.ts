/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-25 00:27:27
 * @Description: 关于
 */
import $register from 'wxpage';
import {
  resolvePage, setPage, popNotice, setColor, changeNav
} from '../utils/page';
import { request, tip } from '../utils/wx';
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

    // 读取开发者模式并对页面显示做相应改变
    developMode = wx.getStorageSync('developMode');
    if (!developMode) (p[1].content as any[]).forEach((x, y) => {
      x.hidden = !(y === 0);
    });

    resolvePage(res, p);
  },
  onLoad(option: any) {
    if (a.page.aim === '关于') setPage({ option, ctx: this });
    else {
      const p = this.data.page;

      // 读取开发者模式并对页面显示做相应改变
      developMode = wx.getStorageSync('developMode');
      if (!developMode) (p[1].content as any[]).forEach((x, y) => {
        x.hidden = !(y === 0);
      });

      setPage({ option: { aim: 'about' }, ctx: this }, p);
    }

    popNotice('about');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    // 读取在线文件更新页面显示
    request(`config/${a.appID}/${a.version}/about`, (data: any) => {
      setPage(
        { option: { aim: '关于' }, ctx: this },
        this.data.page.slice(0, 2)
          .concat(data, this.data.page.slice(-1))
      );
    });
  },
  onPageScroll(event) {
    changeNav(event, this);
  },

  /** 列表控制函数 */
  list({ detail }: any) {
    console.log(detail);
    if (detail.event) this[detail.event as 'debugSwitch' | 'testSwitch'](detail.value);
  },

  /** 点击版本号时触发的函数 */
  debugMode() {
    // 关闭开发者模式
    if (developMode) {
      wx.setStorageSync('developMode', false);
      (this.data.page[1].content as any[]).forEach((x, y) => {
        x.hidden = !(y === 0);
      });
      this.setData({ page: this.data.page });
      clickNumber = 0;
      developMode = false;

      // 不做任何操作
    } else if (clickNumber < 5) clickNumber += 1;

    // 提示还有几次点击即可启用开发者模式
    else if (clickNumber < 10) {
      tip(`再点击${10 - clickNumber}次即可启用开发者模式`);
      clickNumber += 1;

      // 启用开发者模式
    } else this.setData({ debug: true }, () => {
      wx.nextTick(() => {
        this.setData({ focus: true });
      });
    });
  },

  /**
   * 输入密码时出发的函数
   * 用于判断密码是否正确并启用开发者模式
   *
   * @param event 输入事件
   */
  password(event: WXEvent.Input) {
    if (event.detail.value.length === 7) {
      // 密码正确
      if (event.detail.value === '5201314') {
        tip('已启用开发者模式');
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

      // 清空输入框
      event.detail.value = '';
    }

    return event.detail.value;
  },

  /** 取消输入 */
  cancelInput() {
    this.setData({ debug: false });
  },

  /**
   * 控制调试开关
   *
   * @param value 开关状态
   */
  debugSwitch(value: boolean) {

    (this.data.page[1].content as any[])[2].status = value;
    this.setData({ page: this.data.page });
    wx.setStorageSync('debugMode', value);

    if (value) wx.setEnableDebug({ enableDebug: true });
    else wx.setEnableDebug({ enableDebug: false });
  },

  /**
   * 控制测试功能开关
   *
   * @param value 开关状态
   */
  testSwitch(value: boolean) {
    tip(`已${value ? '启用' : '关闭'}测试功能`);
  }
});
