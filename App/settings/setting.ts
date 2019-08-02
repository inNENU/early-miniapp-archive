/* global wx getApp*/
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
import $tab from '../utils/tab';
import { nightmode } from '../utils/app';
const { globalData: a } = getApp();

// 生成时间
const time: string[][] = [[], []];

$register('setting', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '设置', grey: true },
      {
        tag: 'list', head: '主题设置', foot: 'NENU主题还在完善中',
        content: [
          {
            text: '主题设置', key: 'themeNum', single: true, pickerValue: ['iOS', 'Android', 'NENU'], picker: 'setTheme'
          }
        ]
      },
      {
        tag: 'list',
        head: '夜间模式',
        foot: '启用后，将采用暗色背景与亮色文字，在保持暗光下显示效果的同时保护眼睛。',
        content: [{ text: '夜间模式', Switch: 'switchnm', swiKey: 'nightmode' }]
      },
      {
        tag: 'list',
        foot: '亮度数据为百分比',
        content: [
          { text: '设定时间', Switch: 'switchnmAC', swiKey: 'nightmodeAutoChange' },
          { text: '开始时间', inlay: true, key: 'nightmodeStartTime', pickerValue: time },
          { text: '结束时间', inlay: true, key: 'nightmodeEndTime', pickerValue: time },
          { text: '日间亮度调整开关', Switch: 'dayBrightnessSwitchHandler', swiKey: 'dayBrightnessChange' },
          { text: '日间模式亮度', slider: 'dayBrightnessHandler', min: 0, max: 100, sliKey: 'dayBrightness' },
          { text: '夜间亮度调整开关', Switch: 'nightBrightnessSwitchHandler', swiKey: 'nightBrightnessChange' },
          { text: '夜间模式亮度', slider: 'nightBrightnessHandler', min: 0, max: 100, sliKey: 'nightBrightness' }
        ]
      },
      {
        tag: 'list', head: '资源更新',
        content: [
          { text: '功能资源更新提示', swiKey: 'functionResNotify' },
          { text: '指南资源更新提示', swiKey: 'pageResNotify' }
        ]
      },
      {
        tag: 'list', head: '如果页面显示出现问题请刷新资源',
        content: [
          { text: '刷新功能资源', button: 'refreshFunc' },
          { text: '刷新指南资源', button: 'refreshGuide' }
        ]
      },
      {
        tag: 'list', head: '授权设置',
        content: [
          { text: '查看授权详情', url: 'authorize' }
        ]
      },
      { tag: 'foot' }
    ]
  },
  onNavigate(res: WXPage.PageArg) {
    // 生成时间
    for (let i = 0; i <= 23; i += 1) time[0].push(`${i}时`);
    for (let i = 0; i <= 59; i += 1)
      if (i < 10) time[1].push(`0${i}分`);
      else time[1].push(`${i}分`);

    // 读取状态数据并执行预加载
    const list = this.data.page[3].content;
    const nightmodeAutoChange = wx.getStorageSync('nightmodeAutoChange');
    const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
    const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');

    if (!nightmodeAutoChange) {
      list[1].hidden = true;
      list[2].hidden = true;
    }
    if (a.nm) list[3].hidden = true;
    else list[5].hidden = true;
    if (!dayBrightnessChange || a.nm) list[4].hidden = true;
    if (!nightBrightnessChange || !a.nm) list[6].hidden = true;

    $page.resolve(res, this.data.page);
  },
  onLoad(option: any) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else {
      const list = this.data.page[3].content;
      const nightmodeAutoChange = wx.getStorageSync('nightmodeAutoChange');
      const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
      const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');

      if (!nightmodeAutoChange) {
        list[1].hidden = true;
        list[2].hidden = true;
      }
      if (a.nm) list[3].hidden = true;
      else list[5].hidden = true;
      if (!dayBrightnessChange || a.nm) list[4].hidden = true;
      if (!nightBrightnessChange || !a.nm) list[6].hidden = true;
      $page.Set({ option, ctx: this }, this.data.page);
    }
    $page.Notice('theme');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  onUnload() { // 退出时重新计算夜间模式
    a.nm = nightmode();
  },
  list({ detail }: any) {
    console.log(detail);
    if (detail.event) this[detail.event](detail.value);
  },
  setTheme(value: string) {
    const theme = this.data.page[1].content[0].pickerValue[value];

    a.T = theme;
    wx.setStorageSync('theme', theme);
    $page.Set({ option: { aim: 'settings' }, ctx: this }, this.data.page);
    this.$emit!('theme', theme);
    console.log(`theme切换为${theme}`); // 调试
  },
  switchnm(value: boolean) {
    const { page } = this.data;
    const list = page[3].content;

    list[0].status = false;
    list[1].hidden = list[2].hidden = true;
    list[1].visible = list[2].visible = false;
    if (value) {
      list[3].hidden = list[4].hidden = true;
      list[4].visible = list[5].hidden = false;
      if (list[5].status) {
        list[6].hidden = false;
        wx.setScreenBrightness({ value: list[6].value / 100 });
      } else {
        list[6].hidden = true;
        list[6].visible = false;
      }
    } else {
      list[5].hidden = list[6].hidden = true;
      list[6].visible = list[3].hidden = false;
      if (list[3].status) {
        list[4].hidden = false;
        wx.setScreenBrightness({ value: list[4].value / 100 });
      } else {
        list[4].hidden = true;
        list[4].visible = false;
      }
    }
    wx.setStorageSync('nightmodeAutoChange', false);
    this.setData!({ page, nm: value });
    a.nm = value;
    this.$emit!('nightmode', value);

    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  switchnmAC(value: boolean) {
    const { page } = this.data;
    const list = page[3].content;
    const nm = nightmode();

    page[2].content[0].status = nm;
    wx.setStorageSync('nightmode', nm);
    if (nm && list[5].status) wx.setScreenBrightness({ value: list[6].value / 100 });
    else if (!nm && list[3].status) wx.setScreenBrightness({ value: list[4].value / 100 });
    if (value) {
      list[1].hidden = false;
      list[2].hidden = false;
    } else {
      list[1].hidden = list[2].hidden = true;
      list[1].visible = list[2].visible = false;
    }
    if (nm) {
      list[3].hidden = list[4].hidden = true;
      list[4].visible = list[5].hidden = false;
      list[6].hidden = !list[5].status;
    } else {
      list[3].hidden = list[6].visible = false;
      list[5].hidden = list[6].hidden = true;
      list[4].hidden = !list[3].status;
    }
    this.setData!({ nm, page });
    a.nm = nm;
    this.$emit!('nightmode', nm);

    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  dayBrightnessSwitchHandler(value: boolean) {
    const { page } = this.data;
    const list = page[3].content;

    list[4].visible = value;
    list[4].hidden = !value;
    this.setData!({ page });
  },
  nightBrightnessSwitchHandler(value: boolean) {
    const { page } = this.data;
    const list = page[3].content;

    list[6].visible = value;
    list[6].hidden = !value;
    this.setData!({ page });
  },
  dayBrightnessHandler(value: number) {
    if (!a.nm && this.data.page[3].content[3].status) wx.setScreenBrightness({ value: value / 100 });
  },
  nightBrightnessHandler(value: number) {
    if (a.nm && this.data.page[3].content[5].status) wx.setScreenBrightness({ value: value / 100 });
  },
  refreshGuide() {
    $tab.resDownload('page');
  },
  refreshFunc() {
    $tab.resDownload('function');
  }
});
