/*
 * @Author: Mr.Hope
 * @Date: 2019-08-14 00:04:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 16:54:05
 * @Description: 设置页面
 */
import $register = require('wxpage');
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
type ListAction = 'setTheme';

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
    resolvePage(res, this.data.page);
  },

  onLoad(option: any) {
    if (globalData.page.aim === '外观设置') setPage({ option, ctx: this });
    else setPage({ option, ctx: this }, this.data.page);

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
    if (detail.event) this[detail.event as ListAction](detail.value);
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
  }
});
