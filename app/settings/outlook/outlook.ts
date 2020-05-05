/*
 * @Author: Mr.Hope
 * @Date: 2019-08-14 00:04:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 16:54:05
 * @Description: 设置页面
 */
import * as $register from 'wxpage';
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../../utils/page';
import { AppOption } from '../../app';
import { darkmode } from '../../utils/app';
const { globalData } = getApp<AppOption>();

/** 列表动作列表 */
type ListAction =
  | 'setTheme'
  | 'switchNightmode'
  | 'switchNightmodeAutoChange'
  | 'dayBrightnessSwitchHandler'
  | 'nightBrightnessSwitchHandler'
  | 'dayBrightnessHandler'
  | 'nightBrightnessHandler';

// 生成时间
const time: string[][] = [[], []];

for (let i = 0; i <= 23; i += 1) time[0].push(`${i}时`);
for (let i = 0; i <= 59; i += 1)
  if (i < 10) time[1].push(`0${i}分`);
  else time[1].push(`${i}分`);

$register('setting', {
  data: {
    T: globalData.T,
    darkmode: globalData.darkmode,
    event: [],
    page: [
      { tag: 'head', title: '外观设置', grey: true },
      {
        tag: 'List',
        head: '主题设置',
        content: [
          {
            text: '主题设置',
            key: 'themeNum',
            single: true,
            pickerValue: ['iOS', 'Android', 'NENU', 'weui'],
            picker: 'setTheme'
          }
        ]
      },
      {
        tag: 'List',
        head: '夜间模式',
        foot:
          '启用后，将采用暗色背景与亮色文字，在保持暗光下显示效果的同时保护眼睛。',
        content: [
          { text: '夜间模式', Switch: 'switchNightmode', swiKey: 'darkmode' }
        ]
      },
      {
        tag: 'List',
        foot: '亮度数据为百分比',
        content: [
          {
            text: '设定时间',
            Switch: 'switchNightmodeAutoChange',
            swiKey: 'darkmodeAutoChange'
          },
          {
            text: '开始时间',
            inlay: true,
            key: 'darkmodeStartTime',
            pickerValue: time
          },
          {
            text: '结束时间',
            inlay: true,
            key: 'darkmodeEndTime',
            pickerValue: time
          },
          {
            text: '日间亮度调整开关',
            Switch: 'dayBrightnessSwitchHandler',
            swiKey: 'dayBrightnessChange'
          },
          {
            text: '日间模式亮度',
            slider: 'dayBrightnessHandler',
            min: 0,
            max: 100,
            sliKey: 'dayBrightness'
          },
          {
            text: '夜间亮度调整开关',
            Switch: 'nightBrightnessSwitchHandler',
            swiKey: 'nightBrightnessChange'
          },
          {
            text: '夜间模式亮度',
            slider: 'nightBrightnessHandler',
            min: 0,
            max: 100,
            sliKey: 'nightBrightness'
          }
        ]
      },
      {
        tag: 'List',
        head: '资源更新',
        content: [
          { text: '功能资源更新提示', swiKey: 'functionResNotify' },
          { text: '指南资源更新提示', swiKey: 'pageResNotify' }
        ]
      },
      { tag: 'foot', author: '' }
    ]
  },

  onNavigate(res) {
    // 读取状态数据并执行预加载
    const list = this.data.page[3].content as any[];
    const darkmodeAutoChange = wx.getStorageSync('darkmodeAutoChange');
    const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
    const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');

    if (!darkmodeAutoChange) {
      list[1].hidden = true;
      list[2].hidden = true;
    }
    if (globalData.darkmode) list[3].hidden = true;
    else list[5].hidden = true;
    if (!dayBrightnessChange || globalData.darkmode) list[4].hidden = true;
    if (!nightBrightnessChange || !globalData.darkmode) list[6].hidden = true;

    resolvePage(res, this.data.page);
  },

  onLoad(option: any) {
    if (globalData.page.aim === '外观设置') setPage({ option, ctx: this });
    else {
      const list = this.data.page[3].content as any[];
      const darkmodeAutoChange = wx.getStorageSync('darkmodeAutoChange');
      const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
      const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');

      if (!darkmodeAutoChange) {
        list[1].hidden = true;
        list[2].hidden = true;
      }
      if (globalData.darkmode) list[3].hidden = true;
      else list[5].hidden = true;
      if (!dayBrightnessChange || globalData.darkmode) list[4].hidden = true;
      if (!nightBrightnessChange || !globalData.darkmode) list[6].hidden = true;
      setPage({ option, ctx: this }, this.data.page);
    }
    popNotice('theme');
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

  onUnload() {
    // 退出时重新计算夜间模式
    globalData.darkmode = darkmode();
  },

  /** 列表控制函数 */
  list({ detail }: any) {
    if (detail.event) (this[detail.event as ListAction] as any)(detail.value);
  },

  /**
   * 设置主题
   *
   * @param value 主题名称
   */
  setTheme(value: string) {
    const theme = (this.data.page[1].content as any[])[0].pickerValue[value];

    globalData.T = theme;
    wx.setStorageSync('theme', theme);
    this.setData({ T: theme });
    // Set({ option: { aim: 'settings' }, ctx: this }, this.data.page);
    this.$emit('theme', theme);
    console.log(`theme切换为${theme}`); // 调试
  },

  /**
   * 改变夜间模式
   *
   * @param value 夜间模式状态
   */
  // eslint-disable-next-line max-statements
  switchNightmode(value: boolean) {
    const list = this.data.page[3].content as any[];

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

    wx.setStorageSync('darkmodeAutoChange', false);
    this.setData({ darkmode: value, 'event[3]': { content: list } });
    globalData.darkmode = value;
    this.$emit('darkmode', value);

    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  /**
   * 设置夜间模式自动开启状态
   *
   * @param value 夜间模式自动开启状态
   */
  switchNightmodeAutoChange(value: boolean) {
    // 改变页面状态
    const { page } = this.data;
    const list = page[3].content as any[];
    const darkmodeStatus = darkmode();

    wx.setStorageSync('darkmode', darkmodeStatus);
    if (darkmodeStatus && list[5].status)
      wx.setScreenBrightness({ value: list[6].value / 100 });
    else if (!darkmodeStatus && list[3].status)
      wx.setScreenBrightness({ value: list[4].value / 100 });
    if (value) {
      list[1].hidden = false;
      list[2].hidden = false;
    } else {
      list[1].hidden = list[2].hidden = true;
      list[1].visible = list[2].visible = false;
    }
    if (darkmodeStatus) {
      list[3].hidden = list[4].hidden = true;
      list[4].visible = list[5].hidden = false;
      list[6].hidden = !list[5].status;
    } else {
      list[3].hidden = list[6].visible = false;
      list[5].hidden = list[6].hidden = true;
      list[4].hidden = !list[3].status;
    }

    list[0].status = value;
    this.setData({
      darkmode: darkmodeStatus,
      'event[2]': { 'content[0].status': darkmodeStatus },
      'event[3]': { content: list }
    });
    globalData.darkmode = darkmodeStatus;
    this.$emit('darkmode', darkmodeStatus);

    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
    console.log(this.data.page);
  },

  /**
   * 日间模式亮度开关
   *
   * @param value 开关状态
   */
  dayBrightnessSwitchHandler(value: boolean) {
    const list = this.data.page[3].content as any[];

    list[4].visible = value;
    list[4].hidden = !value;
    this.setData({
      'event[3]': { 'content[4].visible': value, 'content[4].hidden': !value }
    });
  },

  /**
   * 夜间模式亮度开关
   *
   * @param value 开关状态
   */
  nightBrightnessSwitchHandler(value: boolean) {
    const list = this.data.page[3].content as any[];

    list[6].visible = value;
    list[6].hidden = !value;

    this.setData({
      'event[3]': { 'content[6].visible': value, 'content[6].hidden': !value }
    });
  },

  /**
   * 日间模式亮度处理
   *
   * @param value 日间亮度百分比
   */
  dayBrightnessHandler(value: number) {
    if (!globalData.darkmode && (this.data.page[3].content as any[])[3].status)
      wx.setScreenBrightness({ value: value / 100 });
  },

  /**
   * 夜间模式亮度处理
   *
   * @param value 夜间亮度百分比
   */
  nightBrightnessHandler(value: number) {
    if (globalData.darkmode && (this.data.page[3].content as any[])[5].status)
      wx.setScreenBrightness({ value: value / 100 });
  }
});
